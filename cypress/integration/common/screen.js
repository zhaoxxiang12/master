/**
 * 退出日常监控大屏
 * 由于监控大屏会有接口轮询，登录后需要关闭监控大屏，否则后续用例界面访问会等待超时
 */
export function closeDailyScreen() {
  cy.get('.ql-splitview__top', { timeout: 6000 }).trigger('mouseover', {
    force: true
  })
  cy.get('.ql-splitview__close', { timeout: 6000 }).click({
    force: true
  })
}

/**
 * 关闭大屏监控内容配置
 */
export const closeScreen = () => {
  cy.get('.tool-icon.is-close').click({
    force: true
  })
}