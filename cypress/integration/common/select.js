/**
 * 下拉选中
 * @param {*} text 选中的文本
 */
export function activeSelect (text) {
  cy.document()
    .its('body')
    .find('.el-select-dropdown:visible', { timeout: 6000 })
    .find('.el-select-dropdown__item')
    // .not('.selected')
    // .find('span')
    .contains(text)
    .should('exist')
    .click({
      force: true
    })
  // 关闭 popper 时，有动画，
  cy.wait(500)  
}