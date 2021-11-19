import {
  activeDateDay
} from '../common/date'
import {
  interceptAll,
  waitIntercept,
  waitRequest
} from '../common/http'
import {
  validErrorMsg,
  validSuccessMessage
} from '../common/message'
import {
  activeSelect
} from '../common/select'
import {
  expandSearchConditions
} from '../eqa/eqa-order/eqa-order'
import {
  selectDropListValue
} from '../eqa/eqa-report/eqa-report'
import {
  elform
} from '../mutual-result/mutual-item'
import {
  reportElformClickDay
} from '../report/report-iqc'
import {
  clickSearch
} from '../setting/report-monitor/report-monitor'

export const messageOption = (itemName) => {
  return cy.get('.el-table__body').contains(itemName).parents('.el-table__row')
}

export const visitReportMonitorPage = () => {
  cy.visitPage('report-monitor')
  cy.wait(2000)
  expandSearchConditions()
  elform('labName').type('gd18020')
  clickSearch()
  cy.wait(1000)
  cy.get('.ql-lab-list__status').find('div').first().click({
    force: true
  })
  cy.wait(1000)
}

export const clickLabSearch = (messageType, btnsText = '搜索') => {
  if (messageType === '未上报告警记录') {
    cy.get('#pane-notReported .el-form').first().findByText(btnsText).click({
      force: true
    })
  } else if (messageType === '失控告警记录') {
    cy.get('#pane-outControl .el-form').first().findByText(btnsText).click({
      force: true
    })
  } else if (messageType === 'CV/符合率失控告警记录') {
    cy.get('#pane-cvOutControl .el-form').first().findByText(btnsText).click({
      force: true
    })
  } else {
    cy.get('.el-form').first().findByText(btnsText).click({
      force: true
    })
  }
}

export const interceptLabMessage = () => {
  return interceptAll('service/base/messages/base?*', interceptLabMessage.name + new Date().getTime(), '/cqb-base')
}

export const clickSearchCondition = (messageType, placeholderText, value) => {
  if (messageType === '未上报告警记录') {
    cy.get('#pane-notReported .el-form').first().findAllByPlaceholderText(placeholderText).click({
      force: true
    })
    cy.wait(1000)
    selectDropListValue(value)
  } else if (messageType === '失控告警记录') {
    cy.get('#pane-outControl .el-form').first().findAllByPlaceholderText(placeholderText).click({
      force: true
    })
    cy.wait(1000)
    selectDropListValue(value)
  } else if (messageType === 'CV/符合率失控告警记录') {
    cy.get('#pane-cvOutControl .el-form').first().findAllByPlaceholderText(placeholderText).click({
      force: true
    })
    cy.wait(1000)
    selectDropListValue(value)
  } else {
    cy.get('#pane-alarm .el-form').first().findAllByPlaceholderText(placeholderText).click({
      force: true
    })
    cy.wait(1000)
    selectDropListValue(value)
  }
}

export const messageLabOption = () => {
  return cy.get('.el-table__body:visible').find('.el-table__row:visible')
}

export const interceptQueryMgrMessage = () => {
  return interceptAll('service/mgr/messages/mgrList?*', interceptQueryMgrMessage.name)
}

export const interceptApproveMeasure = () => {
  return interceptAll('service/mgr/messages/acceptDone/*', interceptApproveMeasure.name)
}

export const closeDialog = () => {
  cy.get('.el-dialog__close.el-icon.el-icon-close:visible').click({
    force: true
  })
}

export const interceptQueryMessageType = () => {
  return interceptAll('service/base/messages/base/*', interceptQueryMessageType.name, '/cqb-base')
}

export const interceptQueryInstrument = () => {
  return interceptAll('service/base/messages/instrNos', interceptQueryInstrument.name, '/cqb-base')
}

export const interceptProccessMessage = () => {
  return interceptAll('service/base/messages/base/done', interceptProccessMessage.name, '/cqb-base')
}

