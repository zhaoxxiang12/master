/**
 * 找到对应的节点
 * @param {*} label
 * @param {*} text
 * @returns
 */
export const findTreeNode = (label, text) => {
  return cy.get(`[for="${label}"]`)
    .next()
    .find('.el-tree .tree-resource-node')
    .contains(text)
}
/**
 * 展开子节点
 * @param {*} label
 * @param {*} text
 * @returns
 */
export const expandChildTree = (label, text) => {
  return findTreeNode(label, text)
    .parent()
    .parent()
    .find('.el-tree-node__expand-icon')
    .should('exist')
    .click({
      force: true
    })
}