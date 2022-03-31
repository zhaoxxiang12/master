import { clickOkInDialog, withinDialog } from "../common/dialog";
import { getDialog } from "../message/message";

/**
 * 
 * @param {boolean} businessTag true 业务标签 false 系统标签
 * @param {string} tagName 标签名字
 * @param {number} getLength 数组长度
 */
export const addTag = (businessTag = true, tagName = '佛山', getLength) => {
  if (businessTag) {
    cy.get('button').contains('添加标签').first().click()
    cy.wait(500)
    cy.get('.el-tabs__item.is-left').contains('数据上报').click()
    cy.wait(3000)
    cy.get('.el-button.el-button--small').contains(tagName).click({
      force:true
    })
    getDialog('选择标签').within(() => {
      cy.get('button').contains('关闭').click({
        force:true
      })
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/lab/checkLabId?*').as('update')
    cy.get('button').contains('保存').click({
      force: true
    })
    cy.wait('@update').then((xhr) => {
      cy.compare(xhr)
      cy.get('.el-message.el-message--success').should('contain', '实验室已更新')
      cy.get('.el-table__row').first().find('.el-button.el-button--text.el-button--medium').first().contains('编辑').click({
        force: true
      })
    })
    cy.wait(2000)
    cy.get('.ql-select-tag__selected').first().find('.el-tag.el-tag--success').should('have.length', getLength + 1)
    clearTag(businessTag, getLength)
  } else {

    cy.findAllByText('添加标签').last().click()
    cy.wait(500)
    cy.get('.el-tabs__item.is-left').contains('数据上报').click()
    cy.wait(3000)
    cy.get('.el-button.el-button--small').contains(tagName).click({
      force:true
    })
    getDialog('选择标签').within(() => {
      cy.get('button').contains('关闭').click({
        force:true
      })
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/lab/checkLabId?*').as('update')
    cy.get('button').contains('保存').click({
      force: true
    })
    cy.wait('@update').then((xhr) => {
      cy.compare(xhr)
      cy.get('.el-message.el-message--success').should('contain', '实验室已更新')
      cy.get('.el-table__row').first().find('.el-button.el-button--text.el-button--medium').first().contains('编辑').click({
        force: true
      })
    })
    cy.wait(2000)
    cy.get('.ql-select-tag__selected').last().find('.el-tag.el-tag--success').should('have.length', getLength + 1)
    clearTag(businessTag, getLength)
  }
}

/**
 * 
 * @param {boolean} businessTag true 业务标签 false 系统标签
 * @param {number} getLength 数组长度
 */
export const clearTag = (businessTag = true ,getLength) => {
      //  -------------清除之前添加的标签-------------------
      if (businessTag) {
        cy.get('.ql-select-tag__selected').first().find('.el-tag__close.el-icon-close').last().click()
        cy.get('button').contains('保存').click({
          force: true
        })
        cy.wait(1000)
        //点击编辑
        cy.get('.el-table__row').first().find('.el-button.el-button--text.el-button--medium').first().click({
          force: true
        })
        cy.get('.ql-select-tag__selected').first().find('.el-tag.el-tag--success.el-tag--medium').should('have.length', getLength)
        //关闭窗口
        cy.get('.el-button.el-button--default.el-button--medium').last().click({
          force: true
        })
      } else {
        cy.get('.ql-select-tag__selected').last().find('.el-tag__close.el-icon-close').last().click()
        cy.get('button').contains('保存').click({
          force: true
        })
        cy.wait(1000)
        //点击编辑
        cy.get('.el-table__row').first().find('.el-button.el-button--text.el-button--medium').first().click({
          force: true
        })
        cy.get('.ql-select-tag__selected').first().find('.el-tag.el-tag--success.el-tag--medium').should('have.length', getLength)
        //关闭窗口
        cy.get('.el-button.el-button--default.el-button--medium').last().click({
          force: true
        })
      }      
}

export const validAccount = (accountName) => {
  cy.get('.ql-tag.el-tag.el-tag--medium').contains(accountName).click()
  cy.wait(1000)
  cy.get('.el-form').last().find('[for="systemName"]').next('.el-form-item__content')
    .findAllByPlaceholderText('请选择').should('be.disabled')
  withinDialog(clickOkInDialog,'设置关联帐号')
}