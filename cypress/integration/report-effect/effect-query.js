
import dayjs from 'dayjs'
import '@testing-library/cypress/add-commands'
import { findTableLineCell } from '../common/table'
import { interceptAll } from '../common/http'

export const BUTTON_EXCEL = '导出Excel'

export const BUTTON_PDF = '导出PDF'

export const clickSearch = () => {
  cy.get('.ql-search__btns button').contains('搜索').click({
    force: true
  })
}
export const inputSearch = (text, placeholder = '实验室名称或编码') => {
  const $input = cy.get('.effect__search').findByPlaceholderText(placeholder)

  $input.clear()
  if (text) {
    $input.type(text)
  }
}

/**
 * 选择第一个管理机构
 */
export const selectFirstCcl = () => {
  cy.get('.ql-search__header .el-form-item')
    .eq(4)
    .findByPlaceholderText('请选择管理机构')
    .click({
      force: true
    })

  cy.get('.stats-search-dept:visible')
    .should('exist')
    .find('.el-checkbox')
    .eq(0)
    .click({
      force: true
    })
}
export const clickHeaderCell = (text) => {
  cy.get('.table-line thead tr')
    .eq(0)
    .findByText(text)
    .click({
      force: true
    })
}
export const checkRadio = (index) => {
  cy.get('.ql-search__header .el-form-item')
    .eq(index)
    .find('[type="radio"]')
    .click({
      force: true
    })
}

/**
 * 打开省下拉
 */
export const openProvince = () => {
  cy.get('.select-region')
    .find('.el-select')
    .eq(0)
    .click({
      force: true
    })
}

/**
 * 点击表格右上角 按钮
 * @param {*} text 
 */
export const clickTool = (text) => {
  cy.get('.print-tool-bar')
    .findByText(text)
    .should('be.visible')
    .click({
      force: true
    })
}

/**
 * 打开标签下拉选择
 */
export const openTagSelect = () => {
  cy.get('.ql-search__header .el-form-item')
    .eq(5)
    .find('.el-select')
    .click({
      force: true
    })
}
export const checkDisplayFields = (headerTexts, cb) => {
  clickTool('显示字段')  
  headerTexts.forEach((text, index) => {
    cy.log(`index: ${index}, text: ${text}`)
    cy.get('.print-tool__columns')
      .find('li')
      .eq(index)
      .find('.el-checkbox')
      .click({
        force: true
      })
    if (typeof cb === 'function') {
      if (index === headerTexts.length - 1) {
        cy.get('.table-line tbody tr:first td').should('not.exist')
      } else {
        cb(text, index)
      }
    }
  })
}

/**
 * 是否默认选中管理机构
 */
export const validCclChecked = () => {
  cy.get('.ql-search__header')
    .find('.el-form-item')
    .eq(1)
    .find('.is-checked')
    .should('exist')
}

/**
 * 验证打印
 */
export const validPrint = () => {
  cy.get('.print-tool').findByText('打印').should('exist')

  cy.setCssMedia('print')

  cy.get('.print-title').eq(0).should('have.css', 'padding-left', '0px')

  cy.setCssMedia('screen')
}

/**
 * 验证第一行的单元格文本
 * @param {number} columnIndex 列索引
 * @param {string} columnText 列文本
 * @param {number} rowIndex 行索引
 */
export const validCellText = (columnIndex, columnText, rowIndex = 0) => {
  cy.get('.table-line tbody tr')
    .eq(rowIndex)
    .find('td')
    .eq(columnIndex)
    .should('have.text', columnText)
}

/**
 * 验证表格行数
 * @param {*} length 
 */
export const validRowsLength = (length) => {
  return cy.get('.table-line tbody tr')
    .should('have.length', length)
}

/**
 * 验证管理机构下拉是否至少选中一个
 */
export function validCclSelect () {
  cy.get('.ql-search__header .el-form-item')
    .eq(4)
    .find('.el-select .el-tag')
    .should('exist')
}

/**
 * 验证月度为上个月
 */
export function validMonthRange () {
  cy.get('.ql-search__header')
    .findByText('月度')
    .should('exist')
    .next()
    .within(() => {
      const month = dayjs().subtract(1, 'month').format('YYYY'+'年'+'MM'+'月')
      cy.findByPlaceholderText('起始时间').should('have.value', month)
      cy.findByPlaceholderText('结束时间').should('have.value', month)
    })
}

/**
 * 验证显示字段，对数据大的页面，只验证首个
 */
export function validFirstDisplayField () {
  let headText
  clickTool('显示字段')
  const toggleFirstCheck = (cb) => {
    cy.get('.print-tool__columns')
      .find('li')
      .eq(0)
      .find('.el-checkbox')
      .within($el => {
        cb && cb($el.find('.el-checkbox__label').text())
        cy.get('[type="checkbox"]').eq(0).click({
          force: true
        })
      })
  }
  
  toggleFirstCheck(text => {
    headText = text
  })
    
  cy.get('.table-line thead')
    .find('tr:first')
    .find('th:first .cell', { timeout: 10000 })
    .should('not.contain.text', headText)

  toggleFirstCheck()
}

/**
 * 点击验证表头类排序
 * @param {number} colIndex 
 * @param {'descending' | 'ascending'} sortCls 
 */
export function clickTableColumnSort (colIndex, sortCls) {
  cy.get('.table-main thead th')
    .eq(colIndex)
    .find(`.${sortCls}`)
    .click({
      force: true
    })

  cy.get('.table-main thead th')
    .eq(colIndex)
    .should('have.class', sortCls)
}

/**
 * 验证表头类排序
 * @param {number} colIndex 
 * @param {'descending' | 'ascending'} sortCls 
 */
export function validTableColumnSort (colIndex, sortCls) {
  const findText = (rowIndex, cb) => {
    findTableLineCell(rowIndex, colIndex).then($el => {
      cb(Number($el.text()))
    })
  }
  clickTableColumnSort(colIndex, sortCls)
  findText(0, val1 => {
    findText(1, val2 => {
      if (sortCls === 'descending') {
        expect(val1, '第一行的消息数大等于第二行').to.gte(val2)
      } else {
        expect(val1, '第一行的消息数小等于第二行').to.lte(val2)
      }
    })
  })
}

export const queryMgrTree = () => {
  return interceptAll('service/mgr/ccl/trees', queryMgrTree.name)
}