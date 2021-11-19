/**
 * 单项目数据录入
 */
import dayjs from 'dayjs'
import {
  visitLabPage
} from '../../shared/route'
import {
  clickCancelInDialog,
  withinDialog
} from '../common/dialog'
import {
  clickListener
} from '../common/event'
import {
  validExcelFile
} from '../common/file'
import {
  waitIntercept
} from '../common/http'
import {
  closeClientAlert,
  validSuccessMessage,
} from '../common/message'
import {
  clickConfigButton,
  createConfig,
  enterPreserveMode,
  getConfigOption,
  interceptItemTesting,
  selectMajor
} from '../ds-config/ds-config'
import {
  relateConfig,
  removeBatchGroup,
  reportData
} from '../qc-data/qc-data'
import {
  findDialogButton,
  interceptQueryQcData,
  interceptSkipIqc,
  interceptWaitPage,
  mathRomdomNumber,
  reportDataOption,
  selectConfig
} from './single-import'

context('单项目数据录入', () => {
  const year = dayjs().format('YYYY')
  const month = dayjs().format('MM')
  const day = dayjs().format('DD')
  before(() => {
    cy.visitLabPage('single-import', 'labgd18030')
  })
  context('上报/修改/删除数据', () => {
    const instrument = '奥林巴斯 AU400'
    const testMethod = '干化学'
    const nuReagent = '拜耳'
    const testReagent = '科方(广州)'
    const testCalibration = '希森美康'
    const unit = 'mmol/L'
    const CTValue = 25
    const resultType = '定量'
    const itemName = '病毒基因E区'
    const batchGroupName = '伯乐201910'
    before(() => {
      visitLabPage('ds-config')
      selectMajor('新冠病毒核酸检测')
      cy.wait(2000)
      enterPreserveMode()
      getConfigOption(itemName).findByText('添加').click({
        force: true
      })
      createConfig({
        instrument,
        testMethod,
        nuReagent,
        testReagent,
        testCalibration,
        unit,
        CTValue,
        resultType
      })
      waitIntercept(interceptItemTesting, () => {
        clickConfigButton(itemName, '保存')
      }, () => {
        cy.wait(2000)
      })
      visitLabPage('qc-relate')
      cy.wait(2000)
      relateConfig(instrument, batchGroupName)
    })
    it('上报数据', () => {
      visitLabPage('single-import')
      cy.wait(3000)
      selectConfig(instrument, batchGroupName, itemName)
      reportData(mathRomdomNumber(1, 100))

    })
    it('修改上报数据', () => {
      cy.wait(2000)
      reportDataOption('edit', mathRomdomNumber(1, 100))
    })
    it('删除上报数据', () => {
      cy.wait(2000)
      reportDataOption('delete')
    })
    it('删除检测体系', () => {
      visitLabPage('qc-relate')
      cy.wait(3000)
      closeClientAlert()
      selectMajor('新冠病毒核酸检测')
      cy.wait(1000)
      removeBatchGroup(itemName)
    })
  })
  context('多项目数据录入', () => {
    before(() => {
      waitIntercept(interceptWaitPage, () => {
        visitLabPage('multiple-import')
      }, () => {
        cy.wait(3000)
      })
    })
    it('多项目数据录入', () => {
      reportData(23, true)
      validSuccessMessage()
    })
    it('跳转IQC', () => {
      waitIntercept(interceptSkipIqc, () => {
        cy.get('.data-import-tool-bar').findByText('跳转到IQC').click({
          force: true
        })
      }, () => {
        cy.getIframe().find('.ql-layout__title').should('have.text', '质控数据维护')
      })
    })
  })
  context.only('数据导出', () => {
    let qcData
    before(() => {
      waitIntercept(interceptQueryQcData, () => {
        visitLabPage('single-import')
        cy.wait(3000)
        closeClientAlert()
      }, data => {
        qcData = data
      })
    })
    it('数据导出', () => {
      cy.wait(3000)
      cy.get('.data-import-tool-bar').findByText('导出数据').click({
        force: true
      })
      clickListener(() => {
        findDialogButton('质控数据导出', '导出')
      },8000)
    })
    it('验证Excel数据', () => {
      // const excelName = dayjs().format('YYYY-MM-DD') + '.xls'
      const excelName = '2021-11-18.xls'
      validExcelFile(excelName, data => {
        console.log(data);
      })
    })
  })
})