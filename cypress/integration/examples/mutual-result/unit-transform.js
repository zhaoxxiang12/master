/**
 * 单位转换设置
 */
context('结果互认设置-单位转换设置', () => {
    let urlHost = 'http://cqb-mgr.sh.test.sh-weiyi.com/cqb-base-mgr-fe/app.html'
    beforeEach(() => {
        let SettingIndex = 12
        let ItemSetting = 14
        let ResultAppoveSetting = 16
        let UseIndex = 6
        cy.loginCQB()
        //点击设置
        cy.get('.el-submenu__title').eq(SettingIndex).click({
            force: true
        })
        cy.wait(500)
        // 点击结果互认设置
        cy.get('.el-submenu__title').eq(ResultAppoveSetting).click({
            force: true
        })
        cy.wait(500)
        //点击单位转换设置
        cy.get('.el-menu.el-menu--inline').eq(ItemSetting).find('.el-menu-item').eq(UseIndex).click({
            force: true
        })
    })
    it('001-单位转换设置-使用是否配置公式进行查询(已配置)', () => {
        let selectBox = 0
        let setFormula = 1
        let formulaStatus = 7
        let alreadySet = 2
        cy.get('.el-button.el-button--text.el-button--medium').eq(selectBox).click({
            force: true
        })
        cy.wait(500)
        cy.get('input[placeholder="请选择"]').eq(setFormula).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(formulaStatus).find('li').eq(alreadySet).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/itemUnitTransform/list?*').as('getData')
        cy.visit(urlHost + '#/setting/mutual-result/unit-transform')
        cy.get("button").contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let responseLength = xhr.response.body.data.total
            let responseStatus = xhr.status
            let expectStatus = 200
            //判断接口是否正常
            expect(responseStatus).to.equal(expectStatus)
            if (responseLength == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (responseLength > 20) { //如果接口返回的数据大于20则判断总的数据条数
                cy.get('.el-pagination__total').should('have.text', '共 ' + responseLength + ' 条')
            } else { //如果接口返回的数据小于或者等于20则判断类.el-table__row的长度
                cy.get('.el-table__body').eq(0).find('.el-table__row').should('have.length', responseLength)
            }
        })
    })
    it('002-单位转换设置-使用是否配置公式进行查询(未配置)', () => {
        let selectBox = 0
        let setFormula = 1
        let formulaStatus = 7
        let notSet = 1
        cy.get('.el-button.el-button--text.el-button--medium').eq(selectBox).click({
            force: true
        })
        cy.wait(500)
        cy.get('input[placeholder="请选择"]').eq(setFormula).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(formulaStatus).find('li').eq(notSet).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/itemUnitTransform/list?*').as('getData')
        cy.visit(urlHost + '#/setting/mutual-result/unit-transform')
        cy.get("button").contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let responseLength = xhr.response.body.data.total
            let responseStatus = xhr.status
            let expectStatus = 200
            //判断接口是否正常
            expect(responseStatus).to.equal(expectStatus)
            if (responseLength == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (responseLength > 20) { //如果接口返回的数据大于20则判断总的数据条数
                cy.get('.el-pagination__total').should('have.text', '共 ' + responseLength + ' 条')
            } else { //如果接口返回的数据小于或者等于20则判断类.el-table__row的长度
                cy.get('.el-table__body').eq(0).find('.el-table__row').should('have.length', responseLength)
            }
        })
    })
    it('003-单位转换设置-关键字搜索功能', () => {
        /**
         * 实验室编码进行搜索
         */
        let inputBox = 0
        let labCode = 'gd18020'
        let labName = '佛山市南海区人民医院'
        cy.get('input[placeholder="实验室名称或编码"]').eq(inputBox).type(labCode, ({
            force: true
        }))
        cy.server()
        cy.route('**/cqb-base-mgr/service/mgr/itemUnitTransform/list?*').as('getData')
        cy.visit(urlHost + '#/setting/mutual-result/unit-transform')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let body = 0
            let responseStatus = xhr.status
            let expectStatus = 200
            let responseLength = xhr.response.body.data.total
            //检查接口是否正常
            expect(responseStatus).to.equal(expectStatus)
            //接口返回的数据总数与界面展示的数据是否一致
            if (responseLength == 0 || responseLength == null) {
                cy.get('body').should('contain', '暂无数据')
            } else if (responseLength > 20) { //如果接口返回的数据大于20则判断总数据条数
                cy.get('.el-pagination__total').should('have.text', '共 ' + responseLength + ' 条')
            } else {
                cy.get('.el-table__body').eq(body).find('.el-table__row').should('have.length', responseLength)
            }
            /**
             * 实验室名称进行搜索
             */
            cy.get('input[placeholder="实验室名称或编码"]').eq(inputBox).clear({
                force: true
            }).type(labName, ({
                force: true
            }))
            cy.server()
            cy.route('**/cqb-base-mgr/service/mgr/itemUnitTransform/list?*').as('getData')
            cy.visit(urlHost + '#/setting/mutual-result/unit-transform')
            cy.get('button').contains('搜索').click({
                force: true
            })
            cy.wait('@getData').then((xhr) => {
                let body = 0
                let responseStatus = xhr.status
                let expectStatus = 200
                let responseLength = xhr.response.body.data.total
                //检查接口是否正常
                expect(responseStatus).to.equal(expectStatus)
                //接口返回的数据总数与界面展示的数据是否一致
                if (responseLength == 0 || responseLength == null) {
                    cy.get('body').should('contain', '暂无数据')
                } else if (responseLength > 20) { //如果接口返回的数据大于20则判断总数据条数
                    cy.get('.el-pagination__total').should('have.text', '共 ' + responseLength + ' 条')
                } else {
                    cy.get('.el-table__body').eq(body).find('.el-table__row').should('have.length', responseLength)
                }
            })
        })
    })
    it('004-单位转换设置-互认项目搜索(项目钾)', () => {
        let inputBox = 0
        let itemDownList = 7
        let choseK = 4
        //点击展开
        cy.get('.el-button.el-button--text.el-button--medium').eq(inputBox).click({
            force: true
        })
        cy.get('input[placeholder="请选择互认项目"]').click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(itemDownList).find('li').eq(choseK).click({
            force: true
        })
        cy.server()
        cy.route('**/cqb-base-mgr/service/mgr/itemUnitTransform/list?*').as('getData')
        cy.visit(urlHost + '#/setting/mutual-result/unit-transform')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let body = 0
            let responseStatus = xhr.status
            let expectStatus = 200
            let responseLength = xhr.response.body.data.total
            //检查接口是否正常
            expect(responseStatus).to.equal(expectStatus)
            //接口返回的数据总数与界面展示的数据是否一致
            if (responseLength == 0 || responseLength == null) {
                cy.get('body').should('contain', '暂无数据')
            } else if (responseLength > 20) { //如果接口返回的数据大于20则判断总数据条数
                cy.get('.el-pagination__total').should('have.text', '共 ' + responseLength + ' 条')
            } else {
                cy.get('.el-table__body').eq(body).find('.el-table__row').should('have.length', responseLength)
            }
        })
    })
    it('005-单位转换设置-互认项目搜索(项目钠)', () => {
        let inputBox = 0
        let itemDownList = 7
        let choseNa = 5
        //点击展开
        cy.get('.el-button.el-button--text.el-button--medium').eq(inputBox).click({
            force: true
        })
        cy.get('input[placeholder="请选择互认项目"]').click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(itemDownList).find('li').eq(choseNa).click({
            force: true
        })
        cy.server()
        cy.route('**/cqb-base-mgr/service/mgr/itemUnitTransform/list?*').as('getData')
        cy.visit(urlHost + '#/setting/mutual-result/unit-transform')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let body = 0
            let responseStatus = xhr.status
            let expectStatus = 200
            let responseLength = xhr.response.body.data.total
            //检查接口是否正常
            expect(responseStatus).to.equal(expectStatus)
            //接口返回的数据总数与界面展示的数据是否一致
            if (responseLength == 0 || responseLength == null) {
                cy.get('body').should('contain', '暂无数据')
            } else if (responseLength > 20) { //如果接口返回的数据大于20则判断总数据条数
                cy.get('.el-pagination__total').should('have.text', '共 ' + responseLength + ' 条')
            } else {
                cy.get('.el-table__body').eq(body).find('.el-table__row').should('have.length', responseLength)
            }
        })
    })
    it('006-单位转换设置-地区搜索(北京市)', () => {
        let inputBox = 0
        let areaDownList = 7
        let Beijing = 0
        //点击展开
        cy.get('.el-button.el-button--text.el-button--medium').eq(inputBox).click({
            force: true
        })
        cy.get('input[placeholder="请选择省"]').click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(areaDownList).find('li').eq(Beijing).click({
            force: true
        })
        cy.server()
        cy.route('**/cqb-base-mgr/service/mgr/itemUnitTransform/list?*').as('getData')
        cy.visit(urlHost + '#/setting/mutual-result/unit-transform')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let body = 0
            let responseStatus = xhr.status
            let expectStatus = 200
            let responseLength = xhr.response.body.data.total
            //检查接口是否正常
            expect(responseStatus).to.equal(expectStatus)
            //接口返回的数据总数与界面展示的数据是否一致
            if (responseLength == 0 || responseLength == null) {
                cy.get('body').should('contain', '暂无数据')
            } else if (responseLength > 20) { //如果接口返回的数据大于20则判断总数据条数
                cy.get('.el-pagination__total').should('have.text', '共 ' + responseLength + ' 条')
            } else {
                cy.get('.el-table__body').eq(body).find('.el-table__row').should('have.length', responseLength)
            }
        })
    })
    it('007-单位转换设置-地区搜索(上海)', () => {
        let inputBox = 0
        let areaDownList = 7
        let Shanghai = 1
        //点击展开
        cy.get('.el-button.el-button--text.el-button--medium').eq(inputBox).click({
            force: true
        })
        cy.get('input[placeholder="请选择省"]').click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(areaDownList).find('li').eq(Shanghai).click({
            force: true
        })
        cy.server()
        cy.route('**/cqb-base-mgr/service/mgr/itemUnitTransform/list?*').as('getData')
        cy.visit(urlHost + '#/setting/mutual-result/unit-transform')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let body = 0
            let responseStatus = xhr.status
            let expectStatus = 200
            let responseLength = xhr.response.body.data.total
            //检查接口是否正常
            expect(responseStatus).to.equal(expectStatus)
            //接口返回的数据总数与界面展示的数据是否一致
            if (responseLength == 0 || responseLength == null) {
                cy.get('body').should('contain', '暂无数据')
            } else if (responseLength > 20) { //如果接口返回的数据大于20则判断总数据条数
                cy.get('.el-pagination__total').should('have.text', '共 ' + responseLength + ' 条')
            } else { //如果接口返回的数据小于或者等于20则判断类.el-table__row的长度
                cy.get('.el-table__body').eq(body).find('.el-table__row').should('have.length', responseLength)
            }
        })
    })
    it('008-单位转换设置-地区搜索(广东)', () => {
        let inputBox = 0
        let areaDownList = 7
        let Guangdong = 2
        //点击展开
        cy.get('.el-button.el-button--text.el-button--medium').eq(inputBox).click({
            force: true
        })
        cy.get('input[placeholder="请选择省"]').click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(areaDownList).find('li').eq(Guangdong).click({
            force: true
        })
        cy.server()
        cy.route('**/cqb-base-mgr/service/mgr/itemUnitTransform/list?*').as('getData')
        cy.visit(urlHost + '#/setting/mutual-result/unit-transform')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let body = 0
            let responseStatus = xhr.status
            let expectStatus = 200
            let responseLength = xhr.response.body.data.total
            //检查接口是否正常
            expect(responseStatus).to.equal(expectStatus)
            //接口返回的数据总数与界面展示的数据是否一致
            if (responseLength == 0 || responseLength == null) {
                cy.get('body').should('contain', '暂无数据')
            } else if (responseLength > 20) { //如果接口返回的数据大于20则判断总数据条数
                cy.get('.el-pagination__total').should('have.text', '共 ' + responseLength + ' 条')
            } else {
                cy.get('.el-table__body').eq(body).find('.el-table__row').should('have.length', responseLength)
            }
        })
    })
    it('009-单位转换设置-标签搜索(选择公立)', () => {
        let inputBox = 0
        let Tag = 1
        let bussinessList = 0
        let publicTag = 0
        //点击展开
        cy.get('.el-button.el-button--text.el-button--medium').eq(inputBox).click({
            force: true
        })
        //选择实验室标签
        cy.get('.el-radio__inner').eq(Tag).click({force:true})
        //标签选择公立
        cy.wait(500)
        cy.get('.el-select__input.is-medium').click({force:true})
        cy.get('.el-select-group').eq(bussinessList).find('li').eq(publicTag).click({force:true})
        cy.server()
        cy.route('**/cqb-base-mgr/service/mgr/itemUnitTransform/list?*').as('getData')
        cy.visit(urlHost + '#/setting/mutual-result/unit-transform')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let body = 0
            let responseStatus = xhr.status
            let expectStatus = 200
            let responseLength = xhr.response.body.data.total
            //检查接口是否正常
            expect(responseStatus).to.equal(expectStatus)
            //接口返回的数据总数与界面展示的数据是否一致
            if (responseLength == 0 || responseLength == null) {
                cy.get('body').should('contain', '暂无数据')
            } else if (responseLength > 20) { //如果接口返回的数据大于20则判断总数据条数
                cy.get('.el-pagination__total').should('have.text', '共 ' + responseLength + ' 条')
            } else {//如果接口返回的数据小于或者等于20则判断类.el-table__row的长度
                cy.get('.el-table__body').eq(body).find('.el-table__row').should('have.length', responseLength)
            }
        })
    })
    it('010-单位转换设置-标签搜索(选择私立)', () => {
        let inputBox = 0
        let Tag = 1
        let bussinessList = 0
        let privateTag = 1
        //点击展开
        cy.get('.el-button.el-button--text.el-button--medium').eq(inputBox).click({
            force: true
        })
        //选择实验室标签
        cy.get('.el-radio__inner').eq(Tag).click({force:true})
        //标签选择公立
        cy.wait(500)
        cy.get('.el-select__input.is-medium').click({force:true})
        cy.get('.el-select-group').eq(bussinessList).find('li').eq(privateTag).click({force:true})
        cy.server()
        cy.route('**/cqb-base-mgr/service/mgr/itemUnitTransform/list?*').as('getData')
        cy.visit(urlHost + '#/setting/mutual-result/unit-transform')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let body = 0
            let responseStatus = xhr.status
            let expectStatus = 200
            let responseLength = xhr.response.body.data.total
            //检查接口是否正常
            expect(responseStatus).to.equal(expectStatus)
            //接口返回的数据总数与界面展示的数据是否一致
            if (responseLength == 0 || responseLength == null) {
                cy.get('body').should('contain', '暂无数据')
            } else if (responseLength > 20) { //如果接口返回的数据大于20则判断总数据条数
                cy.get('.el-pagination__total').should('have.text', '共 ' + responseLength + ' 条')
            } else {
                cy.get('.el-table__body').eq(body).find('.el-table__row').should('have.length', responseLength)
            }
        })
    })
    it('011-单位转换设置-编辑公式', () => {
        let inputBox = 0
        let labCode = 'gd18020'
        let editFormula = 5
        let formulaBox = 1
        let editFormulaBox = 9
        let saveButton = 7
        let typeNumber = parseInt(Math.random() * 1000)
        cy.get('input[placeholder="实验室名称或编码"]').eq(inputBox).type(labCode, ({
            force: true
        }))
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(500)
        cy.get('.unit-fn').eq(formulaBox).invoke('text').then((data) => {
            let oldFormula = data
            cy.get('.el-button.el-button--text.el-button--medium').eq(editFormula).click({
                force: true
            })
            //录入新值
            cy.get('.el-input__inner').eq(editFormulaBox).clear({
                force: true
            }).type(123)
            //点击保存
            cy.get('.el-button.el-button--text.el-button--medium').eq(saveButton).click({
                force: true
            })
            cy.get('body').should('contain', '已设置')
            cy.get('.unit-fn').eq(formulaBox).invoke('text').then((data) => {
                let newFormula = data
                expect(oldFormula).not.to.equal(newFormula)
                //将公式还原成初始状态
                cy.get('.el-button.el-button--text.el-button--medium').eq(editFormula).click({
                    force: true
                })
                //录入新值
                cy.get('.el-input__inner').eq(editFormulaBox).clear({
                    force: true
                }).type(typeNumber)
                cy.get('.el-button.el-button--text.el-button--medium').eq(7).click({
                    force: true
                })
            })
        })

    })
    it('012-单位转换设置-批量编辑公式', () => {
        let inputBox = 0
        let labName = '南方医科大学顺德医院附属杏坛医院'
        let firstBox = 5
        let secondBox = 6
        let thirdBox = 4
        let forthBox =5
        let formulaBox1 = 9 // 第一条数据
        let formulaBox2 =10 // 第二条数据
        let typeInputBox = 12
        let typeNumber = parseInt(Math.random() * 1000)
        cy.get('input[placeholder="实验室名称或编码"]').eq(inputBox).type(labName, ({
            force: true
        }))
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(500)
        /**
         * 默认单位不一致不能进行批量编辑
         */
        cy.get('.el-checkbox__inner').eq(firstBox).click({
            force: true
        })
        cy.get('.el-checkbox__inner').eq(secondBox).click({
            force: true
        })
        cy.get('button').contains('批量编辑').click({
            force: true
        })
        cy.get('body').should('contain', '所选实验室有存在单位不一致，请检查')
        // 将单位不一致的数据取消勾选
        cy.get('.el-checkbox__inner').eq(firstBox).click({
            force: true
        })
        cy.get('.el-checkbox__inner').eq(secondBox).click({
            force: true
        })
        /**
         * 批量编辑成功
         */
        cy.get('.unit-fn').eq(formulaBox1).invoke('text').then((data) => {
            let firstOldFormula = data
            cy.log(firstOldFormula)
            cy.get('.unit-fn').eq(formulaBox2).invoke('text').then((data) => {
                let secondOldFormula = data
                cy.log(secondOldFormula)
                cy.get('.el-checkbox__inner').eq(thirdBox).click({
                    force: true
                })
                cy.get('.el-checkbox__inner').eq(forthBox).click({
                    force: true
                })
                cy.get('button').contains('批量编辑').click({
                    force: true
                })
                cy.get('.el-input__inner').eq(typeInputBox).type(typeNumber, {
                    force: true
                })
                cy.get('button').contains('保存').click({
                    force: true
                })
                cy.wait(500)
                cy.get('button').contains('搜索').click({
                    force: true
                })
                cy.get('.unit-fn').eq(formulaBox1).invoke('text').then((data) => {
                    let firstNewFormula = data
                    cy.log(firstNewFormula)
                    cy.get('.unit-fn').eq(formulaBox2).invoke('text').then((data) => {
                        let secondNewFormula = data
                        // 批量编辑后的两个公式应该相等
                        expect(firstNewFormula).to.equal(secondNewFormula)
                        // 批量编辑后的公式应该与之前的公式不一致
                        expect(firstNewFormula).not.to.equal(firstOldFormula)
                        // 批量编辑后的公式应该与之前的公式不一致
                        expect(secondNewFormula).not.to.equal(secondOldFormula)
                    })
                })
            })
        })
    })
    it('013-单位转换设置-重置公式功能', () => {
        let selectBox = 0
        let setFormula = 1
        let formulaStatus = 7
        let alreadySet = 2
        let chooseData = 0
        let editFormulaBox = 9
        let resetButton = 25
        let saveButton = 24
        cy.get('.el-button.el-button--text.el-button--medium').eq(selectBox).click({
            force: true
        })
        cy.wait(500)
        cy.get('input[placeholder="请选择"]').eq(setFormula).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(formulaStatus).find('li').eq(alreadySet).click({
            force: true
        })
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-table__body').eq(chooseData).find('.el-table__row').eq(chooseData).find('.unit-fn').invoke('text').then((formula)=>{
            let oldFormula = formula
            cy.log(oldFormula)
              //选择第一条数据进行编辑
        cy.get('.el-table__body').eq(chooseData).find('.el-table__row').eq(chooseData).find('.el-button.el-button--text.el-button--medium').click({
            force: true
        })
        //录入新值
        cy.get('.el-input__inner').eq(editFormulaBox).clear({
            force: true
        }).type(123, {
            force: true
        })
        //点击重置
        cy.get('.el-button.el-button--text.el-button--medium').eq(resetButton).click({
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/itemUnitTransform/update*').as('getData')
        //点击保存
        cy.get('.el-button.el-button--text.el-button--medium').eq(saveButton).click({
            force: true
        })
        cy.wait('@getData').then((xhr)=>{
            let getStatus = xhr.response.statusCode
            let expectStatus = 200
            expect(getStatus).to.eq(expectStatus)
            cy.get('body').should('contain','已设置')
            cy.get('.el-table__body').eq(chooseData).find('.el-table__row').eq(chooseData).find('.unit-fn').invoke('text').then((formula)=>{
                let getNewFormula = formula
                expect(getNewFormula).to.eq(oldFormula)
            })
        })
        })
      

    })
})