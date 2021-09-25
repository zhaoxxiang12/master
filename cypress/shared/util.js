import qs from 'qs'
import { LAB_LOGIN_URL, LS_AUTH, MGR_LOGIN_URL } from "./constants"
const path = require('path')
export function isLogin () {
  return window.localStorage.getItem(LS_AUTH)
}

/**
 * 设置是否登录
 * @param {boolean} signIn 
 */
export function setLogin (signIn = true) {
  window.localStorage.setItem(LS_AUTH, signIn)
}

/**
 * 退出日常监控大屏
 * 由于监控大屏会有接口轮询，登录后需要关闭监控大屏，否则后续用例界面访问会等待超时
 */
export function closeDailyScreen () {
  cy.get('.ql-splitview__top').trigger('mouseover', {
    force: true
  })
  cy.get('.ql-splitview__close').click({
    force: true
  })
}

/**
 * 关闭是否安装客户端的提示
 */
export function closeClientAlert () {
  cy.get('.el-message-box__wrapper')
    .within($el => {
      if ($el.length) {
        cy.findByText('关闭')
          .click({
            force: true
          })
      }
    })
}

/**
 * 获取请求地址参数
 * @param {string} url 
 * @returns object
 */
export function getUrlQuery (url) {
  const querystring = url.split('?')[1]
  return qs.parse(querystring)
}

/**
 * 登录CQB管理端
 * @param {string} featureName features 的文件名
 */
