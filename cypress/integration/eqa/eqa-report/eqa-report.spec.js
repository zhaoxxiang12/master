import {
  visitIframePage
} from '../../../shared/route'
import {
  waitIntercept,
  waitRequest
} from '../../common/http'
import { validSuccessMessage } from '../../common/message'
import {
  clickSearch
} from '../../setting/report-monitor/report-monitor'
import {
  reset
} from '../eqa-plan/eqa-plan'
import {
  assertReport,
  clickRegerate,
  interceptCancelPush,
  interceptPush,
  interceptQueryMajor,
  interceptQueryReport,
  interceptQueryYear,
  interceptRegenerate,
  searchReportData
} from './eqa-report'

/**
 * eqa反馈报告
 */
context('EQA反馈报告', () => {
  let major = []
  let queryYear = []
  let queryResult
  before(() => {
    waitRequest({
      intercept: interceptQueryMajor,
      onBefore: () => {
        visitIframePage('eqa-report')
      },
      onSuccess: (data) => {
        major = data.map(item => item === '' ? '全部' : item)
      }
    })
    waitRequest({
      intercept: interceptQueryYear,
      onBefore: () => {
        cy.reload()
      },
      onSuccess: (data) => {
        data.forEach(item => queryYear.push(item.year))
      }
    })
    waitRequest({
      intercept: interceptQueryReport,
      onBefore: () => {
        cy.reload
      },
      onSuccess: (queryData) => {
        queryResult = queryData
      }
    })
    cy.get('.ql-search--simple.is-right').first().within($el => {
      if ($el.css('display') === 'block') {
        cy.get('.el-form.el-form--inline').last().findByText('展开').click({
          force: true
        })
      }
    })
  })
  context('筛选条件', () => {
    const planName = 'test11'
    const times = 4
    const pushStatus = '已推送'
    const unpushStatus = '待推送'
    const labName = '佛山市第一人民医院'
    beforeEach(() => {
      reset()
    })
    after(()=>{
      reset()
      clickSearch()
    })
    it('001-专业分类', () => {
      if (major.length > 1) {
        searchReportData(major[1])
        assertReport(major[1])
      } else {
        searchReportData(major[0])
        assertReport(major[0])
      }
    })
    it('002-年度查询', () => {
      cy.wait(1000)
      if (queryYear.length > 1) {
        searchReportData(null, queryYear[0])
        assertReport(null, queryYear[0])
      } else {
        searchReportData(null, queryYear[1])
        assertReport(null, queryYear[1])
      }
    })
    it('003-比对计划名称查询', () => {
      cy.wait(1000)
      searchReportData(null, null, planName)
      assertReport(null, null, planName)
    })
    it('004-次数查询', () => {
      cy.wait(1000)
      searchReportData(null, null, null, times)
      assertReport(null, null, null, times)
    })
    it('005-实验室名称查询', () => {
      cy.wait(1000)
      searchReportData(null, null, null, null, null, labName)
      assertReport(null, null, null, null, null, labName)
    })
    context('报告状态查询', () => {
      it('006-已推送', () => {
        cy.wait(1000)
        searchReportData(null, null, null, null, pushStatus)
        assertReport(null, null, null, null, pushStatus)
      })
      it('007-待推送', () => {
        searchReportData(null, null, null, null, unpushStatus)
        assertReport(null, null, null, null, unpushStatus)
      })
    })
  })
  context('报告操作', () => {
    it('008-查看报告', () => {
      cy.wait(1000)
      const getTotal = queryResult.total
      if (getTotal > 0) {
        cy.get('.el-table__body').last().find('.el-table__row').findByText('查看报告').click({
          force: true
        })
        cy.get('.ql-frame-viewer__close').click()
      } else {
        cy.get('body').should('contain', '暂无数据')
      }
    })
    it('009-重新生成', () => {
      cy.wait(1000)
      const waitOptions = {
        timeout: 90000
      }
      const getTotal = queryResult.total
      if (getTotal) {
        const rowIndex = queryResult.records.findIndex(report => report.status === 2)
        let queryReport 
        if (rowIndex === -1) {
          const selfIndex = 0
          cy.get('.el-table__body').last().find('.el-table__row').eq(selfIndex).find('.el-switch__core').click({
            force: true
          })
          cy.wait(500)
          waitRequest({
            waitOptions,
            intercept: interceptRegenerate,
            onBefore: () => {
              clickRegerate(selfIndex)
              queryReport =  interceptQueryReport()
            },
            onSuccess: () => {
              validSuccessMessage()
              waitIntercept(queryReport,responseData=>{
                const responseStatus = responseData.records[selfIndex].status
                expect(responseStatus).to.eq(1)
              })
            }
          })
        } else {
          waitIntercept(interceptRegenerate,()=>{
            clickRegerate(rowIndex)
            queryReport = interceptQueryReport()
          },()=>{
            validSuccessMessage()
            waitIntercept(queryReport,responseData=>{
              const responseStatus = responseData.records[rowIndex].status
              expect(responseStatus).to.eq(1)
            })
          })
        }
      } else {
        cy.get('body').should('contain', '暂无数据')
      }
    })
  })

  context('推送/取消推送',()=>{
    it('010-批量推送',() =>{
      cy.get('.el-table__fixed-header-wrapper').last().find('[type=checkbox]').check({
        force:true
      })
      cy.wait(2000)
      let queryReport 
      waitIntercept(interceptPush,()=>{
        cy.get('.ql-search__tools-top.is-left').findByText('批量推送')
          .click({
            force:true
          })
        queryReport = interceptQueryReport()
      },()=>{
        validSuccessMessage()
        waitRequest({
          intercept:queryReport,
          onSuccess:(data)=>{
            data.records.forEach((item=>expect(item.status).to.eq(2)))
          }
        })
      })
    })
    it('011-批量取消推送',() =>{
      cy.get('.el-table__fixed-header-wrapper').last().find('[type=checkbox]').check({
        force:true
      })
      cy.wait(2000)
      let queryReport
      waitIntercept(interceptCancelPush,()=>{
        cy.get('.ql-search__tools-top.is-left').findByText('批量取消推送')
          .click({
            force:true
          })
        queryReport = interceptQueryReport()
      },()=>{
        validSuccessMessage()
        waitRequest({
          intercept:queryReport,
          onSuccess:(data)=>{
            data.records.forEach((item=>expect(item.status).to.eq(1)))
          }
        })
      })
    })
  })
})