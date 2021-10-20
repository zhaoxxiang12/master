import { closeClientAlert } from './message'

/**
 * 点击事件监听，
 * 下载文件时，会出现 wait new page load 一直卡住的情况。
 * 暂时把下载文件的用例放最后执行，4s 后刷新页面
 * @param {function} cb 
 * @param {number} timeout 
 */
export function clickListener (cb, timeout = 4000) {
  cy.window().document().then(function (doc) {
    const refresh = () => {
      console.log('add addEventListener refresh page.')
      setTimeout(function() {
        doc.location && doc.location.reload()
        closeClientAlert()
        // doc.removeEventListener('click', refresh)
      }, timeout)
    }
    doc.addEventListener('click', refresh)
    cb && cb()
  })
}