context('监控内容配置', () => {
    let urlHost = 'http://cqb-mgr.sh.test.sh-weiyi.com/cqb-base-mgr-fe/app.html'

        // 定义一个getIframeBody的方法
        const getIframeBody = () => {
            //尝试获取 iframe > document > body 
            // 直到body element 为空
            return cy
                .get('iframe').its('0.contentDocument.body').should('not.be.empty')
            // 包装body DOM元素以允许链接更多Cypress 命令, 如 ".find(...)"
            // warp命令使用文档地址 https://on.cypress.io/wrap
            .then(cy.wrap)

        }
        beforeEach(() => {
            let SettingIndex = 14
            let ReportMonitorSetting = 38
    
            cy.loginCQB()
            //点击设置
            cy.get('.el-submenu__title').eq(SettingIndex).click({
                force: true
            })
            //点击监控内容配置
            cy.wait(500)
            cy.get('.el-menu-item').eq(ReportMonitorSetting).click({
                force: true
            })
      
    })
    it('014-监控内容配置-查看IQC信息', () => {
        let labCode = 'gd18020'
        let inputBox = 0
        let reportDetails = 0
        cy.get('input[placeholder="实验室名称或编码"]').eq(inputBox).type(labCode, {
            force: true
        })
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(500)
        cy.get('.ql-lab-list__status').find('div').eq(reportDetails).click({
            force: true
        })
        cy.server()
        cy.route('**/cqb-base-mgr/service/mgr/iqccenternew/getLoginUrl?*').as('getData')
        cy.visit(urlHost + '#/setting/report-monitor')
        cy.get('button').contains('查看IQC信息').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let responseStatus = xhr.status

            let expectStatus = 200
            //判断接口是否异常
            expect(responseStatus).to.equal(expectStatus)
            cy.wait(5000)
            // 获取class=ql-layout__title
            getIframeBody().find('.ql-layout__title').should('have.text','2')
        })
    })
})