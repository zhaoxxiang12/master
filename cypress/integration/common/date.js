const nzhcn = require('nzh/cn')

const defaultMonthRangeOptions = {
  el: '.ql-search__header',
  label: '月度',
  startMonth: '2020年五月',
  endMonth: '2020年五月'
}

/**
 * 获取年月
 * @param {string} monthString 如2021年五月,2021-5
 * @returns 
 */
const getYearMonth = (monthString) => {
  const YEAR_TEXT = '年'
  if (monthString.indexOf(YEAR_TEXT) > -1) {
    return monthString.split(YEAR_TEXT)
  }
  const match = monthString.match(/(\d{4})-(\d{1,2})/)
  return [match[1], getMonthZh(match[2])]
}
/**
 * 
 * @param {defaultMonthRangeOptions} options 
 */
export function selectDateMonthRange (options) {
  options = Object.assign({}, defaultMonthRangeOptions, options)
  
  const focusInput = (index) => {
    cy.get(options.el)
      .findByText(options.label)
      .next()
      .find('.el-date-editor')
      .eq(index)
      .find('[type="text"]')
      .click({
        force: true
      })
  }
  focusInput(0)
  activeDateMonth(options.startMonth)
  // 隐藏时有动画，加个延迟
  cy.wait(200)
  focusInput(1)
  activeDateMonth(options.endMonth)
}

/**
 * 激活选中月份
 * @param {string} monthString 如2021年五月,2021-5
 */
export function activeDateMonth (monthString) {
  const [year, month] = getYearMonth(monthString)
  
  cy.document()
    .its('body')
    .find('.el-picker-panel:visible')
    .should('exist')
    .within(() => {
      cy.get('.el-date-picker__header-label:visible')
        .should('exist')
        .click({
          force: true
        })

      cy.get('.el-year-table:visible')
        .should('exist')
        .findByText(year)
        .click({
          force: true
        })

      cy.get('.el-month-table:visible')
        .should('exist')
        .findByText(month)
        .click({
          force: true
        })  
    })
}

export function getMonthZh (month) {
  const index = Number(month)
  return nzhcn.encodeS(index) + '月'
}

/**
 * 选中日期到天
 * @param {string} stringDate 年月日:如2020/5/11
 */
export const activeDateDay = (stringDate) => {
  const yearMonthDate = stringDate.split('/')
  cy.document()
    .its('body')
    .find('.el-picker-panel:visible')
    .should('exist')
    .within(() => {
      //选择年份
      cy.get('.el-date-picker__header-label:visible').first()
        .should('exist')
        .click({
          force: true
        })
      cy.get('.el-year-table:visible')
        .should('exist')
        .findByText(yearMonthDate[0])
        .click({
          force: true
        })
      //选择月份
      cy.get('.el-month-table:visible')
        .should('exist')
        .findByText(getMonthZh(yearMonthDate[1]))
        .click({
          force: true
        }) 
      //选择日期
      cy.get('.el-date-table:visible')
        .should('exist')
        .find('.available')
        .contains(yearMonthDate[2])
        .click({
          force:true
        })
    })
}

/**
 * 选择年份
 * @param {*} year 选择对应的年份
 */
export const activeYear = (year) => {
  cy.document()
    .its('body')
    .find('.el-year-table')
    .should('exist')
    .within(() => {
      cy.get('.available:visible')
        .should('exist')
        .findByText(year)
        .click({
          force:true
        })
    })
}