import {
  visitLabPage
} from '../../shared/route'
import {
  confirmDelete
} from '../common/dialog'
import {
  interceptAll,
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
  clickConfigButton,
  enableItem,
  selectMajor,
  validEnterPreserveMode
} from '../ds-config/ds-config'
import {
  findLabel
} from '../mutual-result/mutual-item'
import {
  getRelateOption,
  interceptBatchImport
} from '../single-import/single-import'

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

export const queryRelateGroupData = () => {
  return interceptAll('service/base/qc/relate?*', queryRelateGroupData.name, '/cqb-base')
}

export const getData = () => {
  return cy.get('.el-table__body')
    .first()
    .find('.el-table__row')
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
  return interceptAll('service/base/qc/data/*', interceptDeleteReportData.name, '/cqb-bse')
}

/**
 * 创建质控组合
 * 
 * @param {string} batchNo 质控批号
 * @param {number} groupLength 已关联质控批号的个数
 * 
 */
export const createGroup = (batchNo, groupLength) => {
  cy.get('.el-table__body').findByText('添加').click({
    force: true
  })
  clickElformPlaceHolder('请选择').click({
    force: true
  })
  for (let i = 0; i < groupLength; i++) {
    activeSelect(batchNo[i])
    cy.wait(1000)
  }
}

export const clickDeleteData = () => {
  cy.get('.tag-select__clear:visible').click({
    force: true
  })
}

export const elformButton = (text) => {
  return cy.get('.el-form').last().findByText(text).click({
    force: true
  })
}

export const getQcData = () => {
  return cy.get('.el-table__body').first().find('.el-table__row')
}

export const visitDsConfig = () => {
  const majorName = '新冠病毒核酸检测'
  visitLabPage('ds-config')
  cy.reload()
  cy.wait(3000)
  selectMajor(majorName)
  cy.wait(3000)
  closeClientAlert()
}

export const interceptChange = (groupId) => {
  return interceptAll('service/base/qc/group/' + groupId + '/change', interceptChange.name, '/cqb-base')
}

/**
 * 
 * @param {string} groupName 质控组合名称
 * @param {string} dropListValue 质控组合批号(后端查询返回过来的,但后续操作需要切片)
 * @param {string} groupMap 弹窗名称
 */
export const selectGroupValue = (groupName, dropListValue, groupMap = '批号对照') => {
  if (dropListValue !== '保存' && dropListValue !== '取消') {
    if (groupMap) {
      cy.get(`[aria-label="${groupName}-${groupMap}"]`).findByPlaceholderText('请选择').click({
        force: true
      })
      for (let i = 0; i < (dropListValue.split('_')).length; i++) {
        activeSelect((dropListValue.split('_'))[i])
      }
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

export const clickSaveData = () => {
  cy.get('.el-table__body').last().find('[title=保存]').last().click({
    force: true
  })
}

export const reportData = (data, batchReport = false) => {
  cy.wait(2000)
  if (batchReport === true) {
    cy.get('.el-table__body')
      .find('.el-input__inner:visible')
      .last().type(data)
    findLabel('时间选择').parent().next('.el-button')
    waitIntercept(interceptBatchImport, () => {
      findLabel('时间选择')
        .parent()
        .next('.el-button')
        .findByText('保存所有结果')
        .click({
          force: true
        })
    }, () => {})
  } else {
    cy.get('.el-table__body')
      .find('.el-input__inner:visible')
      .last().type(data)
    waitIntercept(interceptReportData, () => {
      clickSaveData()
    }, () => {
      validSuccessMessage()
    })
  }
}

/**
 * 关联质控品
 * @param {string} instrument 仪器
 * @param {string} batchGroupName 质控批号
 */
export const relateConfig = (instrument, batchGroupName) => {
  selectMajor('新冠病毒核酸检测')
  cy.wait(2000)
  getRelateOption(instrument, '编辑').click({
    force: true
  })
  cy.wait(1000)
  createGroup(batchGroupName, 1)
  relatedGroupButton('选择质控批号', '确定')
  waitIntercept(interceptRelate, () => {
    getRelateOption(instrument, '保存').click({
      force: true
    })
  }, () => {
    validSuccessMessage()
    getData().last().find('.tag-select__title').should('contain', batchGroupName)
  })
}

export const removeBatchGroup = (itemName) => {
  getQcData().last().findByText('编辑').click({
    force: true
  })
  clickDeleteData()
  confirmDelete()
  waitIntercept(interceptRelate, () => {
    getQcData().last().findByText('保存').click({
      force: true
    })
  }, () => {
    cy.wait(1000)
    getQcData().last().should('not.have.class', '.tag-select__title')
    visitDsConfig()
    validEnterPreserveMode(() => {
      cy.wait(1000)
      clickConfigButton(itemName, '删除')
      confirmDelete()
    })
  })
}

/**
 * @param {boolean} findButton 查找操作按键(编辑，或者保存、删除) 默认值false 
 * @param {string} groupName 质控组合名称
 * @param {string} buttonText 按键名称
 */
const findRowDo = (findButton = false, groupName, buttonText) => {
  if (findButton === false) {
    getData().find('.el-switch__core').first().click({
      force: true
    })
  } else {
    getData().contains(groupName).parents('.el-table__row').findByText(buttonText).click({
      force: true
    })
  }
}

/**
 * 
 * @param {string} groupName 质控组合名称
 * @param {boolean} disableGroup 是否停用质控组合 默认停用 true
 * 启用停用质控组合
 */
export const enableOrDisableGroup = (groupName, disableGroup = true) => {
  findRowDo(true, groupName, '编辑')
  cy.wait(1000)
  findRowDo(false)
  waitIntercept(interceptCreateGroup, () => {

    getData().findByText('保存').click({
      force: true
    })
  }, () => {
    if (disableGroup) {
      cy.get('#tab-0').click({
        force: true
      })
    } else {
      cy.get('#tab-1').click({
        force: true
      })
    }
  })
  cy.wait(2000)
  cy.get('.el-table__body').find('.el-table__row').contains(groupName).should('exist')
}