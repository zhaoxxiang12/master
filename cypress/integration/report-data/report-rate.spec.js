import { PROVINCE_GD, TEXT_PREVIEW } from '../../shared/constants'
import { interceptAll, waitIntercept } from '../common/http'
import { activeSelect } from '../common/select'
import { findTableCell } from '../common/table'
import { pushToScreen } from './stats-query'

context('上报率', () => {
  const queryRateReq = () => {
    return interceptAll('service/mgr/reportsummary?dateType=*', queryRateReq.name)
  }
  const validRateTable = (row) => {
    findTableCell(0, 0).should('have.text', row.areaName)
    findTableCell(0, 1).should('have.text', row.labCount)
    findTableCell(0, 2).should('have.text', row.reportedCount)
    findTableCell(0, 3).should('have.text', row.reportedUnRunawayCount)
    findTableCell(0, 4).should('have.text', row.reportedRunawayCount)
    findTableCell(0, 5).should('have.text', row.unReportedCount)
    findTableCell(0, 6).should('contain.text', row.reportedRate + '%')
  }
  const sortAreaName = (a, b) => a.areaName < b.areaName ? 1 : -1
  let initData

  before(() => {
    waitIntercept(queryRateReq, () => {
      cy.visitPage('report-rate')
    }, data => {
      initData = data
      initData.sort(sortAreaName) 
      cy.get('.gl-report-rate .stats-report').should('exist')
    })
  })

  it('默认查询前一天', () => {
    cy.get('.el-form')
      .last()
      .findByText('日期')
      .next('.el-form-item__content')
      .find('input')
      .should('have.value', '前一天')
  })
  it('自动查询数据', () => {
    expect(initData).to.exist
  })
  it('表格基本数据', () => {
    const row = initData[0]
    validRateTable(row)
  })
  it('总计校验', () => {
    const labCount = initData.reduce((prev, curr) => curr.labCount + prev, 0)
    cy.get('.el-table__footer-wrapper tbody tr')
      .eq(0)
      .find('td')
      .eq(1)
      .should('have.text', labCount)
  })
  it('表头可排序', () => {
    cy.get('.el-table__fixed-header-wrapper .el-table__header')
      .first()
      .find('.caret-wrapper')
      .should('have.length', 7)
  })
  it('切换所在地', () => {
    waitIntercept(queryRateReq, () => {
      cy.get('.select-region')
        .findByPlaceholderText('请选择省')
        .click({
          force: true
        })

      activeSelect(PROVINCE_GD)
      cy.get('button')
        .contains('搜索')
        .click({
          force: true
        })
    }, data => {
      data.sort(sortAreaName)
      validRateTable(data[0])
    })
  })
  it('全屏预览', () => {
    waitIntercept(queryRateReq, () => {
      cy.get('button')
        .contains(TEXT_PREVIEW)
        .click({
          force: true
        })
    }, () => {
      const $splitviewItem = cy.get('.ql-splitview__item')
      $splitviewItem.should('have.length', 1)
      $splitviewItem.find('canvas').should('have.length', 1)
      cy.get('.ql-splitview__top').trigger('mouseover')
      cy.get('.ql-splitview__close').click({
        force: true
      })
    })
  })
  it('推送大屏', () => {
    pushToScreen((title, screenData, request) => {
      expect(title).to.equal(screenData.title)
      expect(request.body.params).to.equal(screenData.params)
    })
  })
})
