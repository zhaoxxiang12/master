import { clickButton } from '../common/button'
import { focusInput } from '../common/input'
import { validExcelFile } from '../common/file'
import { activeSelect } from '../common/select'
import { withinDialog, closeTips } from '../common/dialog'
import { clickListener } from '../common/event'
import { ifDomExist } from '../common/dom'
import { interceptAll, waitIntercept } from '../common/http'
/**
 * 设置日期
 * @param {*} first
 * @param {*} second
 * @param {*} context
 */
export function setRangeDate(first, second, context) {
  cy.document()
    .its('body')
    .find('.el-date-range-picker__content:visible')
    .eq(first)
    .find('tbody tr')
    .eq(second)
    .find('td')
    .contains(context)
    .click({
      force: true
    })
}

const queryLessonPlan = () => {
  return interceptAll('service/edu/plan/query', queryLessonPlan.name)
}

/**
 * 
 * @param {number} planId 计划Id
 * @returns 
 */
const queryLessonGroup = (planId) => {
  return interceptAll(`service/edu/plan/${planId}/lesson-group`, queryLessonGroup.name)
}

/**每月用户学习统计表
 * 导出Excel表
 */
export function exportLessonReport() {
  cy.wait(1000)
  clickListener(() => clickButton('导出Excel表'))
  // validExcelFile('每月用户学习统计表.xlsx', data => {
  //   console.log(data)
  // })
}
/**每月用户学习统计表
 * 导入Excel表
 */
export function importLessonReport() {
  cy.wait(1000)
  clickButton('导入Excel表')
  cy.get('[type=file]').last().attachFile('每月用户学习统计表.xlsx')
}

/**
 * 学员授权管理
 */
export function authManage() {
  cy.wait(1000)
  focusInput('管理单位')
  cy.get('.tree-dept .el-tree').contains('佛山市临床').click({
    force: true
  })
  clickButton('搜索')
}
/**每月课程信息反馈表
 * 导出Excel表
 */
export function exportLessonInfo() {
  cy.wait(1000)
  cy.get('.el-tabs__item.is-top').contains('每月课程信息反馈表').click({
    force: true
  })
  clickListener(() => clickButton('导出Excel表'))
  // validExcelFile('每月课程信息反馈表*.xlsx', data => {
  //   console.log(data)
  // })
}

/**每月课程信息反馈表
 * 导入CSV表
 */
export function importCSV() {
  cy.wait(1000)
  cy.get('.el-tabs__item.is-top').contains('每月课程信息反馈表').click({
    force: true
  })
  cy.wait(2000)
  // withinDialog(() => {
    waitIntercept(queryLessonPlan, () => {
      clickButton('导入CSV表')  
    }, data => {
      if (data.length) {
        withinDialog(() => {
          focusInput('课程计划')
          waitIntercept(queryLessonGroup(data[0].planId), () => {
            activeSelect(data[0].planName)    
          }, group => {
            focusInput('课程组合名称')
            if (group.length) {
              activeSelect(group[0].lessonGroupName)
              clickButton('点击上传CSV文件')
              cy.get('[type=file]').last().attachFile('每月-课程信息反馈-个人.csv')
              clickButton('确定')  
            }
          })
        }, '导入CSV表')
      }
    })
}

/**每月课程信息反馈表
 * 批量删除
 */
export function batchDelete() {
  cy.wait(1000)
  cy.get('.el-tabs__item.is-top').contains('每月课程信息反馈表').click({
    force: true
  })
  cy.get('.el-table .el-table__body-wrapper tbody tr td').first().each($el => {
    $el.find('.el-checkbox').click()
  })
  clickButton('批量删除')
  ifDomExist('[aria-label="删除提示"] .el-message-box__btns button', '删除', 'click')
}
/**课程信息反馈汇总表
 * 导出Excel表
 */
export function exportLessonSum() {
  cy.wait(1000)
  cy.get('.el-tabs__item.is-top').contains('课程信息反馈汇总表').click({
    force: true
  })
  clickListener(() => clickButton('导出Excel表'))
  // validExcelFile('课程信息反馈汇总表*.xlsx', data => {
  //   console.log(data)
  // })
}
/**课程信息反馈汇总表
 * 导入Excel表
 */
export function importLessonSum() {
  cy.wait(1000)
  cy.get('.el-tabs__item.is-top').contains('课程信息反馈汇总表').click({
    force: true
  })
  clickButton('导入Excel表')
  cy.get('[type=file]').last().attachFile('课程信息反馈汇总表.xlsx')
}

export const interceptQueryLessonGroup = () => {
  return interceptAll('service/edu/group/page?*',interceptQueryLessonGroup.name)
}