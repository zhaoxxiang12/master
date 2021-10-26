import {
  interceptAll,
  waitRequest
} from '../common/http'
import {
  activeSelect
} from '../common/select'

/**
 * @param {string} item 互认项目
 * @param {string} keyword 关键字(实验室名称或者编码)
 * @param {string} applyTyp 申请类型 
 * @param {string} status 审核状态
 * @param {string} organization 质控主管单位
 */
export const searchData = (item, keyword, applyType, status,organization) => {
  if (item) {
    getInputBox('itemName').type(item)
  }
  if (keyword) {
    getInputBox('labName').type(keyword)
  }
  if (applyType) {
    cy.get('.el-form').last().findAllByPlaceholderText('请选择').first().click()
    activeSelect(applyType)

  }
  if (status) {
    cy.get('.el-form').last().findAllByPlaceholderText('请选择').last().click()
    activeSelect(status)
  }
  if (organization) {
    cy.get('.el-form').first().findAllByPlaceholderText('请选择').last().click()
    activeSelect(organization)
  }
}

export const clickSearch = () => {
  cy.get('.el-form').last().findByText('搜索').click({
    force: true
  })
}

/**
 * @param {string} prop  
 * @returns 
 */
export const getInputBox = (prop) => {
  return cy.get('.el-form').last().find(`[for=${prop}]`).next('.el-form-item__content').find('.el-input__inner')
}

export const interceptQuery = () => {
  return interceptAll('service/mgr/item/workDays/page?*', interceptQuery.name + new Date().getTime())
}

export const clickReset = () => {
  cy.get('.el-form').last().findByText('重置').click({
    force: true
  })
}

/**
 * @param {string} itemName 项目名字
 * @param {*} labCode 实验室编码
 * @param {string} applyType 申请类型
 * @param {string} status 审核状态
 */
export const assertions = (itemName, labCode, applyType, status) => {
  waitRequest({
    intercept: interceptQuery,
    onBefore: () => {
      clickSearch()
    },
    onSuccess: (data) => {
      const pageLength = data.data.length
      if (pageLength) {
        if (itemName) {
          data.data.forEach(item => expect(item.itemName).to.contain(itemName))
          for (let i = 0; i < pageLength; i++) {
            cy.get('.el-table__body .el-table__row').eq(i).find('.cell').eq(3).should('have.text', itemName)
          }
        }
        if (labCode) {
          data.data.forEach(item => expect(item.labCode).to.contain(labCode))
          for (let i = 0; i < pageLength; i++) {
            cy.get('.el-table__body .el-table__row').eq(i).find('.cell').eq(2).should('have.text', labCode)
          }
        }
        if (applyType) {
          if (applyType === '计划申请') {
            data.data.forEach(item => expect(item.reapplyed).to.eq(false))
          } else {
            data.data.forEach(item => expect(item.reapplyed).to.eq(true))
          }
          for (let i = 0; i < pageLength; i++) {
            cy.get('.el-table__body .el-table__row').eq(i).find('.cell').eq(6).should('contain', applyType)
          }
        }
        if (status) {
          if (status === '审核通过') {
            data.data.forEach(item => expect(item.audit).to.eq(1))
          } else if (status === '审核不通过') {
            data.data.forEach(item => expect(item.audit).to.eq(0))
          } else {
            data.data.forEach(item => expect(item.audit).to.eq(2))
          }
          for (let i = 0; i < pageLength; i++) {
            cy.get('.el-table__body .el-table__row').eq(i).find('.cell').eq(7).should('have.text', status)
          }
        }
      } else {
        cy.get('body').should('contain', '暂无数据')
      }
    }
  })
}