export function loginMgr (featureName, cb) {
  // if (isLogin()) {
  //   cb && cb()
  //   return false
  // }
  cy.visit(MGR_LOGIN_URL)
  // 请求一个消息数接口判断是否登录
  cy.request({
    url: 'cqb-base-mgr/service/mgr/messages/mgrCount?status=1',
    failOnStatusCode: false
  }).then(result => {
    if (result.status === 401 || result.body.status === -100) {
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
        
        const submitLogin = interceptAll('service/system/mgr/login', `login-${featureName}`)
        
        waitIntercept(submitLogin, () => {
          // 点击登录按钮
          cy.get('[type="submit"]').click({
            force: true
          })
        }, data => {
          setLogin()
          closeDailyScreen()
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
 * @param {string} fixture 
 */
export function loginLab (fixture) {
  cy.visit(LAB_LOGIN_URL)
  // 使用fixtures里的账号文件配置作为登录用户信息
  cy.fixture(fixture).then((lockLabCQBJSON) => {
    let alertButton = 0
    // 关闭登录界面弹窗提示
    cy.get('.el-button.el-button--default.el-button--small').eq(alertButton).click({
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
  })
}

/**
 * 捕获到网络请求，成功返回请求内容
 * @param {function|string} intercept 请求断言, 如是函数需返回 alias
 * @param {function} beforeWait wait之前要执行的
 * @param {Function(data, request)} afterWait wait之后要执行的
 * @example
 * const query = () => {
 *   const alias = 'query'
 *   cy.intercept('/cqb-base-mgr/service/mgr/reportsummary/cvPass?*').as(alias)
 *   return alias
 * }
 * // 需搜索，再查询的
 * waitIntercept(query, () => {
 *   // 如点击搜索才查询的
 * }, (data) => {
 *  // after wait
 * })
 * 
 * // wait 后回调
 * waitIntercept(query, () => {
 *   // after wait
 * })
 */
export function waitIntercept (intercept, beforeWait, afterWait) {
  if (afterWait === void 0) {
    afterWait = beforeWait
    beforeWait = null
  }
  return waitRequest({
    intercept,
    onBefore: beforeWait,
    onSuccess: afterWait,
    onError: afterWait
  })
}

/**
 * 捕获网络请求，可设置更多参数, 如 waitOptions
 * @param {WaitRequestOptions} options 
 */
export function waitRequest (options) {
  let aliasName = options.intercept
  if (typeof options.intercept === 'function') {
    aliasName = options.intercept()

    if (typeof aliasName !== 'string') {
      aliasName = `interceptAlias${Date.now()}`
    }
  }
  if (typeof options.onBefore === 'function') {
    options.onBefore()
  }

  cy.wait(`@${aliasName}`, options.waitOptions || {}).then(data => {
    if (data.response.statusCode === 200 && (data.response.body.status === 0 || data.response.body.code === 'SUCCESS')) {
      options.onSuccess(data.response.body.data, data.request)
    } else {
      options.onError(data.response.statusCode)
    }
  })
}

/**
 * 断言请求, 请求方法，默认所有
 * @param {string} path 请求路径
 * @param {string} alias 
 * @returns {string} alias
 */
export function interceptAll (path, alias) {
  cy.intercept(`/cqb-base-mgr/${path}`).as(alias)
  return alias
}

/**
 * 断言 POST 请求
 * @param {string} path 请求路径
 * @param {string} alias 
 * @returns alias
 */
 export function interceptPost (path, alias) {
  cy.intercept({
    method: 'POST',
    url: `/cqb-base-mgr/${path}`
  }).as(alias)
  return alias
}

/**
 * 下拉选中
 * @param {*} text 选中的文本
 */
export function activeSelect (text) {
  cy.get('.el-select-dropdown:visible', { timeout: 6000 })
    .find('.el-select-dropdown__item')
    .not('.selected')
    .find('span')
    .contains(text)
    .should('exist')
    .click({
      force: true
    })
}

/**
 * 点击事件监听，
 * 下载文件时，会出现 wait new page load 一直卡住的情况。
 * 暂时把下载文件的用例放最后执行，2s 后刷新页面
 * @param {function} cb 
 * @param {number} timeout 
 */
export function clickListener (cb, timeout = 2000) {
  cy.window().document().then(function (doc) {
    doc.addEventListener('click', () => {
      setTimeout(function() { 
        doc.location.reload()
        closeClientAlert()
      }, timeout)
    })
    cb()
  })
}

function getDownloadFolder () {
  return Cypress.config('downloadsFolder')
}

/**
 * 获取下载的文件路径
 * @param {string} filename 
 * @returns 
 */
export const getDownloadFile = (filename) => {
  const downloadsFolder = getDownloadFolder()
  const downloadedFilename = path.join(downloadsFolder, filename)
  console.log('reading file %s', downloadedFilename)
  return downloadedFilename
}

/**
 * 验证下载的 pdf 文件
 * @param {string} filename 文件名
 * @param {function({numpages:number, text: string})} cb 
 * @param {number} timeout
 */
export const validatePdfFile = (filename, cb, timeout = 4000) => {
  const downloadedFilename = getDownloadFile(filename)

  cy.readFile(downloadedFilename, { timeout }).then(() => {
    cy.readPdf(downloadedFilename).then(data => {
      cb(data)
      cy.deleteFolder(getDownloadFolder())
    })
  })
}

/**
 * 验证下载的 excel 文件
 * @param {string} filename 文件名
 * @param {function(any[])} cb 
 */
export const validExcelFile = (filename, cb) => {
  cy.readExcel(getDownloadFile(filename)).then(data => {
    expect(data).to.be.an('array')
    cb(data)
    cy.deleteFolder(getDownloadFolder())
  })
}

/* 
* 二次确认框
*/
export function confirmDelete(){
 cy.get('.el-message-box__btns').find('button').last().click()
}

/**
 * 后面补 0
 * @param {*} val 当前值
 * @param {*} count 有效位数
 */
 function endZeroPad (val, count = 4) {
  val = val.toString().replace('-', '')
  let len = val.length
  let maxLen = count + 1
  if (len <= maxLen) {
    return val
  }
  return val.padEnd(maxLen, '0')
}

/**
 * 格式有效位数
 * @param {*} val 值
 * @param {*} count 有效位数，默认 4 位
 */
export function formatPrecision (val, count = 4) {
  let numVal = Number(val)
  if (isNaN(numVal) || val === '' || val === null) {
    return val
  }
  const maxLen = count + 1
  let isInt = Number.isInteger(numVal)
  let isNegative = numVal < 0
  let symbol = isNegative ? '-' : ''
  let absVal = endZeroPad(val, count)
  let len = absVal.length
  let result = absVal
  if (isInt) {
    if (len <= count) {
      result = absVal
    }
  } else {
    let valList = absVal.split('.')
    let intVal = valList[0]
    let intLen = intVal.length
    if (len <= maxLen) {
      result = absVal
    } else {
      if (intLen < count) {
        let floatCount = count - intLen
        result = Math.fround(absVal).toFixed(floatCount)
      } else {
        result = Math.round(absVal)
      }
    }
  }
  return `${symbol}${result}`
}

/**
 * 
 * @param {string} prop 参数名 
 * @param {string} text 输入框值 如果为空就是清空
 * @param {function} cb 
 */
export function elformInput (prop, text, cb){
 const $input = cy.get('.el-form')
   .last()
   .find(`[for="${prop}"]`)
   .next('.el-form-item__content')
   .find('.el-input__inner')

 $input.clear()
 
 if (text) {
   $input.type(text)
 }
 if (typeof cb === 'function') {
   cb()
 }
}


/**
 * 二次确认推送报告
 */
 export function pushReport() {
  cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--primary').click()
}

/**
 * 断言事件成功是否出现弹窗
 */
export function validSuccessMessage () {
  cy.get('.el-message__content').should('be.exist')
}

/**
 * 激活选中月份
 * @param {string} monthString 如2021年五月
 */
export function activeDateMonth (monthString) {
  const YEAR_TEXT = '年'
  const [year, month] = monthString.split(YEAR_TEXT)

  cy.get('.el-picker-panel:visible')
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
const defaultMonthRangeOptions = {
  el: '.ql-search__header',
  label: '月度',
  startMonth: '2020-05',
  endMonth: '2020-05'
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