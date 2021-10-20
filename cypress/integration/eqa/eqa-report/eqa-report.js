import {
  interceptAll,
  waitRequest
} from "../../common/http"
import {
  clickSearch,
  searchConditions
} from "../../setting/report-monitor/report-monitor"
/**
 * 
 * @param {string} majorName 专业名
 * @param {number} year 年度
 * @param {string} planName 比对计划名称
 * @param {number} times 比对次数
 * @param {string } reportStatus 报告状态
 * @param {string} labName 实验室名称
 */
export const searchReportData = (majorName, year, planName, times, reportStatus, labName) => {
  if (majorName) {
    clickDropList('specTypeName')
    selectDropListValue(majorName)
  }
  if (year) {
    clickDropList('year')
    selectDropListValue(year)
  }
  if (planName) {
    typeWords('planName', planName)
  }
  if (times) {
    clickDropList('times')
    selectDropListValue(times)
  }
  if (reportStatus) {
    clickDropList('status')
    selectDropListValue(reportStatus)
  }
  if (labName) {
    typeWords('labName', labName)
  }
}

export const clickDropList = (prop) => {
  searchConditions(prop).find('.el-select.el-select--medium').click()
}

export const typeWords = (prop, word) => {
  searchConditions(prop).parent().find('.el-input__inner')
    .clear()
    .type(word, {
      force: true
    })
}

export const selectDropListValue = (value) => {
  cy.get('.el-scrollbar__view.el-select-dropdown__list:visible')
    .should('exist')
    .contains(value)
    .click({
      force: true
    })
}

export const interceptRegenerate = () => {
  return interceptAll('service/feedback/reGenerate?reportId=*', interceptRegenerate.name, '')
}

export const interceptQueryReport = () => {
  return interceptAll('service/feedback/search?*', interceptQueryReport.name, '')
}

export const interceptQueryMajor = () => {
  return interceptAll('service/plan/allSpecType/list?*', interceptQueryMajor.name, '')
}

export const interceptQueryYear = () => {
  return interceptAll('service/plan/allYear/list?*', interceptQueryYear.name, '')
}

export const interceptPush = () => {
  return interceptAll('service/feedback/push', interceptPush.name, '')
}

export const interceptCancelPush = () => {
  return interceptAll('service/feedback/cancelPush', interceptCancelPush.name, '')
}
/**
 * 
 * @param {string} majorName 专业名
 * @param {Number} year 年度
 * @param {string} planName 计划名称
 * @param {number} times 次数
 * @param {string} status 报告状态
 * @param {string} labName 实验室名称
 */
export const assertReport = (majorName, year, planName, times, status, labName) => {
  waitRequest({
    intercept: interceptQueryReport,
    onBefore: () => {
      clickSearch()
    },
    onSuccess: (data) => {
      let dataLength = data.records.length
      if (dataLength) {
        if (majorName) {
          if (dataLength >= 20) {
            cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total) + ' 条')
          }
          cy.get('.el-table__body').last().find('.el-table__row').should('have.length', dataLength)
          data.records.forEach(item => expect(item.specTypeName).to.eq(majorName))
        }
        if (year) {
          if (dataLength >= 20) {
            cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total) + ' 条')
          }
          cy.get('.el-table__body').last().find('.el-table__row').should('have.length', dataLength)
          data.records.forEach(item => expect(item.year).to.eq(year))
        }
        if (planName) {
          if (dataLength >= 20) {
            cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total) + ' 条')
          }
          cy.get('.el-table__body').last().find('.el-table__row').should('have.length', dataLength)
          data.records.forEach(item => expect(item.planName).to.eq(planName))
        }
        if (times) {
          if (dataLength >= 20) {
            cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total) + ' 条')
          }
          cy.get('.el-table__body').last().find('.el-table__row').should('have.length', dataLength)
          data.records.forEach(item => expect(item.times).to.eq(times))
        }
        if (status) {
          if (dataLength >= 20) {
            cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total) + ' 条')
          }
          if (status === '已推送') {
            cy.get('.el-table__body').last().find('.el-table__row').should('have.length', dataLength)
            data.records.forEach(item => expect(item.status).to.eq(2))
          }
          if (status === '待推送') {
            cy.get('.el-table__body').last().find('.el-table__row').should('have.length', dataLength)
            data.records.forEach(item => expect(item.status).to.eq(1))
          }
        }
        if (labName) {
          if (dataLength >= 20) {
            cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total) + ' 条')
          }
          cy.get('.el-table__body').last().find('.el-table__row').should('have.length', dataLength)
          data.records.forEach(item => expect(item.labName).to.eq(labName))
        }
      } else {
        cy.get('body').should('contain', '暂无数据')
      }
    }
  })
}
/**
 * 
 * @param {number} rowIndex 数据行
 */
export const clickRegerate = (rowIndex) => {
  cy.get('.el-table__body').last().find('.el-table__row').eq(rowIndex).findByText('重新生成').click({
    force: true
  })
}