import {
  clickOkInDialog,
  closeTips,
  withinDialog
} from '../common/dialog'
import { elFormInput, validFormItemError } from '../common/form'
import {
  interceptAll,
  waitIntercept
} from '../common/http'
import {
  validSuccessMessage
} from '../common/message'
import {
  activeSelect
} from '../common/select'
import {
  findTableCell
} from '../common/table'
import { expandSearchConditions } from '../eqa/eqa-order/eqa-order'
import { selectDropListValue } from '../eqa/eqa-report/eqa-report'
import {
  getDialog
} from '../message/message'
import {
  elform
} from '../mutual-result/mutual-item'
import {
  interceptSaveItem
} from '../mutual-workday/labworkday/mutual-result'
import { clickSearch } from '../setting/report-monitor/report-monitor'


export const interceptLabSetting = () => {
  return interceptAll('service/base/lab/collect', interceptLabSetting.name, '/cqb-base')
}

export const interceptQueryItemStatus = () => {
  return interceptAll('service/base/item?categoryId=*', interceptQueryItemStatus.name + new Date().getTime(), '/cqb-base')
}

export const interceptCollection = () => {
  return interceptAll('service/base/lab/collect',interceptCollection.name,'/cqb-base')
}

export const selectLabSpec = (specText) => {
  cy.get('.el-menu').contains(specText).click({
    force: true
  })
}

export const clickSaveLabDataBtn = () => {
  cy.get('.item-configNew__footer').findByText('保存').click({
    force: true
  })
}

export const getLabItemOption = () => {
  return cy.get('.item-configNew__list:visible .el-button.item-button')
}


export const enableLabItem = (rowIndex) => {
  getLabItemOption().eq(rowIndex).click({
    force: true
  })
  clickSaveLabDataBtn()
  let queryItemStatus
  waitIntercept(interceptSaveItem, () => {
    closeTips('提示', '确定')
    queryItemStatus = interceptQueryItemStatus()
  }, () => {
    validSuccessMessage()
    waitIntercept(queryItemStatus, data => {
      expect(data[rowIndex].status).to.eq(true)
      getLabItemOption().eq(rowIndex).should('have.css', 'background-color', 'rgb(103, 194, 58)')
    })
  })
}

export const disableLabItem = (rowIndex) => {
  getLabItemOption().eq(rowIndex).click({
    force: true
  })
  clickSaveLabDataBtn()
  let queryItemStatus
  waitIntercept(interceptSaveItem, () => {
    closeTips('提示', '确定')
    queryItemStatus = interceptQueryItemStatus()
  }, () => {
    validSuccessMessage()
    waitIntercept(queryItemStatus, data => {
      expect(data[rowIndex].status).to.eq(false)
      getLabItemOption().eq(rowIndex).should('have.css', 'background-color', 'rgb(144, 147, 153)')
    })
  })
}

export const clickSetManyItemStatus = (btnsText) => {
  cy.get('.el-footer').contains(btnsText).click({
    force: true
  })
}

export const setManyItems = (enableMany = true) => {
  if (enableMany === true) {
    clickSetManyItemStatus('启用所有项目')
    clickSaveLabDataBtn()
    let queryItemStatus
    waitIntercept(interceptSaveItem, () => {
      closeTips('提示', '确定')
      queryItemStatus = interceptQueryItemStatus()
    }, () => {
      validSuccessMessage()
      waitIntercept(queryItemStatus, data => {
        data.forEach(item => expect(item.status).to.eq(true))
        for (let i = 0; i < data.length; i++) {
          getLabItemOption().eq(i).should('have.css', 'background-color', 'rgb(103, 194, 58)')
        }
      })
    })
  } else {
    clickSetManyItemStatus('停用所有项目')
    clickSaveLabDataBtn()
    let queryItemStatus
    waitIntercept(interceptSaveItem, () => {
      closeTips('提示', '确定')
      queryItemStatus = interceptQueryItemStatus()
    }, () => {
      validSuccessMessage()
      waitIntercept(queryItemStatus, data => {
        data.forEach(item => expect(item.status).to.eq(false))
        for (let i = 0; i < data.length; i++) {
          getLabItemOption().eq(i).should('have.css', 'background-color', 'rgb(144, 147, 153)')
        }
      })
    })
  }
}

