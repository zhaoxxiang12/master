// 登录界面示例
context('登录界面', () => {
  before(() => {
    // 访问登录界面
    cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/login')
    // 关闭提示框
    cy.get('.el-message-box__btns button:first').click()
    // 使用fixtures里的账号文件配置作为登录用户信息
    cy.fixture('admin').then((adminJSON) => {

      cy.get('[placeholder="用户名"]')
        .type(adminJSON.username).should('have.value', adminJSON.username)
      cy.get('[placeholder="密码"]')
        .type(adminJSON.password).should('have.value', adminJSON.password)
      cy.get('[placeholder="验证码"]')
        .type(adminJSON.captcha).should('have.value', adminJSON.captcha)

      cy.get('[type="submit"]').click()
    })
  })


  it('登录成功跳转大屏', () => {
    cy.hash().should('eq', '#/monitor/national-screen')
  })

  it('登录信息不全时错误提示', () => {
    // 访问登录界面
    cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/login')
    // 关闭提示框
    cy.get('.el-message-box__btns button:first').click()
    cy.get('[type="submit"]').click()
    // 未输入用户名时应该显示错误提示
    cy.get('.el-form-item__error').contains('请输入用户名')
    // 未输入密码时应该显示错误提示
    cy.get('.el-form-item__error').contains('请输入密码')
    // 未输入验证码时应该显示错误提示
    cy.get('.el-form-item__error').contains('请输入验证码')
  })

})
