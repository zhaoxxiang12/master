const defaultOptions = {
  method: 'get',
  url: '',
  alias: '',
  baseUrl: '/cqb-base-mgr'
}

/**
 * 断言 http
 * @param {defaultOptions} options 
 * @returns 
 */
export function interceptHttp (options) {
  options = Object.assign({}, defaultOptions, options)
  const alias = options.alias + Date.now()
  cy.log(`[intercept] ${alias}`)
  cy.intercept({
    method: options.method.toUpperCase(),
    url: `${options.baseUrl}/${options.url}`
  }).as(alias)
  return `@${alias}`
}

/**
 * 断言 所有 请求
 * @param {string} path 请求路径
 * @param {string} alias 
 * @param {string} basePath 
 * @returns alias
 */
export function interceptAll (path, alias, basePath = '/cqb-base-mgr') {
  return interceptHttp({
    method: '*',
    url: path,
    baseUrl: basePath,
    alias
  })
}

/**
 * 断言 POST 请求
 * @param {string} path 请求路径
 * @param {string} alias 
 * @param {string} basePath 
 * @returns alias
 */
export function interceptPost (path, alias, basePath = '/cqb-base-mgr') {
  return interceptHttp({
    method: 'post',
    url: path,
    baseUrl: basePath,
    alias
  })
}

/**
 * 断言 GET 请求
 * @param {string} path 请求路径
 * @param {string} alias 
 * @param {string} basePath 
 * @returns alias
 */
export function interceptGet (path, alias, basePath = '/cqb-base-mgr') {
  return interceptHttp({
    method: 'get',
    url: path,
    baseUrl: basePath,
    alias
  })
}

/**
 * 断言 DELETE 请求
 * @param {string} path 请求路径
 * @param {string} alias 
 * @param {string} basePath 
 * @returns alias
 */
export function interceptDelete (path, alias, basePath = '/cqb-base-mgr') {
  return interceptHttp({
    method: 'DELETE',
    url: path,
    baseUrl: basePath,
    alias
  })
}

/**
 * 断言 PUT 请求
 * @param {string} path 请求路径
 * @param {string} alias 
 * @param {string} basePath 
 * @returns alias
 */
export function interceptPut (path, alias, basePath = '/cqb-base-mgr') {
  return interceptHttp({
    method: 'put',
    url: path,
    baseUrl: basePath,
    alias
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
    onSuccess: afterWait
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
      aliasName = `@interceptAlias${Date.now()}`
    }
  }
  if (typeof options.onBefore === 'function') {
    options.onBefore()
  }

  cy.wait(aliasName, options.waitOptions || {}).then(data => {
    if (data.response.statusCode === 200 && (data.response.body.status === 0 || data.response.body.code === 'SUCCESS')) {
      options.onSuccess && options.onSuccess(data.response.body.data, data.request)
    } else {
      options.onError && options.onError(data.response.body.msg)
      if (data.response.statusCode === 500 && options.errorLevel !== 'info') {
        throw new Error(data.response.body && data.response.body.msg)
      }
    }
  })
}