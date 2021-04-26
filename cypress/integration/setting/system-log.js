context('系统日志', () => {
    before(() => {
        let time = 1
        //tr标签下标
        let trIndex = 0
        //四月份的下标
        let AprilIndex = 3
        let dateIndex = 4
        let date = 2
        let year = 0
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/system/system-log')
        cy.wait(1000)
        cy.get('.el-input__inner').eq(time).click()
        cy.get('.el-date-picker__header-label').eq(year).invoke('text').then((getData) => {
            let getYear = parseInt(getData.slice(0, 4))
            let difference = getYear - 2021
            if (difference == 0) {
                cy.get('.el-date-picker__header-label').eq(1).click()
                //选择四月
                cy.get('.el-month-table').find('tbody>tr').eq(trIndex).find('td').eq(AprilIndex).click()
                //日期选择20号
                cy.get('.el-date-table').find('tbody>tr').eq(dateIndex).find('td').eq(date).click()
            } else {
                //选择年份
                for (let i = 1; i <= difference; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
                        force: true
                    })
                }
                cy.get('.el-date-picker__header-label').eq(1).click()
                //选择四月
                cy.get('.el-month-table').find('tbody>tr').eq(trIndex).find('td').eq(AprilIndex).click()
                //日期选择20号
                cy.get('.el-date-table').find('tbody>tr').eq(dateIndex).find('td').eq(date).click()
            }
        })
    })
    it('001-系统日志-级别选择信息进行查询', () => {
        let eventLevel = 0
        let dropList = 1
        let type = 0
        cy.get('.el-input__inner').eq(eventLevel).click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(type).click()
        cy.intercept('**/cqb-base-mgr/service/system/log/page?startTime=*').as('getData')
        cy.get('button').contains('搜索').click()
        cy.wait('@getData').then((xhr)=>{
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if(total==0){
                cy.get('body').should('contain','暂无数据')
            }else if(total<=20){
                cy.get('.el-table__body').find('.el-table__row').should('have.length',total)
            }else{
                cy.get('.el-pagination__total').should('have.text','共 '+total+' 条')
            }
        })
    })
    it('002-系统日志-级别选择告警进行查询', () => {
        let eventLevel = 0
        let dropList = 1
        let type = 1
        cy.get('.el-input__inner').eq(eventLevel).click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(type).click()
        cy.intercept('**/cqb-base-mgr/service/system/log/page?startTime=*').as('getData')
        cy.get('button').contains('搜索').click()
        cy.wait('@getData').then((xhr)=>{
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if(total==0){
                cy.get('body').should('contain','暂无数据')
            }else if(total<=20){
                cy.get('.el-table__body').find('.el-table__row').should('have.length',total)
            }else{
                cy.get('.el-pagination__total').should('have.text','共 '+total+' 条')
            }
        })
    })
    it('003-系统日志-级别选择异常进行查询', () => {
        let eventLevel = 0
        let type = 2
        cy.wait(500)
        cy.get('.el-input__inner').eq(eventLevel).click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').find('li').eq(type).click()
        cy.intercept('**/cqb-base-mgr/service/system/log/page?startTime=*').as('getData')
        cy.get('button').contains('搜索').click()
        cy.wait('@getData').then((xhr)=>{
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if(total==0){
                cy.get('body').should('contain','暂无数据')
            }else if(total<=20){
                cy.get('.el-table__body').find('.el-table__row').should('have.length',total)
            }else{
                cy.get('.el-pagination__total').should('have.text','共 '+total+' 条')
            }
        })
    })
})