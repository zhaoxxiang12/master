/**
 * 验证基础表格
 * @param {array} data 
 * @param {string} el 容器元素
 */
export function validTable (data, el = '.ql-search') {
  cy.get(el).within(() => {
    if (data.length) {
      cy.get('.el-table__body-wrapper tbody tr')
        .should('have.length', data.length)
    } else {
      cy.get('.el-table__empty-text')
        .should('exist')
    }
  })
}

/**
 * 获取 el-table 单元格
 * @param {*} rowIndex 行索引
 * @param {*} colIndex 列索引
 * @returns 
 */
export const findTableCell = (rowIndex, colIndex) => {
  return cy.get('.el-table__body-wrapper tbody tr')
    .eq(rowIndex)
    .find('td')
    .eq(colIndex)
}

/**
 * 获取三线表单元格
 * @param {*} rowIndex 行索引
 * @param {*} colIndex 列索引
 * @returns 
 */
export const findTableLineCell = (rowIndex, colIndex) => {
  return cy.get('.table-line tbody tr')
    .eq(rowIndex)
    .find('td')
    .eq(colIndex)
}

/**
 * 验证某行里某单元格
 * @param {*} colIndex 
 * @param {*} text 
 */
export function validRowCellText (colIndex, text) {
  cy.get('td').eq(colIndex).should('have.text', text + '')
}