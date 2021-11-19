import {
  clickOkInDialog,
  withinDialog
} from '../../common/dialog'
import {
  interceptAll
} from '../../common/http'
import {
  addEqaPlan,
  subimtInformation,
  searchPlan
} from '../eqa-plan/eqa-plan'

export const expandSearchConditions = () => {
  cy.get('.ql-search--simple.is-right:visible').first().within($el => {
    if ($el.css('display') === 'block') {
      cy.get('.el-form.el-form--inline').last().findByText('展开').click({
        force: true
      })
    }
  })
}

export const interceptCreateOrder = () => {
  return interceptAll('service/plan/order/add', interceptCreateOrder.name, '')
}
export const interceptViewOrder = () => {
  return interceptAll('service/plan/order/get?planId=*', interceptViewOrder.name, '')
}
export const interceptConfirmOrder = () => {
  return interceptAll('service/plan/order/confirm', interceptConfirmOrder.name, '')
}

/**
 * 
 * @param {string} text 按键文本
 * @param {string} title 弹窗名
 */
export const clickOrderButton = (text, title) => {
  findOrderButton(text).should('exist').click({
    force: true
  })
  cy.wait(500)
  withinDialog(clickOkInDialog, title)
}

/**
 * 
 * @param {string} text 按键名字 
 */
export const findOrderButton = (text) => {
  return cy.get('.el-table__body').first().find('.el-table__row').first().findByText(text)
}

export const createPlan = () => {
  const planName = '自动化订单' + parseInt(Math.random() * 100000)
  const planCompareCode = 'order' + parseInt(Math.random() * 100000)
  const majorName = '临床免疫学'
  const times = 6
  const issueTime = 1
  const issueEndTime = 2
  addEqaPlan({
    planName,
    planCompareCode,
    majorName,
    times,
    issueTime,
    issueEndTime
  })
  subimtInformation()
  searchPlan(planName)
  return {planName,majorName,times}
}

export const interceptResetReport = () =>{
  return interceptAll('service/plan/lab/reset',interceptResetReport.name,'')
}


