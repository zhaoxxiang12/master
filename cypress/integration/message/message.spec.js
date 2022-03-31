/**
 * 告警消息
 */

import dayjs from 'dayjs'
import {
  visitPage
} from '../../shared/route'
import {
  waitIntercept
} from '../common/http'
import {
  closeClientAlert,
  validSuccessMessage
} from '../common/message'
import {
  activeSelect
} from '../common/select'
import {
  expandSearchConditions
} from '../eqa/eqa-order/eqa-order'
import { queryMessageContent } from '../message-setting/push-setting'
import {
  elform
} from '../mutual-result/mutual-item'
import {
  clickMessageButton,
  clickSearch,
  pushMessage
} from '../setting/report-monitor/report-monitor'
import {
  assertMessage,
  assertSuccessMsg,
  checkLabBox,
  clickLabSearch,
  clickMessageDialogButton,
  clickSearchCondition,
  dealMany,
  getDialog,
  interceptApproveMeasure,
  interceptLabMessage,
  interceptQueryInstrument,
  interceptQueryMgrMessage,
  interceptQueryNotReportWarnning,
  messageLabOption,
  messageOption,
  selectConditionTime,
  selectMessageType,
  validData,
  validReasonMeasureLength,
  visitReportMonitorPage
} from './message'


context('告警消息', () => {
  const year = dayjs().format('YYYY')
  const month = dayjs().format('MM')
  const day = dayjs().format('D')
  const currentTime = year + '/' + month + '/' + day
  const currentDoubleTime = year + '/' + month + '/' + dayjs().format('DD')
  before(() => {
    visitReportMonitorPage()
  })
  context('未上报操作', () => {
    const message = '232'
    before(() => {
      messageOption('钾').find('[type=checkbox]').check({
        force: true
      })
      waitIntercept(queryMessageContent, () => {
        cy.get('.el-dialog__body').findByText('推送消息通知').click({
          force: true
        })
      }, msg => {
        pushMessage(msg.data[0].content, '1', '1')
        clickMessageButton()
        validSuccessMessage()
      })
    })
    context('状态查询和操作', () => {
      const messageType = '告警消息'
      before(() => {
        cy.visitLabPage('message', 'labgd18020')
        cy.wait(2000)
        selectConditionTime(currentTime)
      })
      it('未读', () => {
        waitIntercept(interceptLabMessage, () => {
          clickLabSearch()
        }, data => {
          const warnningMsg = '告警消息'
          const unread = '未读'
          assertMessage(data, message, currentDoubleTime, {
            warnningMsg
          }, {
            unread
          })
        })
      })
      it('已知晓', () => {
        const status = '已知晓'
        const messageContent = '232'
        clickSearchCondition(messageType, '请选择状态', status)
        waitIntercept(interceptLabMessage, () => {
          clickLabSearch()
        }, data => {
          const warnningMsg = '告警消息'
          const knowed = '已知晓'
          assertMessage(data, messageContent, currentDoubleTime, {
            warnningMsg
          }, {
            knowed
          })
        })
      })
      it('已处理', () => {
        const status = '已处理'
        const messageContent = '232'
        clickSearchCondition(messageType, '请选择状态', status)
        waitIntercept(interceptLabMessage, () => {
          clickLabSearch()
          cy.wait(1000)
        }, data => {
          const warnningMsg = '告警消息'
          const proccessed = '已处理'
          assertMessage(data, messageContent, currentDoubleTime, {
            warnningMsg
          }, {
            proccessed
          })
        })
      })
      it('认可处理措施', () => {
        visitPage('alert')
        cy.wait(2000)
        closeClientAlert()
        expandSearchConditions('高级搜索')
        elform('date').first().click()
        // activeSelect('前一天')
        elform('labName').type('gd18020')
        elform('status').click()
        activeSelect('已处理')
        waitIntercept(interceptQueryMgrMessage, () => {
          clickSearch()
          cy.wait(1000)
        }, data => {
          const dataLength = data.data.length
          const pageTotal = data.totalPages
          const total = data.total
          if (data.data.length > 0) {
            cy.get('.el-table__body:visible .el-table__row:visible').first().click()
            getDialog('消息详情 - 佛山市顺德区慢性病防治中心').within(() => {
              waitIntercept(interceptApproveMeasure, () => {
                clickMessageDialogButton('认可处理措施')
                cy.wait(2000)
              }, () => {

              })
            })
            validData(dataLength, pageTotal, total, true)
          }
          cy.visitLabPage('message', 'labgd18020')
          cy.wait(2000)
          const status = '已认可'
          const messageContent = '232'
          clickSearchCondition(messageType, '请选择状态', status)
          waitIntercept(interceptLabMessage, () => {
            clickLabSearch()
          }, data => {
            const warnningMsg = '告警消息'
            const approved = '已认可'
            assertMessage(data, messageContent, currentDoubleTime, {
              warnningMsg
            }, {
              approved
            })
          })
        })
      })
      it('部分处理', () => {
        const processedPart = '已部分处理'
        const messageContent = '232'
        const warnningMsg = '告警消息'
        const unread = '未读'
        const knowed = '已知晓'
        visitReportMonitorPage()
        messageOption('钾').find('[type=checkbox]').check({
          force: true
        })
        messageOption('钠').find('[type=checkbox]').check({
          force: true
        })
        waitIntercept(queryMessageContent, () => {
          cy.get('.el-dialog__body').findByText('推送消息通知').click({
            force: true
          })
        }, msg => {
          pushMessage(msg.data[0].content, '1', '1')
        })
        clickMessageButton()
        validSuccessMessage()
        cy.visitLabPage('message', 'labgd18020')
        cy.wait(2000)
        selectConditionTime(currentTime)
        waitIntercept(interceptLabMessage, () => {
          clickLabSearch()
        }, data => {
          assertMessage(data, messageContent, currentDoubleTime, {
            warnningMsg
          }, {
            unread
          })
        })
        clickSearchCondition(messageType, '请选择状态', knowed)
        waitIntercept(interceptLabMessage, () => {
          clickLabSearch()
        }, data => {
          assertMessage(data, messageContent, currentDoubleTime, {
            warnningMsg
          }, {
            knowed
          })
        })
        cy.wait(2000)
        clickSearchCondition(messageType, '请选择状态', processedPart)
        waitIntercept(interceptLabMessage, () => {
          clickLabSearch()
        }, (data) => {
          assertMessage(data, messageContent, currentDoubleTime, {
            warnningMsg
          }, {
            processedPart
          })
        })
      })
    })
  })
  context('未上报告警记录', () => {
    const message = '232'
    const messageNotProccess = '数据未处理'
    const messageProccessed = '数据已处理'
    const notReportWarnning = '未上报告警记录'
    before(() => {
      visitReportMonitorPage()
      messageOption('钾').find('[type=checkbox]').check({
        force: true
      })
      waitIntercept(queryMessageContent, () => {
        cy.get('.el-dialog__body').findByText('推送消息通知').click({
          force: true
        })
      }, msg => {
        pushMessage(msg.data[0].content, '1', '1')
      }) 
      clickMessageButton()
      validSuccessMessage()
    })
    context('消息处理', () => {
      const messageType = '未上报告警记录'
      before(() => {
        cy.visitLabPage('message', 'labgd18020')
        cy.wait(2000)
      })
      it('数据已处理', () => {
        selectMessageType(messageType)
        cy.wait(1000)
        clickSearchCondition(messageType, '请选择', messageProccessed)
        waitIntercept(interceptQueryNotReportWarnning, () => {
          clickLabSearch(messageType)
        }, data => {
          assertMessage(data, message, currentDoubleTime, {
            notReportWarnning
          }, {
            messageProccessed
          })
        })
      })
      it('数据未处理', () => {
        cy.wait(3000)
        selectMessageType(messageType)
        cy.wait(1000)
        clickSearchCondition(messageType, '请选择', messageNotProccess)
        waitIntercept(interceptQueryNotReportWarnning, () => {
          clickLabSearch(messageType)
        }, data => {
          assertMessage(data, message, currentDoubleTime, {
            notReportWarnning
          }, {
            messageNotProccess
          })
        })
      })
    })
  })
  context('失控告警记录', () => {
    const message = '232'
    const messageNotProccess = '数据未处理'
    const messageProccessed = '数据已处理'
    const outControlWarnning = '失控告警记录'
    before(() => {
      visitReportMonitorPage()
      messageOption('钾').find('[type=checkbox]').check({
        force: true
      })
      waitIntercept(queryMessageContent, () => {
        cy.get('.el-dialog__body').findByText('推送消息通知').click({
          force: true
        })
      }, msg => {
        pushMessage(msg.data[0].content, '1', '2')
        clickMessageButton()
      })
      validSuccessMessage()
    })
    context('消息处理', () => {
      before(() => {
        cy.visitLabPage('message', 'labgd18020')
        cy.wait(2000)
      })
      it('数据未处理', () => {
        selectMessageType(outControlWarnning)
        cy.wait(1000)
        clickSearchCondition(outControlWarnning, '请选择', messageNotProccess)
        waitIntercept(interceptQueryNotReportWarnning, () => {
          clickLabSearch(outControlWarnning)
        }, (data) => {
          assertMessage(data, message, currentDoubleTime, {
            outControlWarnning
          }, {
            messageNotProccess
          })
        })
      })
      it('数据已处理', () => {
        selectMessageType(outControlWarnning)
        cy.wait(1000)
        clickSearchCondition(outControlWarnning, '请选择', messageProccessed)
        waitIntercept(interceptQueryNotReportWarnning, () => {
          clickLabSearch(outControlWarnning)
        }, (data) => {
          assertMessage(data, message, currentDoubleTime, {
            outControlWarnning
          }, {
            messageProccessed
          })
        })
      })
    })
  })
  context('CV/符合率失控告警记录', () => {
    const message = '232'
    const messageNotProccess = '数据未处理'
    const messageProccessed = '数据已处理'
    const cvOutControl = 'CV/符合率失控告警记录'
    before(() => {
      visitReportMonitorPage()
      messageOption('钾').find('[type=checkbox]').check({
        force: true
      })
      waitIntercept(queryMessageContent, () => {
        cy.get('.el-dialog__body').findByText('推送消息通知').click({
          force: true
        })
      }, msg => {
        pushMessage(msg.data[0].content, '1', '3')
      })
      clickMessageButton()
      validSuccessMessage()
    })
    context('消息处理', () => {
      before(() => {
        cy.visitLabPage('message', 'labgd18020')
        cy.wait(2000)
      })
      it('数据未处理', () => {
        selectMessageType(cvOutControl)
        cy.wait(1000)
        clickSearchCondition(cvOutControl, '请选择', messageNotProccess)
        waitIntercept(interceptQueryNotReportWarnning, () => {
          clickLabSearch(cvOutControl)
        }, data => {
          assertMessage(data, message, currentDoubleTime, {
            cvOutControl
          }, {
            messageNotProccess
          })
        })
      })
      it('数据已处理', () => {
        selectMessageType(cvOutControl)
        cy.wait(1000)
        clickSearchCondition(cvOutControl, '请选择', messageProccessed)
        waitIntercept(interceptQueryNotReportWarnning, () => {
          clickLabSearch(cvOutControl)
        }, data => {
          assertMessage(data, message, currentDoubleTime, {
            cvOutControl
          }, {
            messageProccessed
          })
        })
      })
    })
  })
  context('其他操作', () => {
    let result
    const cvOutControl = 'CV/符合率失控告警记录'
    before(() => {
      waitIntercept(interceptQueryInstrument, () => {
        cy.visitLabPage('message', 'labgd18020')
      }, data => {
        result = data
      })
      cy.wait(2000)
      selectMessageType(cvOutControl)
    })
    context('搜索条件', () => {
      it('组合搜索条件验证(仪器+状态)', () => {
        if (result.length) {
          const instrumentNo = result[0].instrName+'(' + result[0].instrNos[0] + ')'
          clickSearchCondition('CV/符合率失控告警记录', '请选择', '数据已处理')
          clickSearchCondition('CV/符合率失控告警记录', '请选择仪器编号', instrumentNo)
          waitIntercept(interceptQueryNotReportWarnning, () => {
            clickLabSearch(cvOutControl)
          }, (data) => {
            if (data.data.length > 0) {
              data.data.map(item => {
                expect(item.insName).to.eq(instrumentNo.split('(')[0])
              })
            }
          })
          cy.get('.el-tag__close.el-icon-close').click({
            force: true
          })
        }
      })
      it('组合搜索条件验证(仪器+时间)', () => {
        if (result.length) {
          const instrumentNo = result[0].instrName+'(' + result[0].instrNos[0] + ')'
          clickSearchCondition('CV/符合率失控告警记录', '请选择', '数据已处理')
          clickSearchCondition('CV/符合率失控告警记录', '请选择仪器编号', instrumentNo)
          selectConditionTime(currentTime)
          waitIntercept(interceptQueryNotReportWarnning, () => {
            clickLabSearch(cvOutControl)
          }, (data) => {
            if (data.data.length > 0) {
              data.data.map(item => {
                expect(item.insName).to.eq(instrumentNo.split('(')[0])
                const time = (item.messageCreateTime.split(' '))[0]
                expect(time).to.eq(currentDoubleTime.replace(/\//g, '-'))
              })
            }
          })
          cy.get('.el-tag__close.el-icon-close').click({
            force: true
          })
        }
      })
    })
    context('批量设置', () => {
      let result
      let instrNo
      before(() => {
        waitIntercept(interceptQueryInstrument, () => {
          cy.reload()
        }, data => {
          instrNo = data
          if (instrNo.length) {
            const instrumentNo = instrNo[1].instrName + '(' + instrNo[1].instrNos[0] + ')'
            clickSearchCondition('CV/符合率失控告警记录', '请选择', '数据已处理')
            clickSearchCondition('CV/符合率失控告警记录', '请选择仪器编号', instrumentNo)
            selectConditionTime(currentTime)
            waitIntercept(interceptQueryNotReportWarnning, () => {
              clickLabSearch(cvOutControl)
            }, (data) => {
              result = data
            })
          }
        }) 
      })
      it('批量设置成功', () => {
        const array = result.data.map((item, index) => {
          if (item.status === 3) {
            return index
          }
        }).filter(data => data !== undefined)
        if (array.length > 0) {
          dealMany(array[0], cvOutControl)
        }
      })
      it('已认可的数据不能进行批量设置', () => {
        cy.wait(2000)
        const rowIndex = result.data.findIndex(item => item.status === 4)
        if (rowIndex !== -1) {
          dealMany(rowIndex, cvOutControl, false)
        }
      })
      it('失控告警原因和措施设置多个', () => {
        cy.wait(2000)
        selectMessageType('失控告警记录')
        cy.wait(1000)
        clickSearchCondition('失控告警记录', '请选择', '数据未处理')
        waitIntercept(interceptQueryNotReportWarnning, () => {
          clickLabSearch('失控告警记录')
        }, (data) => {
          if (data.data.length > 0) {
            const dataLength = data.data.length
            const pageTotal = data.totalPages
            const total = data.total
            const array = data.data.map((item, index) => {
              return index
            })
            messageLabOption().eq(array[0]).within(() => {
              cy.get('button').contains('处理').click({
                force: true
              })
              cy.wait(1000)
            })
            messageLabOption().eq(array[0] + 1).within(() => {
              cy.get('.el-input__inner:visible').first().click({
                force: true
              })
              checkLabBox('仪器')
              checkLabBox('操作')
              validReasonMeasureLength('项目失控原因')
              cy.get('.el-input__inner:visible').last().click({
                force: true
              })
              cy.wait(2000)
              checkLabBox('仪器')
              checkLabBox('操作')
              validReasonMeasureLength('项目失控处理')
            })
            assertSuccessMsg()
            validData(dataLength, pageTotal, total)
          }
        })
      })
    })
  })
})