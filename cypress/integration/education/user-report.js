import { clickButton } from "../common/button"
import { interceptAll, waitIntercept } from "../common/http"

export const selectArea = (cls, text) => {
  cy.get(cls)
    .should('exist')
    .click({
      force: true
    })
  cy.get('body>.el-select-dropdown .el-select-dropdown__item')
    .contains(text)
    .should('exist')
    .click({
      force: true
    })
}

export const activeArea = () => {
  selectArea('[placeholder="请选择省"]', '上海市')
  selectArea('[placeholder="所有市"]', '市辖区')
  selectArea('[placeholder="所有区"]', '青浦区')
}

export const setLabNameOrCode = (code) => {
  cy.get('[placeholder="请输入实验室名称或编码"]')
    .should('exist')
    .clear({
      force: true
    })
    .type(code, {
      force: true
    })
}

export const setYear = (year) => {
  cy.get('[placeholder="起始年份"]')
    .should('exist')
    .click({
      force: true
    })
   cy.get('.el-input__icon.el-icon-circle-close').click({
     force:true
   })
   cy.get('[placeholder="起始年份"]')
   .should('exist')
   .click({
     force: true
   }) 
  cy.get('.el-picker-panel__content .el-year-table tbody tr')
    .first()
    .find('td')
    .contains(year)
    .should('exist')
    .click({
      force: true
    })
}

export const setPlanName = (planName) => {
  cy.get('.el-form-item__label')
    .contains('课程计划')
    .next()
    .find('.el-input__inner')
    .click({
      force: true
    })
  cy.get('body>.el-select-dropdown .el-select-dropdown__item')
    .should('exist')
    .contains(planName)
    .click({
      force: true
    })
}
 
export const interceptQueryPlan = () => {
  return interceptAll('service/edu/plan/query?*', interceptQueryPlan.name)
}

export const interceptQueryPlanData = () => {
  return interceptAll('service/edu/stat/exam/manage?*', interceptQueryPlanData.name)
}

/**
 * 
 * @param {function} intercept 拦截路由
 * @param {number} year 年份
 * @param {*} option 拦截路由后的操作
 * @param {boolean} 是否查询搜索条件的计划
 */
export const searchDataAfterOption = (intercept, year, option, queryPlan = true) => {
  waitIntercept(intercept, () => {
    setYear(year)
    if (queryPlan === false) {
      clickButton('搜索')
    }
  }, data => {
    if (queryPlan) {
      if (data) {
        console.log(123);
      }
    } else {
      console.log(54);
    }
      option() && option()
  })
}

