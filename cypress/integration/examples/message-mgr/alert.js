/**
 * 告警查询
 */
context('消息互通-告警查询', () => {
    let urlHost = 'http://cqb-mgr.gd.test.sh-weiyi.com/cqb-base-mgr-fe/app.html'
    beforeEach(() => {
        let MessageSharegIndex = 1
        let WarningMessageIndex = 1
        let UseIndex = 0
        let ExpandButton = 0
        let ChooseButton = 0
        let DateType = 4
        let ListIndex = 2
        let ChooseDate = 0
        let StartDate = 0
        let EndDate = 1
        let ChooseStartDate = 2
        let ChooseEndDate = 2
        cy.loginCQB()
        // 点击消息互通
        cy.get('.el-submenu__title').eq(MessageSharegIndex).click({
            force: true
        })
        // //点击告警查询
        cy.get('.el-menu.el-menu--inline').eq(WarningMessageIndex).find('.el-menu-item').eq(UseIndex).click({
            force: true
        })
        //点击展开
        cy.get('.el-button.el-button--text.el-button--medium').eq(ExpandButton).click({
            force: true
        })
        cy.get('input[placeholder="请选择"]').eq(ChooseButton).click({
            force: true
        })
        // 选择指定日期
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(DateType).find('li').eq(ListIndex).click({
            force: true
        })
        //选择日期2020/12/01 - 2021/1/13
        cy.get('.el-range-input').eq(ChooseDate).click({
            force: true
        })
        //开始时间
        cy.get('.el-date-table').eq(StartDate).find('.el-date-table__row').eq(StartDate).find('td').eq(ChooseStartDate).click({
            force: true
        })
        //结束时间
        cy.get('.el-range-input').eq(EndDate).click({
            force: true
        })
        cy.get('.el-date-table').eq(EndDate).find('.el-date-table__row').eq(ChooseEndDate).find('td').eq(ChooseEndDate).click({
            force: true
        })
    })
    it('001-使用消息状态进行查询-已知晓', () => {
        let StatusType = 2
        let ListIndex = 4
        let know = 2
        cy.get('input[placeholder="请选择"]').eq(StatusType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(ListIndex).find('li').eq(know).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType*').as('getData')
        cy.visit(urlHost + '#/message-mgr/alert')
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
        let ListIndex = 4
        let NotRead = 1
        cy.get('input[placeholder="请选择"]').eq(StatusType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(ListIndex).find('li').eq(NotRead).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        cy.visit(urlHost + '#/message-mgr/alert')
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
        let ListIndex = 4
        let processed = 3
        cy.get('input[placeholder="请选择"]').eq(StatusType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(ListIndex).find('li').eq(processed).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        cy.visit(urlHost + '#/message-mgr/alert')
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
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType*').as('getData')
        cy.visit(urlHost + '#/message-mgr/alert')
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
        cy.visit(urlHost + '#/message-mgr/alert')
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
        let ListIndex = 4
        let NotReportedIndex = 1
        cy.get('input[placeholder="请选择"]').eq(MessageType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(ListIndex).find('li').eq(NotReportedIndex).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        cy.visit(urlHost + '#/message-mgr/alert')
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
        let ListIndex = 4
        let IteamOutOfControl = 2
        cy.get('input[placeholder="请选择"]').eq(MessageType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(ListIndex).find('li').eq(IteamOutOfControl).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        cy.visit(urlHost + '#/message-mgr/alert')
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
        let ListIndex = 4
        let CVIndex = 3
        cy.get('input[placeholder="请选择"]').eq(MessageType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(ListIndex).find('li').eq(CVIndex).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        cy.visit(urlHost + '#/message-mgr/alert')
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

    it('010-使用消息状态进行查询-已认可', () => {
        let StatusType = 2
        let ListIndex = 4
        let approved = 4
        cy.get('input[placeholder="请选择"]').eq(StatusType).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(ListIndex).find('li').eq(approved).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        cy.visit(urlHost + '#/message-mgr/alert')
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
    it('011-使用标签进行查询-公立标签', () => {
        let ListIndex = 3
        let PublicTag = 0
        cy.get('.el-select__input.is-medium').click({
            force: true
        })
        cy.get('.el-select-group').eq(ListIndex).find('li').eq(PublicTag).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        cy.visit(urlHost + '#/message-mgr/alert')
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
    it('012-使用标签进行查询-私立标签', () => {
        let ListIndex = 3
        let PrivateTag = 1
        cy.get('.el-select__input.is-medium').click({
            force: true
        })
        cy.get('.el-select-group').eq(ListIndex).find('li').eq(PrivateTag).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/messages/mgrList?dateType?*').as('getData')
        cy.visit(urlHost + '#/message-mgr/alert')
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