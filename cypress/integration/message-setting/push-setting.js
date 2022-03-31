import { clickOkInDialog, withinDialog } from '../common/dialog'
import {
  interceptAll, waitIntercept
} from '../common/http'
import {
  activeSelect
} from '../common/select'
import { getDialog } from '../message/message'
import {
  elform
} from '../mutual-result/mutual-item'
import { relateLab } from '../user-info/lab-info'

/**
 * @param {string} triggerEvent 触发事件
 * @param {string} message 消息内容
 * @param {string} sendTime 检测时间
 * @param {string} destinationType 发送对象
 * @param {string} pushList 项目失控推送形式
 * @param {string} time 检测时间
 * @param {string} testTarget 检测目标
 * @param {string} keyword 搜索关键字
 */

export const queryMessageContent = () => {
  return interceptAll('service/mgr/message/templates?*', queryMessageContent.name)
}
export const createRules = (triggerEvent, message, sendTime, destinationType, pushList, time, testTarget, keyword) => {
  waitIntercept(queryMessageContent, () => {
    cy.get('.ql-search__tools-top.is-left').findByText('添加自动推送规则').click({
      force: true
    })
  }, messageContent => {
    if (triggerEvent) {
      switch (triggerEvent) {
      case '1':
        elform('eventType', 'radio').check('1', {
          force: true
        })
        break
      case '2':
        elform('eventType', 'radio').check('2', {
          force: true
        })
        break
      case '3':
        elform('eventType', 'radio').check('3', {
          force: true
        })
        break
      case '4':
        elform('eventType', 'radio').check('4', {
          force: true
        })
      }
    }
    if (message) {
      elform('message').click()
      activeSelect(messageContent.data[0].content)
    }
    if (sendTime) {
      elform('sendTime').click()
      activeSelect(sendTime)
    }
    if (destinationType === '1') {
      elform('destinationType', 'checkbox').check('1', {
        force: true
      })
    } else if (destinationType === '2') {
      elform('destinationType', 'checkbox').check('2', {
        force: true
      })
    }
    if (pushList === 'live') {
      elform('pushList', 'checkbox').check('live', {
        force: true
      })
    } else if (pushList === 'time') {
      elform('pushList', 'checkbox').check('time', {
        force: true
      })
      if (time) {
        if (sendTime) {
          elform('sendTime').click()
          activeSelect(sendTime)
        }
      }
    }
    if (testTarget === 'some') {
      elform('eventObject', 'radio').check('some', {
        force: true
      })
      if (keyword) {
        cy.get('.ql-select-lab__assign').find('button').contains('添加').click({
          force: true
        })
        cy.get('[for=labName]').parent('.el-form-item.el-form-item--medium')
          .findAllByPlaceholderText('请输入实验室名称或编码')
          .type(keyword)
        cy.get('.ql-search--simple.is-right').find('button').contains('搜索').click()
        cy.wait(1000)
        cy.get('.el-table__body').last().find('[type=checkbox]').check({
          force:true
        })
        withinDialog(clickOkInDialog,'选择实验室')
      }
    }
  })


}

/**
 * @param {string} compareType 比对区组
 * @param {string} labTag 标签
 * @param {number} sdiThreshold 判断标准
 * @param {string} message 消息内容
 * @param {string} pushList 推送形式 
 * @param {string} destinationType 发送对象
 * @param {string} testTarget 检测目标
 * @param {string} keyword 搜索关键字
 */
export function createSDIRules (compareType,labTag,sdiThreshold,message,pushList,destinationType,testTarget,keyword) {
  waitIntercept(queryMessageContent, () => {
    cy.get('.ql-search').findByText('添加自动推送规则').click({
      force: true
    })
  }, messageContent => {
    getDialog('自动推送规则').within(() => {
      elform('eventType', 'radio').check('4', {
        force: true
      })
      if (compareType === '1') {
        elform('sdi.compareType','radio').check('1',{
          force:true
        })
      }
      if (labTag) {
        elform('labTag').click()
        activeSelect(labTag)
      }
      if (sdiThreshold) {
        elform('sdi.sdiThreshold').type(sdiThreshold)
      }
      if (message) {
        elform('message').click()
        activeSelect(messageContent.data[0].content)
      }
      if (pushList) {
        elform('pushList','checkbox').check('live',{
          force:true
        })
      }
      if (destinationType === '1') {
        elform('destinationType', 'checkbox').check('1', {
          force: true
        })
      } else if (destinationType === '2') {
        elform('destinationType', 'checkbox').check('2', {
          force: true
        })
      }
      if (testTarget === 'some') {
        elform('eventObject', 'radio').check('some', {
          force: true
        })
        if (keyword) {
          relateLab('自动推送规则',keyword,'检测目标')
          withinDialog(clickOkInDialog,'选择实验室')
        }
      }
    })
  })
}

export const getDataLength = () => {
  return cy.get('.el-table__body').last().find('.el-table__row')
}

export const interceptCreateRules = () => {
  return interceptAll('service/mgr/message/rules', interceptCreateRules.name)
}

export const interceptDeleteRules = () => {
  return interceptAll('service/mgr/message/rules/*', interceptDeleteRules.name)
}

export const queryRules = () => {
  return interceptAll('service/mgr/message/rules?*',queryRules.name +  parseInt(Math.random() * 100000))
}

export const interceptPauseRules= () => {
  return interceptAll('service/mgr/message/rules/pause/*',interceptPauseRules.name)
}

export const interceptResumeRules = () => {
  return interceptAll('service/mgr/message/rules/resume/*',interceptResumeRules.name)
}

export const interceptEditRules = () => {
  return interceptAll('service/mgr/message/rules/*',interceptEditRules.name)
}

export const interceptDeleteMsg = () => {
  return interceptAll('service/mgr/message/templates/*',interceptDeleteMsg.name)
}

export const interceptCreateTag = () => {
  return interceptAll('service/mgr/tags/service/check?*',interceptCreateTag.name)
}

export const interceptDeleteTag = () => {
  return interceptAll('service/mgr/tags/service/*',interceptDeleteTag.name)
}

export const interceptEditTag = () => {
  return interceptAll('service/mgr/tags/service/check?*',interceptEditTag.name)
}

export const clickSaveButton = (title) => {
  cy.get(`[aria-label=${title}]`).within(() => {
    cy.get('.el-dialog__footer')
      .last()
      .find('.el-button')
      .last()
      .click({
        force: true
      })
  })
} 