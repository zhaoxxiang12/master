import {
  visitPage
} from '../../shared/route'
import {
  activeDateDay,
  activeDateMonth
} from '../common/date'
import { clickOkInDialog, withinDialog } from '../common/dialog'
import {
  interceptAll,
  interceptGet,
  waitIntercept
} from '../common/http'
import {
  closeClientAlert,
  validSuccessMessage
} from '../common/message'
import {
  activeSelect
} from '../common/select'
import {
  expandSearchConditions
} from '../eqa/eqa-order/eqa-order'
import { getDialog } from '../message/message'
import {
  elform, findLabel
} from '../mutual-result/mutual-item'
import {
  reportElformClickDay
} from './report-iqc'

/**
 * 
 * @param {string} startTime 月度范围开始时间 
 * @param {string} endTime  月度范围结束时间
 * @param {number} month 报告合格有效期
 * @param {string} validDate 报告有效期
 * @param {boolean} editModel 
 */
export const generateCertReport = (startTime, endTime, month, validDate, editModel) => { //生成互认报告以及证书
  if (editModel == true) {
    cy.get('.el-form').last().find('.el-button.ql-dlgrm__tpl-item.el-button--medium').last().click({
      force: true
    })
  } else {
    cy.clickButton('生成互认报告')
    cy.get('button').contains('生成报告').should('be.exist')
    cy.get('.el-form').last().find('.el-button.ql-dlgrm__tpl-item.el-button--medium').first().click({
      force: true
    })
  }
  //月度范围
  getDialog('生成报告').within(() => {
    //室内质控CV%考核周期
    findLabel('室内质控CV%考核周期').first().click({
      force:true
    })
    cy.wait(1000)
    activeDateMonth(startTime)
    findLabel('室内质控CV%考核周期').last().click({
      force:true
    })
    cy.wait(1000)
    activeDateMonth(endTime)
    //室间质评EQA考核周期
    findLabel('室间质评EQA考核周期').first().click({
      force:true
    })
    cy.wait(1000)
    activeDateMonth(startTime)
    findLabel('室间质评EQA考核周期').last().click({
      force:true
    })
    cy.wait(1000)
    activeDateMonth(endTime)
    //质量管理标准考核周期
    findLabel('质量管理标准考核周期').first().click({
      force:true
    })
    cy.wait(1000)
    activeDateMonth(startTime)
    findLabel('质量管理标准考核周期').last().click({
      force:true
    })
    cy.wait(1000)
    activeDateMonth(endTime)
     //报告合格有效期限
    elform('validTime').click({
      force:true
    })
    cy.wait(1000)
    activeSelect(month)
    //报告有效期
    elform('validDateUntil').click()
    activeDateDay(validDate)
  })
  waitIntercept(interceptCheckCertReport, () => {
    withinDialog(clickOkInDialog,'生成报告')
  },() => {
    validSuccessMessage() 
  })
}

const interceptCheckCertReport = () => {
  return interceptAll('service/mgr/mutualRecogReport/check?*',interceptCheckCertReport.name)
}

export const visitCert = (labCode, monthString) => {
  visitPage('cert-year')
  cy.wait(1000)
  closeClientAlert()
  expandSearchConditions('高级搜索')
  elform('keyword').clear().type(labCode)
  reportElformClickDay('创建时间', '开始时间')
  activeDateDay(monthString)
  cy.wait(2000)
  reportElformClickDay('创建时间', '结束时间')
  activeDateDay(monthString)
}

export const interceptPushCert = () => {
  return interceptAll('service/mgr/mutualRecogReport/pushStatus', interceptPushCert.name)
}

export const interceptQueryCert = () => {
  return interceptAll('service/mgr/mutualRecogReport?*', interceptQueryCert.name)
}

export const interceptQueryLabCert = () => {
  return interceptAll('service/base/recogReport?*', interceptQueryLabCert.name, '/cqb-base')
}

export const labCertOption = (index, btnsText) => {
  return cy.get('.el-table__body:visible .el-table__row').eq(index).findAllByText(btnsText)
}

export const interceptViewSummaryReport = () => {
  return interceptAll('service/base/recogReport/previewRecogReport/*', interceptViewSummaryReport.name, '/cqb-base')
}

export const interceptViewCert = () => {
  return interceptAll('service/base/recogReport/previewRecogCertificate/*', interceptViewCert.name, '/cqb-base')
}