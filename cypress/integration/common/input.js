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
export function setInputRange(title, start, end) {
  getInputParent(title)
    .find('.el-input')
    .first()
    .find('input')
    .should('exist')
    .clear({
      force: true
    })
    .type(start, {
      force: true
    })
  getInputParent(title)
    .find('.el-input')
    .eq(1)
    .find('input')
    .should('exist')
    .clear({
      force: true
    })
    .type(end, {
      force: true
    })
}
export function getInputParent (title) {
  return cy.get('.el-form-item__label')
    .contains(title)
    .next()
    .should('exist')
}
export function clearInputRange (title) {
  getInputParent(title)
    .find('.el-input')
    .first()
    .find('input')
    .should('exist')
    .clear({
      force: true
    })
  getInputParent(title)
    .find('.el-input')
    .eq(1)
    .find('input')
    .should('exist')
    .clear({
      force: true
    })
}