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

export const getSingleImportOption = (prop) => {
  return cy.get('.el-menu:visible').first().contains(prop)
}

export const interceptDeleteReportData = () => {
  return interceptAll('service/base/qc/data/*', interceptDeleteReportData.name, '/cqb-base')
}

/**
 * 
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns 
 */
export const mathRomdomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * 
 * @param {string} instrument 仪器名称
 * @param {string} batchGroupName 质控批号
 * @param {string} itemName 项目名称
 */
export const selectConfig = (instrument, batchGroupName, itemName) => {
  cy.get('.page-title').parents('.el-main.ql-main').within(() => {
    const $getInstrument = cy.get('.el-menu:visible').first().contains(instrument)
    $getInstrument.parents('.el-submenu').within((element) => {
      if (element.hasClass('is-opened')) {
        getSingleImportOption(batchGroupName).parent().parent().then(batchElement => {
          if (batchElement.hasClass('is-opened')) {
            getSingleImportOption(itemName).click({
              force: true
            })
          } else {
            getSingleImportOption(batchGroupName).parent().parent().within(() => {
              cy.get('.el-submenu__icon-arrow:visible').click({
                force: true
              })
              getSingleImportOption(itemName).click({
                force: true
              })
            })
          }
        })
      } else {
        $getInstrument.find('.el-submenu__icon-arrow:visible').click({
          force: true
        })
        getSingleImportOption(batchGroupName).parent().parent().within(() => {
          cy.get('.el-submenu__icon-arrow:visible').click({
            force: true
          })
          getSingleImportOption(itemName).click({
            force: true
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
      .last()
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
  return interceptAll('service/base/loginUrl/IQC?*',interceptSkipIqc.name,'/cqb-base')
}

export const interceptWaitPage = () => {
  return interceptAll('service/base/qc/data/multi?*',interceptWaitPage.name,'/cqb-base')
}

export const interceptQueryQcData = () => {
  return interceptAll('service/base/qc/data?*',interceptQueryQcData.name,'/cqb-base')
}