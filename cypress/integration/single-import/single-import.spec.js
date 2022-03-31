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
  waitIntercept, waitRequest
} from '../common/http'
import {
  closeClientAlert,
  validErrorMsg,
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
  interceptQueryGroupName,
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
    let batchGroupName 
    before(() => {
      visitLabPage('ds-config')
      cy.wait(3000)
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
      waitIntercept(interceptQueryGroupName, () => {
        visitLabPage('qc-relate')
      }, groupName => {
         batchGroupName =   groupName[0].groupName
        cy.wait(2000)
        relateConfig(instrument, batchGroupName)
      }) 
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
      cy.wait(5000)
      removeBatchGroup(itemName)
    })
  })
  context('多项目数据录入', () => {
    let groupId, instrId, instrNo, testingId
    before(() => {
      const waitOptions = {
        timeout: 90000
      }
      waitRequest({
        waitOptions,
        intercept: interceptWaitPage,
        onBefore: () => {
        visitLabPage('multiple-import')
      },
      onSuccess: (data) => {
          groupId = data[0].batchNoGroup.groupId
          instrId = data[0].itemTesting.instrId
          instrNo = data[0].itemTesting.instrNo
          testingId = data[0].itemTesting.testingId
          cy.wait(3000)
        }
      })
    })
    it('多项目数据录入', () => {
      reportData(23, true)
      validSuccessMessage()
    })
    it('跳转IQC', () => {
      const IqcUrl = `http://lab-cqb.test.sh-weiyi.com/cqb-base/service/base/loginUrl/IQC?toPage=qcRecord&
      groupId=${groupId}&instrId=${instrId}&instrNo=${instrNo}&testingId=${testingId}&showDisable=false&isDL=true`
      cy.request({
        method: 'GET',
        url: IqcUrl
      }).as('getUrl')
      cy.get('@getUrl').then((response) => {
        waitRequest({
          intercept:interceptSkipIqc, 
          onBefore: () => {
            cy.visit(response.body.data)
        }, 
        onSuccess:(data) => {
          console.log(data);
          cy.get('.ql-layout__title').should('have.text', '质控数据维护')
        },
        onError: (msg) => {
          validErrorMsg()
        }
      })
      })
    })
  })
})