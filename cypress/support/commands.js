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
import '@testing-library/cypress/add-commands'
import { MGR_EQA_URL } from '../shared/constants'
import { visitPage } from '../shared/route'
import 'cypress-file-upload'
import { activeSelect, closeClientAlert, loginLab, loginMgr } from '../shared/util'

Cypress.Commands.add('loginCQB', () => {
  loginMgr('admin')
})

Cypress.Commands.add('visitPage', (pathname) => {
  loginMgr('admin', () => {
    visitPage(pathname)
  })
})

Cypress.Commands.add('QPYLT_user_login', () => {
  loginMgr('QPYLT')
})
Cypress.Commands.add('gdfslj_user_login', () => {
  loginMgr('gdfslj')
})

// 切换内嵌页面方法
Cypress.Commands.add('getIframe', () => {
  const getIframeBody = () => {
    //尝试获取 iframe > document > body
    // 直到body element 为空
    return cy
      .get('iframe').its('0.contentDocument.body').should('not.be.empty')
      // 包装body DOM元素以允许链接更多Cypress 命令, 如 ".find(...)"
      // warp命令使用文档地址 https://on.cypress.io/wrap
      .then(cy.wrap)

  }
  getIframeBody()
})

// 访问EQA界面方法
Cypress.Commands.add('visitEQA', () => {
  const visit = () => {
    cy.visit(MGR_EQA_URL)
    cy.get('.el-button.el-button--default.el-button--small').first().click()
  }
  visit()
})
//比较接口返回响应状态码
Cypress.Commands.add('compare', (xhr, expectCode) => {
  let responseCode = xhr.response.statusCode
  if (expectCode == null || expectCode == '') { // 默认200
    let expectCode = 200
    expect(responseCode).to.eq(expectCode)
  } else {
    expect(responseCode).to.eq(expectCode)
  }
})

// EQA比对计划组织筛选条件返回数据
Cypress.Commands.add('eqaSearch', (xhr) => {
  let getData = xhr.response.body.data.total
  if (getData == 0) {
    cy.getIframe().find('body').should('contain', '暂无数据')
  } else if (getData > 20) {
    cy.getIframe().find('.el-pagination__total').should('have.text', '共 ' + getData + ' 条')
  } else {
    cy.getIframe().find('.el-table__body').first().find('.el-table__row').should('have.length', getData)
  }
})

// 不建议用，直接用 activeSelect 即可
Cypress.Commands.add('elSelectActive', (text) => {
  activeSelect(text)
})

Cypress.Commands.add('setCssMedia', (media) => {
  cy.log(`Setting CSS media to ${media}`)
  Cypress.automation('remote:debugger:protocol', {
    command: 'Emulation.setEmulatedMedia',
    params: {
      media
    }
  })
})

Cypress.Commands.add('readPdf', (filename) => {
  cy.log(`read pdf ${filename}`)
  return cy.task('readPdf', filename)
})

Cypress.Commands.add('readExcel', (filename) => {
  cy.log(`read excel ${filename}`)
  return cy.task('readExcel', filename)
})

Cypress.Commands.add('deleteFolder', (folder) => {
  cy.log(`delete folder ${folder}`)
  return cy.task('deleteFolder', folder)
})

//点击按钮
Cypress.Commands.add('clickButton',(text)=>{
  cy.get('button',{timeout:10000}).contains(text).click({
    force:true
  })
})


// 下载文件
// require('cypress-downloadfile/lib/downloadFileCommand')

// // 上传文件
// import 'cypress-file-upload';



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

Cypress.Commands.add('loginLabCQB', () => {
  loginLab('labCQB')
})


Cypress.Commands.add('loginLockLabCQB', () => {
  loginLab('lockLabCQB')
})


Cypress.Commands.add('loginCQBDept', () => {
  loginMgr('addCQB')
})


Cypress.Commands.add('loginEditCQB', () => {
  loginMgr('editCQB')
})

let LOCAL_STORAGE_MEMORY = {}

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key]
  })
})

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
})


// If the type command calls the click command, then we have a problem with a promise
// inside a promise. So instead, we'll prevent clicking by always calling focus first.
// https://github.com/cypress-io/cypress/blob/e2e454262bf461f31e947da9f9fdc0a8fa23baf8/packages/driver/src/cy/commands/actions/type.coffee#L348
// Cypress.Commands.overwrite("type", (originalFn, subject, ...args) => {
//   cy.wrap(subject)
//     .focus()
//     .then(() => originalFn(subject, ...args))
//     .wrap(subject)
// })

// // Clear calls type inside of and if we don't override it outself, we have another
// // promise in a promise issue. So we'll just manually clear it ourselves
// // https://github.com/cypress-io/cypress/blob/e2e454262bf461f31e947da9f9fdc0a8fa23baf8/packages/driver/src/cy/commands/actions/type.coffee#L414
// Cypress.Commands.overwrite("clear", (originalFn, subject, ...args) => {
//   cy.wrap(subject).type("{selectall}{del}", {
//     force: true
//   })
// })

// // Wait for animations before and after clicking.
// // https://github.com/cypress-io/cypress/issues/3838
// Cypress.Commands.overwrite("click", (originalFn, subject, ...args) => {
//   cy.wait(200)
//     .then(() => originalFn(subject, ...args))
//     .wait(200)
//     .wrap(subject)
// })