/**
 * 二次确认推送报告
 */
export function confirmPushReport() {
  cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--primary').click()
}

export function clickButton(text) {
  cy.get('button')
    .contains(text)
    .should('exist')
    .click({
      force: true
    })
}
export function uploadImage(cls, url) {
  cy.get(`${cls} .el-upload.el-upload--picture-card`)
    .should('exist')
    .click({
      force: true
    })
  cy.get('input[type=\'file\']')
    .should('exist')
    .attachFile(url)
}
export function openEdit() {
  cy.get('.el-table .el-table__fixed-right .el-table__fixed-body-wrapper tbody tr button')
    .contains('编辑')
    .should('exist')
    .click({
      force: true
    })
}

export const dialogButton = (prop) => {
  return elformOperation(prop).find('button')
}

export const elformOperation = (prop) => {
  return cy.get('.el-form')
  .last()
  .find(`[for="${prop}"]`)
  .next('.el-form-item__content')
}