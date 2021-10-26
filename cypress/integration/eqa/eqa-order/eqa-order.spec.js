/**
 * eqa订单信息
 */
import {
  visitIframePage
} from '../../../shared/route'
import {
  clickOkInDialog,
  okOnPopConfirm,
  withinDialog
} from '../../common/dialog'
import {
  clickListener
} from '../../common/event'
import {
  validExcelFile
} from '../../common/file'
import {
  waitIntercept,
  waitRequest
} from '../../common/http'
import {
  loginIframeWithFeature,
} from '../../common/login'
import {
  validSuccessMessage
} from '../../common/message'
import {
  searchPlan
} from '../eqa-plan/eqa-plan'
import { interceptQueryData } from '../eqa-plan/eqa-plan'
import {
  clickOrderButton,
  createPlan,
  expandSearchConditions,
  findOrderButton,
  interceptCreateOrder,
  interceptResetReport,
  interceptViewOrder
} from './eqa-order'

context('eqa订单信息', () => {
  before(() => {
    visitIframePage('eqa-plan')
    expandSearchConditions()
  })
  context('生成订单', () => {
    it('超管账户不能生成订单', () => {
      createPlan()
      cy.get('.el-table__body').first().find('.el-table__row').first()
        .find('button').should('not.contain', '生成订单')
      cy.get('.el-table__body').first().find('.el-table__row').first()
        .findByText('删除').should('exist').click({
          force: true
        })
      okOnPopConfirm()
    })
    it('质控主管单位可以生成订单但不能确认订单',() => {
      loginIframeWithFeature('eqa-plan','gdfslj', () => {
        createPlan()
        waitRequest({
          intercept: interceptCreateOrder,
          onBefore: () => {
            clickOrderButton('生成订单', '生成订单信息')
          },
          onSuccess: () => {
            findOrderButton('编辑订单').should('exist')
            findOrderButton('确定订单').should('not.exist')
            findOrderButton('删除').should('exist').click({
              force: true
            })
            okOnPopConfirm()
          }
        })
      })
    })
  })
  context('确认订单/查看订单', () => {
    let returnData
    before(() => {
      loginIframeWithFeature('eqa-plan', 'gdfslj', () => {
        returnData = createPlan()
        clickOrderButton('生成订单', '生成订单信息')
        cy.wait(2000)
        findOrderButton('确定订单').should('not.exist')
      })
    })
    // afterEach(() => {
    //   cy.removeAllListeners()
    // })
    it('确认订单', () => {
      loginIframeWithFeature('eqa-plan', 'admin', () => {
        expandSearchConditions()
        searchPlan(returnData.planName)
        findOrderButton('确认订单').should('exist')
          .click({
            force: true
          })
        clickListener(() => {
          clickOrderButton('确认订单', '确认订单信息')
        }, 8000)
        let newTime = new Date()
        const year = newTime.getFullYear()
        const fileName = year + '年度佛山市临床检验质量控制中心' + returnData.planName + '第' + returnData.times + '次EQA订单信息.xlsx'
        // validExcelFile(fileName, data => {
        //   const organization = data[0][1]
        //   const planName = data[1][1]
        //   const planYear = data[2][1]
        //   const planTimes = data[3][1]
        //   const planMajor = data[4][1]
        //   expect(organization).to.eq('佛山市临床检验质量控制中心')
        //   expect(planName).to.eq(returnData.planName)
        //   expect(planYear).to.eq(year)
        //   expect(planTimes).to.eq('第' + returnData.times + '次')
        //   expect(planMajor).to.eq(returnData.majorName)
        // })
      })
    })
    //   it('导出订单', () => {
    //     // cy.wait(3000)
    //     waitIntercept(interceptQueryData, () => {
    //       expandSearchConditions()
    //       searchPlan(returnData.planName)
    //     }, () => {
    //       waitRequest({
    //         intercept: interceptViewOrder,
    //         onBefore: () => {
    //           findOrderButton('查看订单').should('exist').click({
    //             force: true
    //           })
    //         },
    //         onSuccess: () => {
    //           clickListener(() => {
    //             cy.get('[aria-label="查看订单信息"]').findByText('导出订单').should('exist').click({
    //               force: true
    //             })
    //           }, 6000)
    //         }
    //       })
    //     })
    //   })
    
  })
  // context('实验室管理', () => {
  //   it('重置上报', () => {
  //     searchPlan('订单验证2')
  //     findOrderButton('实验室管理').click({
  //       force: true
  //     })
  //     cy.get('.el-table__body').eq(4).find('.el-table__row').first().findByText('重置上报').click({
  //       force: true
  //     })
  //     waitRequest({
  //       intercept: interceptResetReport,
  //       onBefore: () => {
  //         cy.get('.el-popconfirm__action').findByText('确定').click({
  //           force: true
  //         })
  //       },
  //       onSuccess: () => {
  //         validSuccessMessage()
  //         withinDialog(clickOkInDialog, '实验室管理')
  //       }
  //     })
  //   })
  // })
  context('删除测试数据', () => {
    it('删除数据', () => {
      const planName = '自动化订单'
      cy.task('executeEqaSql',`delete from plan where name LIKE "%${planName}%"`)
    })
  })
})