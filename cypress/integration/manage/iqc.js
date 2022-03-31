import { clickButton } from "../common/button"
import { closeTips, confirmDelete } from "../common/dialog"
import { interceptAll, waitIntercept, waitRequest } from "../common/http"
import { validSuccessMessage } from "../common/message"
import { activeSelect } from "../common/select"
import { elform } from "../mutual-result/mutual-item"
import { clickSearch } from "../setting/report-monitor/report-monitor"
import {  validData } from "./cert-year"

const interceptQueryIqcReport = () => {
  return interceptAll('service/mgr/iqc/month/new-page?areaId*', interceptQueryIqcReport.name)
}

export const interceptQueryLab = () => {
  return interceptAll('service/mgr/lab/pageWithRole?*', interceptQueryLab.name)
}

export const interceptPreviewIqc = (path) => {
  return interceptAll(`service/system/file/preview/${path}`, interceptPreviewIqc.name)
}

const interceptPushIqc = () => {
  return interceptAll('service/mgr/iqc/month/push?*', interceptPushIqc.name)
}

const interceptBatchPushIqc = () => {
  return interceptAll('service/mgr/iqc/month/batchPush', interceptBatchPushIqc.name)
}

/**
 * 
 * @param {string} text label标签名
 * @param {string} timeText 输入框名字
 */
export const findLabelTime = (text, timeText) => {
  cy.get('.el-form:visible')
  .find('label')
  .contains(text)
  .parent()
  .find(`[placeholder="${timeText}"]`)
  .click({
    force:true
  })
}

/**
 * 
 * @param {boolean} pushAll 是否是批量推送 默认不是批量推送
 * @param {string} buttonText 按键名称
 * @param {boolean} cancelPush 是否取消推送 默认不是
 */
export const pushIqcData = (pushAll = false, buttonText, cancelPush = false) => {
  waitIntercept(interceptQueryIqcReport, () => {
    clickSearch()
  }, data => {
    if (pushAll === false) {
      if (cancelPush === false) {
        if (data.total) {
          const rowIndex = data.data.findIndex(item => item.push === false)
          if (rowIndex !== -1) {
            let queryData
            waitIntercept(interceptPushIqc, () => {
              cy.get('.el-table__body').first().find('.el-table__row')
              .eq(rowIndex)
              .findAllByText(buttonText)
              .last()
              .click({
                force:true
              })
              closeTips('提示', '推送')
              queryData = interceptQueryIqcReport()
            },() => {
              validSuccessMessage()
              waitIntercept(queryData,() => {
                clickSearch()
              }, (data) => {
               expect(data.data[rowIndex].push).to.eq(true)
              })
            })
          }
        }
      } else {
        if (data.total) {
          const rowIndex = data.data.findIndex(item => item.push)
          if (rowIndex !== -1) {
            let queryData
            waitIntercept(interceptPushIqc, () => {
              cy.get('.el-table__body').first().find('.el-table__row')
              .eq(rowIndex)
              .findAllByText(buttonText)
              .last()
              .click({
                force:true
              })
              closeTips('提示', '推送')
              queryData = interceptQueryIqcReport()
            },() => {
              validSuccessMessage()
              waitIntercept(queryData,() => {
                clickSearch()
              }, (data) => {
               expect(data.data[rowIndex].push).to.eq(false)
              })
            })
          }
        }
      }
    } else {
      if (data.total) {
        if (cancelPush === false) {
          let queryData
          cy.get('.el-table__header').first().find('[type="checkbox"]').click({
            force:true
          })
          cy.wait(1000)
          waitIntercept(interceptBatchPushIqc, () => {
            clickButton(buttonText)
            closeTips('提示', '推送')
            queryData = interceptQueryIqcReport()
          }, () => {
            validSuccessMessage()
            waitIntercept(queryData, (data) => {
              data.data.map(item => expect(item.push).to.eq(true))
            })
          })
        } else {
          let queryData
          cy.get('.el-table__header').first().find('[type="checkbox"]').click({
            force:true
          })
          cy.wait(1000)
          waitIntercept(interceptBatchPushIqc, () => {
            clickButton(buttonText)
            closeTips('提示', '推送')
            queryData = interceptQueryIqcReport()
          }, () => {
            validSuccessMessage()
            waitIntercept(queryData, (data) => {
              data.data.map(item => expect(item.push).to.eq(false))
            })
          })
        }
      }
    }
  })
}

export const interceptDeleteIqcReport = () => {
  return interceptAll('service/mgr/iqc/month', interceptDeleteIqcReport.name)
}

export const deleteIqcReport = (rowIndex) => {
  waitRequest({
    intercept: interceptDeleteIqcReport,
    onBefore: () => {
      cy.get('.el-table__body').first().find('.el-table__row')
      .eq(rowIndex)
      .findAllByText('删除')
      .last()
      .click({
        force:true
      })
      confirmDelete()
    },
    onError: () => {
      console.log(123);
    },
    onSuccess: () => {
      validSuccessMessage()
    }
  })
}

/**
 * 
 * @param {string} area 地区 省
 * @param {string} keyword 实验室名称或者编码
 * @param {boolean} labCode 是否使用实验室编码
 */
export const searchIqcReport = (area, keyword, labCode = false) => {
  if (area) {
    elform('areaId').click({
      force:true
    })
    activeSelect(area)
    waitIntercept(interceptQueryIqcReport, () => {
      clickSearch()
    }, data => {
      validData(data)
      if (data.total) {
        data.data.map(item => expect(item.province).to.contain(area))
      }
    })
  }
  if (keyword) {
    elform('labName').clear().type(keyword)
    waitIntercept(interceptQueryIqcReport, () => {
      clickSearch()
    }, data => {
      validData(data)
      if (data.total) {
        if (labCode === false) {
          data.data.map(item => expect(item.labName).to.contain(keyword))
        } else {
          data.data.map(item => expect(item.labCode).to.contain(keyword))
        }
      }
    })
  }
}