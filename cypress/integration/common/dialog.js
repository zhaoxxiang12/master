

/**
 * 关闭弹框
 * @param {*} delay
 * @param {*} cls
 */
export function closeDialog(delay, cls) {
  cy.wait(delay || 50)
  cy.get(`.ql-search .ql-dialog ${cls} .el-dialog__header .el-dialog__headerbtn`)
    .first()
    .should('exist')
}
/**
 * 弹框内操作
 * @param {function} cb 
 * @param {string} title 指定弹框标题，有弹框嵌套弹框时使用
 */
export const withinDialog = (cb, title = '') => {
  if (title) {
    cy.document()
      .its('body')
      .find(`.el-dialog[aria-label="${title}"]`)
      .within(cb)
  } else {
    cy.get('.el-dialog__wrapper:visible')
      .within(cb)
  }
}

export const clickOkInDialog = () => {
  cy.get('.el-dialog__footer')
    .last()
    .find('.el-button')
    .last()
    .click({
      force: true
    })
}
export function clickDialogBtn(cls, text) {
  cy.get(`.ql-search .ql-dialog ${cls} .el-dialog__footer`)
    // .first()
    .find('button')
    .contains(text)
    .should('exist')
}
export const clickCancelInDialog = () => {
  cy.get('.el-dialog__footer')
    .last()
    .find('button')
    .first()
    .click({
      force: true
    })
}
/**
 * @param {string} prop 弹窗名
 * @param {string} text 文本
 */
export function closeTips(prop,text) {
  cy.get(`[aria-label="${prop}"] .el-message-box__btns button`)
    .contains(text)
    .should('exist')
    .click({
      force: true
    })
}
/*
* 二次确认框
*/
export function confirmDelete() {
  cy.document()
    .its('body')
    .find('.el-message-box__btns')
    .find('button')
    .last()
    .click()
}

/**
 * 气泡式二次确认框
 */
export function okOnPopConfirm () {
  cy.document()
    .its('body')
    .find('.el-popover:visible')
    .find('.el-popconfirm__action')
    .find('.el-button:last')
    .click(({
      force: true
    }))
}