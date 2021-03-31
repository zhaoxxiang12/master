context('月度工作日申请审核', () => {
    beforeEach(() => {
        let startDate = 0
        let startMonth = 0
        let chooseStartMonth = 0
        let endMonth = 2
        let expandButton = 0
        let endDate = 1
        let endDay = 2
        let chooseEndMonth = 3
        let searchButton = 1
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-workday')
        cy.get('.el-button.el-button--text.el-button--medium').eq(expandButton).click({
            force: true
        })
        //选择开始时间2020/1
        cy.get('input[placeholder="开始时间"]').click({
            force: true
        })
        cy.get('.el-date-picker__header-label').eq(startDate).invoke('text').then((getData) => {
            let getYear = parseInt(getData.slice(0, 4))
            let differenceYear = getYear - 2020
            for (let i = 0; i < differenceYear; i++) {
                cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
                    force: true
                })
            }
            cy.get('.el-month-table').find('tbody>tr').eq(startMonth).find('td').eq(chooseStartMonth).click({
                force: true
            })
        })
        //选择结束时间2020/12
        cy.get('input[placeholder="结束时间"]').click({
            force: true
        })
        cy.get('.el-date-picker__header-label').eq(endMonth).invoke('text').then((getData) => {
            let endYear = parseInt(getData.slice(0, 4))
            let differenceYear = endYear - 2021
            if (differenceYear == 0) {
                cy.get('.el-month-table').eq(endDate).find('tbody>tr').eq(endDay).find('td').eq(chooseEndMonth).click({
                    force: true
                })
            } else {
                for (let i = 0; i < differenceYear; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').eq(endDate).click({
                        force: true
                    })
                }
                cy.get('.el-month-table').eq(endDate).find('tbody>tr').eq(endDay).find('td').eq(chooseEndMonth).click({
                    force: true
                })
            }
        })
        cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
            force: true
        })
    })
    it('0001-工作日申请-批量审核不通过', () => {
        let auditStatus = 2
        let dropList = 3
        let notAudited = 1
        let searchButton = 1
        cy.get('input[placeholder="请选择"]').eq(auditStatus).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(notAudited).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
            force: true
        })
        cy.wait(500)
        //勾选两条数据
        cy.get('.el-checkbox__inner').eq(3).click({
            force: true
        })
        cy.get('.el-checkbox__inner').eq(4).click({
            force: true
        })
        cy.wait(500)
        cy.intercept('**/cqb-base-mgr/service/mgr/item/workDays/batch/audit*').as('getPage')
        //点击批量审核不通过
        cy.get('.el-button.el-button--danger.el-button--medium.is-plain').click({
            force: true
        })
        //确认审核
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
            force: true
        })
        cy.wait('@getPage').then((xhr) => {
            let getStatus = xhr.response.statusCode
            let expectStatus = 200
            expect(getStatus).to.eq(expectStatus)
            cy.get('body').should('contain', '已处理审核不通过')
        })
    })
    it('0002-工作日申请-批量审核通过', () => {
        let auditStatus = 2
        let dropList = 3
        let audited = 2
        let searchButton = 1
        let auditedMany = 0
        cy.get('input[placeholder="请选择"]').eq(auditStatus).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(audited).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
            force: true
        })
        cy.wait(500)
        //勾选两条数据
        cy.get('.el-checkbox__inner').eq(3).click({
            force: true
        })
        cy.get('.el-checkbox__inner').eq(4).click({
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/item/workDays/batch/audit*').as('getPage')
        cy.wait(500)
        //点击批量审核
        cy.get('.el-button.el-button--primary.el-button--medium.is-plain').eq(auditedMany).click({
            force: true
        })
        //确认审核
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--success').click({
            force: true
        })
        cy.wait('@getPage').then((xhr) => {
            let getStatus = xhr.response.statusCode
            let expectStatus = 200
            expect(getStatus).to.eq(expectStatus)
            cy.get('body').should('contain', ' 已处理审核通过')
        })
    })
    // it.skip('cqb-0114-工作日申请-导出工作日申请', () => {
    //     cy.server()
    //     cy.route('**/service/mgr/item/workDays/page*').as('getPage')
    //     cy.visit(host + '/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-workday')
    //     cy.wait('@getPage').then((xhr) => {
    //         cy.get('.ql-search__header + div').find('.el-checkbox__inner').click()
    //         cy.get('.ql-search__header + div').find('button').contains('导出工作日申请').click()
    //         // cy.get('.el-message-box__btns').find('button').contains('通过').click()
    //         // cy.get('body').should('contain',' 已处理审核不通过')
    //     })                   
    // })  
    it('0003-工作日申请-申请类型搜索(计划审请)', () => {
        let applyType = 1
        let dropList = 3
        let plan = 1
        let searchButton = 1
        cy.get('input[placeholder="请选择"]').eq(applyType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(plan).click({
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/item/workDays/page?*').as('getData')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let expectStatus = 200
            let totalData = xhr.response.body.data.total
            let getStatus = xhr.response.statusCode
            expect(getStatus).to.eq(expectStatus)
            if (totalData == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (totalData <= 20) {
                cy.get('.el-table__body-wrapper.is-scrolling-none').find('tbody>tr').should('have.length', totalData)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + totalData + ' 条')
            }
        })
    })
    it('0004-工作日申请-申请类型搜索(特殊审请)', () => {
        let applyType = 1
        let dropList = 3
        let exspecialPlan = 2
        let searchButton = 1
        cy.get('input[placeholder="请选择"]').eq(applyType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(exspecialPlan).click({
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/item/workDays/page?*').as('getData')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let expectStatus = 200
            let totalData = xhr.response.body.data.total
            let getStatus = xhr.response.statusCode
            expect(getStatus).to.eq(expectStatus)
            if (totalData == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (totalData <= 20) {
                cy.get('.el-table__body-wrapper.is-scrolling-none').find('tbody>tr').should('have.length', totalData)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + totalData + ' 条')
            }
        })
    })
    it('0005-工作日申请-使用项目进行搜索', () => {
        let auditStatus = 2
        let dropList = 3
        let searchButton = 1
        let waitAudit = 0
        let notAudited = 1
        let audited = 2
        //--------------------使用项目单独进行搜索---------------------------------
        cy.get('input[placeholder="请输入项目名称"]').type('钠', {
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/item/workDays/page?*').as('getData')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let expectStatus = 200
            let totalData = xhr.response.body.data.total
            let getStatus = xhr.response.statusCode
            expect(getStatus).to.eq(expectStatus)
            if (totalData == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (totalData <= 20) {
                cy.get('.el-table__body-wrapper.is-scrolling-none').find('tbody>tr').should('have.length', totalData)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + totalData + ' 条')
            }
        })
        //--------------------项目钠+审核状态(待审核)进行搜索----------------------
        cy.get('input[placeholder="请选择"]').eq(auditStatus).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(waitAudit).click({
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/item/workDays/page?*').as('getData')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let expectStatus = 200
            let totalData = xhr.response.body.data.total
            let getStatus = xhr.response.statusCode
            expect(getStatus).to.eq(expectStatus)
            if (totalData == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (totalData <= 20) {
                cy.get('.el-table__body-wrapper.is-scrolling-none').find('tbody>tr').should('have.length', totalData)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + totalData + ' 条')
            }
        })
        //--------------------项目钠+审核状态(审核不通过)进行搜索----------------------
        cy.get('input[placeholder="请选择"]').eq(auditStatus).click({
            force: true
        })
        cy.wait(1000)
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList - 1).find('li').eq(notAudited).click({
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/item/workDays/page?*').as('getData')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let expectStatus = 200
            let totalData = xhr.response.body.data.total
            let getStatus = xhr.response.statusCode
            expect(getStatus).to.eq(expectStatus)
            if (totalData == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (totalData <= 20) {
                cy.get('.el-table__body-wrapper.is-scrolling-none').find('tbody>tr').should('have.length', totalData)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + totalData + ' 条')
            }
        })
        //--------------------项目钠+审核状态(审核通过)进行搜索----------------------

        cy.get('input[placeholder="请选择"]').eq(auditStatus).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList - 1).find('li').eq(audited).click({
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/item/workDays/page?*').as('getData')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let expectStatus = 200
            let totalData = xhr.response.body.data.total
            let getStatus = xhr.response.statusCode
            expect(getStatus).to.eq(expectStatus)
            if (totalData == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (totalData <= 20) {
                cy.get('.el-table__body-wrapper.is-scrolling-none').find('tbody>tr').should('have.length', totalData)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + totalData + ' 条')
            }
        })
    })
    it('0006-工作日申请-使用实验室名称或者编码进行搜索', () => {
        let labCode = 'gd18020'
        let searchButton = 1
        let labName = '佛山市第三人民医院'
        //--------------------使用实验室编码进行搜索---------------------------------
        cy.get('input[placeholder="请输入实验室名称或编码"]').type(labCode, {
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/item/workDays/page?*').as('getData')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let expectStatus = 200
            let totalData = xhr.response.body.data.total
            let getStatus = xhr.response.statusCode
            expect(getStatus).to.eq(expectStatus)
            if (totalData == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (totalData <= 20) {
                cy.get('.el-table__body-wrapper.is-scrolling-none').find('tbody>tr').should('have.length', totalData)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + totalData + ' 条')
            }
        })
        //--------------------使用实验室名称进行搜索---------------------------------
        cy.get('input[placeholder="请输入实验室名称或编码"]').clear({
            force: true
        }).type(labName, {
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/item/workDays/page?*').as('getData')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let expectStatus = 200
            let totalData = xhr.response.body.data.total
            let getStatus = xhr.response.statusCode
            expect(getStatus).to.eq(expectStatus)
            if (totalData == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (totalData <= 20) {
                cy.get('.el-table__body-wrapper.is-scrolling-none').find('tbody>tr').should('have.length', totalData)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + totalData + ' 条')
            }
        })
    })
    it('0007-工作日申请-切换质控主管单位(青浦医联体)', () => {
        let control = 0
        let QPYLT = 1
        let dropList = 3
        cy.intercept('**/cqb-base-mgr/service/mgr/item/workDays/page?*').as('getData')
        cy.get('input[placeholder="请选择"]').eq(control).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(QPYLT).click({
            force: true
        })
        cy.wait(1000)
        cy.wait('@getData').then((xhr) => {
            let expectStatus = 200
            let totalData = xhr.response.body.data.total
            let getStatus = xhr.response.statusCode
            expect(getStatus).to.eq(expectStatus)
            if (totalData == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (totalData <= 20) {
                cy.wait(500)
                cy.get('.el-table__body').find('tbody>tr').should('have.length', totalData)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + totalData + ' 条')
            }
        })
        cy.get('body').should('contain', '上海测试实验室2')
    })
})