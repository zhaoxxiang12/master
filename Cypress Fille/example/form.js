// 表单相关操作示例
context('质控品管理', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/qc-mgr')
    cy.wait(1000)
  })

  it('添加质控品', () => {
    // 给质控品信息添加随机数避免重复
    let num = Math.ceil(Math.random() * 10000)
    cy.get('.ql-search__tools-top button').contains('添加').click()
    cy.get('[aria-label="添加质控品"] input').eq(0).type('质控品名称' + num)
    cy.get('[aria-label="添加质控品"] input').eq(2).type('lot' + num)
    cy.get('[aria-label="添加质控品"] input').eq(3).type('prod' + num)
    // 由于组件的下拉框是模拟的，不是使用select，因此需要通过点击操作
    cy.get('[aria-label="添加质控品"] input').eq(6).click()
    // 下拉菜单是在body下生成的
    cy.get('body>.el-select-dropdown li').eq(0).click()
    cy.get('[aria-label="添加质控品"] input').eq(7).type('厂商' + num)
    cy.get('[aria-label="添加质控品"] .el-dialog__footer button').contains('保存').click()
    // 没有错误提示
    cy.get('.el-form-item__error').should('have.length', 0)
    // 提示成功添加
    cy.get('.el-message--success').contains('已添加质控品')
  })

})