export const interceptQueryNotReportWarnning = () => {
  return interceptAll('service/base/messages/data', interceptQueryNotReportWarnning.name + new Date().getTime(), '/cqb-base')
}

export const interceptDealMessage = () => {
  return interceptAll('service/base/messages/data/done', interceptDealMessage.name, '/cqb-base')
}

const messageType = {
  warnningMsg: {
    typeName: '告警消息',
    type: '1',
    form: 1
  },
  notReportWarnning: {
    typeName: '未上报告警记录',
    type: '1',
    form: 2
  },
  outControlWarnning: {
    type: '2',
    typeName: '失控告警记录',
    form: 3
  },
  cvOutControl: {
    type: '3',
    typeName: 'CV/符合率失控告警记录',
    form: 4
  }
}


const messageStatus = {
  unread: {
    status: 1,
    chinese: '未读',
    type: 1
  },
  knowed: {
    status: 2,
    chinese: '已知晓',
    type: 2
  },
  proccessed: {
    status: 3,
    chinese: '已处理',
    type: 2
  },
  processedPart: {
    status: 5,
    chinese: '已部分处理',
    type: 2
  },
  approved: {
    status: 4,
    chinese: '已认可',
    type: 2
  },
  messageNotProccess: {
    chinese: '数据未处理'
  },
  messageProccessed: {
    chinese: '数据已处理'
  }
}

const paramMap = {
  warnningMsg: {
    reason: {
      system: '系统传输问题',
      workday: '非工作日',
      instrument: '仪器故障',
      notTesting: '未进行检测'
    },
    measure: {
      auto: '已自动上报',
      manual: '已手工上报'
    }
  },
  cvOutWarnning: {
    reason: {
      SD: '固定CV%/SD设置问题',
      rules: '质控规则设置问题',
      instrument: '仪器原因',
      reagent: '试剂原因',
      person: '人员原因',
      nuRea: '质控品原因'
    },
    measure: {
      resetSD: '重新设置固定CV%/SD',
      resetRules: '重新设置质控规则',
      protectInstr: '仪器维护',
      reagent: '试剂原因排查',
      person: '人员问题排查',
      nuRea: '质控品原因排查'
    }
  }
}


/**
 * 
 * @param {array} responseData 后端返回的数组
 * @param {string} message 消息内容
 * @param {string} currentDoubleTime 当前时间,如:2021-10-01
 * @param {object} param 消息类型
 * @param {object} msgStatus 搜索条件的消息状态
 */
