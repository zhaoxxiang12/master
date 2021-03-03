/**
 * 告警原因和措施
 */
context('信息互通设置-告警原因和措施', () => {
    let urlHost = 'http://cqb-mgr.gd.test.sh-weiyi.com/cqb-base-mgr-fe/app.html'
    beforeEach(() => {
        let SettingIndex = 12
        let MessageSettingIndex = 13
        let WariningIndex = 13
        let UseIndex = 1
        cy.loginCQB()
        //点击设置
        cy.get('.el-submenu__title').eq(SettingIndex).click({
            force: true
        })
        // 点击信息互通设置
        cy.get('.el-submenu__title').eq(MessageSettingIndex).click({
            force: true
        })
        //点击推送设置
        cy.get('.el-menu.el-menu--inline').eq(WariningIndex).find('.el-menu-item').eq(UseIndex).click({
            force: true
        })
    })
    it('001-告警原因和措施(未上报)-未填写未上报原因不能保存', () => {
        cy.wait(500)
        // cy.get('.el-input.el-input--medium').eq(Type).type('测试未上报')
        cy.get('button').contains('增加').click({
            force: true
        })
        cy.get('body').should('contain', '请填写名称！')
    })
    it('002-告警原因和措施(未上报)-新增相同的原因不能保存', () => {
        let Type = 1
        cy.wait(500)
        cy.get('.el-input.el-input--medium').eq(Type).type('仪器故障')
        cy.server()
        cy.route('**/cqb-base-mgr/service/mgr/messageDic?*').as('getData')
        cy.visit(urlHost + '#/setting/message-setting/reason-step-dict')
        //点击增加
        cy.get('button').contains('增加').click({
            force: true
        })
        cy.get('body').should('contain', '相同类型下不能存在重复值')
    })
    it('003-告警原因和措施(未上报)-新增未上报', () => {
        let Type = 1
        cy.wait(500)
        cy.get('.el-input.el-input--medium').eq(Type).type('测试未上报')
        cy.server()
        cy.route('**/cqb-base-mgr/service/mgr/messageDic?*').as('getData')
        cy.visit(urlHost + '#/setting/message-setting/reason-step-dict')
        //点击增加
        cy.get('button').contains('增加').click({
            force: true
        })
        //界面出现保存成功则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('004-告警原因和措施(未上报)-修改未上报原因', () => {
        cy.wait(500)
        cy.get('button').contains('编辑').click({
            force: true
        })
        cy.get('.el-table__row').eq(2).type('123')
        cy.server()
        cy.route('**/cqb-base-mgr/service/mgr/messageDic?*').as('Data')
        cy.visit(urlHost + '#/setting/message-setting/reason-step-dict')
        // 点击保存
        cy.get('button').contains('保存').click({
            force: true
        })
        //界面出现保存成功则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('005-告警原因和措施(未上报)-删除未上报原因', () => {
        cy.wait(500)
        cy.get('button').contains('删除').click({
            force: true
        })
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
            force: true
        })
        //界面出现删除成功则通过
        cy.get('body').should('contain', '删除成功！')
    })
    it('006-告警原因和措施(未上报)-未上报的处理措施为空不能保存', () => {
        cy.wait(500)
        let MeasuresButton = 1
        cy.get('.el-button.el-button--text.el-button--medium').eq(MeasuresButton).click({
            force: true
        })
        //界面出现请填写名称！则通过
        cy.get('body').should('contain', '请填写名称！')
    })
    it('007-告警原因和措施(未上报)-新增相同未上报的处理措施不能保存', () => {
        let Type = 2
        let MeasuresButton = 1
        cy.wait(500)
        cy.get('.el-input.el-input--medium').eq(Type).type('已手工上报')
        //点击增加
        cy.get('.el-button.el-button--text.el-button--medium').eq(MeasuresButton).click({
            force: true
        })
        //界面出现相同类型下不能存在重复值则通过
        cy.get('body').should('contain', '相同类型下不能存在重复值')
    })
    it('008-告警原因和措施(未上报)-新增未上报的处理措施', () => {
        let Type = 2
        let MeasuresButton = 1
        cy.wait(500)
        cy.get('.el-input.el-input--medium').eq(Type).type('新增措施')
        //点击增加
        cy.get('.el-button.el-button--text.el-button--medium').eq(MeasuresButton).click({
            force: true
        })
        //界面出现保存成功！则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('009-告警原因和措施(未上报)-修改未上报的处理措施', () => {
        let EditMeasures = 2
        let TypeMeasures = 2
        cy.wait(500)
        cy.get('.el-button.el-button--text.el-button--medium').eq(EditMeasures).click({
            force: true
        })
        cy.get('.el-input.el-input--medium').eq(TypeMeasures).type('123')
        // 点击保存
        cy.get('button').contains('保存').click({
            force: true
        })
        //界面出现保存成功！则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('010-告警原因和措施(未上报)-删除未上报处理措施', () => {
        let DeleteMeasures = 1
        cy.wait(500)
        cy.get('.el-button.el-button--text.el-button--medium').eq(DeleteMeasures).click({
            force: true
        })
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
            force: true
        })
        //界面出现删除成功！则通过
        cy.get('body').should('contain', '删除成功！')
    })
    it('011-告警原因和措施(失控)-失控原因未填写不能保存', () => {
        let Type = 1
        let OutOfControl = 1
        let ReasonAdd = 0
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-button.el-button--text.el-button--medium').eq(ReasonAdd).click({
            force: true
        })
        ////界面出现请填写名称！则通过
        cy.get('body').should('contain', '请填写名称！')
    })
    it('012-告警原因和措施(失控)-新增相同的失控原因', () => {
        let Type = 1
        let OutOfControl = 1
        let ReasonAdd = 0
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-input__inner').eq(Type).type('人为原因')
        cy.get('.el-button.el-button--text.el-button--medium').eq(ReasonAdd).click({
            force: true
        })
        // //界面出现相同类型下不能存在重复值则通过
        cy.get('body').should('contain', '相同类型下不能存在重复值')
    })
    it('013-告警原因和措施(失控)-新增失控原因', () => {
        let Type = 1
        let OutOfControl = 1
        let ReasonAdd = 0
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-input__inner').eq(Type).type('人为原因2')
        cy.get('.el-button.el-button--text.el-button--medium').eq(ReasonAdd).click({
            force: true
        })
        //界面出现保存成功则通过
        cy.get('body').should('contain', '保存成功')
    })
    it('014-告警原因和措施(失控)-修改失控原因', () => {
        let Type = 1
        let OutOfControl = 1
        let EditButton = 1

        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.get('.el-button.el-button--text.el-button--medium').eq(EditButton).click({
            force: true
        })
        cy.get('.el-input__inner').eq(Type).type(123)
        cy.get('button').contains('保存').click({
            force: true
        })
        // //界面出现保存成功则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('015-告警原因和措施(失控)-删除失控原因', () => {
        let OutOfControl = 1
        let DeleteButton = 0
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        //点击删除
        cy.get('.el-button.el-button--text.el-button--medium').eq(DeleteButton).click({
            force: true
        })
        //点击确认删除
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
            force: true
        })
        //界面出现删除成功则通过
        cy.get('body').should('contain', '删除成功！')
    })
    it('016-告警原因和措施(失控)-失控处理措施为空不能保存', () => {
        let Type = 1
        let OutOfControl = 1
        let MeasuresAdd = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-button.el-button--text.el-button--medium').eq(MeasuresAdd).click({
            force: true
        })
        //界面出现'请填写名称！则通过
        cy.get('body').should('contain', '请填写名称！')
    })
    it('017-告警原因和措施(失控)-新增相同的失控处理措施', () => {
        let Type = 2
        let OutOfControl = 1
        let MeasuresAdd = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-input__inner').eq(Type).type('更换试剂')
        cy.get('.el-button.el-button--text.el-button--medium').eq(MeasuresAdd).click({
            force: true
        })
        //界面出现相同类型下不能存在重复值则通过
        cy.get('body').should('contain', '相同类型下不能存在重复值')
    })
    it('018-告警原因和措施(失控)-新增失控处理措施', () => {
        let Type = 2
        let OutOfControl = 1
        let MeasuresAdd = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-input__inner').eq(Type).type('更换试剂2')
        cy.get('.el-button.el-button--text.el-button--medium').eq(MeasuresAdd).click({
            force: true
        })
        //界面出现保存成功则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('019-告警原因和措施(失控)-编辑失控处理措施', () => {
        let Type = 2
        let OutOfControl = 1
        let EditMeasures = 2
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-button.el-button--text.el-button--medium').eq(EditMeasures).click({
            force: true
        })
        cy.get('.el-input__inner').eq(Type).type("AAA")
        cy.get('button').contains('保存').click({
            force: true
        })
        // //界面出现保存成功则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('020-告警原因和措施(失控)-删除失控处理措施', () => {
        let OutOfControl = 1
        let DeleteMeasures = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-button.el-button--text.el-button--medium').eq(DeleteMeasures).click({
            force: true
        })
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
            force: true
        })
        // //界面出现删除成功则通过
        cy.get('body').should('contain', '删除成功！')
    })
    it('021-告警原因和措施(CV/符合率异常)-新增异常原因为空不能保存', () => {
        let CVAbnormal = 2
        let ReasonAdd = 0
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-button.el-button--text.el-button--medium').eq(ReasonAdd).click({
            force: true
        })
         //界面出现请填写名称！则通过
        cy.get('body').should('contain', '请填写名称！')
    })
    it('022-告警原因和措施(CV/符合率异常)-新增相同的异常原因不能保存', () => {
        let CVAbnormal = 2
        let ReasonAdd = 0
        let Type = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-input__inner').eq(Type).type('仪器原因')
        cy.get('.el-button.el-button--text.el-button--medium').eq(ReasonAdd).click({
            force: true
        })
        //界面出现相同类型下不能存在重复值则通过
        cy.get('body').should('contain', '相同类型下不能存在重复值')
    })
    it('023-告警原因和措施(CV/符合率异常)-新增成功的异常原因', () => {
        let CVAbnormal = 2
        let ReasonAdd = 0
        let Type = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-input__inner').eq(Type).type('仪器原因2')
        cy.get('.el-button.el-button--text.el-button--medium').eq(ReasonAdd).click({
            force: true
        })
        //界面出现保存成功则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('024-告警原因和措施(CV/符合率异常)-修改异常原因', () => {
        let CVAbnormal = 2
        let ReasonEdit = 1
        let Type = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-button.el-button--text.el-button--medium').eq(ReasonEdit).click({
            force: true
        })
        cy.get('.el-input__inner').eq(Type).type("AAA")
        cy.get('button').contains('保存').click({
            force: true
        })
        //界面出现保存成功则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('025-告警原因和措施(CV/符合率异常)-删除异常原因', () => {
        let CVAbnormal = 2
        let ReasonDelete = 0
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-button.el-button--text.el-button--medium').eq(ReasonDelete).click({
            force: true
        })
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
            force: true
        })
        //界面出现删除成功则通过
        cy.get('body').should('contain', '删除成功！')
    })

    it('026-告警原因和措施(CV/符合率异常)-新增异常措施为空不能保存', () => {
        let CVAbnormal = 2
        let MeasureAdd = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-button.el-button--text.el-button--medium').eq(MeasureAdd).click({
            force: true
        })
        //界面出现请填写名称！则通过
        cy.get('body').should('contain', '请填写名称！')
    })
    it('027-告警原因和措施(CV/符合率异常)-新增相同的原处理措施不能保存', () => {
        let CVAbnormal = 2
        let MeasureAdd = 1
        let Type = 2
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-input__inner').eq(Type).type('仪器维护')
        cy.get('.el-button.el-button--text.el-button--medium').eq(MeasureAdd).click({
            force: true
        })
        //界面出现相同类型下不能存在重复值则通过
        cy.get('body').should('contain', '相同类型下不能存在重复值')
    })
    it('028-告警原因和措施(CV/符合率异常)-新增成功的处理措施', () => {
        let CVAbnormal = 2
        let MeasureAdd = 1
        let Type = 2
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-input__inner').eq(Type).type('仪器原因2')
        cy.get('.el-button.el-button--text.el-button--medium').eq(MeasureAdd).click({
            force: true
        })
        //界面出现保存成功！则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('029-告警原因和措施(CV/符合率异常)-修改处理措施', () => {
        let CVAbnormal = 2
        let ReasonEdit = 2
        let Type = 2
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-button.el-button--text.el-button--medium').eq(ReasonEdit).click({
            force: true
        })
        cy.get('.el-input__inner').eq(Type).type("AAA")
        cy.get('button').contains('保存').click({
            force: true
        })
        //界面出现保存成功则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('030-告警原因和措施(CV/符合率异常)-删除处理措施', () => {
        let CVAbnormal = 2
        let MeasureDelete = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-button.el-button--text.el-button--medium').eq(MeasureDelete).click({
            force: true
        })
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
            force: true
        })
        //界面出现删除成功则通过
        cy.get('body').should('contain', '删除成功！')
    })
})