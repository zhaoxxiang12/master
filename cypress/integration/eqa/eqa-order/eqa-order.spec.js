/**
 * eqa订单信息
 */
import {
  visitIframePage
} from '../../../shared/route'
import {
  okOnPopConfirm
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
  searchPlan
} from '../eqa-plan/eqa-plan'
import { interceptQueryData } from '../eqa-plan/eqa-plan'
import {
  clickOrderButton,
  createPlan,
  expandSearchConditions,
  findOrderButton,
  interceptCreateOrder,
  queryJoinedLab,
  resetLabReport,
} from './eqa-order'

context('eqa订单信息', () => {
  before(() => {
    visitIframePage('eqa-plan')
    expandSearchConditions()
  })
  context('实验室管理', () => {
    it.only('重置上报', () => {
      cy.wait(3000)
      waitIntercept(interceptQueryData, () => {
        searchPlan()
      }, data => {
        if (data.total) {
          waitIntercept(queryJoinedLab, () => {
            findOrderButton('实验室管理').click({
              force: true
            })
          }, data => {
            if (data.length === 1) {
             resetLabReport(0)
            } else {
              resetLabReport(0)
            }
          })
        }
      })
    })
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
            cy.wait(3000)
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
      })
    })
    it('验证Excel数据', () => {
      let newTime = new Date()
      const year = newTime.getFullYear()
      const fileName = year + '年度佛山市临床检验质量控制中心' + returnData.planName + '第' + returnData.times + '次EQA订单信息.xlsx'
      validExcelFile(fileName, data => {
        const organization = data[0][1]
        const planName = data[1][1]
        const planYear = data[2][1]
        const planTimes = data[3][1]
        const planMajor = data[4][1]
        expect(organization).to.eq('佛山市临床检验质量控制中心')
        expect(planName).to.eq(returnData.planName)
        expect(planYear).to.eq(year)
        expect(planTimes).to.eq('第' + returnData.times + '次')
        expect(planMajor).to.eq(returnData.majorName)
      })
    })
  //   it('导出订单', () => {
  //     // cy.wait(3000)
  //     let queryPlanReq
  //     waitIntercept(interceptQueryData, () => {
  //       queryPlanReq = interceptViewOrder()
  //       expandSearchConditions()
  //       searchPlan(returnData.planName)
  //     }, () => {
  //       waitRequest({
  //         intercept: queryPlanReq,
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
  context('删除测试数据', () => {
    it('删除数据', () => {
      const planName = '自动化订单'
      cy.task('executeEqaSql',`delete from plan where name LIKE "%${planName}%"`)
    })
  })
})