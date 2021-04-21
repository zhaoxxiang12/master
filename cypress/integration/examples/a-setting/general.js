context('通用功能', () => {
    before(() => {
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/system/general')
    })
    it('001-通用功能-拉取差异性分析报告', () => {
        let differenceReport = 0
        cy.get('.el-collapse-item__header').eq(differenceReport).click()
        cy.intercept('**/cqb-base-mgr/service/mgr/lab/report/monthdiff/syncReport?adminCclCode*').as('syncReport')
        cy.get('button').contains('拉取').click()
        cy.wait('@syncReport').then((getData)=>{
            let responseStatus = getData.response.statusCode
            let expectStatus = 200
            expect(responseStatus).to.eq(expectStatus) 
            cy.get('body').should('ccontain','执行完成')
        }) 
        cy.get('.el-collapse-item__header').eq(differenceReport).click()    
    })
    it('002-通用功能-广东EQA数据处理-拉取', () => {
        let eqaData = 1
        let pullButton = 1
        cy.wait(2000)
        cy.get('.el-collapse-item__header').eq(eqaData).click()
        cy.intercept('**/cqb-base-mgr/service/mgr/eqa/importGdEqa?adminCclCode*').as('importGdEqa')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(pullButton).click()
        cy.wait('@importGdEqa').then((getData)=>{
            let responseStatus = getData.response.statusCode
            let expectStatus = 200
            expect(responseStatus).to.eq(expectStatus)
            cy.get('body').should('contain','任务已经开始执行，请查看系统日志跟进执行进展')      
        }) 
    })
    it('003-通用功能-广东EQA数据处理-更新对照数据', () => {
        let eqaData = 1
        cy.intercept('**/cqb-base-mgr/service/mgr/eqa/syncGdEqaItemCodeMap?adminCclCode*').as('syncGdEqaItemCodeMap')
        cy.get('button').contains('更新对照数据').click()
        cy.wait('@syncGdEqaItemCodeMap').then((getData)=>{
            let responseStatus = getData.response.statusCode
            let expectStatus = 200
            expect(responseStatus).to.eq(expectStatus)
            cy.get('body').should('contain','操作成功')
        }) 
        cy.get('.el-collapse-item__header').eq(eqaData).click()
    })
    it('004-通用功能-同步标准数据', () => {
        let standardData = 2
        cy.get('.el-collapse-item__header').eq(standardData).click()
        cy.get('button').contains('同步').click()
        cy.intercept('**/cqb-base-mgr/service/mgr/code/sync*').as('sync')
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click()
        cy.wait('@sync').then((getData)=>{
            let responseStatus = getData.response.statusCode
            let expectStatus = 200
            expect(responseStatus).to.eq(expectStatus)
            cy.get('body').should('contain','操作开始执行,请查阅系统日志了解执行进展')
        }) 
        cy.get('.el-collapse-item__header').eq(2).click()
    })
    it('005-通用功能-同步GPS坐标', () => {
        let GPSCoordinates = 3
        let synchronized = 4
        cy.get('.el-collapse-item__header').eq(GPSCoordinates).click()
        cy.get('.el-button.el-button--primary.el-button--medium').eq(synchronized).click()
        cy.intercept('**/cqb-base-mgr/service/mgr/lab/updateAllNoGps*').as('updateAllNoGps')
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click()
        cy.wait('@updateAllNoGps').then((getData)=>{
            let responseStatus = getData.response.statusCode
            let expectStatus = 200
            expect(responseStatus).to.eq(expectStatus)
            cy.get('body').should('contain','操作开始执行,请查阅系统日志了解执行进展')
        }) 
        cy.get('.el-collapse-item__header').eq(GPSCoordinates).click()
    })
})