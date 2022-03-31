import {
  confirmDelete
} from '../common/dialog'
import {
  interceptAll,
  waitIntercept
} from '../common/http'
import {
  validSuccessMessage
} from '../common/message'
import {
  clickSaveData,
  interceptReportData
} from '../qc-data/qc-data'

export const getRelateOption = (instrumentName, option) => {
  return cy.get('.el-table__body:visible .el-table__row')
    .contains(instrumentName)
    .parents('.el-table__row')
    .findByText(option)
}

/**
 * 选择项目
 * @param {text} prop 
 * @returns 
 */
export const getSingleImportOption = (prop) => {
  return cy.get('.el-menu-item').contains(prop)
}

export const interceptDeleteReportData = () => {
  return interceptAll('service/base/qc/data/*', interceptDeleteReportData.name, '/cqb-base')
}

export const interceptQueryGroupName = () => {
  return interceptAll('service/base/qc/group', interceptQueryGroupName.name, 'cqb-base')
}

/**
 * 生成随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns 
 */
export const mathRomdomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * 
 * @param {string} batchGroupName 质控组合名称
 * @returns 
 */
const getItemTestingGroupName = (batchGroupName) => {
  return cy.get('.el-menu').contains(batchGroupName).parent().parent()
}

/**
 * 
 * @param {string} instrument 仪器名称
 * @returns 
 */
const getInstrumentOption = (instrument) => {
  return cy.get('.el-submenu__icon-arrow').parent().contains(instrument).parent()
}

/**
 * 选择检测体系
 * @param {string} instrument 仪器名称
 * @param {string} batchGroupName 质控批号
 * @param {string} itemName 项目名称
 */
export const selectConfig = (instrument, batchGroupName, itemName) => {
  cy.get('.data-import-menu:visible').within(() => {
    const $getInstrument = cy.get('.el-menu:visible').first().contains(instrument)
    $getInstrument.parents('.el-submenu').within((element) => {
      if (element.hasClass('is-opened')) {//判断选择的仪器是否是打开的
        cy.get('.el-menu').contains(batchGroupName).parent().parent().then(batchElement => {
          if (batchElement.hasClass('is-opened')) { //判断选择的质控组合是否是打开的
            getSingleImportOption(itemName).click({
              force: true
            })
          } else { //质控品未展开就点击该质控组合,然后再点击要上报的项目
            getItemTestingGroupName(batchGroupName).within(() => {
              cy.get('.el-submenu__icon-arrow').click({
                force:true
              })
              getSingleImportOption(itemName).click({
                force:true
              })
            })     
          }
        })
      } else {//仪器下的数据未展示,需要进行点击展示
        getInstrumentOption(instrument).within(() => {
          cy.get('.el-submenu__icon-arrow').click({
            force:true
          })
        })
        //点击质控组合展示数据图表
        getInstrumentOption(instrument).next('.el-menu').contains(batchGroupName).parent().parent()
        .within(() => {
          cy.get('.el-submenu__icon-arrow')
          .click({
            force: true
          })
          //点击项目名称
          getSingleImportOption(itemName).click({
            force:true
          })
        })
      }
    })
  })
}

export const reportDataOption = (option, data) => {
  if (option === 'edit') {
    cy.get('.el-table__body:visible').last().find('.el-icon-edit').click({
      force: true
    })
    cy.get('.el-table__body:visible')
      .first()
      .find('.el-input__inner')
      .last()
      .clear({
        force: true
      })
      .type(data, {
        force: true
      })
    waitIntercept(interceptReportData, () => {
      clickSaveData()
    }, () => {
      validSuccessMessage()
    })
  } else {
    cy.get('.el-table__body:visible').last().find('.el-icon-delete').click({
      force: true
    })
    waitIntercept(interceptDeleteReportData, () => {
      confirmDelete()
    }, () => {
      validSuccessMessage()
    })
  }
}

export const findDialogButton = (title,buttonText) => {
  cy.get(`[aria-label=${title}]:visible`).findByText(buttonText).click({
    force:true
  })
}

export const interceptBatchImport =() => {
  return interceptAll('service/base/qc/data/batch',interceptBatchImport.name,'/cqb-base')
}

export const interceptSkipIqc = () => {
  return interceptAll('service/tree/getCqbTree.do??*',interceptSkipIqc.name,'/iqc-web')
}

export const interceptWaitPage = () => {
  return interceptAll('service/base/qc/data/multi?*',interceptWaitPage.name,'/cqb-base')
}

export const interceptQueryQcData = () => {
  return interceptAll('service/base/qc/data?*',interceptQueryQcData.name,'/cqb-base')
}