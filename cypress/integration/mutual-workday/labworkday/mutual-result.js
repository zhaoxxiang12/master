import {
  activeDateMonth
} from "../../common/date"
import { closeTips, confirmDelete } from "../../common/dialog"
import {
  interceptAll
} from "../../common/http"
import { validSuccessMessage } from "../../common/message"
import {
  expandSearchConditions
} from "../../eqa/eqa-order/eqa-order"
import {
  elform
} from "../../mutual-result/mutual-item"
import {
  clickSearch
} from "../../setting/report-monitor/report-monitor"

export const interceptQueryItem = () => {
  return interceptAll('service/base/item?*', interceptQueryItem.name + new Date ().getTime(), '/cqb-base')
}

export const interceptSaveItem = () => {
  return interceptAll('service/base/item/setStatus', interceptSaveItem.name, '/cqb-base')
}

export const interceptApplyWorkDay = () => {
  return interceptAll('service/base/item/workDays/adds', interceptApplyWorkDay.name, '/cqb-base')
}

/**
 * 
 * @param {string} month 月份如：01月
 * @param {string} workdayName 计划申请\特殊申请
 * @param {number} Days 申请天数
 */
export const applyWorkDay = (month, workdayName, Days) => {
  elform('workDays').parents('.check-workday').contains(month).parents('.check-workday__content')
    .find('.check-workday__input-wrapper')
    .contains(workdayName)
    .next('.el-input__inner')
    .clear()
    .type(Days)
}

/**
 * 
 * @param {string} month 月份 如10月
 */
export const selectMonth = (month) => {
  elform('workDays').parents('.check-workday').contains(month).parents('.check-workday__header')
    .find('[type=checkbox]')
    .check({
      force: true
    })
}

export const interceptApplyMsg = () => {
  return interceptAll('service/base/message/site/page?*', interceptApplyMsg.name + new Date().getTime(), '/cqb-base')
}

export const queryAduitWorkDay = () => {
  return interceptAll('service/base/item/all',queryAduitWorkDay.name + new Date().getTime(),  '/cqb-base')
}
/** 
 * @param {string} month 月份
 * @param {string} workdayName 计划申请或者特殊申请
 * @param {string} statusText 文本
 * @param {string} rgbColor 字体颜色
 */
export const assertText = (month, workdayName, statusText, rgbColor) => {
  selectMonth(month)
  cy.wait(1000)
  getApplyType(month, workdayName)
    .next('.el-tag.el-tag--mini.el-tag--light')
    .should('have.text', statusText).and('have.css', 'color', rgbColor)
  if (statusText === '通过') {
    getApplyType(month, workdayName).should('have.class','is-disabled')
  } else {
    getApplyType(month, workdayName).should('not.have.class','is-disabled')
  }
}

/**
 * 
 * @param {string} month 月份
 * @param {string} workdayName 计划申请或者特殊申请
 * @returns 
 */
export const getApplyType = (month, workdayName) => {
  return elform('workDays').parents('.check-workday').contains(month).parents('.check-workday__header')
    .next('.check-workday__input-wrapper')
    .contains(workdayName)
    .parent()
}

/**
 * 
 * @param {string} labCode 实验室编码
 * @param {string} itemName 互认项目名称
 * @param {string} monthString 如2021年五月,2021-5
 */
export const loginMgrSearch = (labCode, itemName, monthString) => {
  cy.visitPage('mutual-workday')
  expandSearchConditions()
  elform('labName')
    .clear()
    .type(labCode)
  if (itemName) {
    elform('itemName')
      .clear()
      .type(itemName)
  }
  cy.get('.el-form').last().findByPlaceholderText('开始时间').click()
  cy.wait(500)
  activeDateMonth(monthString)
  cy.get('.el-form').last().findByPlaceholderText('结束时间').click()
  cy.wait(500)
  activeDateMonth(monthString)
  clickSearch()
  cy.wait(1000)
}

export const clickButton = (text) => {
  cy.get('.el-table__body').last().find('.el-table__row').first()
    .findByText(text)
    .click({
      force: true
    })
}

export const checkData = (queryData) => {
 const workDayItem = queryData.map(item => {
    if (item.workDays.length > 0) {
      return item
    }
  }).filter(empty => empty)
  const filterItem = []
  workDayItem.forEach(work => {
    work.workDays = work.workDays.filter(item => item.month === 202110 && item.audit === 1)
    if (work.workDays.length) {
      filterItem.push(work)
    }
  })
  const applyData = filterItem.filter(item => item.workDays.length === 2)
  return applyData
}

/**
 * 
 * @param {*} applyData 接口返回的数据
 * @param {string} month 月份 如：10月
 * @param {string} applyType 申请类型
 */
export const checkApplyItem = (applyData,month,applyType) => {
  return applyData.map(item => item.workDays.reduce((prev, current) => {
    if (prev.reapplyed ^ current.reapplyed) {
      cy.get('.el-footer').findByText('选择本实验室所有项目').parents('.el-checkbox').find('[type=checkbox]').check({
        force: true
      })
      cy.get('.el-footer').findByText('批量申请').click({
        force: true
      })
      cy.wait(1000)
      selectMonth(month)
      applyWorkDay(month, applyType, 15)
      return item.itemName
    } 
  })) 
}

/**
 * 
 * @param {string} itemName 搜索的项目名称
 * @param {string} monthString 月份，如2021十月
 * @param {string} buttonText 按键名称:批量审核通过/批量审核不通过
 */
export const auditMany = (itemName,monthString,buttonText) => {
  loginMgrSearch('gd18020', itemName, monthString)
  cy.get('.has-gutter').find('[type=checkbox]').check('', {
    force: true
  })
  if (buttonText === '批量审核通过') {
    cy.get('.ql-search__tools-top.is-left').findByText('批量审核通过').click({
      force: true
    })
    closeTips('提示', '通过')
  } else {
    cy.get('.ql-search__tools-top.is-left').findByText('批量审核不通过').click({
      force: true
    })
    confirmDelete()
  }
  validSuccessMessage()
  cy.wait(1000)
}