export const assertMessage = (responseData, message, currentDoubleTime, param, msgStatus) => {
  const dataLength = responseData.data.length
  const pageTotal = responseData.totalPages
  const total = responseData.total
  const rowIndex = responseData.data.map((item, index) => {
    for (const key in param) {
      if (messageType[key].typeName === '告警消息') {
        for (const status in msgStatus) {
          if (messageStatus[status].chinese === msgStatus[status]) {
            expect(item.status).to.eq(messageStatus[status].status)
            const time = (item.createTime).split(' ')[0]
            if (item.message === message && time === (currentDoubleTime).replace(/\//g, '-')) {
              return index
            }
          }
        }
      } else if (messageType[key].typeName === '未上报告警记录') {
        return judgeConditions(msgStatus, item, currentDoubleTime, key, message, index)
      } else if (messageType[key].typeName === '失控告警记录') {
        return judgeConditions(msgStatus, item, currentDoubleTime, key, message, index)
      } else if (messageType[key].typeName === 'CV/符合率失控告警记录') {
        return judgeConditions(msgStatus, item, currentDoubleTime, key, message, index)
      }
    }
  }).filter(filterData => filterData !== undefined)
  if (rowIndex.length > 0) {
    for (const key in param) {
      if (messageType[key].form === 2) {
        manageWarnningMessage(msgStatus, () => {
          fillForm(responseData, rowIndex[0])
        }, dataLength, pageTotal, total)
      } else if (messageType[key].form === 3) {
        manageWarnningMessage(msgStatus, () => {
          fillOutWarnningForm(rowIndex[0], '仪器', '仪器')
        }, dataLength, pageTotal, total)
      } else if (messageType[key].form === 4) {
        manageWarnningMessage(msgStatus, () => {
          fillForm(responseData, rowIndex[0], false)
        }, dataLength, pageTotal, total)
      } else {
        waitIntercept(interceptQueryMessageType, () => {
          messageLabOption().eq(rowIndex[0]).click({
            force: true
          })
          cy.wait(1000)
        }, response => {
          for (const key in msgStatus) {
            if (messageStatus[key].type === 1) {
              closeDialog()
              cy.wait(2000)
              validData(dataLength, pageTotal, total)
            } else if (messageStatus[key].type === 2) {
              if (response.type === '1' && response.status === 2) {
                proccessMessage('非工作日', '已手工上报', '确认已处理')
                validData(dataLength, pageTotal, total)
              } else if (response.type === '1' && response.status === 3) {
                const filledMeasure = (response.baseReportMonitorStats[0].reasonMeasureList[0].value)
                const filledReason = (response.baseReportMonitorStats[0].reasonMeasureList[1].value)
                const array = getResponseData('warnningMsg', filledReason, filledMeasure)
                proccessMessage(array.notFilledReson[0], array.notFilledMeasure[0], '确认修改')
              } else if (response.type === '1' && response.status === 4) {
                getDialog('消息详情 - 佛山市顺德区慢性病防治中心').within(() => {
                  cy.get('.ql-dialog-message__footer').find('.ql-dialog-message__text').last().should('contain', '认可于 ' + (currentDoubleTime).replace().replace(/\//g, '-'))
                  closeDialog()
                })
              } else {
                closeDialog()
              }
            }
          }
        })
      }
    }
  }
}

const assertPage = (total) => {
  cy.get('.el-pagination__total:visible').first().should('have.text', '共 ' + (total - 1) + ' 条')
}

export const validData = (dataLength, pageTotal, total, Mgr = false) => {
  if (Mgr === true) {
    if (dataLength === 1) {
      cy.get('body').should('contain', '暂无数据')
    } else if (pageTotal > 1 && total > 21) {
      assertPage(total)
    } else {
      cy.get('.el-table__body').first().find('.el-table__row').should('have.length', dataLength - 1)
    }
  } else {
    if (dataLength === 1) {
      cy.get('body').should('contain', '暂无数据')
    } else if (pageTotal > 1 && total > 21) {
      assertPage(total)
    } else {
      messageLabOption().should('have.length', dataLength - 1)
    }
  }
}

export const findPlaceholderClick = (placeholderText) => {
  return cy.get('.el-form').last().findAllByPlaceholderText(placeholderText)
}

export const clickMessageDialogButton = (btnsText) => {
  cy.get('.el-dialog__footer').contains(btnsText).click({
    force: true
  })
}

/**
 * 
 * @param {string} reason 原因
 * @param {string} measure 处理措施
 * @param {string} btnsText 按键
 */
const proccessMessage = (reason, measure, btnsText) => {
  getDialog('消息详情 - 佛山市顺德区慢性病防治中心').within(() => {
    messageOption('钾').find('button').contains('处理').click({
      force: true
    })
    findPlaceholderClick('请选择').first().click({
      force: true
    })
    activeSelect(reason)
    findPlaceholderClick('请选择').last().click()
    activeSelect(measure)
    waitIntercept(interceptProccessMessage, () => {
      clickMessageDialogButton(btnsText)
    }, () => {})
  })
}

export const getDialog = (alias) => {
  return cy.get(`[aria-label="${alias}"]:visible`)
}

export const selectMessageType = (messageType) => {
  if (messageType === '告警消息') {
    cy.get('#tab-alarm').click()
  } else if (messageType === '未上报告警记录') {
    cy.get('#tab-notReported').click()
  } else if (messageType === '失控告警记录') {
    cy.get('#tab-outControl').click()
  } else {
    cy.get('#tab-cvOutControl').click()
  }
}

/**
 * @param {Array} responseData 后端返回的数据
 * @param {number} index 数组下标
 */
export const fillForm = (responseData, index, notReportWarnning = true) => {
  if (notReportWarnning === false) {
    if (responseData.data[index].reasonMeasureList.length > 1) {
      const filledMeasure = responseData.data[index].reasonMeasureList[0].value
      const filledReason = responseData.data[index].reasonMeasureList[1].value
      const array = getResponseData('cvOutWarnning', filledReason, filledMeasure)
      fillData(index, array.notFilledReson[0], array.notFilledMeasure[0])
    } else {
      fillData(index, paramMap.cvOutWarnning.reason.SD, paramMap.cvOutWarnning.measure.resetSD)
    }
  } else {
    if (responseData.data[index].reasonMeasureList.length > 1) {
      const filledMeasure = responseData.data[index].reasonMeasureList[0].value
      const filledReason = responseData.data[index].reasonMeasureList[1].value
      const array = getResponseData('warnningMsg', filledReason, filledMeasure)
      fillData(index, array.notFilledReson[0], array.notFilledMeasure[0])
    } else {
      fillData(index, paramMap.warnningMsg.reason.system, paramMap.warnningMsg.measure.auto)
    }
  }
}

/**
 * 
 * @param {number} index 数组下标
 * @param {string} reason 原因
 * @param {string} measure 处理措施
 */
export const fillData = (index, reason, measure, type = '未上报失控告警') => {
  if (type === '失控告警记录') {
    messageLabOption().eq(index).within(() => {
      cy.get('button').contains('处理').click({
        force: true
      })
      cy.wait(1000)
    })
    messageLabOption().eq(index + 1).within(() => {
      cy.get('.el-input__inner:visible').first().click({
        force: true
      })
      checkLabBox(reason)
      cy.get('.el-input__inner:visible').last().click({
        force: true
      })
      cy.wait(2000)
      checkLabBox(measure)
    })
  } else {
    messageLabOption().eq(index).within(() => {
      cy.get('button').contains('处理').click({
        force: true
      })
      cy.wait(1000)
    })
    messageLabOption().eq(index + 1).within(() => {
      cy.get('.el-input__inner:visible').first().click()
      activeSelect(reason)
      cy.get('.el-input__inner:visible').last().click()
      cy.wait(1000)
      activeSelect(measure)
    })
  }
}

/**
 * 
 * @param {object} msgStatus 搜索条件的消息状态
 * @param {array} item 后端返回的数据
 * @param {string} currentDoubleTime 当前时间,如：2021-10-01
 * @param {string} key @messageType 中的键
 * @param {string} message 消息内容
 * @returns {array}  返回item中的索引
 */
export const judgeConditions = (msgStatus, item, currentDoubleTime, key, message, index) => {
  for (const status in msgStatus) {
    if (messageStatus[status].chinese === msgStatus[status]) {
      expect(item.type).to.eq((messageType[key].type))
      const time = (item.messageCreateTime).split(' ')[0]
      if (messageStatus[status].chinese === '数据未处理') {
        if (item.messageContent === message && item.status !== 4 && time === (currentDoubleTime).replace(/\//g, '-')) {
          return index
        }
      } else {
        if (item.messageContent === message && item.status === 3 && time === (currentDoubleTime).replace(/\//g, '-')) {
          return index
        }
      }
    }
  }
}

export const fillOutWarnningForm = (index, outReason, measure) => {
  fillData(index, outReason, measure, '失控告警记录')
}

export const checkLabBox = (keyword) => {
  cy.document()
    .its('body')
    .find('.el-scrollbar__view.el-cascader-menu__list:visible')
    .contains(keyword)
    .parent()
    .find('[type="checkbox"]')
    .check({
      force: true
    })
}

/**
 * 
 * @param {string} msgStatus 搜索条件中的消息处理状态
 * @param {function} cb 回调函数 
 * @param {number} dataLength 数据长度
 * @param {number} pageTotal 数据页数
 * @param {number} total 总的数据条数
 */
export const manageWarnningMessage = (msgStatus, cb, dataLength, pageTotal, total) => {
  for (const status in msgStatus) {
    if (messageStatus[status].chinese === '数据未处理') {
      cb()
      assertSuccessMsg()
      cy.wait(1000)
      validData(dataLength, pageTotal, total)
    } else {
      cb()
      assertSuccessMsg()
    }
  }
}

export const assertSuccessMsg = () => {
  waitIntercept(interceptDealMessage, () => {
    cy.get('button').contains('确认已处理').click({
      force: true
    })
  }, () => {
    validSuccessMessage()
  })
}

export const selectConditionTime = (time) => {
  reportElformClickDay('开始时间', '开始时间', true)
  activeDateDay(time)
  reportElformClickDay('结束时间', '结束时间', true)
  cy.wait(1000)
  activeDateDay(time)
}

/**
 * 
 * @param {string} warnningType 告警消息类型:1.未上报告警记录 warnningMsg 2.CV/符合率失控告警 cvOutWarnning
 * @param {string} filledReason 已填写的原因
 * @param {string} filledMeasure 已填写的措施
 * @returns 
 */
export const getResponseData = (warnningType, filledReason, filledMeasure) => {
  const notFilledReson = []
  const notFilledMeasure = []
  if (warnningType === 'warnningMsg') {
    for (const key in paramMap.warnningMsg.reason) {
      if (paramMap.warnningMsg.reason[key] !== filledReason) {
        notFilledReson.push(paramMap.warnningMsg.reason[key])
      }
    }
    for (const key in paramMap.warnningMsg.measure) {
      if (paramMap.warnningMsg.measure[key] !== filledMeasure) {
        notFilledMeasure.push(paramMap.warnningMsg.measure[key])
      }
    }
  } else {
    for (const key in paramMap.cvOutWarnning.reason) {
      if (paramMap.cvOutWarnning.reason[key] !== filledReason) {
        notFilledReson.push(paramMap.cvOutWarnning.reason[key])
      }
    }
    for (const key in paramMap.cvOutWarnning.measure) {
      if (paramMap.cvOutWarnning.measure[key] !== filledMeasure) {
        notFilledMeasure.push(paramMap.cvOutWarnning.measure[key])
      }
    }
  }
  return {
    notFilledReson,
    notFilledMeasure
  }
}

export const dealMany = (rowIndex, messageType, success = true) => {
  if (success === true) {
    messageLabOption().eq(rowIndex).find('[type="checkbox"]').check({
      force: true
    })
    clickLabSearch(messageType, '批量设置')
    getDialog('批量处理').findAllByPlaceholderText('请选择').first().click()
    activeSelect('仪器原因')
    getDialog('批量处理').findAllByPlaceholderText('请选择').last().click()
    activeSelect('仪器维护')
    waitIntercept(interceptDealMessage, () => {
      getDialog('批量处理').find('button').contains('确认设置').click({
        force: true
      })
    }, () => {
      validSuccessMessage()
    })
  } else {
    messageLabOption().eq(rowIndex).find('[type="checkbox"]').check({
      force: true
    })
    clickLabSearch(messageType, '批量设置')
    getDialog('批量处理').findAllByPlaceholderText('请选择').first().click()
    activeSelect('仪器原因')
    getDialog('批量处理').findAllByPlaceholderText('请选择').last().click()
    activeSelect('仪器维护')
    waitRequest({
      intercept: interceptDealMessage,
      onBefore: () => {
        getDialog('批量处理').find('button').contains('确认设置').click({
          force: true
        })
      },
      onError: (data) => {
        validErrorMsg(data)
      }
    })
  }
}

export const validReasonMeasureLength = (labelText) => {
  cy.get('.el-form-item__label').contains(labelText).parent().find('.el-tag.el-tag--info').then(getLength => {
    expect(getLength.length).to.be.greaterThan(1)
  })
}