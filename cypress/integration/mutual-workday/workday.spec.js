import { activeDateMonth } from '../common/date'
import {
  closeTips,
  confirmDelete
} from '../common/dialog'
import {
  waitRequest
} from '../common/http'
import { expandSearchConditions } from '../eqa/eqa-order/eqa-order'
import { reportElformClickDay } from '../report/report-iqc'
import {
  assertions,
  clickReset,
  clickSearch,
  interceptQuery,
  searchData
} from './workdayUtil'
context('月度工作日申请审核', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-workday')
    expandSearchConditions()
    //选择开始时间2020/1
    reportElformClickDay('开始时间','开始时间')
    cy.wait(1000)
    activeDateMonth('2020-01')
    //选择结束时间2020/12
    reportElformClickDay('结束时间','结束时间')
    cy.wait(1000)
    activeDateMonth('2020-12')
    clickSearch()
  })

  context('审核通过/审核不通过', () => {
    before(() => {
      cy.get('.ql-search--simple.is-right').first().within($el => {
        if ($el.css('display') === 'block') {
          cy.get('.el-form.el-form--inline').last().findByText('展开').click({
            force: true
          })
        }
      })
    })
    it('001-批量审核不通过', () => {
      clickReset()
      searchData(null, null, null, '审核通过')
      waitRequest({
        intercept: interceptQuery,
        onBefore: () => {
          cy.wait(3000)
          clickSearch()
        },
        onSuccess: (data) => {
          let pageLength = data.data.length
          data.data.forEach(item => expect(item.audit).to.eq(1))
          for (let i = 0; i < pageLength; i++) {
            cy.get('.el-table__body .el-table__row').eq(i).find('.cell').last().should('have.text', '审核不通过')
          }
          if (pageLength >= 20) {
            cy.get('.el-pagination__total').invoke('text').then((getData) => {
              let pageTotal = parseInt((getData.split(' '))[1])
              //选中当前页面所有数据
              cy.get('.has-gutter').find('[type=checkbox]').check('', {
                force: true
              })
              waitRequest({
                intercept: interceptQuery,
                onBefore: () => {
                  cy.get('.ql-search__tools-top.is-left').findByText('批量审核不通过').click({
                    force: true
                  })
                  confirmDelete()
                  cy.wait(2000)
                },
                onSuccess: (data) => {
                  if (pageTotal <= 20) {
                    cy.get('body').should('contain', '暂无数据')
                  } else {
                    cy.get('.el-pagination__total').should('have.text', '共 ' + (pageTotal - 20) + ' 条')
                  }
                }
              })
            })
          }
        }
      })
    })
    it('002-批量审核通过', () => {
      searchData(null, null, null, '审核不通过')
      waitRequest({
        intercept: interceptQuery,
        onBefore: () => {
          clickSearch()
        },
        onSuccess: (data) => {
          let pageLength = data.data.length
          data.data.forEach(item => expect(item.audit).to.eq(0))
          for (let i = 0; i < pageLength; i++) {
            cy.get('.el-table__body .el-table__row').eq(i).find('.cell').last().should('have.text', '审核通过')
          }
          if (pageLength >= 20) {
            cy.get('.el-pagination__total').invoke('text').then((getData) => {
              let pageTotal = parseInt((getData.split(' '))[1])
              //选中当前页面所有数据
              cy.get('.has-gutter').find('[type=checkbox]').check('', {
                force: true
              })
              waitRequest({
                intercept: interceptQuery,
                onBefore: () => {
                  cy.get('.ql-search__tools-top.is-left').findByText('批量审核通过').click({
                    force: true
                  })
                  closeTips('提示','通过')
                  cy.wait(2000)
                },
                onSuccess: (data) => {
                  if (pageTotal <= 20) {
                    cy.get('body').should('contain', '暂无数据')
                  } else {
                    cy.get('.el-pagination__total').should('have.text', '共 ' + (pageTotal - 20) + ' 条')
                  }
                }
              })
            })
          }
        }
      })
    })
  })
  context('筛选条件', () => {
    it('003-互认项目查询', () => {
      const itemName = '钠'
      clickReset()
      searchData(itemName)
      assertions(itemName)
    })
    it('004-关键字查询', () => {
      const labCode = 'gd18001'
      clickReset()
      searchData(null, labCode)
      assertions(null,labCode)
    })
    context('申请类型', () => {
      const planApply = '计划申请'
      const specialApply = '特殊申请'
      before(() => {
        clickReset()
      })
      it('005-计划申请', () => {
        searchData(null, null, planApply)
        assertions(null, null, planApply)
  
      })
      it('006-特殊申请', () => {
        searchData(null, null, specialApply)
        assertions(null, null, specialApply)
      })
    })
    context('审核状态查询', () => {
      const approved = '审核通过'
      const auditFailed = '审核不通过'
      const readyAudit = '待审核'
      before(() => {
        clickReset()
      })
      it('007-待审核', () => {
        searchData(null, null, null, readyAudit)
        assertions(null, null, null, readyAudit)
      })
      it('008-审核通过', () => {
        searchData(null, null, null, approved)
        assertions(null, null, null, approved)
      })
      it('009-审核不通过', () => {
        searchData(null, null, null, auditFailed)
        assertions(null, null, null, auditFailed)
      })
    })
    context('切换质控主管单位',()=>{
      const organization = '青浦医联体'
      before(()=>{
        clickReset()
      })
      it('010-切换单位',()=>{
        searchData(null,null,null,null,organization)
      }) 
    }) 
  })
})