import { clickButton } from "../common/button"
import { closeTips } from "../common/dialog"
import { interceptAll, waitIntercept, waitRequest } from "../common/http"
import { validSuccessMessage } from "../common/message"
import { activeSelect } from "../common/select"
import { elform } from "../mutual-result/mutual-item"
import { clickSearch } from "../setting/report-monitor/report-monitor"

export const interceQueryData = () => {
  return interceptAll('service/mgr/mutualRecogReport?*', interceQueryData.name)
}

export const validData = (responseData) => {
  if (responseData.total > 20) {
    cy.get('.el-pagination__total').should('have.text', '共 ' + responseData.total +' 条')
  } else if (responseData.total <= 20) {
    cy.get('.el-table__body').first().find('.el-table__row').should('have.length', responseData.total) 
  } else {
    cy.get('body').should('contain', '暂无数据')
  }
}

export const certYearSearch = (keyword, area, tag) => {
  if (keyword) {
    elform('keyword').type(keyword)
    waitIntercept(interceQueryData, () => {
      clickSearch()
    }, data => {
      validData(data)
    })   
  }
  if (area) {
    elform('areas').click({
      force:true
    })
    activeSelect(area)
    waitIntercept(interceQueryData, () => {
      clickSearch()
    }, data => {
      validData(data)
    })
  }
  if (tag) {
    elform('labTags').click({
      force:true
    })
    activeSelect(tag)
    waitIntercept(interceQueryData, () => {
      clickSearch()
    }, data => {
      validData(data)
    })
  }
}

const interceptPreviewCert = (reportUrl) => {
  return interceptAll(`service/mgr/mutualRecogReport/preview/${reportUrl}`, interceptPreviewCert.name)
}

/**
 * 
 * @param {boolean} previewCert true 预览互认报告  false 预览互认证书
 */
export const previewCertReport = (previewCert = true) => {
  waitIntercept(interceQueryData, () => {
    clickSearch()
  }, data => {
    if (previewCert) {
      if (data.total) {
        const certificateNo = data.data[0].certificateNo
        const labName = data.data[0].labName
        const reportPath = data.data[0].reportPath
        const fixedWord = '临床检验结果互认报告?url='
        const encodeUrl = encodeURI(certificateNo + labName +fixedWord+reportPath)
        waitRequest({
          intercept: interceptPreviewCert(encodeUrl),
          onBefore: () => {
            cy.get('.el-table__body').first().find('.el-table__row')
            .first()
            .findAllByText('预览')
            .first().click({
              force:true
            })
          },
          onSuccess: () => {
            closePreviewWindow()
          },
          onError: (msg) => {
            console.log(msg)
            closePreviewWindow()
          }
        })
      }
    } else {
      if (data.total) {
        const rowIndex = data.data.findIndex(item => item.recogItems !== "")
        if (rowIndex !== -1) {
          const certificatePath = data.data[rowIndex].certificatePath
          const certificateNo = data.data[rowIndex].certificateNo
          const labName = data.data[rowIndex].labName
          const fixedWord = '临床检验结果互认证书?url='
          const encodeUrl = encodeURI(certificateNo + labName + fixedWord + certificatePath)
          waitRequest({
            intercept: interceptPreviewCert(encodeUrl),
            onBefore: () => {
              cy.get('.el-table__body').first().find('.el-table__row')
              .eq(rowIndex)
              .findAllByText('预览')
              .last()
              .click({
                force:true
              })
            },
            onSuccess: () => {
              closePreviewWindow()
            },
            onError: (msg) => {
              console.log(msg);
              closePreviewWindow()
            }
          })    
        }
      }
    }
  })
}

export const closePreviewWindow = () => {
  cy.get('.ql-frame-viewer__close').click({
    force:true
  })
}

export const interceptPushData = () => {
  return interceptAll('service/mgr/mutualRecogReport/pushStatus', interceQueryData.name)
}

/**
 * 
 * @param {boolean} pushAll 是否是批量推送 默认不是批量推送
 * @param {string} buttonText 按键名称
 * @param {boolean} cancelPush 是否取消推送 默认不是
 */
 export const pushData = (pushAll = false, buttonText, cancelPush = false) => {
  waitIntercept(interceQueryData, () => {
    clickSearch()
  }, data => {
    if (pushAll === false) {
      if (cancelPush === false) {
        if (data.total) {
          const rowIndex = data.data.findIndex(item => item.pushStatus === false)
          if (rowIndex !== -1) {
            let queryData
            waitIntercept(interceptPushData, () => {
              cy.get('.el-table__body').first().find('.el-table__row')
              .eq(rowIndex)
              .findAllByText(buttonText)
              .last()
              .click({
                force:true
              })
              closeTips('提示', '推送')
              queryData = interceQueryData()
            },() => {
              validSuccessMessage()
              waitIntercept(queryData, (data) => {
               expect(data.data[rowIndex].pushStatus).to.eq(true)
              })
            })
          }
        }
      } else {
        if (data.total) {
          const rowIndex = data.data.findIndex(item => item.pushStatus)
          if (rowIndex !== -1) {
            let queryData
            waitIntercept(interceptPushData, () => {
              cy.get('.el-table__body').first().find('.el-table__row')
              .eq(rowIndex)
              .findAllByText(buttonText)
              .last()
              .click({
                force:true
              })
              closeTips('提示', '推送')
              queryData = interceQueryData()
            },() => {
              validSuccessMessage()
              waitIntercept(queryData, (data) => {
               expect(data.data[rowIndex].pushStatus).to.eq(false)
              })
            })
          }
        }
      }
    } else {
      if (data.total) {
        if (cancelPush === false) {
          let queryData
          cy.get('.el-table__fixed-header-wrapper').first().find('[type="checkbox"]').click({
            force:true
          })
          cy.wait(1000)
          waitIntercept(interceptPushData, () => {
            clickButton(buttonText)
            closeTips('提示', '推送')
            queryData = interceQueryData()
          }, () => {
            validSuccessMessage()
            waitIntercept(queryData, (data) => {
              data.data.map(item => expect(item.pushStatus).to.eq(true))
            })
          })
        } else {
          let queryData
          cy.get('.el-table__fixed-header-wrapper').first().find('[type="checkbox"]').click({
            force:true
          })
          cy.wait(1000)
          waitIntercept(interceptPushData, () => {
            clickButton(buttonText)
            closeTips('提示', '推送')
            queryData = interceQueryData()
          }, () => {
            validSuccessMessage()
            waitIntercept(queryData, (data) => {
              data.data.map(item => expect(item.pushStatus).to.eq(false))
            })
          })
        }
      }
    }
  })
}

export const interceptReGenerate = () => {
  return interceptAll('service/mgr/mutualRecogReport/reGenerateCertificate?*', interceptReGenerate.name)
}
