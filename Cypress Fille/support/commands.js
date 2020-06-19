// ***********************************************
// 自定义命令文档见：
// https://on.cypress.io/custom-commands
// ***********************************************

// 全局的登录命令，在其他测试文件里可以通过cy.loginCQB()来调用
Cypress.Commands.add("loginCQB", () => {
  cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/login')
  // 使用fixtures里的账号文件配置作为登录用户信息
  cy.fixture('admin').then((adminJSON) => {
    // 关闭登录界面弹窗提示
    cy.get('.el-message-box__btns button:first').click()
    // 使用fixtures里的账号文件配置作为登录用户信息
    cy.get('[placeholder="用户名"]')
      .type(adminJSON.username).should('have.value', adminJSON.username)
    cy.get('[placeholder="密码"]')
      .type(adminJSON.password).should('have.value', adminJSON.password)
    cy.get('[placeholder="验证码"]')
      .type(adminJSON.captcha).should('have.value', adminJSON.captcha)
    // 点击登录按钮
    cy.get('[type="submit"]').click()
    // 由于监控大屏会有接口轮询，登录后需要关闭监控大屏，否则后续用例界面访问会等待超时
    cy.get('.ql-splitview__top').trigger('mouseover')
    cy.get('.ql-splitview__close').click()
  })
})
