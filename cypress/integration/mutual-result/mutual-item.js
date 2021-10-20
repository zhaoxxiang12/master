import {
  interceptAll
} from "../common/http"
import {
  activeSelect
} from "../common/select"

/**
 * 
 * @param {string} text 项目分类
 * @param {string} itemTypeName 分类名称
 */
export const addItemType = (text, itemTypeName) => {
  cy.get('button').findByText('添加项目分类').click({
    force: true
  })
  elform('typeId').click()
  activeSelect(text)
  elform('tagName').type(itemTypeName)
}

export const elform = (prop,boxType) => {
  if (boxType) {
    return cy.get('.el-form').last().find(`[for="${prop}"]`).next('.el-form-item__content').find(`[type=${boxType}]`)
  } else {
    return cy.get('.el-form').last().find(`[for="${prop}"]`).next('.el-form-item__content').find('.el-input__inner')
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
    elform('itemId').click()
    dropListSelect(itemName)
    if (itemShortName) {
      cy.get('.el-form').last().find(`[for="itemId"]`).next('.el-form-item__content')
      .findAllByPlaceholderText('请输入项目简称')
      .clear()
      .type(itemShortName)
    }
    if (itemCHNName) {
      cy.get('.el-form').last().find(`[for="itemId"]`).next('.el-form-item__content')
      .findAllByPlaceholderText('请输入项目中文名称')
      .clear()
      .type(itemCHNName)
    }
  }else {
    elform('itemId').click()
    activeSelect(itemName) 
  }
  if (itemType) {
    elform('itemType').click()
    dropListSelect(itemType)
  }
  if (unit) {
    elform('unitId').click()
   dropListSelect(unit)
  }
  if (sourceId) {
    elform('sourceId').click()
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
    elform('categoryId').click()
    activeSelect(itemSpec)
  }
  if (itemName) {
    elform('itemId').click()
    activeSelect(itemName)
  }
  if (reportSpec) {
    elform('itemType').click()
    dropListSelect(reportSpec)
  }
  if (unit) {
    elform('unitId').click()
    activeSelect(unit)
  }
  if (sourceId) {
    elform('sourceId').click()
    activeSelect(sourceId)
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