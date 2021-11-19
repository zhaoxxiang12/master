import {
  interceptAll
} from '../common/http'
import {
  activeSelect
} from '../common/select'
import {
  dropListSelect,
  elform
} from '../mutual-result/mutual-item'

const params = {
  instrument: {
    type: 1,
    index: 0
  },
  testMethod: {
    type: 1,
    index: 1
  },
  nuReagent: {
    type: 1,
    index: 2
  },
  testReagent: {
    type: 1,
    index: 3
  },
  testCalibration: {
    type: 1,
    index: 4
  },
  unit: {
    type: 1,
    index: 5
  },
  instrumentNo: {
    type: 2
  },
  resultType: {
    type: 3
  },
  CTValue: {
    type: 4
  }
}

export const createConfig = (paramMap,selfValue) => {
  for (const key in paramMap) {
    const context = params[key]
    if (context.type === 1) {
      clickPlaceHolder('请输入').eq(context.index).click()
      cy.wait(2000)
      dropListSelect(paramMap[key])
      cy.wait(1000)
      checkParam(paramMap[key],selfValue)
    } else if (context.type === 2) {
      clickPlaceHolder('请输入或自动生成').type(paramMap[key])
    } else if (context.type === 3) {
      clickPlaceHolder('请选择').click()
      cy.wait(2000)
      activeSelect(paramMap[key])
    } else {
      cy.get('.data-table__body').find('.item-table__inline').within(() => {
        cy.get('.el-input__inner').last().type(paramMap[key])
      })
    }
  }
}

export const checkParam = (param,value) => {
  if (param === '自定义') {
    for (const key in value) {
      clickPlaceHolder('请输入自定义名称','.el-popover.el-popper')
        .type(value[key])
      clickPlaceHolder('请输入自定义名称','.el-popover.el-popper')
        .parent()
        .findByText('确认')
        .click({
          force:true
        })
    }
  }
}

export const clickElformButton = (prop, text) => {
  cy.get(`[aria-label="${prop}"] .el-form`)
    .findByText(text)
    .click({
      force: true
    })
}

export const interceptItemTesting = () => {
  return interceptAll('service/base/qc/itemTesting', interceptItemTesting.name, '/cqb-base')
}

export const interceptDeleteItemTesting = () => {
  return interceptAll('service/base/qc/itemTesting/*', interceptDeleteItemTesting.name, '/cqb-base')
}
/**
 * 
 * @param {string} placeHolderText 下拉框名字
 * @returns 
 */
export const clickPlaceHolder = (placeHolderText,className) => {
  if(className) {
    return cy.get(className).find(`[placeholder=${placeHolderText}]:visible`)
  } else {
    return cy.get('.data-table__body').findAllByPlaceholderText(placeHolderText)
  }
}

export const clickConfigButton = (item, text) => {
  cy.get('.data-table__body').find('tbody').find('.item-cell__text').contains(item)
    .parents('tbody').find('tr').last()
    .find('.el-button.el-button--text').contains(text).click({
      force: true
    })
}

export const enableItem = (itemName) => {
  cy.get('.data-table__body').find('tbody').find('.item-cell__text').contains(itemName)
    .parents('tbody').find('tr').last()
    .find('.el-switch__core').click({
      force:true
    }) 
}

export const getItemTestingLength = (item) => {
  return cy.get('.data-table__body').find('tbody').find('.item-cell__text')
    .contains(item)
    .parents('tbody')
    .find('tr')
}

export const getConfigOption = (itemName) => {
  return cy.get('.data-table__body').contains(itemName).parents('.item-cell ')
}

export const enterPreserveMode = () => {
  cy.get('.detection-sys__tool').find('.cqbicon').click({
    force: true
  })
  cy.fixture('labgd18030').then((labJson) => {
    elform('oldPwd').clear().type(labJson.password)
    clickElformButton('提示', '确定')
  })
}

export const quitPreserveMode = (text) => {
  cy.get('.detection-sys__tool').findByText('退出维护模式').click({
    force: true
  })
  closeModeTips(text)
}

/**
 * 
 * @param {string} majorName 专业名称
 */
export const selectMajor = (majorName) => {
  cy.get('.el-tabs__nav.is-top:visible').contains(majorName).click({
    force: true
  })
}

export const interceptQueryInstr = () => {
  return interceptAll('service/base/common/instr',interceptQueryInstr.name,'/cqb-base')
}

export const interceptQueryItemTesting = () => {
  return interceptAll('service/base/item?categoryId=*',interceptQueryItemTesting.name,'/cqb-base')
}

export const getPageData = (itemName) => {
  return cy.get('.data-table__body').find('tbody').find('.item-cell__text').contains(itemName)
    .parents('tbody').find('tr').last().find('td').eq(8).invoke('text')
}

export const validEnterPreserveMode = (cb) => {
  cy.get('.detection-sys__tool').last().find('.cqbicon').then(element => {
    if (element.hasClass('icon-logout')) {
      cb()
    } else {
      enterPreserveMode()
      cb()
    }
    cy.wait(1000)
  })
}

export const closeModeTips = (text) => {
  cy.document()
    .its('body', {
      timeout: 5000
    }).then($el => {
      if ($el.find('[aria-label="提示"]:visible').length > 0) {
        cy.get('.el-message-box__wrapper')
          .within($el => {
            if ($el.length) {
              cy.findByText(text)
                .click({
                  force: true
                })
            }
          })
      }
    })
}