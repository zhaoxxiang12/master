/**
 * 验证弹出的错误信息
 * @param {string}} text 
 */
export function validErrorMsg (text) {
  cy.get('.el-message--error')
    .find('.el-message__content')
    .should('have.text', text)
}

/**
 * 断言事件成功是否出现弹窗
 */
export function validSuccessMessage () {
  cy.document()
    .its('body')
    .find('.el-message__content').should('be.exist')
}

/**
 * 关闭是否安装客户端的提示
 */
export function closeClientAlert () {
  cy.document()
    .its('body', {
      timeout: 5000
    }).then($el => {
      if ($el.find('.el-message-box__wrapper:visible').length > 0) {
        cy.get('.el-message-box__wrapper')
          .within($el => {
            if ($el.length) {
              cy.findByText('关闭')
                .click({
                  force: true
                })
            }
          })
      }
    })
 
}