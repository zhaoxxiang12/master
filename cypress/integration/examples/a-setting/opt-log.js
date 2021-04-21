context('操作日志', () => {
    before(() => {
        let time = 1
        //tr标签下标
        let trIndex = 2
        //四月份的下标
        let September = 0
        let dateIndex = 6
        let date = 1
        let year = 0
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/system/opt-log')
        cy.wait(1000)
        cy.get('.el-date-editor.ql-date-picker.el-input.el-input--medium.el-input--prefix.el-input--suffix.el-date-editor--date').click()
        cy.get('.el-date-picker__header-label').eq(year).invoke('text').then((getData) => {
            let getYear = parseInt(getData.slice(0, 4))
            let difference = getYear - 2019
            if (difference == 0) {
                cy.get('.el-date-picker__header-label').eq(1).click()
                //选择九月
                cy.get('.el-month-table').find('tbody>tr').eq(trIndex).find('td').eq(September).click()
                //日期选择30号
                cy.get('.el-date-table').find('tbody>tr').eq(dateIndex).find('td').eq(date).click()
            } else {
                //选择年份
                for (let i = 1; i <= difference; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
                        force: true
                    })
                }
                cy.get('.el-date-picker__header-label').eq(1).click()
                //选择九月
                cy.get('.el-month-table').find('tbody>tr').eq(trIndex).find('td').eq(September).click()
                //日期选择30号
                cy.get('.el-date-table').find('tbody>tr').eq(dateIndex).find('td').eq(date).click()
            }
        })
    })
    it('001-操作日志-使用操作人进行查询', () => {
        let system = '管理员'
        let labName = '佛山市顺德区中医院'
        cy.get('[placeholder="输入操作人"]').type(system)
        cy.intercept('**/cqb-base-mgr/service/system/operLogs?startTime=*').as('getData')
        cy.get('button').contains('搜索').click()
        cy.wait('@getData').then((xhr) => {
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
        cy.get('[placeholder="输入操作人"]').clear().type(labName)
        cy.intercept('**/cqb-base-mgr/service/system/operLogs?startTime=*').as('getData')
        cy.get('button').contains('搜索').click()
        cy.wait('@getData').then((xhr) => {
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
        cy.get('[placeholder="输入操作人"]').clear()
    })
    it('002-操作日志-查看操作日志', () => {
        let close = 0
        cy.intercept('**/cqb-base-mgr/service/system/operLogs/*').as('viewLog')
        cy.get('.el-table__body').find('.el-table__row').first().find('.el-button.el-button--text.el-button--medium').click()
        cy.wait('@viewLog').then((xhr) => {
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            expect(responseStatus).to.eq(expectStatus)
            cy.get('body').should('contain', '操作日志详情').and('contain', '签名结果')
        })
        cy.get('.el-dialog__close.el-icon.el-icon-close').eq(close).click()
    })
    it('002-操作日志-使用模块进行查询', () => {
        let model = 0
        let dropList = 1
        let chose = 24
        let board = 7
        //-------------------模块选择质控品管理------------
        cy.get('[placeholder="请选择"]').eq(model).click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(chose).click({
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/system/operLogs?startTime=*').as('getData')
        cy.get('button').contains('搜索').click()
        cy.wait('@getData').then((xhr) => {
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })

        //-------------------模块选择公告板------------
        cy.get('[placeholder="请选择"]').eq(model).click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(board).click({
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/system/operLogs?startTime=*').as('getData')
        cy.get('button').contains('搜索').click()
        cy.wait('@getData').then((xhr) => {
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
    })
})