import {
  visitLabPage
} from "../../shared/route"
import {
  interceptAll,
  waitIntercept
} from "../common/http"
import {
  closeClientAlert,
  validSuccessMessage
} from "../common/message"
import {
  activeSelect
} from "../common/select"
import {
  selectMajor
} from "../ds-config/ds-config"

export const interceptQueryGroup = () => {
  return interceptAll('service/base/qc/group', interceptQueryGroup.name, '/cqb-base')
}

/**
 * id
 * @param {string} groupId 质控批号id
 * @returns 
 */
export const interceptMapping = (groupId) => {
  return interceptAll('service/base/qc/group/' + groupId + '/mapping', interceptMapping.name, '/cqb-base')
}

export const interceptCreateGroup = () => {
  return interceptAll('service/base/qc/group', interceptCreateGroup.name, 'cqb-base')
}

export const interceptDeleteBatchNo = () => {
  return interceptAll('service/base/qc/group/*', interceptDeleteBatchNo.name, '/cqb-base')
}

export const getData = () => {
  return cy.get('.el-table__body').find('.el-table__row')
}

export const interceptRelate = () => {
  return interceptAll('service/base/qc/relate', interceptRelate.name, '/cqb-base')
}

export const clickElformPlaceHolder = (placeholderText) => {
  return cy.get('.el-form').last().findAllByPlaceholderText(placeholderText)
}

export const relatedGroupButton = (titleName, buttonText) => {
  return cy.get('.el-popover__title:visible')
    .contains(titleName)
    .parent()
    .findByText(buttonText)
    .click({
      force: true
    })
}

export const groupButton = (text) => {
  cy.get('.el-table__body').last().find('.el-table__row')
    .last()
    .findByText(text)
    .click({
      force: true
    })
}

export const interceptReportData = () => {
  return interceptAll('service/base/qc/data', interceptReportData.name, '/cqb-base')
}

export const interceptDeleteReportData = () => {
  return interceptAll('service/base/qc/data/*',interceptDeleteReportData.name,'/cqb-bse')
}

export const createGroup = (batchNo) => {
  cy.get('.el-table__body').findByText('添加').click({
    force: true
  })
  clickElformPlaceHolder('请选择').click({
    force: true
  })
  activeSelect(batchNo)
}

export const clickDeleteData = () => {
  cy.get('.el-tag__close.el-icon-close:visible').click({
    force: true
  })
}

export const elformButton = (text) => {
  return cy.get('.el-form').last().findByText(text).click({
    force: true
  })
}

export const getQcData = () => {
  return cy.get('.el-table__body').last().find('.el-table__row')
}

export const visitDsConfig = () => {
  const majorName = '新冠病毒核酸检测'
  visitLabPage('ds-config')
  cy.wait(3000)
  selectMajor(majorName)
  cy.wait(3000)
  closeClientAlert()
}

export const selectTitle = (titleName) => {
  cy.get('.el-tabs__item.is-top').contains(titleName).click({
    force: true
  })
}

export const interceptChange = (groupId) => {
  return interceptAll('service/base/qc/group/' + groupId + '/change', interceptChange.name, '/cqb-base')
}

export const selectGroupValue = (groupName, dropListValue, groupMap = '批号对照') => {
  if (dropListValue !== '保存' && dropListValue !== '取消') {
    if (groupMap) {
      cy.get(`[aria-label="${groupName}-${groupMap}"]`).findByPlaceholderText('请选择').click({
        force: true
      })
      activeSelect(dropListValue)
    } else {
      cy.get(`[aria-label="${groupName}-批号对照"]`).findByPlaceholderText('请选择').click({
        force: true
      })
      activeSelect(dropListValue)
    }
  } else {
    cy.get(`[aria-label="${groupName}-${groupMap}"]`).findByText(dropListValue).click({
      force: true
    })
  }
}

export const interceptBatchNoTree = () => {
  return interceptAll('service/base/item/batchNoTree?displayItem=true&showDisable=false', interceptBatchNoTree.name, '/cqb-base')
}

/**
 * 
 * @param {*} groupMapData 接口返回的数据
 * @param {*} groupName 接口返回的批号名称
 * @param {*} dropListValue 选择下拉框的值
 */
export const selectGroupMap = (groupMapData, groupName, dropListValue) => {
  if (groupMapData.mappingValueList) {
    for (let i = 0; i < groupMapData.mappingValueList.length; i++) {
      cy.get('.el-tag__close.el-icon-close').first().click({
        force: true
      })
      cy.wait(1000)
    }
    cy.wait(500)
    selectGroupValue(groupName, dropListValue)
  } else {
    selectGroupValue(groupName, dropListValue)
  }
}

export const reportData = (data) => {
  cy.wait(2000)
  cy.get('.el-table__body')
    .find('.el-input__inner:visible')
    .last().type(data)
  waitIntercept(interceptReportData, () => {
    cy.get('.el-table__body').findByText('保存').click({
      force: true
    })
  }, () => {
    validSuccessMessage()
  })
}