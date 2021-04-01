// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add("loginCQB", () => {
  cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/login')
  // 使用fixtures里的账号文件配置作为登录用户信息
  cy.fixture('admin').then((adminJSON) => {
    // 关闭登录界面弹窗提示
    cy.get('.el-message-box__btns button:first').click({
      force: true
    })
    // 使用fixtures里的账号文件配置作为登录用户信息
    cy.get('[placeholder="用户名"]')
      .type(adminJSON.username, {
        force: true
      }).should('have.value', adminJSON.username)
    cy.get('[placeholder="密码"]')
      .type(adminJSON.password, {
        force: true
      }).should('have.value', adminJSON.password)
    cy.get('[placeholder="验证码"]')
      .type(adminJSON.captcha, {
        force: true
      }).should('have.value', adminJSON.captcha)
    // 点击登录按钮
    cy.get('[type="submit"]').click({
      force: true
    })
    // 由于监控大屏会有接口轮询，登录后需要关闭监控大屏，否则后续用例界面访问会等待超时
    cy.get('.ql-splitview__top').trigger('mouseover', {
      force: true
    })
    cy.get('.ql-splitview__close').click({
      force: true
    })
  })
})
Cypress.Commands.add('QPYLT_user_login', () => {
  // cy.visit('http://cqb-mgr.gd.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/login')
  cy.fixture('QPYLT').then((QPYLTJSON) => {
    // 关闭登录界面弹窗提示
    cy.get('.el-message-box__btns button:first').click()
    // 使用fixtures里的账号文件配置作为登录用户信息
    cy.get('[placeholder="用户名"]')
      .type(QPYLTJSON.username).should('have.value', QPYLTJSON.username)
    cy.get('[placeholder="密码"]')
      .type(QPYLTJSON.password).should('have.value', QPYLTJSON.password)
    cy.get('[placeholder="验证码"]')
      .type(QPYLTJSON.captcha).should('have.value', QPYLTJSON.captcha)
    // 点击登录按钮
    cy.get('[type="submit"]').click()
    // 由于监控大屏会有接口轮询，登录后需要关闭监控大屏，否则后续用例界面访问会等待超时
    cy.get('.ql-splitview__top').trigger('mouseover')
    cy.get('.ql-splitview__close').click()
  })
})
Cypress.Commands.add('gdfslj_user_login', () => {
  // cy.visit('http://cqb-mgr.gd.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/login')
  cy.fixture('gdfslj').then((gdfsljJSON) => {
    // 关闭登录界面弹窗提示
    cy.get('.el-message-box__btns button:first').click()
    // 使用fixtures里的账号文件配置作为登录用户信息
    cy.get('[placeholder="用户名"]')
      .type(gdfsljJSON.username).should('have.value', gdfsljJSON.username)
    cy.get('[placeholder="密码"]')
      .type(gdfsljJSON.password).should('have.value', gdfsljJSON.password)
    cy.get('[placeholder="验证码"]')
      .type(gdfsljJSON.captcha).should('have.value', gdfsljJSON.captcha)
    // 点击登录按钮
    cy.get('[type="submit"]').click()
    // 由于监控大屏会有接口轮询，登录后需要关闭监控大屏，否则后续用例界面访问会等待超时
    cy.get('.ql-splitview__top').trigger('mouseover')
    cy.get('.ql-splitview__close').click()
  })
})
// 下载文件
require('cypress-downloadfile/lib/downloadFileCommand')



// Cypress.Commands.add('downloadFile', (url, dir, fileName, userAgent) => {
//     return cy.getCookies().then(cookies => {
//         return cy.task('downloadFile', {
//             url: url,
//             directory: dir,
//             cookies: cookies,
//             fileName: fileName,
//             userAgent: userAgent,
//         })
//     })
// })
Cypress.Cookies.defaults({
	preserve: 'shiroCookie',
})

let LOCAL_STORAGE_MEMORY = {};
Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});