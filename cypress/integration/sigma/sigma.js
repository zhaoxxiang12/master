import { interceptAll } from "../common/http"
import { activeSelect } from "../common/select"
import { elform } from "../mutual-result/mutual-item"
/**
 * 
 * @param {string} itemSpec 项目分类 
 * @param {String} mutualItem 互认项目 关键字
 * @param {string} TEaSource Tea来源中的下拉框的值
 */
export const SigmaCondition = (itemSpec,mutualItem,TEaSource) => {
  if (itemSpec) {
    elform('typeId').click()
    cy.wait(2000)
    activeSelect(itemSpec)
  }
  if (mutualItem) {
    elform('itemName')
    .clear()
    .type(mutualItem)
  }
  if (TEaSource) {
    elform('teaSourceId').click()
    cy.wait(1000)
    activeSelect(TEaSource)
  }
}
/**
 * 
 * @param {string} tabValue tab页名称
 */
export const selectTab = (tabValue) => {
  if (tabValue === 'Sigma值计算') {
    cy.get('#tab-stats').click()
    cy.wait(1000)
  } else if (tabValue === 'Sigma数据分析') {
    cy.get('#tab-measure').click()
    cy.wait(1000)
  } else if (tabValue === '性能报告') {
    cy.get('#tab-report').click()
    cy.wait(1000)
  } else {
    cy.get('#tab-param').click()
    cy.wait(1000)
  }
}
/**
 * 清除下拉框的数据
 */
export const clearDropListValue = () => {
  cy.get('.el-select__caret.el-input__icon.el-icon-circle-close')
    .click()
}

export const interceptSigma = () => {
  return interceptAll('service/base/sigma/tea',interceptSigma.name,'/cqb-base')
}

export const validQuerySigma = () => {
  
}