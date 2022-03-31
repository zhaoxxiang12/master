import {
  interceptAll
} from '../common/http'
import {
  activeSelect
} from '../common/select'
import { findButton } from '../eqa/eqa-plan/eqa-plan'
import { selectDropListValue } from '../eqa/eqa-report/eqa-report'
import { getDialog } from '../message/message'

/**
 * 
 * @param {string} text 项目分类
 * @param {string} itemTypeName 分类名称
 */
export const addItemType = (text, itemTypeName) => {
  cy.get('.el-button').contains('添加项目分类').click({
    force: true
  })
  cy.wait(2000)
  getDialog('添加项目分类').within(() => {
    elform('typeId').click()
    activeSelect(text)
    elform('tagName').type(itemTypeName)
  })
}

export const findLabel = (labelText) => {
  return findLabelOption(labelText).find('.el-input__inner')
}

export const findLabelOption = (labelText) => {
  return cy.get('.el-form-item__label').contains(labelText).parent()
}

export const elformSwitch = (prop,text) => {
 return cy.get('.el-form:visible').last().find(`[for="${prop}"]`).next('.el-form-item__content').find('span').contains(text)
}

export const elform = (prop,boxType) => {
  if (boxType) {
    return cy.get('.el-form').last().find(`[for="${prop}"]`).next('.el-form-item__content').find(`[type=${boxType}]`)
  } else {
    return cy.get('.el-form:visible').last().find(`[for="${prop}"]`).next('.el-form-item__content').find('.el-input__inner:visible')
  }
  
}

export const getItemOption = (itemName,option) => {
  if (option === 'delete') {
    return cy.get('.item-configNew__list').contains(itemName).parents('.ql-itemCard__body').find('.el-icon-delete').click({
      force:true
    })
  } else if (option === 'edit') {
    return cy.get('.item-configNew__list').contains(itemName).parents('.ql-itemCard__body').find('.el-icon-edit').click({
      force:true
    })
  } else {
    return cy.get('.item-configNew__list').contains(itemName).parents('.ql-itemCard__body').find('.el-switch__core')
  }
}

export const assertError = (text) => {
  cy.get('.el-form-item__error').should('contain', text)
}

export const interceptAddItemSpec = () => {
  return interceptAll('service/mgr/itemCategory', interceptAddItemSpec.name)
}

export const interceptDeleteItemSpec = () => {
  return interceptAll('service/mgr/itemCategory/*', interceptDeleteItemSpec.name)
}

export const interceptAddItem = () => {
  return interceptAll('service/mgr/itemCclRela', interceptAddItem.name)
}

export const interceptDeleteItem = () => {
  return interceptAll('service/mgr/itemCclRela/*',interceptDeleteItem.name)
}

export const interceptQueryItem = () => {
  return interceptAll('service/mgr/itemCclRela/category?*',interceptQueryItem.name)
}

export const interceptSaveData = () => {
  return interceptAll('service/mgr/itemCclRela/status',interceptSaveData.name)
}
/**
 * 
 * @param {string} itemName 项目名称
 * @param {string} itemType 上报类型
 * @param {string} unit 默认单位
 * @param {string} sourceId 允许总误差
 */
export const addItem = (itemName, itemType, unit, sourceId,itemShortName,itemCHNName) => {
  cy.get('.el-footer').findByText('添加项目').click({
    force: true
  })
  if (itemName==='自定义') {
    getDialog('添加项目').within(() => {
      elform('itemId').click()
    })
    dropListSelect(itemName)
    if (itemShortName) {
      getDialog('添加项目').within(() => {
        cy.get('.el-form').last().find('[for="itemId"]').next('.el-form-item__content')
        .findAllByPlaceholderText('请输入项目简称')
        .clear()
        .type(itemShortName)
      })
    }
    if (itemCHNName) {
      getDialog('添加项目').within(() => {
        cy.get('.el-form').last().find('[for="itemId"]').next('.el-form-item__content')
        .findAllByPlaceholderText('请输入项目中文名称')
        .clear()
        .type(itemCHNName)
      })
    }
  }else {
    getDialog('添加项目').within(() => {
      elform('itemId').click()
    })
    activeSelect(itemName) 
  }
  if (itemType) {
    getDialog('添加项目').within(() => {
      elform('itemType').click()
    })
    dropListSelect(itemType)
  }
  if (unit) {
    getDialog('添加项目').within(() => {
      elform('unitId').click()
    })
    dropListSelect(unit)
  }
  if (sourceId) {
    getDialog('添加项目').within(() => {
      elform('sourceId').click() 
    })
    activeSelect(sourceId)
  }
}

/**
 * @param {string} itemSpec 项目分类
 * @param {string} itemName 项目名称
 * @param {string} reportSpec 上报类型
 * @param {string} unit 默认单位
 * @param {string} sourceId 允许总误差
 */
export const editItem = (itemSpec,itemName,reportSpec,unit,sourceId) => {
  if (itemSpec) {
    getDialog('编辑项目').within(() => {
      elform('categoryId').click()
    })
    selectDropListValue(itemSpec)
  }
  if (itemName) {
    getDialog('编辑项目').within(() => {
      elform('itemId').click()
    })
    selectDropListValue(itemName)
  }
  if (reportSpec) {
    getDialog('编辑项目').within(() => {
      elform('itemType').click()
    })
    selectDropListValue(reportSpec)
  }
  if (unit) {
    getDialog('编辑项目').within(() => {
      elform('unitId').click()
    })
    selectDropListValue(unit)
  }
  if (sourceId) {
    getDialog('编辑项目').within(() => {
      elform('sourceId').click()
    })
    selectDropListValue(sourceId)
  }
}

export const dropListSelect = (text) => {
  cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains(text)
    .should('exist')
    .click()
}

export const getItemLength = () => {
  return cy.get('.item-configNew__list').find('div').eq(0).find('.el-card.ql-itemCard.item-configNew__item.is-always-shadow')
}

export const queryItemTeaSource = () => {
  return interceptAll('service/mgr/common/itemTeaSource?itemIds=*', queryItemTeaSource.name)
}