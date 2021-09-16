import { loginMgr } from '../../shared/util'

context('通用功能', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/setting/system/general')
  })
  it('001-通用功能-拉取科临报告', () => {
    cy.get('.el-collapse').contains('拉取科临报告').click()
    //------------参考区间调查反馈报告------------
    cy.get('[placeholder="请选择"]').eq(1).click()
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('佛山市临床检验质量控制中心').click()
    cy.intercept({
      url: '**/cqb-base-mgr/service/v2/report/EXT_KL_REF/pull?*',
      method: 'GET'
    }).as('pullReport')
    cy.get('button').contains('拉取').click()
    cy.wait('@pullReport').then((xhr) => {
      cy.compare(xhr)
    })
    //------------患者数据调查反馈报告------------
    cy.get('[placeholder="请选择"]').first().click()
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('患者数据调查反馈报告').click()
    cy.intercept({
      url: '**/cqb-base-mgr/service/v2/report/EXT_KL_PAT/pull?reportType=EXT_KL_PAT*',
      method: 'GET'
    }).as('pullPatientReport')
    cy.get('button').contains('拉取').click()
    cy.wait('@pullPatientReport').then((xhr) => {
      cy.compare(xhr)
    })
    //------------实验室质量指标调查反馈报告--------
    cy.get('[placeholder="请选择"]').first().click()
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('实验室质量指标调查反馈报告').click()
    cy.intercept({
      url: '**/cqb-base-mgr/service/v2/report/EXT_KL_QI/pull?reportType=EXT_KL_QI*',
      method: 'GET'
    }).as('pullQIReport')
    cy.get('button').contains('拉取').click()
    cy.wait('@pullQIReport').then((xhr) => {
      cy.compare(xhr)
    })
    cy.get('.el-collapse').contains('拉取科临报告').click()
  })
  it('002-通用功能-拉取差异性分析报告', () => {
    let pullButton = 1
    cy.get('.el-collapse').contains('拉取差异性分析报告').click()
    cy.intercept('**/cqb-base-mgr/service/mgr/lab/report/monthdiff/syncReport?adminCclCode*').as('syncReport')
    cy.get('.el-button.el-button--primary.el-button--medium').eq(pullButton).click()
    cy.wait('@syncReport').then((getData) => {
      cy.compare(getData)
    })
    cy.get('.el-collapse').contains('拉取差异性分析报告').click()
  })
  it('003-通用功能-广东EQA数据处理-拉取', () => {
    let pullButton = 2
    cy.wait(2000)
    cy.get('.el-collapse').contains('EQA数据处理').click()
    cy.intercept('**/cqb-base-mgr/service/mgr/eqa/importGdEqa?adminCclCode*').as('importGdEqa')
    cy.get('.el-button.el-button--primary.el-button--medium').eq(pullButton).click({
      force: true
    })
    cy.wait('@importGdEqa').then((getData) => {
      cy.compare(getData)
    })
  })
  it('004-通用功能-广东EQA数据处理-更新对照数据', () => {
    cy.intercept('**/cqb-base-mgr/service/mgr/eqa/syncGdEqaItemCodeMap?adminCclCode*').as('syncGdEqaItemCodeMap')
    cy.get('button').contains('更新对照数据').click()
    cy.wait('@syncGdEqaItemCodeMap').then((getData) => {
      cy.compare(getData)
      cy.get('body').should('contain', '操作成功')
    })
    cy.get('.el-collapse').contains('EQA数据处理').click()
  })
  it('005-通用功能-同步标准数据', () => {
    cy.get('.el-collapse').contains('同步标准数据').click()
    cy.get('button').contains('同步').click()
    cy.intercept('**/cqb-base-mgr/service/mgr/code/sync*').as('sync')
    cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click()
    cy.wait('@sync').then((getData) => {
      cy.compare(getData)
      cy.get('body').should('contain', '操作开始执行,请查阅系统日志了解执行进展')
    })
    cy.get('.el-collapse').contains('同步标准数据').click()
  })
  it('006-通用功能-同步GPS坐标', () => {
    let synchronized = 5
    cy.get('.el-collapse').contains('实验室GPS坐标').click()
    cy.get('.el-button.el-button--primary.el-button--medium').eq(synchronized).click({
      force: true
    })
    cy.intercept({
      url: '/cqb-base-mgr/service/mgr/lab/updateAllNoGps',
      method: 'GET'
    }).as('updateAllNoGps')
    cy.get('.el-message-box').find('button').contains('同步').click({
      force: true
    })
    cy.wait('@updateAllNoGps').then((getData) => {
      cy.compare(getData)
      cy.get('body').should('contain', '操作开始执行,请查阅系统日志了解执行进展')
    })
    cy.get('.el-collapse').contains('实验室GPS坐标').click()
  })
})