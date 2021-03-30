context('互认标准设置', () => {
    let host = "http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html"
    beforeEach(() => {
        cy.loginCQB()
    })
    it('cqb-001-互认标准设置-添加标准-添加定量项目标准', () => {
        let saveButton = 8
        cy.server()
        cy.route('**/service/mgr/std/yearrecog/list*').as('getList')
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        cy.wait('@getList').then((xhr) => {
            //点击添加标准按钮
            cy.get('.el-card__body').find('.el-icon-plus').click({
                force: true
            })
            //输入标准名称
            let standardName = Math.ceil(Math.random() * 1000)
            cy.get('label[for="stdName"] + div').find('.el-input__inner').type('标准' + standardName)
            //点击规则设置
            cy.get('tbody > tr').eq(5).find('button').click({
                force: true
            })
            //输入阈值标准
            cy.get('.mutual-rule-double').find('input[placeholder="0 < 阈值 < 100"]').type('2.5')
            //点击连续合格月数下拉框
            cy.get('input[placeholder="连续合格月数"]').eq(0).click({
                force: true
            })
            //下拉选择月数--选择2
            cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq('1').click({
                force: true
            })
            //点击合格判定规则  下拉框       
            cy.get('input[placeholder="合格判定规则"]').eq(0).click({
                force: true
            })
            //CV%判定规则选择
            cy.get('.el-scrollbar__view.el-select-dropdown__list').contains('有一个批号的CV%通过则算通过').click({
                force:true
            })
            //勾选‘部中心EQA合格次数’复选框
            cy.get('label[for="partEqaPassTimes"]').find('input[type="checkbox"]').eq(0).click({
                force: true
            })
            //点击部中心‘不判定’下拉框
            cy.get('input[placeholder="不判定"]').first().click({
                force: true
            })
            //下拉框选择次数   选择3次     
            cy.get('.el-select-dropdown__wrap.el-scrollbar__wrap').eq(9).find('li').eq('2').click({
                force: true
            })
            cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
                let getLength = getData.length
                let index = 0
                //点击添加
                cy.get('.el-card__body').find('.el-icon-plus').click({
                    force: true
                })
                cy.wait(1000)
                for (let i = 0; i < getLength - 1; i++) { //每新增一个标准,最外层的保存按键就会加1
                    index += 1
                }
                //点击保存
                cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                    force: true
                })
                //点击最外层弹窗的‘保存’按钮
                cy.get('.el-dialog__footer').find('button').eq(5).click({
                    force: true
                })
                // // 关闭提示弹窗
                cy.get('.el-message-box__btns').find('button').contains('确定').click({
                    force: true
                })
            })
        })
    })
    it('cqb-002-互认标准设置-添加标准-新增标准名称已存在失败', () => {
        let typeName = "佛山标准"
        let standardName = 1
        let saveButton = 7
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            //点击添加
            cy.get('.el-card__body').find('.el-icon-plus').click({
                force: true
            })
            cy.wait(500)
            //输入标准名称
            cy.get('.el-input__inner').eq(standardName).type(typeName, {
                force: true
            })
            //点击保存
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            cy.get('body').should('contain', '互认标准名称已存在，请重输')
            //断言-如果添加失败数据不会新增
            cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').should('have.length', getLength)
        })
    })
    it('cqb-003-互认标准设置-添加标准-标准名称为空保存失败', () => {
        let saveButton = 7
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            //点击添加
            cy.get('.el-card__body').find('.el-icon-plus').click({
                force: true
            })
            cy.wait(1000)
            for (let i = 0; i < getLength - 2; i++) { //每新增一个标准,最外层的保存按键就会加1(getlength - 2 默认初始有两个标准)
                index += 1
            }
            //点击保存
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                force: true
            })
            cy.get('body').should('contain', '请输入活动名称')
            //断言-如果添加失败数据不会新增
            cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').should('have.length', getLength)
        })
    })
    it('cqb-004-互认标准设置-添加标准-批量设置规则', () => {
        let submitButton = 5
        let saveButton = 13
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(1).click({
            force: true
        })
        cy.wait(1000)
        //点击复选框（选择几个项目设置规则）
        cy.get('.el-checkbox__inner').eq(4).click({
            force: true
        })
        cy.get('.el-checkbox__inner').eq(5).click({
            force: true
        })
        cy.get('.el-checkbox__inner').eq(6).click({
            force: true
        })
        //点击批量设置按钮
        cy.get('.el-icon-edit').click({
            force: true
        })
        //设置阈值标准2.5
        cy.get('input[placeholder="不覆盖当前值"]').eq(0).type('2.5')
        //设置连续合格月数
        cy.get('input[placeholder="不覆盖当前值"]').eq(1).click({
            force: true
        })
        //下拉选择月份2
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq('2').click({
            force: true
        })
        //点击‘CV%判定规则’下拉框
        cy.get('input[placeholder="不覆盖当前值"]').eq(2).click({
            force: true
        })
        //下拉选择CV判定规则，选第一个（选择不同规则，修改最后一个eq里面的参数）
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click({
            force: true
        })
        //点击选择部中复选框
        cy.get('label[for="partEqaPassTimes"]').find('.el-checkbox__label').eq(0).click({
            force: true
        })
        //点击部中心下拉框
        cy.get('input[placeholder="不覆盖当前值"]').eq(3).click({
            force:true
        })
        //部级选择次数，2次
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click({
            force: true
        })
        //设置工作日上报率
        cy.get('label[for="workDayRepRate"] + div').find('input[placeholder="不覆盖当前值"]').eq(0).type('100')
        //设置消息读取率
        cy.get('label[for="messageReadRate"] + div').find('input[placeholder="不覆盖当前值"]').eq(0).type('90')
        //设置失控纠正率
        cy.get('label[for="itemCorrectRate"] + div').find('input[placeholder="不覆盖当前值"]').eq(0).type('90')
        //设置工作日上报的合格月数  //选择合格月数-次数-2次(选择多少次修改最后一个eq里面的参数)
        cy.get('label[for="workDayPassTimes"] + div').find('input[placeholder="不覆盖当前值"]').eq(0).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click({
            force: true
        })
        //设置消息读取率的合格月数  //选择消息读取率次数-2次(选择多少次修改最后一个eq里面的参数)
        cy.get('label[for="messageReadPassTimes"] + div').find('input[placeholder="不覆盖当前值"]').eq(0).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click({
            force: true
        })
        //设置消息读取率的合格月数  //选择消息读取率次数-2次(选择多少次修改最后一个eq里面的参数)
        cy.get('label[for="itemCorrectPassTimes"] + div').find('input[placeholder="不覆盖当前值"]').eq(0).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click({
            force: true
        })
        //点击关闭规则设置弹窗底部保存按钮
        cy.get('.el-dialog__footer').eq(7).find('button').eq(1).click({
            force: true
        })
        // 关闭弹窗
        cy.get('.el-message-box__btns').find('button').eq(1).click({
            force: true
        })
        //点击‘添加’按钮添加实验室
        cy.get('.el-button.ql-select-lab__new.el-button--text.el-button--mini').click({
            force: true
        })
        cy.wait(1000)
        //搜索框输入关键字gdtest6
        cy.get('input[placeholder="请输入实验室名称或编码"]').eq(0).type('gdtest6', {
            force: true
        })
        //点击搜索按钮
        cy.get('button[type="submit"]').eq(0).click({
            force: true
        })
        cy.wait(1000)
        //点击复选框
        cy.get('.el-checkbox__input').eq(69).click({
            force: true
        })
        //点击‘保存’按钮
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            cy.log(getLength)
            for (let i = 0; i < getLength - 2; i++) { //每新增一个标准,最外层的保存按键就会加1(getlength - 2 默认初始有两个标准)
                index += 1
            }
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                force: true
            })
        })
        cy.wait(1000)
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            cy.log(getLength)
            for (let i = 0; i < getLength - 2; i++) { //每新增一个标准,最外层的保存按键就会加1(getlength - 2 默认初始有两个标准)
                index += 1
            }
            //保存关闭最外层的弹窗
            cy.get('.el-button.el-button--primary.el-button--medium').eq(submitButton + index).click({
                force: true
            })
        })
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click({
            force: true
        })
        cy.get('body').should('contain', '保存成功！')
    })
    it('cqb-005-互认标准设置-添加标准-批量设置规则-不限项目', () => {
        let COV2 = 1
        let rate = 0
        let submitButton = 6
        let dropList = 18
        cy.wait(500)
        cy.visit(host + '#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(1).click({
            force: true
        })
        //分类选择新冠病毒核酸检测
        cy.get('.el-button.spec-filter__item.el-button--small').eq(COV2).click({
            force: true
        })
        //点击复选框（选择几个项目设置规则）
        cy.wait(500)
        cy.get('tbody > tr').eq(0).find('.el-checkbox__inner').click({
            force: true
        })
        cy.get('tbody > tr').eq(1).find('.el-checkbox__inner').click({
            force: true
        })
        //点击批量设置按钮
        cy.get('.el-icon-edit').click({
            force:true
        })
        //设置阈值标准2.5
        cy.get('input[placeholder="不覆盖当前值"]').eq(0).type('2.5')
        //设置连续合格月数
        cy.get('input[placeholder="不覆盖当前值"]').eq(1).click({
            force: true
        })
        //下拉选择月份3
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq('2').click({
            force: true
        })
        //点击‘CV%判定规则’下拉框
        cy.get('input[placeholder="不覆盖当前值"]').eq(2).click({
            force: true
        })
        //下拉选择CV判定规则，选第一个（选择不同规则，修改最后一个eq里面的参数）
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq(1).click({
            force: true
        })
        //点击选择部中复选框
        cy.get('label[for="partEqaPassTimes"]').eq(0).find('.el-checkbox__label').click({
            force: true
        })
        //点击部中心下拉框
        cy.get('input[placeholder="不覆盖当前值"]').eq(5).click({
            force: true
        })

        //部级选择次数，2次
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click({
            force: true
        })
        //设置工作日上报率
        cy.get('label[for="workDayRepRate"] + div').find('input[placeholder="不覆盖当前值"]').eq(rate).type('100', {
            force: true
        })
        //设置消息读取率
        cy.get('label[for="messageReadRate"] + div').find('input[placeholder="不覆盖当前值"]').eq(rate).type('90', {
            force: true
        })
        //设置失控纠正率
        cy.get('label[for="itemCorrectRate"] + div').find('input[placeholder="不覆盖当前值"]').eq(rate).type('90', {
            force: true
        })
        //设置工作日上报的合格月数  //选择合格月数-次数-2次(选择多少次修改最后一个eq里面的参数)
        cy.get('label[for="workDayPassTimes"] + div').find('input[placeholder="不覆盖当前值"]').eq(rate).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('.el-select-dropdown__item').eq(1).click({
            force: true
        })
        //设置消息读取率的合格月数  //选择消息读取率次数-2次(选择多少次修改最后一个eq里面的参数)
        cy.get('label[for="messageReadPassTimes"] + div').find('input[placeholder="不覆盖当前值"]').eq(rate).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(1).click({
            force: true
        })
        //设置消息读取率的合格月数  //选择消息读取率次数-2次(选择多少次修改最后一个eq里面的参数)
        cy.get('label[for="itemCorrectPassTimes"] + div').find('input[placeholder="不覆盖当前值"]').eq(rate).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(1).click({
            force: true
        })
        // 点击关闭规则设置弹窗底部保存按钮
        cy.get('.el-dialog__footer').eq(7).find('button').eq(1).click({
            force: true
        })
        // 关闭弹窗
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click({
            force: true
        })
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            for (let i = 0; i < getLength - 2; i++) { //每新增一个标准,最外层的保存按键就会加1(getlength - 2 默认初始有两个标准)
                index += 1
            }
            //保存关闭最外层的弹窗
            cy.get('.el-button.el-button--primary.el-button--medium').eq(submitButton + index).click({
                force: true
            })
        })
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click({
            force: true
        })
        cy.get('body').should('contain', '保存成功！')
    })
    it('cqb-006-互认标准设置-阈值标准未填写不能保存', () => {
        let COV2 = 1
        let edit = 1
        let setRules = 1
        let saveButton = 9
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(edit).click({
            force: true
        })
        cy.wait(1000)
        //分类选择新冠病毒核酸检测
        cy.get('.el-button.spec-filter__item.el-button--small').eq(COV2).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--small').eq(setRules).click({
            force: true
        })
        //设置连续合格月数
        cy.get('input[placeholder="连续合格月数"]').eq(0).click({
            force: true
        })
        //下拉选择月份3
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq('2').click({
            force: true
        })
        //点击‘CV%判定规则’下拉框
        cy.get('input[placeholder="合格判定规则"]').eq(0).click({
            force: true
        })
        //下拉选择CV判定规则，选第一个（选择不同规则，修改最后一个eq里面的参数）
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq(1).click({
            force: true
        })
        //点击选择部中复选框
        cy.get('label[for="partEqaPassTimes"]').eq(0).find('.el-checkbox__label').click({
            force: true
        })
        //点击部中心下拉框
        cy.get('input[placeholder="不判定"]').eq(0).click({
            force: true
        })
        //部级选择次数，2次
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq(1).click({
            force: true
        })
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            for (let i = 0; i < getLength - 2; i++) { //每新增一个标准,最外层的保存按键就会加1(getlength - 2 默认初始有两个标准)
                index += 1
            }
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                force: true
            })
        })
        cy.get('body').should('contain', '请填写标准值')
    })
    it('cqb-007-互认标准设置-连续合格月数未填写不能保存', () => {
        let COV2 = 1
        let edit = 1
        let setRules = 1
        let saveButton = 9
        let thresholdValue = 5
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(edit).click({
            force: true
        })
        cy.wait(1000)
        //分类选择新冠病毒核酸检测
        cy.get('.el-button.spec-filter__item.el-button--small').eq(COV2).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--small').eq(setRules).click({
            force: true
        })
        cy.wait(1000)
        //设置阈值标准
        cy.get('.el-input__inner').eq(thresholdValue).type("99", {
            force: true
        })
        //下拉选择月份3
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq('2').click({
            force: true
        })
        //点击‘CV%判定规则’下拉框
        cy.get('input[placeholder="合格判定规则"]').eq(0).click({
            force: true
        })
        //下拉选择CV判定规则，选第一个（选择不同规则，修改最后一个eq里面的参数）
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq(1).click({
            force: true
        })
        //点击选择部中复选框
        cy.get('label[for="partEqaPassTimes"]').eq(0).find('.el-checkbox__label').click({
            force: true
        })
        //点击部中心下拉框
        cy.get('input[placeholder="不判定"]').eq(0).click({
            force: true
        })
        //部级选择次数，2次
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq(1).click({
            force: true
        })
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            for (let i = 0; i < getLength - 2; i++) { //每新增一个标准,最外层的保存按键就会加1(getlength - 2 默认初始有两个标准)
                index += 1
            }
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                force: true
            })
        })
        cy.get('body').should('contain', '请选择连续合格月数')
    })
    it('cqb-008-互认标准设置-CV%判定规则未填写不能保存', () => {
        let COV2 = 1
        let edit = 1
        let setRules = 1
        let saveButton = 9
        let thresholdValue = 5
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(edit).click({
            force: true
        })
        cy.wait(1000)
        //分类选择新冠病毒核酸检测
        cy.get('.el-button.spec-filter__item.el-button--small').eq(COV2).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--small').eq(setRules).click({
            force: true
        })
        //设置阈值标准
        cy.get('.el-input__inner').eq(thresholdValue).type("99", {
            force: true
        })
        //设置连续合格月数
        cy.get('input[placeholder="连续合格月数"]').eq(0).click({
            force: true
        })
        //下拉选择月份3
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq(2).click({
            force: true
        })
        //下拉选择CV判定规则，选第一个（选择不同规则，修改最后一个eq里面的参数）
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq(1).click({
            force: true
        })
        //点击选择部中复选框
        cy.get('label[for="partEqaPassTimes"]').eq(0).find('.el-checkbox__label').click({
            force: true
        })
        //点击部中心下拉框
        cy.get('input[placeholder="不判定"]').eq(0).click({
            force: true
        })
        //部级选择次数，2次
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq(1).click({
            force: true
        })
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            for (let i = 0; i < getLength - 2; i++) { //每新增一个标准,最外层的保存按键就会加1(getlength - 2 默认初始有两个标准)
                index += 1
            }
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                force: true
            })
        })
        cy.get('body').should('contain', '请选择合格判定规则')
    })
    it('cqb-009-互认标准设置-阈值填写不规范(负数大于100，0，特殊符号)不能保存', () => {
        let COV2 = 1
        let edit = 1
        let setRules = 1
        let saveButton = 9
        let thresholdValue = 5
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(edit).click({
            force: true
        })
        cy.wait(1000)
        //分类选择新冠病毒核酸检测
        cy.get('.el-button.spec-filter__item.el-button--small').eq(COV2).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--small').eq(setRules).click({
            force: true
        })
        //设置阈值标准
        cy.get('.el-input__inner').eq(thresholdValue).type("0", {
            force: true
        })
        //设置连续合格月数
        cy.get('input[placeholder="连续合格月数"]').eq(0).click({
            force: true
        })
        //下拉选择月份3
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq(2).click({
            force: true
        })
        //点击‘CV%判定规则’下拉框
        cy.get('input[placeholder="合格判定规则"]').eq(0).click({
            force: true
        })
        //下拉选择CV判定规则，选第一个（选择不同规则，修改最后一个eq里面的参数）
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq(1).click({
            force: true
        })
        //点击选择部中复选框
        cy.get('label[for="partEqaPassTimes"]').eq(0).find('.el-checkbox__label').click({
            force: true
        })
        //点击部中心下拉框
        cy.get('input[placeholder="不判定"]').eq(0).click({
            force: true
        })
        //部级选择次数，2次
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq(1).click({
            force: true
        })
        cy.get('body').should('contain', '请填大于0，小于100的值')
        cy.get('.el-input__inner').eq(thresholdValue).clear({
            force: true
        }).type("@", {
            force: true
        })
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            for (let i = 0; i < getLength - 2; i++) {
                index += 1
            }
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                force: true
            })
        })

        cy.get('body').should('contain', '请填大于0，小于100的值')
        cy.get('.el-input__inner').eq(thresholdValue).clear({
            force: true
        }).type("0", {
            force: true
        })
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            for (let i = 0; i < getLength - 2; i++) {
                index += 1
            }
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                force: true
            })
        })
        cy.get('body').should('contain', '请填大于0，小于100的值')
        cy.get('.el-input__inner').eq(thresholdValue).clear({
            force: true
        }).type("100", {
            force: true
        })
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            for (let i = 0; i < getLength - 2; i++) {
                index += 1
            }
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                force: true
            })
        })
        cy.get('body').should('contain', '请填大于0，小于100的值')
    })
    it('cqb-010-互认标准设置-模板名称为空不能保存', () => {
        let chemical = 2
        let edit = 1
        let setRules = 1
        let saveButton = 9
        let clickButton = 0
        let dropList = 9
        let thresholdValue = 5
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(edit).click({
            force: true
        })
        cy.wait(1000)
        //分类选择常规化学
        cy.get('.el-button.spec-filter__item.el-button--small').eq(chemical).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--small').eq(setRules).click({
            force: true
        })
        //设置阈值标准
        cy.get('.el-input__inner').eq(thresholdValue).clear({
            force: true
        }).type("99", {
            force: true
        })
        //设置连续合格月数
        cy.get('input[placeholder="连续合格月数"]').eq(clickButton).click({
            force: true
        })
        //下拉选择月份3
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(2).click({
            force: true
        })
        //点击‘CV%判定规则’下拉框
        cy.get('input[placeholder="合格判定规则"]').eq(clickButton).click({
            force: true
        })
        //下拉选择CV判定规则，选第一个（选择不同规则，修改最后一个eq里面的参数）
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(1).click({
            force: true
        })
        //点击选择部中复选框
        cy.get('label[for="partEqaPassTimes"]').eq(clickButton).find('.el-checkbox__label').click({
            force: true
        })
        //点击部中心下拉框
        cy.get('input[placeholder="不判定"]').eq(clickButton).click({
            force: true
        })
        //部级选择次数，2次
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(1).click({
            force: true
        })
        cy.get('button').contains('保存为模板').click({
            force: true
        })
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            //点击添加
            cy.get('.el-card__body').find('.el-icon-plus').click({
                force: true
            })
            cy.wait(1000)
            for (let i = 0; i < getLength - 2; i++) { //每新增一个标准,最外层的保存按键就会加1(getlength - 2 默认初始有两个标准)
                index += 1
            }
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                force: true
            })
            cy.get('body').should("contain", "请配置模板名称")
        })
    })
    it('cqb-011-互认标准设置-保存模板', () => {
        let chemical = 2
        let edit = 1
        let setRules = 1
        let saveButton = 9
        let clickButton = 0
        let dropList = 9
        let typeBox = 18
        let thresholdValue = 5
        let province = 1
        let city = 2
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(edit).click({
            force: true
        })
        cy.wait(1000)
        //分类选择常规化学
        cy.get('.el-button.spec-filter__item.el-button--small').eq(chemical).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--small').eq(setRules).click({
            force: true
        })
        //设置阈值标准
        cy.get('.el-input__inner').eq(thresholdValue).clear({
            force: true
        }).type("99", {
            force: true
        })
        //设置连续合格月数
        cy.get('input[placeholder="连续合格月数"]').eq(clickButton).click({
            force: true
        })
        //下拉选择月份3
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(2).click({
            force: true
        })
        //点击‘CV%判定规则’下拉框
        cy.get('input[placeholder="合格判定规则"]').eq(clickButton).click({
            force: true
        })
        //下拉选择CV判定规则，选第一个（选择不同规则，修改最后一个eq里面的参数）
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(1).click({
            force: true
        })
        //点击选择部中心EQA合格次数
        cy.get('label[for="partEqaPassTimes"]').eq(clickButton).find('.el-checkbox__label').click({
            force: true
        })
        //点击部中心下拉框
        cy.get('input[placeholder="不判定"]').eq(clickButton).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(clickButton).click({
            force: true
        })
        //省中心EQA合格次数
        cy.get('label[for="provinceEqaPassTimes"]').find('.el-checkbox__label').click({
            force: true
        })
        cy.get('input[placeholder="不判定"]').eq(province).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(clickButton).click({
            force: true
        })
        //市中心EQA合格次数
        cy.get('label[for="cityEqaPassTimes"]').find('.el-checkbox__label').click({
            force: true
        })
        cy.get('input[placeholder="不判定"]').eq(city).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(clickButton).click({
            force: true
        })
        cy.wait(500)
        cy.get('button').contains('保存为模板').click({
            force: true
        })
        cy.get('.el-input__inner').eq(typeBox).type('自动化测试模板', {
            force: true
        })
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            //点击添加
            cy.get('.el-card__body').find('.el-icon-plus').click({
                force: true
            })
            cy.wait(1000)
            for (let i = 0; i < getLength - 2; i++) { //每新增一个标准,最外层的保存按键就会加1(getlength - 2 默认初始有两个标准)
                index += 1
            }
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                force: true
            })
            cy.get('body').should('contain', '保存成功！').and('contain', '选择模板')
        })
    })
    it('cqb-012-互认标准设置-模板名称重复不能保存', () => {
        let chemical = 2
        let edit = 1
        let setRules = 1
        let saveButton = 9
        let clickButton = 0
        let dropList = 9
        let typeBox = 18
        let thresholdValue = 5
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(edit).click({
            force: true
        })
        cy.wait(1000)
        //分类选择常规化学
        cy.get('.el-button.spec-filter__item.el-button--small').eq(chemical).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--small').eq(setRules).click({
            force: true
        })
        //设置阈值标准
        cy.get('.el-input__inner').eq(thresholdValue).clear({
            force: true
        }).type("99", {
            force: true
        })
        //设置连续合格月数
        cy.get('input[placeholder="连续合格月数"]').eq(clickButton).click({
            force: true
        })
        //下拉选择月份3
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(2).click({
            force: true
        })
        //点击‘CV%判定规则’下拉框
        cy.get('input[placeholder="合格判定规则"]').eq(clickButton).click({
            force: true
        })
        //下拉选择CV判定规则，选第一个（选择不同规则，修改最后一个eq里面的参数）
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(1).click({
            force: true
        })
        //点击选择部中复选框
        cy.get('label[for="partEqaPassTimes"]').eq(clickButton).find('.el-checkbox__label').click({
            force: true
        })
        //点击部中心下拉框
        cy.get('input[placeholder="不判定"]').eq(clickButton).click({
            force: true
        })
        //部级选择次数，2次
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(1).click({
            force: true
        })
        cy.wait(500)
        cy.get('button').contains('保存为模板').click({
            force: true
        })
        cy.get('.el-input__inner').eq(typeBox).type('自动化测试模板', {
            force: true
        })
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            //点击添加
            cy.get('.el-card__body').find('.el-icon-plus').click({
                force: true
            })
            cy.wait(1000)
            for (let i = 0; i < getLength - 2; i++) { //每新增一个标准,最外层的保存按键就会加1(getlength - 2 默认初始有两个标准)
                index += 1
            }
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                force: true
            })
            cy.get('body').should('contain', '模板名称不能重复!')
        })
    })
    it('cqb-013-互认标准设置-修改模板(模板名称)', () => {
        let chemical = 2
        let edit = 1
        let setRules = 1
        let saveButton = 9
        let typeBox = 18
        let miniList = 1
        let editDemo = 0
        let demoName = 0
        let ramdom = parseInt(Math.random() * 10000)
        let typeName = '自动化测试修改模板名称' + ramdom
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(edit).click({
            force: true
        })
        //分类选择常规化学
        cy.get('.el-button.spec-filter__item.el-button--small').eq(chemical).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--small').eq(setRules).click({
            force: true
        })
        cy.wait(500)
        cy.get('button').contains('选择模板').click({
            force: true
        })
        cy.get('.el-table__body').eq(miniList).find('.el-table__row').then((getData) => {
            let getLength = getData.length
            cy.get('.el-table__body').eq(miniList).find('.el-table__row').eq(getLength - 1).find('.el-button.el-button--default.el-button--mini').eq(editDemo).click({
                force: true
            })
            cy.get('.el-input__inner').eq(typeBox).clear({
                force: true
            }).type(typeName, {
                force: true
            })
            cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
                let getLength = getData.length
                let index = 0
                for (let i = 0; i < getLength - 2; i++) { //每新增一个标准,最外层的保存按键就会加1(getlength - 2 默认初始有两个标准)
                    index += 1
                }
                cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                    force: true
                })
            })
            cy.wait(1000)
            cy.get('.el-table__body').eq(miniList).find('.el-table__row').eq(getLength - 1).find(".cell").eq(demoName).should('have.text', typeName)
            cy.get('body').should('contain', '保存成功！')
        })
    })
    it('cqb-014-互认标准设置-使用模板', () => {
        let chemical = 2
        let edit = 1
        let setRules = 1
        let checkTest = 25
        let miniList = 1
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(edit).click({
            force: true
        })
        //分类选择常规化学
        cy.get('.el-button.spec-filter__item.el-button--small').eq(chemical).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--small').eq(setRules).click({
            force: true
        })
        cy.wait(1000)
        cy.get('button').contains('选择模板').click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-table__body').eq(miniList).find('.el-table__row').then((getData) => {
            let getLength = getData.length
            //点击使用
            cy.get('.el-table__body').eq(miniList).find('.el-table__row').eq(getLength - 1).find('.el-button.el-button--primary.el-button--mini').click({
                force: true
            })
            cy.wait(1000)
            //断言(看复选框是否已选中)
            cy.get('.el-checkbox__input').eq(checkTest).should('have.class', 'is-checked')
        })
    })
    it('cqb-015-互认标准设置-删除模板', () => {
        let chemical = 2
        let edit = 1
        let setRules = 1
        let checkButton = 1
        let miniList = 1
        let miniDelete = 1
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(edit).click({
            force: true
        })
        //分类选择常规化学
        cy.get('.el-button.spec-filter__item.el-button--small').eq(chemical).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--small').eq(setRules).click({
            force: true
        })
        cy.wait(500)
        cy.get('button').contains('选择模板').click({
            force: true
        })
        cy.get('.el-table__body').eq(miniList).find('.el-table__row').then((getData) => {
            let getLength = getData.length
            if (getLength == 1) {
                cy.get('.el-table__body').eq(miniList).find('.el-table__row').eq(getLength - 1).find('.el-button.el-button--default.el-button--mini')
                //点击删除
                cy.get('.el-table__body').eq(miniList).find('.el-table__row').eq(getLength - 1).find('.el-button.el-button--default.el-button--mini').eq(miniDelete).click({
                    force: true
                })
                //确认删除
                cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                    force: true
                })
                cy.wait(1000)
                //断言(只有一个模板时,如果模板被删除了,选择模板这个按键会消失)
                cy.get('.mutual-rule-template').find('span').eq(checkButton).should('have.css', 'display', 'none')
            } else {
                //点击删除
                cy.get('.el-table__body').eq(miniList).find('.el-table__row').eq(getLength - 1).find('.el-button.el-button--default.el-button--mini').eq(miniDelete).click({
                    force: true
                })
                //确认删除
                cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                    force: true
                })
                cy.wait(500)
                //断言(判断模板数据是否少了)
                cy.get('.el-table__body').eq(miniList).find('.el-table__row').should('have.length', getLength - 1)
            }
        })
    })
    it('cqb-016-互认标准设置-项目搜索', () => {
        let chemical = 2
        let edit = 1
        let bigBody = 0
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(edit).click({
            force: true
        })
        //分类选择常规化学
        cy.get('.el-button.spec-filter__item.el-button--small').eq(chemical).click({
            force: true
        })
        cy.get('input[placeholder ="输入项目名称"]').type('胆固醇', {
            force: true
        })
        cy.wait(500)
        cy.get('.el-table__body').find('tbody').eq(bigBody).find('.el-table__row').should('have.length', 3)
    })
    it('cqb-017-互认标准设置-已关联标准的实验室不能再次关联(复选框置灰)', () => {
        let chemical = 2
        let edit = 1
        let typeBox = 0
        let checkBox = 25
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        //点击修改按钮
        cy.get('.el-icon-edit-outline').eq(edit).click({
            force: true
        })
        //分类选择常规化学
        cy.get('.el-button.spec-filter__item.el-button--small').eq(chemical).click({
            force: true
        })
        //点击添加
        cy.get('.el-button.ql-select-lab__new.el-button--text.el-button--mini').click({
            force: true
        })
        //输入实验室名称
        cy.get('input[placeholder="请输入实验室名称或编码"]').eq(typeBox).type('gd18001', {
            force: true
        })
        //点击搜索
        cy.get('button').contains("搜索").click({
            force: true
        })
        //断言复选框是否置灰
        cy.get('.el-checkbox__input').eq(checkBox).should('have.class', 'is-disabled')
        //输入实验室名称
        cy.get('input[placeholder="请输入实验室名称或编码"]').eq(typeBox).clear().type('gdtest5', {
            force: true
        })
        //点击搜索
        cy.get('button').contains("搜索").click({
            force: true
        })
        //断言复选框是否未置灰
        cy.get('.el-checkbox__input').eq(checkBox).should('not.have.class', 'is-disabled')
    })
    it('cqb-018-互认标准设置-复制互认标准', () => {
        let copyBbutton = 1
        let standardName = 1
        let saveButton = 7
        let typeName = '自动化复制标准'
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            let index = 0
            cy.get('.el-button.copy.el-button--success.el-button--medium.is-circle').eq(copyBbutton).click({
                force: true
            })
            cy.wait(500)
            //输入标准名称
            cy.get('.el-input__inner').eq(standardName).type(typeName, {
                force: true
            })

            for (let i = 0; i < getLength - 2; i++) {
                index += 1
            }
            //点击保存
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton + index).click({
                force: true
            })
            //点击弹窗确认
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click({
                force: true
            })
            //断言是否保存成功
            cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').should('have.length', getLength + 1)
            cy.get('body').should('contain', '互认标准创建成功！')
            //断言保存后的标准名称
            cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').eq(getLength).find('.sd-cfg__item-title').should('have.text', typeName)
            //删除复制的模板
            cy.get('.el-button.delete.el-button--danger.el-button--medium.is-circle').eq(getLength).click({
                force: true
            })
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            cy.get('body').should('contain', '删除成功！')
        })
    })
    it('cqb-019-互认标准设置-删除标准', () => {
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').then((getData) => {
            let getLength = getData.length
            if (getLength == 1) { //防止将默认规则删除
                return
            } else {
                //点击删除
                cy.get('.el-button.delete.el-button--danger.el-button--medium.is-circle').eq(getLength - 1).click({
                    force: true
                })
                //确认删除
                cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                    force: true
                })
                cy.get('body').should('contain', '删除成功！')
                cy.get('.sd-cfg').find('.el-card.sd-cfg__item.is-hover-shadow').should('have.length', getLength - 1)
            }
        })
    })
    it('cqb-020-互认标准设置-切换质控主管单位(青浦医联体)', () => {
        let QPYLT = 1
        let QPStandard = 0
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        cy.wait(1000)
        cy.get('input[placeholder="请选择"]').click({
            forece: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/std/yearrecog/list?*').as('getData')
        cy.get('.el-scrollbar__view.el-select-dropdown__list').find('li').eq(QPYLT).click({
            force: true
        })
        cy.wait('@getData').then((Data) => {
            let getStatus = Data.response.statusCode
            let expectStatus = 200
            expect(getStatus).to.eq(expectStatus)
        })
        cy.get('.el-card.sd-cfg__item.is-hover-shadow').eq(QPStandard).find('.sd-cfg__item-title').should('have.text', 'WST406')
    })
})