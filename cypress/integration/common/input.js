/**
 * 
 * @param {*} title 标题
 * @param {*} context 内容
 */
export function setInput(title, context) {
  getInput(title)
    .clear({
      force: true
    })
    .type(context, {
      force: true
    })
}
export function setTextarea(title, context) {
  getTextarea(title)
    .clear({
      force: true
    })
    .type(context, {
      force: true
    })
}
export function getTextarea(title) {
  return cy.get('.el-form-item__label')
    .contains(title)
    .next()
    .find('textarea')
    .should('exist')
}
export function focusInput(title) {
  getInput(title).click({
    force: true
  })
}
export function clearInput(title) {
  getInput(title).clear({
    force: true
  })
}
export function getInput(title) {
  return cy.get('.el-form-item__label')
    .contains(title)
    .next()
    .find('input')
    .should('exist')
}