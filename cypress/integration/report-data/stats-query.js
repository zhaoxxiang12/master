import {
  visitPage, visitScreen
} from '../../shared/route'
import { clickOkInDialog, withinDialog } from '../common/dialog'
import {
  interceptAll,
  interceptPost,
  waitIntercept
} from '../common/http'
import {
  closeDailyScreen
} from '../common/screen'

import {
  activeSelect
} from '../common/select'
import {
  getDialog
} from '../message/message'

export const specText = [
  '认可专业',
  '互认项目'
]
export const regionText = [
  '地区',
  '管理机构',
  '实验室标签'
]
export const shCclName = '青浦医联体'
export const specName = '全血细胞计数'
export const itemName = '钾'
export const queryYear = '2020'
export const startMonth = '五月'
export const reportMonth = 202005
export const tagName = '公立'
export const buttonPushScreen = '推送到大屏'
export const buttonPreview = '全屏预览'

/**
 * 切换质控主管单位
 * @param {*} text 
 */
export const changeCcl = (text) => {
  cy.get('.qc-dept__header .el-input__inner').click()
  cy.elSelectActive(text)
}

/**
 * 选中某个专业
 * @param {*} text 
 */
export const activeSomeSpec = (text) => {
  let existText = false
  cy.get('.stats-search .form-group-spec')
    .find('.el-select__tags')
    .parent()
    .within(($el) => {
      cy.get('.el-select__tags-text').each(($txt) => {
        if ($txt.text().includes(text)) {
          existText = true
        }
      })
      if (!existText) {
        cy.get('.el-input')
          .click({
            force: true
          })
      }
    }).then(() => {
      if (!existText) {
        activeSelect(text)
        cy.get('.el-select__tags-text').then((getLength) => {
          const length = getLength.length
          if (length > 1) {
            cy.get('.el-tag__close').first().click({
              force:true
            })
          }
        })
      }
    })
}

/**
 * 切换认可专业/互认项目的选中
 * @param {*} index 
 */
export const checkSpec = (index) => {
  cy.get('.stats-search .form-group-spec')
    .find('.el-form-item')
    .eq(index)
    .find('input')
    .click({
      force: true
    })
}

/**
 * 切换 地区/管理机构/实验室标签
 * @param {*} index 
 */
export const checkRegion = (index) => {
  cy.get('.form-group-region')
    .find('.el-form-item')
    .eq(index)
    .find('input')
    .click({
      force: true
    })
}

/**
 * 数据分析管理页面的查询
 * @param {*} intercept 
 * @param {*} cb 
 */
export const waitQueryIntercept = (intercept, cb) => {
  waitIntercept(intercept, () => {
    cy.get('button').contains('搜索').click({
      force: true
    })
  }, cb)
}

/**
 * 质控主管单位下拉列表请求
 * @param {string} alias 
 */
export function interceptCcl() {
  return interceptAll('service/mgr/ccl/allowedIqcAdminCcl', 'queryCcl')
}

/**
 * 认可专业下拉列表请求
 * @param {string} alias 
 */
export function interceptSpec() {
  return interceptAll('service/mgr/itemCategory/iqcCcl?*', 'querySpec')
}

/**
 * 推送到大屏, 用例放在最后面
 * @param {Function(title, screenData, request)} cb 
 * @param {Function} beforeWait 提交推送前
 */
export function pushToScreen(cb, beforeWait) {
  let date = new Date().toLocaleString()
  const title = `自动化测试推送的标题 ${date}`

  cy.get('.ql-search__tools-top')
    .contains(buttonPushScreen)
    .click({
      force: true
    })

  cy.get(`[aria-label="${buttonPushScreen}"] input`).eq(0).clear().type(title)
  cy.get('.screen-area tr').last().find('td').last().click({
    force: true
  })
  if (typeof beforeWait === 'function') {
    beforeWait()
  }
  waitIntercept(interceptPost('service/mgr/screen/details', 'submitPush'), () => {
    cy.wait(5000)
    withinDialog(clickOkInDialog, '推送到大屏')
    cy.wait(500)
    cy.get('body').within(($el) => {
      if ($el.find('.el-message-box__wrapper')) {
        cy.get('.el-message-box__btns button').contains('覆盖').click({
          force: true
        })
      }
    })
  }, (data, request) => {
    waitIntercept(interceptAll('service/mgr/screen/details', 'queryScreenDetails'), () => {
      visitScreen()
    }, screenData => {
      const lastScreen = screenData.pop()
      cb(title, lastScreen, request)
    })
  })
}