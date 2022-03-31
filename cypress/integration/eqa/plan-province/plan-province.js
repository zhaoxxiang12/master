import { interceptAll, waitIntercept } from "../../common/http"
import { activeSelect } from "../../common/select"
import { elform } from "../../mutual-result/mutual-item"
import { clickSearch } from "../../setting/report-monitor/report-monitor"
import { getLabForm } from "../../user-info/lab-info"

export const interceptGetYear = () => {
  return interceptAll('service/eqa/plan/allYear/list?*',interceptGetYear.name,'/cqb-base')
}

export const interceptSearchProvinceEqaPlan = () => {
  return interceptAll('service/eqa/plan/province/search?*',interceptSearchProvinceEqaPlan.name, '/cqb-base')
}

export const interceptQueryProvinceEqaTesting = () => {
  return interceptAll('service/eqa/plan/needContrast/get?*', interceptQueryProvinceEqaTesting.name, '/cqb-base')
}

export const interceptSaveProvinceCollectConfig = () => {
  return interceptAll('service/eqa/plan/direct/collectSetting/save', interceptSaveProvinceCollectConfig.name, '/cqb-base')
}

/**
 * 
 * @param {string} planNameKeyword 比对计划名称关键字
 * @param {number} year 年度
 * @param {number} time 次数
 * @param {Function} intercept 拦截路由函数
 */
export const labEqaSearch = (planNameKeyword, year, time, intercept) => {
  if (planNameKeyword) {
    cy.findAllByPlaceholderText('请输入比对计划名称关键字')
    .clear()
    .type(planNameKeyword)
    waitIntercept(intercept, () => {
      clickSearch()
    }, data => {
      if (data.length > 0) {
        data.map(responseData => expect(responseData.name).to.eq(planNameKeyword))
      }
      validSearchData(data)
    })
  }
  if (year) {
    elform('year').click()
    activeSelect(year)
    waitIntercept(intercept, () => {
      clickSearch()
    }, data => {
      if (data.length > 0) {
        data.map(responseData => expect(responseData.year).to.eq(year))
      }
      validSearchData(data)
    })
  
  }
  if (time) {
    elform('times').click()
    activeSelect(time)
    waitIntercept(intercept, () => {
      clickSearch()
    }, data => {
      if (data.length > 0) {
        data.map(responseData => expect(responseData.times).to.eq(time))
      }
      validSearchData(data)
    })
  }
}

export const validSearchData = (responseData) => {
  if (responseData.length === 0) {
    cy.get('.el-table__empty-text').should('have.text','暂无数据')
  } else {
    getLabForm().should('have.length', responseData.length)
  }
}