export const createLabCollection = (formName) => {
  cy.findByText('添加表单').click()
  cy.wait(1000)
  elform('formName').type(formName)
  addForm(() => {
    //文本输入框(必填)
    fieldInput(0, '文本输入框')
    //数值输入框(非必填)
    addFieldItem()
    fieldInput(1, '数值输入框')
    findTableCell(1, 1)
      .click()
    cy.wait(500)
    activeSelect('数值')
    findTableCell(1, 2)
      .click()
    cy.wait(500)
    activeSelect('否')
    //字典项
    addFieldItem()
    fieldInput(2, '字典下拉项')
    findTableCell(2, 1)
      .click()
    activeSelect('下拉框')
    openDictItems(2,() => {
      cy.wait(1000)
      addDictItem('手机')
      addDictItem('固定电话')
      clickOkInDialog()
    })
    clickOkInDialog()
  })
}

export const addFieldItem = () => {
  findTableCell(-1, -1)
    .findByText('添加')
    .click()
}

const openDictItems = (rowIndex, cb) => {
  findTableCell(rowIndex, 1)
    .find('button')
    .contains('编辑字典项')
    .click()

  withinDialog(($el) => {
    cb && cb()
  }, '编辑字典项')
}

export const fieldInput = (rowIndex, text) => {
  findTableCell(rowIndex, 0)
    .find('input')
    .type(text)
}


const addDictItem = (text) => {
  cy.get('.dict-card--add')
    .click()

  withinDialog(() => {
    clickOkInDialog()
    validFormItemError('请输入字典项名称')

    elFormInput('name', text)
    clickOkInDialog()
  }, '请输入字典名称')
}

const addForm = (cb) => {
  withinDialog(cb,'添加实验室质量管理信息采集表')
}

export const interceptQueryCollection = () => {
  return interceptAll('service/mgr/evaReport/labCollect', interceptQueryCollection.name)
}

export const findElformButton = (formName,btnsText) => {
  cy.get('.el-table__body:visible').find('.el-table__row')
    .contains(formName)
    .should('exist')
    .parents('.el-table__row')
    .findByText(btnsText)
    .click({
      force:true
    })
}

/**
 * 
 * @param {string} dialogName 弹窗名称
 * @param {string} labName 实验室名称或者编码
 * @param {string} labbelText 标签名
 */
export const relateLab = (dialogName,labName,labelText = '关联实验室') => {
  getDialog(dialogName).within(() => {
    cy.get('label').contains(labelText).parent().find('button').contains('添加').click({
      force:true
    })
    cy.wait(1000)
  })
  selectLab(labName)
}

/**
 * 
 *@param {string} labName 实验室名称或者编码
 */
export const selectLab = (labName) => {
  getDialog('选择实验室').within(() => {
    expandSearchConditions('高级搜索')
  })
  elform('labName')
    .clear({
      force:true
    })
    .type(labName)
  clickSearch()
  cy.wait(1000)
  getDialog('选择实验室').within(() => {
    cy.get('.el-table__body:visible .el-table__row')
      .contains(labName)
      .parents('.el-table__row')
      .find('[type="checkbox"]')
      .check({
        force:true
      })
  })
}

export const findLabLabelOption = (labbelText) => {
  return cy.get('label').contains(labbelText).parents('.el-form-item')
}

export const clickSaveConfig = () => {
  cy.get('.el-form').next('.el-row').contains('保存配置').click({
    force:true
  })
}

export const fillLabInfo = (fieldFormData,fillText,fillNumber,dictIndex) => {
  fieldFormData.map(mapData => {
    if (mapData.fieldType === 'text') {
      findLabLabelOption(mapData.fieldName).find('.el-textarea__inner').clear().type('123')
    } else if (mapData.fieldType === 'number') {
      findLabLabelOption(mapData.fieldName).find('.el-input__inner').clear().type(455)
    }else if (mapData.fieldType === 'radio') {
      findLabLabelOption(mapData.fieldName).find('.el-radio').within(() => {
        cy.get('[type="radio"]').check('true',{
          force:true
        })
      })
    } else {
      if (mapData.option.length > 0){
        findLabLabelOption(mapData.fieldName).find('.el-input__inner').click()
        selectDropListValue(mapData.option[0].optionName)
      }
    }
  })
}

export const getLabForm = () => {
  return  cy.get('.el-table__body .el-table__row')
}