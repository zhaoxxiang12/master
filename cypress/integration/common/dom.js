import { confirmDelete } from "./dialog"

/**
 * 判断元素是否存在
 * @param {*} selector
 * @param {*} text
 * @param {*} event
 */
export function ifDomExist(selector, text, event) {
  cy.window()
    .document()
    .its('body').then($el => {
      console.log($el.find(selector))
      let that = $el.find(selector)
      if (that.length > 0) {
        confirmDelete()
      }
    })
}