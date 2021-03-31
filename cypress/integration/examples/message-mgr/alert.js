/**
 * 告警查询
 */
context('消息互通-告警查询', () => {
    let cookieName
    let cookieValue
    let alertList = 5
    before(() => {
        let ExpandButton = 0
        let ChooseButton = 0
        let ListIndex = 2
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/message-mgr/alert')
        cy.getCookies().should('exist').then((cookie) => {
            cookieName = cookie[0]['name']
            cookieValue = cookie[0]['value']
        })
        cy.wait(1000)
        //点击展开
        cy.get('.el-button.el-button--text.el-button--medium').eq(ExpandButton).click({
            force: true
        })
        cy.get('input[placeholder="请选择"]').eq(ChooseButton).click({
            force: true
        })
        cy.wait(1000)
        // 选择指定日期
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(alertList).find('li').eq(ListIndex).click({
            force: true
        }) 
    })
    beforeEach(()=>{
        cy.setCookie(cookieName, cookieValue)
    })
    it('001-使用消息状态进行查询-已知晓', () => {
        let StatusType = 2
        let know = 2
        cy.get('input[placeholder="请选择"]').eq(StatusType).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(alertList).find('li').eq(know).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType*').as('getData')
        //点击搜索
        cy.wait(500)
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let Data = xhr.response.body.data.total
            if (Data == null) {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('body').should('contain', '暂无数据')
            } else {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-pagination__total').should('contain', Data)
            }

        })
    })
    it('002-使用消息状态进行查询-未读', () => {
        let StatusType = 2
        let NotRead = 1
        cy.get('input[placeholder="请选择"]').eq(StatusType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(alertList).find('li').eq(NotRead).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        //点击搜索
        cy.wait(500)
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let Data = xhr.response.body.data.total
            if (Data == null) {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('body').should('contain', '暂无数据')
            } else {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-pagination__total').should('contain', Data)
            }

        })
    })
    it('003-使用消息状态进行查询-已处理', () => {
        let StatusType = 2
        let processed = 4
        cy.get('input[placeholder="请选择"]').eq(StatusType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(alertList).find('li').eq(processed).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        //点击搜索
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let Data = xhr.response.body.data.total
            if (Data == null) {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('body').should('contain', '暂无数据')
            } else {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-pagination__total').should('contain', Data)
            }

        })

    })

    it('004-查询指定日期数据-2020/12/01-2021/1/12', () => {
        let startDate = 0
        let chooseStartDate = 0
        let chooseEndDate = 8
        let chooseDay = 2
        let chooseEndDay = 2
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType*').as('getData')
        //开始时间
        cy.get('.el-range-input').eq(startDate).click({
            force: true
        })
        cy.get('.el-date-range-picker__header').eq(startDate).find('div').invoke('text').then((data) => {
            let getStartMonth = parseInt(data.slice(6, 8))
            for (let i = 0; i < getStartMonth; i++) {
                cy.get('.el-picker-panel__icon-btn.el-icon-arrow-left').click({
                    force: true
                })
            }
            cy.get('.el-date-range-picker__header').eq(startDate).find('div').invoke('text').then((data) => {
                let getYear = parseInt(data.slice(0, 4))
                if (getYear - 2020 != 0) {
                    for (let i = 0; i < getYear - 2020; i++) {
                        cy.get('.el-picker-panel__icon-btn.el-icon-d-arrow-left').eq(startDate).click({
                            force: true
                        })
                    }
                } else {
                    //选择开始时间
                    cy.get('.el-date-table__row').eq(chooseStartDate).find('td').eq(chooseDay).click({
                        force: true
                    })
                    //选择结束时间
                    cy.get('.el-date-table__row').eq(chooseEndDate).find('td').eq(chooseEndDay).click({
                        force: true
                    })
                }
            })
        })
        //点击搜索
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let Data = xhr.response.body.data.total
            if (Data == null) {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('body').should('contain', '暂无数据')
            } else {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-pagination__total').should('contain', Data)
            }
        })
    })
    it('005-使用关键字(实验室名称或者实验室编码)', () => {
        let Keyword = 1
        cy.get('input[placeholder="实验室名称或编码"]').eq(Keyword).type('佛山市南海区桂城医院')
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        //点击搜索
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let Data = xhr.response.body.data.total
            if (Data == null) {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('body').should('contain', '暂无数据')
            } else {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-pagination__total').should('contain', Data)
            }
        })
        // 使用实验室编码进行搜索
        cy.get('input[placeholder="实验室名称或编码"]').eq(Keyword).clear().type('gd18056')
        //点击搜索
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let Data = xhr.response.body.data.total
            if (Data == null) {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('body').should('contain', '暂无数据')
            } else {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-pagination__total').should('contain', Data)
            }
        })
    })
    it('006-使用消息类型进行查询-选择未上报', () => {
        let MessageType = 1
        let NotReportedIndex = 1
        cy.get('input[placeholder="请选择"]').eq(MessageType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(alertList).find('li').eq(NotReportedIndex).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        //点击搜索
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let Data = xhr.response.body.data.total
            if (Data == null) {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('body').should('contain', '暂无数据')
            } else {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-pagination__total').should('contain', Data)
            }
        })
    })
    it('007-使用消息类型进行查询-选择项目失控', () => {
        let MessageType = 1
        let IteamOutOfControl = 2
        cy.get('input[placeholder="请选择"]').eq(MessageType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(alertList).find('li').eq(IteamOutOfControl).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        //点击搜索
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let Data = xhr.response.body.data.total
            if (Data == null) {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('body').should('contain', '暂无数据')
            } else {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-pagination__total').should('contain', Data)
            }
        })
    })
    it('008-使用消息类型进行查询-CV/符合率失控', () => {
        let MessageType = 1
        let CVIndex = 3
        cy.get('input[placeholder="请选择"]').eq(MessageType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(alertList).find('li').eq(CVIndex).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        //点击搜索
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let Data = xhr.response.body.data.total
            if (Data == null) {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('body').should('contain', '暂无数据')
            } else {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-pagination__total').should('contain', Data)
            }

        })
    })

    it('009-使用消息状态进行查询-已认可', () => {
        let StatusType = 2
        let approved = 5
        let ListIndex = 4
        cy.get('input[placeholder="请选择"]').eq(StatusType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(ListIndex).find('li').eq(approved).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        //点击搜索
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let Data = xhr.response.body.data.total
            if (Data == null) {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('body').should('contain', '暂无数据')
            } else {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-pagination__total').should('contain', Data)
            }

        })

    })
    it('010-使用标签进行查询-公立标签', () => {
        let ListIndex = 0
        let PublicTag = 0
        cy.get('.el-select__input.is-medium').click({
            force: true
        })
        cy.get('.el-select-group').eq(ListIndex).find('li').eq(PublicTag).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        //点击搜索
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let Data = xhr.response.body.data.total
            if (Data == null) {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('body').should('contain', '暂无数据')
            } else {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-pagination__total').should('contain', Data)
            }

        })

    })
    it('011-使用标签进行查询-私立标签', () => {
        let ListIndex = 0
        let PrivateTag = 1
        cy.get('.el-tag__close.el-icon-close').click({
            force: true
        })
        cy.get('.el-select__input.is-medium').click({
            force: true
        })
        cy.get('.el-select-group').eq(ListIndex).find('li').eq(PrivateTag).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        //点击搜索
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let Data = xhr.response.body.data.total
            if (Data == null) {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('body').should('contain', '暂无数据')
            } else {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-pagination__total').should('contain', Data)
            }

        })
    })

})