/**
 * 告警原因和措施
 */
context('信息互通设置-告警原因和措施', () => {
    before(() => {
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/message-setting/reason-step-dict')
    })
    it('001-告警原因和措施(未上报)-未填写未上报原因不能保存', () => {
        cy.wait(500)
        cy.get('button').contains('增加').click({
            force: true
        })
        cy.get('body').should('contain', '请填写名称！')
    })
    it('002-告警原因和措施(未上报)-新增相同的原因不能保存', () => {
        let Type = 1
        cy.wait(500)
        cy.get('.el-input.el-input--medium').eq(Type).type('仪器故障')
        cy.intercept('**/cqb-base-mgr/service/mgr/messageDic?*').as('getData')
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
        cy.intercept('**/cqb-base-mgr/service/mgr/messageDic?*').as('getData')
        //点击增加
        cy.get('button').contains('增加').click({
            force: true
        })
        //界面出现保存成功则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('004-告警原因和措施(未上报)-修改未上报原因', () => {
        cy.wait(500)
        let body = 0
        cy.get('.el-table__body').eq(body).find('tbody').find('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 2).find('.el-icon-edit').click({
                force: true
            })
            cy.get('.el-input__inner').eq(1).clear().type('123')
            cy.intercept('**/cqb-base-mgr/service/mgr/messageDic?*').as('Data')
            // 点击保存
            cy.get('button').contains('保存').click({
                force: true
            })
            //界面出现保存成功则通过
            cy.get('body').should('contain', '保存成功！')
        })

    })
    it('005-告警原因和措施(未上报)-删除未上报原因', () => {
        let body = 0
        cy.wait(1000)
        cy.get('.el-table__body').eq(body).find('tbody').find('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 2).find('.el-icon-delete').click({
                force: true
            })
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            //界面出现删除成功则通过
            cy.get('body').should('contain', '删除成功！')
        })

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
        let body = 1
        cy.wait(1000)
        cy.get('.el-table__body').eq(body).find('tbody').find('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 2).find('.el-icon-edit').click({
                force: true
            })
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 2).find('.el-input__inner').clear({
                force: true
            }).type('123', {
                force: true
            })
            cy.intercept('**/cqb-base-mgr/service/mgr/messageDic?*').as('Data')
            // 点击保存
            cy.get('button').contains('保存').click({
                force: true
            })
            //界面出现保存成功则通过
            cy.get('body').should('contain', '保存成功！')
        })
    })
    it('010-告警原因和措施(未上报)-删除未上报处理措施', () => {
        cy.wait(1000)
        let body = 1
        cy.get('.el-table__body').eq(body).find('tbody').find('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 2).find('.el-icon-delete').click({
                force: true
            })
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            //界面出现删除成功则通过
            cy.get('body').should('contain', '删除成功！')
        })
    })

    it('011-告警原因和措施(失控)-失控类别未填写不能保存', () => {
        let OutOfControl = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('button').contains('增加类别').click({
            force: true
        })
        cy.get('button').contains('保存').click({
            force: true
        })
        cy.get('body').should('contain', '请输入名称').should('not.contain', '保存成功')

    })
    it('012-告警原因和措施(失控)-失控类别重复不能保存', () => {
        let OutOfControl = 1
        let addType = 3
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('button').contains('增加类别').click({
            force: true
        })
        cy.get('.el-input.el-input--medium').eq(addType).type('仪器')
        cy.get('button').contains('保存').click({
            force: true
        })
        cy.get('body').should('contain', '名称已存在，请重新输入').should('not.contain', '保存成功')
    })
    it('013-告警原因和措施(失控)-新增失控类别', () => {
        let OutOfControl = 1
        let addType = 3
        let type = 0
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.dict-panel').eq(0).find('.dict-panel-item').then((getData) => {
            let getLength = getData.length
            cy.get('button').contains('增加类别').click({
                force: true
            })
            cy.get('.el-input.el-input--medium').eq(addType).type('自动化新增')
            cy.get('button').contains('保存').click({
                force: true
            })
            cy.get('body').should('contain', '保存成功')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength + 1)
        })

    })
    it('014-告警原因和措施(失控)-修改失控类别', () => {
        let OutOfControl = 1
        let addType = 3
        let type = 0
        let num = parseInt(Math.random() * 100000)
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.dict-panel').eq(type).find('.dict-panel-item').then((getData) => {
            let getLength = getData.length
            //修改相同的名称不能保存
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').eq(getLength - 1).find('.el-icon-edit').click({
                force: true
            })
            cy.get('.el-input__inner').eq(addType).clear().type('仪器')
            cy.get('button').contains('保存').click({
                force: true
            })
            cy.get('body').should('contain', '名称已存在，请重新输入')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)
            //修改不存在的名称可以保存
            cy.get('.el-input__inner').eq(addType).clear().type('自动化修改' + num)
            cy.get('button').contains('保存').click({
                force: true
            })
            cy.get('body').should('contain', '保存成功')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)
        })

    })
    it('015-告警原因和措施(失控)-删除失控类别', () => {
        let OutOfControl = 1
        let type = 0
        let deleteButton = 0
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.dict-panel').eq(type).find('.dict-panel-item').then((getData) => {
            let getLength = getData.length
            //----------已关联数据的类别删除失败----------
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').eq(getLength - 3).find('.el-icon-delete').eq(deleteButton).click({
                force: true
            })
            //确认删除
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            cy.get('body').should('contain', '存在关联数据的字典分类，不能够被删除')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)

            //--------------------------未关联数据的类别删除成功--------------------
            //点击删除 
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').eq(getLength - 1).find('.el-icon-delete').click({
                force: true
            })
            //确认删除
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)
        })
    })
    it('016-告警原因和措施(失控)-失控原因未填写不能保存', () => {
        let Type = 2
        let OutOfControl = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-icon-plus').eq(Type).click()
        cy.get('button').contains('保存').click({
            force: true
        })
        ////界面出现请填写名称！则通过
        cy.get('body').should('contain', '请输入名称')
    })
    it('017-告警原因和措施(失控)-新增相同的失控原因', () => {
        let reasonBox = 3
        cy.get('.el-input.el-input--medium').eq(reasonBox).type('仪器原因')
        cy.get('button').contains('保存').click({
            force: true
        })
        // //界面出现相同类型下不能存在重复值则通过
        cy.get('body').should('contain', '名称已存在，请重新输入')
        cy.get('.el-button.el-button--default.el-button--medium').eq(0).click({
            force: true
        })
    })
    it('018-告警原因和措施(失控)-新增失控原因', () => {
        let OutOfControl = 1
        let reasonBox = 3
        let addButton = 2
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-icon-plus').eq(addButton).click()
        cy.get('.el-input.el-input--medium').eq(reasonBox).type('人为原因')
        cy.get('button').contains('保存').click({
            force: true
        })
        //界面出现保存成功则通过
        cy.get('body').should('contain', '保存成功')
    })
    it('019-告警原因和措施(失控)-修改失控原因', () => {
        let OutOfControl = 1
        let reasonBox = 3
        let instrumentType = 1
        let num = parseInt(Math.random() * 100000)
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(1000)
        cy.get('.dict-panel-content').eq(instrumentType).find('.el-card__body').then((data) => {
            let getLength = data.length
            cy.get('.dict-panel-content').eq(instrumentType).find('.el-card__body').eq(getLength - 1).find('.el-icon-edit').click({
                force: true
            })
            cy.get('.el-input__inner').eq(reasonBox).clear().type('自动化修改' + num)
            cy.get('button').contains('保存').click({
                force: true
            })
            // //界面出现保存成功则通过
            cy.wait(1000)
            cy.get('body').should('contain', '保存成功')
        })

    })
    it('020-告警原因和措施(失控)-删除失控原因', () => {
        let OutOfControl = 1
        let DeleteButton = 2
        let instrumentType = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.dict-panel-content').eq(instrumentType).find('.el-card__body').then((data) => {
            let getLength = data.length
            cy.log(getLength)
            //点击删除
            cy.get('.dict-panel-content').eq(instrumentType).find('.el-card__body').eq(getLength - 1).find('.el-icon-delete').click({
                force: true
            })
            // 点击确认删除
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            cy.get('.dict-panel-content').eq(instrumentType).find('.el-card__body').should('have.length', getLength - 1)
        })
    })

    it('021-告警原因和措施(失控)-失控类别(处理措施)未填写不能保存', () => {
        cy.wait(1000)
        let OutOfControl = 1
        let treatmentMeasures = 4
        let addTypeButton = 1
        let saveButton = 3
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.el-button.dict-panel-add.el-button--primary.el-button--medium.is-plain').eq(addTypeButton).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        cy.get('body').should('contain', '请输入名称').should('not.contain', '保存成功')
        cy.get('.el-button.el-button--default.el-button--medium').eq(1).click({
            force: true
        })
    })

    it('022-告警原因和措施(失控)-失控类别(处理措施)重复不能保存', () => {
        let OutOfControl = 1
        let treatmentMeasures = 4
        let addTypeButton = 1
        let saveButton = 3
        let addBox = 4
        let type = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.dict-panel').eq(type).find('.dict-panel-item').then((data) => {
            let getLength = data.length
            cy.get('.el-button.dict-panel-add.el-button--primary.el-button--medium.is-plain').eq(addTypeButton).click({
                force: true
            })
            cy.get('.el-input__inner').eq(addBox).type('仪器', {
                force: true
            })
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            cy.get('body').should('contain', '名称已存在，请重新输入').should('not.contain', '保存成功')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)
        })

    })
    it('023-告警原因和措施(失控)-新增失控类别(处理措施)', () => {
        let OutOfControl = 1
        let treatmentMeasures = 4
        let addTypeButton = 1
        let saveButton = 3
        let addBox = 4
        let type = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.dict-panel').eq(type).find('.dict-panel-item').then((data) => {
            let getLength = data.length
            cy.get('.el-button.dict-panel-add.el-button--primary.el-button--medium.is-plain').eq(addTypeButton).click({
                force: true
            })
            cy.get('.el-input__inner').eq(addBox).clear().type('自动化新增', {
                force: true
            })
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            cy.get('body').should('contain', '保存成功')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength + 1)

        })
    })
    it('024-告警原因和措施(失控)-修改失控类别(处理措施)', () => {
        let OutOfControl = 1
        let treatmentMeasures = 4
        let saveButton = 3
        let addBox = 4
        let type = 1
        let num = parseInt(Math.random() * 100000)
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.dict-panel').eq(type).find('.dict-panel-item').then((data) => {
            let getLength = data.length

            // ------------------------修改成已存在不能进行保存--------------------------
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').eq(getLength - 1).find('.el-card__body').find('.el-icon-edit').click({
                force: true
            })
            cy.get('.el-input__inner').eq(addBox).clear().type('仪器')
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            cy.get('body').should('contain', '名称已存在，请重新输入').should('not.contain', '保存成功')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)
            //------------------------修改成不存在的名称可以进行保存--------------------------
            cy.get('.el-input__inner').eq(addBox).clear().type('仪器原因-自动化修改' + num, {
                force: true
            })
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            cy.get('body').should('contain', '保存成功')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)

        })
    })
    it('025-告警原因和措施(失控)-删除失控类别(处理措施)', () => {
        let OutOfControl = 1
        let type = 0
        let deleteButton = 0
        let treatmentMeasures = 4
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.dict-panel').eq(type).find('.dict-panel-item').then((getData) => {
            let getLength = getData.length
            //----------已关联数据的类别删除失败----------
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').eq(getLength - 3).find('.el-icon-delete').eq(deleteButton).click({
                force: true
            })
            //确认删除
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            cy.get('body').should('contain', '存在关联数据的字典分类，不能够被删除')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)

            //--------------------------未关联数据的类别删除成功--------------------
            // 点击删除 
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').eq(getLength - 1).find('.el-icon-delete').click({
                force: true
            })
            //确认删除
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)
        })
    })

    it('026-告警原因和措施(失控)-失控处理措施为空不能保存', () => {
        let saveButton = 3
        let OutOfControl = 1
        let MeasuresAdd = 12
        let treatmentMeasures = 4
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.el-icon-plus').eq(MeasuresAdd).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        //界面出现'请填写名称！则通过
        cy.get('body').should('contain', '请输入名称')
    })
    it('027-告警原因和措施(失控)-新增相同的失控处理措施', () => {
        let saveButton = 3
        let OutOfControl = 1
        let MeasuresAdd = 11
        let treatmentMeasures = 4
        let measureBox = 4
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(1000)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.el-icon-plus').eq(MeasuresAdd).click({
            force: true
        })
        //新增处理措施
        cy.get('.el-input__inner').eq(measureBox).clear().type('仪器维护')
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        //界面出现'请填写名称！则通过
        cy.get('body').should('contain', '名称已存在，请重新输入')
    })
    it('028-告警原因和措施(失控)-新增失控处理措施', () => {
        let saveButton = 3
        let OutOfControl = 1
        let MeasuresAdd = 11
        let treatmentMeasures = 4
        let measureBox = 4
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(1000)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.el-icon-plus').eq(MeasuresAdd).click({
            force: true
        })
        //新增处理措施
        cy.get('.el-input__inner').eq(measureBox).clear().type('自动化新增')
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        //界面出现'请填写名称！则通过
        cy.get('body').should('contain', '保存成功')
    })
    it('029-告警原因和措施(失控)-编辑失控处理措施', () => {
        let saveButton = 3
        let OutOfControl = 1
        let treatmentMeasures = 4
        let measureBox = 4
        let measureType = 10
        let num = parseInt(Math.random() * 100000)
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(1000)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').then((data) => {
            let getLength = data.length
            cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').eq(getLength - 1).find('.el-icon-edit').click({
                force: true
            })
            //修改处理措施
            cy.get('.el-input__inner').eq(measureBox).clear().type('自动化修改' + num)
            //点击保存
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            //界面出现'保存成功则通过
            cy.get('body').should('contain', '保存成功')
        })

    })
    it('030-告警原因和措施(失控)-删除失控处理措施', () => {
        let OutOfControl = 1
        let treatmentMeasures = 4
        let measureType = 10
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(1000)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').then((data) => {
            let getLength = data.length
            //删除处理措施
            cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').eq(getLength - 1).find('.el-icon-delete').click({
                force: true
            })
            //确认删除
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            //界面出现'请填写名称！则通过
            cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').should('have.length', getLength - 1)
        })
    })

    it('031-告警原因和措施(失控)-失控类别(预防措施)未填写不能保存', () => {
        cy.wait(1000)
        let OutOfControl = 1
        let treatmentMeasures = 5
        let addTypeButton = 2
        let saveButton = 5
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.el-button.dict-panel-add.el-button--primary.el-button--medium.is-plain').eq(addTypeButton).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        cy.get('body').should('contain', '请输入名称').should('not.contain', '保存成功')
        cy.get('.el-button.el-button--default.el-button--medium').eq(1).click({
            force: true
        })
    })
    it('032-告警原因和措施(失控)-失控类别(预防措施)重复不能保存', () => {
        let OutOfControl = 1
        let treatmentMeasures = 5
        let addTypeButton = 2
        let saveButton = 5
        let addBox = 5
        let type = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.dict-panel').eq(type).find('.dict-panel-item').then((data) => {
            let getLength = data.length
            cy.get('.el-button.dict-panel-add.el-button--primary.el-button--medium.is-plain').eq(addTypeButton).click({
                force: true
            })
            cy.get('.el-input__inner').eq(addBox).type('仪器',{
                force: true
            })
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            cy.get('body').should('contain', '名称已存在，请重新输入').should('not.contain', '保存成功')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)
        })

    })
    it('033-告警原因和措施(失控)-新增失控类别(预防措施)', () => {
        let OutOfControl = 1
        let treatmentMeasures = 5
        let addTypeButton = 2
        let saveButton = 5
        let addBox = 5
        let type = 1
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.dict-panel').eq(type).find('.dict-panel-item').then((data) => {
            let getLength = data.length
            cy.get('.el-button.dict-panel-add.el-button--primary.el-button--medium.is-plain').eq(addTypeButton).click({
                force: true
            })
            cy.get('.el-input__inner').eq(addBox).clear().type('自动化新增', {
                force: true
            })
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            cy.get('body').should('contain', '保存成功')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength + 1)

        })
    })
    it('034-告警原因和措施(失控)-修改失控类别(预防措施)', () => {
        let OutOfControl = 1
        let treatmentMeasures = 5
        let saveButton = 5
        let addBox = 5
        let type = 2
        let num = parseInt(Math.random() * 100000)
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.dict-panel').eq(type).find('.dict-panel-item').then((data) => {
            let getLength = data.length

            // ------------------------修改成已存在不能进行保存--------------------------
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').eq(getLength - 1).find('.el-card__body').find('.el-icon-edit').click({
                force: true
            })
            cy.get('.el-input__inner').eq(addBox).clear({
                force: true
            }).type('仪器', {
                force: true
            })
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            cy.get('body').should('contain', '名称已存在，请重新输入').should('not.contain', '保存成功')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)
            //------------------------修改成不存在的名称可以进行保存--------------------------
            cy.get('.el-input__inner').eq(addBox).clear().type('仪器原因-自动化修改' + num, {
                force: true
            })
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            cy.get('body').should('contain', '保存成功')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)
        })
    })
    it('035-告警原因和措施(失控)-删除失控类别(预防措施)', () => {
        let OutOfControl = 1
        let type = 0
        let deleteButton = 0
        let treatmentMeasures = 5
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(treatmentMeasures).click({
            force: true
        })
        cy.get('.dict-panel').eq(type).find('.dict-panel-item').then((getData) => {
            let getLength = getData.length
            //----------已关联数据的类别删除失败----------
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').eq(getLength - 3).find('.el-icon-delete').eq(deleteButton).click({
                force: true
            })
            //确认删除
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            cy.get('body').should('contain', '存在关联数据的字典分类，不能够被删除')
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)

            //--------------------------未关联数据的类别删除成功--------------------
            // 点击删除 
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').eq(getLength - 1).find('.el-icon-delete').click({
                force: true
            })
            //确认删除
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            cy.get('.dict-panel').eq(type).find('.dict-panel-item').should('have.length', getLength)
        })
    })
    it('036-告警原因和措施(失控)-预防措施为空不能保存', () => {
        let OutOfControl = 1
        let preventiveMeasures = 5
        let measureType = 21
        let measureAdd = 0
        let saveButton = 5
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(1000)
        cy.get('.el-tabs__item.is-top').eq(preventiveMeasures).click({
            force: true
        })
        cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').then((data) => {
            let getLength = data.length
            //点击新增
            cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').eq(measureAdd).click({
                force: true
            })
            cy.wait(500)
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            //界面出现'请输入名称则通过
            cy.get('body').should('contain', '请输入名称')
            cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').should('have.length', getLength)
        })
    })
    it('037-告警原因和措施(失控)-新增相同的预防措施', () => {
        let OutOfControl = 1
        let preventiveMeasures = 5
        let measureType = 19
        let measureAdd = 0
        let saveButton = 5
        let measureBox = 5
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(preventiveMeasures).click({
            force: true
        })
        cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').then((data) => {
            let getLength = data.length
            //点击新增
            cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').eq(measureAdd).click({
                force: true
            })
            cy.wait(500)
            cy.get('.el-input__inner').eq(measureBox).type('维护保养后，正确度验证', {
                force: true
            })
            //点击保存
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            //界面出现'请输入名称则通过
            cy.get('body').should('contain', '名称已存在，请重新输入')
            cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').should('have.length', getLength)
        })

    })
    it('038-告警原因和措施(失控)-新增预防措施', () => {
        let OutOfControl = 1
        let preventiveMeasures = 5
        let measureType = 19
        let measureAdd = 0
        let saveButton = 5
        let measureBox = 5
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(preventiveMeasures).click({
            force: true
        })
        cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').then((data) => {
            let getLength = data.length
            //点击新增
            cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').eq(measureAdd).click({
                force: true
            })
            cy.wait(500)
            cy.get('.el-input__inner').eq(measureBox).clear().type('自动化新增', {
                force: true
            })
            //点击保存
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            //界面出现'请输入名称则通过
            cy.get('body').should('contain', '保存成功')
            cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').should('have.length', getLength + 1)
        })
    })
    it('039-告警原因和措施(失控)-修改预防措施', () => {
        let OutOfControl = 1
        let preventiveMeasures = 5
        let measureType = 19
        let saveButton = 5
        let measureBox = 5
        let num = parseInt(Math.random() * 100000)
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(preventiveMeasures).click({
            force: true
        })
        cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').then((data) => {
            let getLength = data.length
            //点击修改
            cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').eq(getLength - 1).find('.el-icon-edit').click({
                force: true
            })
            cy.wait(500)
            cy.get('.el-input__inner').eq(measureBox).clear().type('自动化修改' + num)
            //点击保存
            cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
                force: true
            })
            //界面出现'请输入名称则通过
            cy.get('body').should('contain', '保存成功')
        })
    })
    it('040-告警原因和措施(失控)-删除预防措施', () => {
        let OutOfControl = 1
        let preventiveMeasures = 5
        let measureType = 19
        cy.get('.el-tabs__nav.is-top').find('div').eq(OutOfControl).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-tabs__item.is-top').eq(preventiveMeasures).click({
            force: true
        })
        cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').then((data) => {
            let getLength = data.length
            //点击删除
            cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').eq(getLength - 1).find('.el-icon-delete').click({
                force: true
            })
            cy.wait(500)
            //  确认删除
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            cy.get('.dict-panel-content').eq(measureType).find('.el-card__body').should('have.length', getLength - 1)
        })
    })
    it('041-告警原因和措施(CV/符合率异常)-新增相同的异常原因不能保存', () => {
        cy.wait(1000)
        let CVAbnormal = 2
        let ReasonAdd = 2
        let Type = 6
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-input__inner').eq(Type).type('仪器原因', {
            force: true
        })
        cy.get('.el-button.el-button--text.el-button--medium').eq(ReasonAdd).click({
            force: true
        })
        //界面出现相同类型下不能存在重复值则通过
        cy.get('body').should('contain', '相同类型下不能存在重复值')
    })
    it('042-告警原因和措施(CV/符合率异常)-新增成功的异常原因', () => {
        let CVAbnormal = 2
        let ReasonAdd = 2
        let Type = 6
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-input__inner').eq(Type).clear().type('仪器原因2')
        cy.get('.el-button.el-button--text.el-button--medium').eq(ReasonAdd).click({
            force: true
        })
        //界面出现保存成功则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('043-告警原因和措施(CV/符合率异常)-修改异常原因', () => {
        let CVAbnormal = 2
        let body = 2
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(1000)
        cy.get('.el-table__body').eq(body).find('tbody').find('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 2).find('.el-icon-edit').click({
                force: true
            })
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 2).find('.el-input__inner').clear({
                force: true
            }).type('123', {
                force: true
            })
            cy.intercept('**/cqb-base-mgr/service/mgr/messageDic?*').as('Data')
            // 点击保存
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 2).find('.el-icon-check').click({
                force: true
            })
            //界面出现保存成功则通过
            cy.get('body').should('contain', '保存成功！')
        })
    })
    it('044-告警原因和措施(CV/符合率异常)-删除异常原因', () => {
        let CVAbnormal = 2
        let body = 2
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(1000)
        cy.get('.el-table__body').eq(body).find('tbody').find('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 2).find('.el-icon-delete').click({
                force: true
            })
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            //界面出现删除成功则通过
            cy.get('body').should('contain', '删除成功！')
        })
    })
    it('045-告警原因和措施(CV/符合率异常)-新增异常措施为空不能保存', () => {
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
    it('046-告警原因和措施(CV/符合率异常)-新增相同的原处理措施不能保存', () => {
        let CVAbnormal = 2
        let MeasureAdd = 3
        let Type = 7
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
    it('047-告警原因和措施(CV/符合率异常)-新增成功的处理措施', () => {
        let CVAbnormal = 2
        let MeasureAdd = 3
        let Type = 7
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(500)
        cy.get('.el-input__inner').eq(Type).clear().type('仪器原因2')
        cy.get('.el-button.el-button--text.el-button--medium').eq(MeasureAdd).click({
            force: true
        })
        //界面出现保存成功！则通过
        cy.get('body').should('contain', '保存成功！')
    })
    it('048-告警原因和措施(CV/符合率异常)-修改处理措施', () => {
        let CVAbnormal = 2
        let body = 3
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(1000)
        cy.get('.el-table__body').eq(body).find('tbody').find('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 2).find('.el-icon-edit').click({
                force: true
            })
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 2).find('.el-input__inner').clear({
                force: true
            }).type('123', {
                force: true
            })
            cy.intercept('**/cqb-base-mgr/service/mgr/messageDic?*').as('Data')
            // 点击保存
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 2).find('.el-icon-check').click({
                force: true
            })
            //界面出现保存成功则通过
            cy.get('body').should('contain', '保存成功！')

        })
    })
    it('049-告警原因和措施(CV/符合率异常)-删除处理措施', () => {
        let CVAbnormal = 2
        let body = 3
        cy.get('.el-tabs__nav.is-top').find('div').eq(CVAbnormal).click({
            force: true
        })
        cy.wait(1000)
        cy.get('.el-table__body').eq(body).find('tbody').find('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 2).find('.el-icon-delete').click({
                force: true
            })
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                force: true
            })
            //界面出现删除成功则通过
            cy.get('body').should('contain', '删除成功！')
        })
    })
})