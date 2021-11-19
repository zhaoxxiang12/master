import {
  Indep_LOGIN_URL,
  LAB_LOGIN_URL,
  MGR_APP_URL,
  MGR_BASE_URL,
  MGR_LOGIN_URL
} from '../../shared/constants'
import { visitIframePage } from '../../shared/route'
import {
  interceptPost,
  waitIntercept
} from './http'
import {
  closeClientAlert
} from './message'
import {
  closeDailyScreen
} from './screen'

/**
 * 登录CQB管理端
 * @param {string} featureName features 的文件名
 */
export function loginMgr(featureName, cb) {
  cy.visit(MGR_LOGIN_URL)
  const userInfo = localStorage.getItem('cqbMgr__userInfo')
  let sameAccount = false
  if (userInfo) {
    const data = JSON.parse(userInfo)
    sameAccount = data.value.cclCode === featureName
  }
  // 请求一个消息数接口判断是否登录
  cy.request({
    url: 'cqb-base-mgr/service/mgr/messages/mgrCount?status=1',
    failOnStatusCode: false
  }).then(result => {
    if (result.status === 401 || result.body.status === -100 || !sameAccount) {
      // 使用fixtures里的账号文件配置作为登录用户信息
      cy.fixture(featureName).then((adminJSON) => {
        closeClientAlert()

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

        const submitLogin = interceptPost('service/system/mgr/login', `login-${featureName}`)

        waitIntercept(submitLogin, () => {
          // 点击登录按钮
          cy.get('[type="submit"]').click({
            force: true
          })
        }, data => {
          if (data.permissions.includes('mgr:data:nationalScreen')) {
            closeDailyScreen()
          }
          
          cb && cb()
        })
      })
    } else {
      cb && cb()
    }
  })

}
/**
 * 登录实验室端
 * @param {string} fixture 对应登录账户的json文件
 * @param {function} cb
 */
export function loginLab(fixture, cb) {
  cy.visit(LAB_LOGIN_URL)
  // 使用fixtures里的账号文件配置作为登录用户信息
  cy.fixture(fixture).then((lockLabCQBJSON) => {
    // 关闭登录界面弹窗提示
    cy.get('.el-button.el-button--default.el-button--small').eq(0).click({
      force: true
    })
    // 使用fixtures里的账号文件配置作为登录用户信息
    cy.get('[placeholder="实验室编码"]')
      .type(lockLabCQBJSON.username, {
        force: true
      }).should('have.value', lockLabCQBJSON.username)
    cy.get('[placeholder="密码"]')
      .type(lockLabCQBJSON.password, {
        force: true
      }).should('have.value', lockLabCQBJSON.password)
    cy.get('[placeholder="验证码"]')
      .type(lockLabCQBJSON.captcha, {
        force: true
      }).should('have.value', lockLabCQBJSON.captcha)
    cy.intercept({
      method: 'POST',
      url: '/base/login'
    }).as('login')
    // 点击登录按钮
    cy.get('[type="submit"]').click({
      force: true
    })
    cb && cb()
  })
}

export function LoginIndep (fixture,cb)  {
  cy.visit(Indep_LOGIN_URL)
  cy.fixture(fixture).then((adminJSON) => {
    cy.get('[placeholder="用户名"]')
      .type(adminJSON.username, {
        force:true
      }).should('have.value', adminJSON.username)
    cy.get('[placeholder="密码"]')
      .type(adminJSON.password, {
        force:true
      }).should('have.value', adminJSON.password)
    cy.get('[placeholder="验证码"]')
      .type(adminJSON.captcha, {
        force: true
      }).should('have.value', adminJSON.captcha)
    cy.intercept({
      method: 'POST',
      url: 'http://mgr-cqb.test.sh-weiyi.com/biz-support-be/service/system/base/login'
    }).as('login')
    // 点击登录按钮
    cy.get('[type="submit"]').click({
      force: true
    })
    cy.wait('@login').then(data => {
      console.log(data)
      expect(data.response.statusCode).to.eq(200)
    })
    cb && cb()
  })
}

export function verifyMessageLab(fixture) {
  cy.visit(LAB_LOGIN_URL)
  cy.fixture(fixture).then((verifyMessageLabJSON) => {
    let alertButton = 0
    // 关闭登录界面弹窗提示
    cy.get('.el-button.el-button--default.el-button--small').eq(alertButton).click({
      force: true
    })
    // 使用fixtures里的账号文件配置作为登录用户信息
    cy.get('[placeholder="实验室编码"]')
      .type(verifyMessageLabJSON.username, {
        force: true
      }).should('have.value', verifyMessageLabJSON.username)
    cy.get('[placeholder="密码"]')
      .type(verifyMessageLabJSON.password, {
        force: true
      }).should('have.value', verifyMessageLabJSON.password)
    cy.get('[placeholder="验证码"]')
      .type(verifyMessageLabJSON.captcha, {
        force: true
      }).should('have.value', verifyMessageLabJSON.captcha)
  })
}

/**
 * 用 gdccl 帐号登录并访问指定页面
 * @param {PageAlias} pageAlias 
 * @param {'gdfslj' | 'admin'} feature json文件名
 * @param {function} cb 
 */
export function loginMgrWithGdccl(pageAlias, feature = 'gdfslj', cb) {
  cy.request({
    url: 'cqb-base-mgr/service/system/mgr/logout',
    method: 'POST',
    failOnStatusCode: false
  }).then(() => {
    cy.visitPage(pageAlias, feature)
    cb && cb()
  })
  
}


/**
 * 用 gdccl 帐号登录EQA并访问指定页面
 * @param {PageAlias} pageAlias 
 * @param {'gdfslj' | 'admin'} feature json文件名
 * @param {function} cb 
 */
export function loginIframeWithFeature (pageAlias, feature, cb) {
  cy.request({
    url: `${MGR_BASE_URL}/cqb-base-mgr/service/system/mgr/logout`,
    method: 'POST',
    failOnStatusCode: false
  }).then(() => {
    visitIframePage(pageAlias, feature)
    cb && cb()
  })
  
}