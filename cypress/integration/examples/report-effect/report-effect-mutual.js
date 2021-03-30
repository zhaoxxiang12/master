context('互认合格情况', () => {
    let urlHost = 'http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html'
    beforeEach(() => {
        cy.loginCQB()
        let yearIndex = 0
        let startDate = 0
        let monthIndex = 4
        let MayIndex = 4
        let dateIndex = 1
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-effect/report-effect-mutual')
        cy.get('input[placeholder="起始时间"]').eq(startDate).click({
            force: true
        })
        cy.get('.el-date-picker__header-label').eq(yearIndex).invoke('text').then((text) => {
            let currentYear = parseInt(text.slice(0, 4))
            let expectYear = 2020
            let endbutton = 0
            let endTime = 1
            let difference = Math.abs(currentYear - expectYear)
            if (difference == 0) {
                //开始月份选择5月
                cy.get('.el-month-table').find('tr').find('td').eq(monthIndex).click()
                //点击结束时间选择框
                cy.get('[placeholder="结束时间"]').eq(dateIndex).click({
                    force: true
                })
                //结束月份选择5月
                cy.get('.el-month-table').find('tr').eq(4).find('td').eq(MayIndex).click({
                    force: true
                })
                //点击搜索
                cy.get('button').contains('搜索').click()
            } else {
                for (let i = 1; i <= difference; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click()
                }
                //开始月份选择5月
                cy.get('.el-month-table').find('tr').find('td').eq(monthIndex).click()
            }
            // 结束时间
            if (difference == 0) {
                //结束月份选择5月
                cy.get('.el-month-table').find('tr').eq(4).find('td').eq(MayIndex).click({
                    force: true
                })
            } else {
                cy.get('input[placeholder="结束时间"]').eq(endbutton).click({
                    force: true
                })
                for (let i = 1; i <= difference; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').eq(endTime).click({
                        force: true
                    })
                }
                //结束月份选择5月    
                let May = 0
                cy.get('.el-month-table').find('tr').eq(4).find('td').eq(May).click({
                    force: true
                })
                //点击搜索
                cy.get('button').contains('搜索').click({
                    force: true
                })
            }
        })
    })

    it('001-互认合格情况-切换质控主管单位(切换至青浦医联体)', () => {
        let institutionsIndex = 1
        let boxIndex = 5
        //点击下拉框
        cy.get('[placeholder="请选择"]').click({
            force: true
        })
        cy.wait(1000)
        //选择青浦医联体
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(boxIndex).find('li').eq(institutionsIndex).click()
        cy.server()
        // 拦截接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/itemRecogQualified?startTime*').as('getLabdata')
        cy.get('button').contains('搜索').click({
            force: true
        })
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-mutual')
        cy.wait('@getLabdata').then((xhr) => {
            // labName='贵阳华夏不孕不育医院'
            cy.log(xhr.response)
            cy.get(xhr.response.body.data).then((data) => {
                let realJudgeData = data
                let getData = realJudgeData[0].labName
                cy.get('body').should('contain', getData)
            })
        })
    })
    it('002-互认合格情况-切换地区进行查询(切换到上海)', () => {
        let chooseIndex = 5
        let provinceIndex = 1
        //点击地区
        cy.get('.el-col.el-col-16').find('div>div>label>span').find('.el-radio__inner').eq(0).click({
            force: true
        })
        //选择省份(上海)
        cy.get('[placeholder="请选择省"]').click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(chooseIndex).find('li').eq(provinceIndex).click({
            force: true
        })
        //点击搜索
        cy.wait(1000)
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        // cy.get('.table-line__fixed-header+.table-line').find('tbody')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        cy.get('.table-line__fixed-header+.table-line').find('tbody').should('contain', '')
    })
    it('003-互认合格情况-输入项目名称进行模糊查询', () => {
        let iteamName = '钾'
        //输入框输入项目名称
        cy.get('[placeholder="请输入项目名称"]').type(iteamName, {
            force: true
        })
        //断言
        cy.get('body').should('not.contain', '尿干化学')
    })
    it('004-互认合格情况-按实验室维度进行查看', () => {
        let choiceIndex = 4
        let optionsIndex = 0
        let judgeData = '实验室'
        //勾选按实验室维度查看
        cy.get('.el-radio__input').eq(choiceIndex).click({
            force: true
        })
        //断言
        cy.wait(1000)
        cy.get('.table-line__fixed-header.is-affix+.table-line').find('thead>tr>th').eq(optionsIndex).should('have.text', judgeData)
    })
    it('005-互认合格情况-输入实验室名称进行查询', () => {
        let choiceIndex = 4
        let labName = '佛山市第一人民医院'
        let judgeData = '测试实验室123'
        let labCode = 'gd18020'
        //勾选按实验室维度查看
        cy.get('.el-radio__input').eq(choiceIndex).click({
            force: true
        })
        //输入实验室名称
        cy.get('[placeholder="请输入实验室名称"]').type(labName, {
            force: true
        })
        //断言
        cy.get('body').should('not.contain', judgeData)
        //输入实验室编码
        cy.get('[placeholder="请输入实验室名称"]').clear({
            force: true
        }).type(labCode, {
            force: true
        })
        //断言
        cy.get('body').should('not.contain', judgeData)
    })
    it('006-互认合格情况-显示字段-取消勾选某个字段', () => {
        //点击显示字段
        cy.wait(5000)
        cy.get('.el-button.el-button--text.el-button--medium.el-popover__reference').click({
            force: true
        })
        //使用for循环遍历取消勾选字段
        for (var i = 1, j = 15; i < 13; i++, j--) {
            //取消勾选某个显示字段
            cy.get('.el-checkbox__inner').eq(i).click({
                force: true
            })
            //断言
            cy.get('[aria-checked="true"]').should('have.length', j)
        }
    })
})