/**
 * 获取表单项内容元素
 * @param {string} prop 
 * @returns 
 */
export function findFormItemContent (prop) {
  return cy.get('.el-form')
    .last()
    .find(`[for="${prop}"]`)
    .next('.el-form-item__content')
}
/**
 * 表单文本框输入值
 * @param {string} prop 参数名 
 * @param {string} text 输入框值 如果为空就是清空
 * @param {function} cb
 */
export function elFormInput (prop, text, cb){
  const $input = findFormItemContent(prop).find('.el-input__inner')

  $input.clear()

  if (text) {
    $input.type(text)
  }
  if (typeof cb === 'function') {
    cb()
  }
}

/**
 * 验证表单项的出错提示信息
 * @param {string} text 
 */
export function validFormItemError (text) {
  cy.get('.el-form-item__error')
    .should('contain.text', text)
}