/**
 * 实验室信息采集表配置
 */
context('实验室信息采集表配置', () => {
    before(() => {
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/collection/info-collection')
        cy.wait(500)
    })
    it('001-实验室信息采集表配置-添加表单', () => {
        let save = 3
        let formBox = 1
        let fieldBox = 2
        cy.get('.el-table__body').find('.el-table__row').then((getData) => {
            let length = getData.length
            //---------表单名称为空不能保存-------------
            cy.get('button').contains('添加表单').click()
            cy.wait(500)
            cy.get('.el-button.el-button--primary.el-button--medium').eq(save).click()
            cy.get('body').should('contain', '请输入表单名称')
            cy.get('.el-table__body').first().find('.el-table__row').should('have.length', length)
            //---------表单名称重复不能保存-------------
            cy.get('.el-input__inner').eq(formBox).type('表单一')
            cy.get('.el-button.el-button--primary.el-button--medium').eq(save).click()
            cy.get('body').should('contain', '表单名称已存在，请重输')
            cy.get('.el-table__body').first().find('.el-table__row').should('have.length', length)
        })
        //---------字段名称为空不能保存 -------------
        cy.get('.el-input__inner').eq(formBox).clear().type('测试添加')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(save).click()
        cy.get('.el-message__content').should('have.text', '字段名称不能为空')
        //---------成功添加表单 -------------
        cy.get('.el-input__inner').eq(fieldBox).clear().type('文本字段')
        cy.intercept('**/cqb-base-mgr/service/mgr/collect/form*').as('addForm')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(save).click()
        cy.wait('@addForm').then((xhr) => {
            let ExpectStatus = 200
            let ResponseStatus = xhr.response.statusCode
            expect(ResponseStatus).to.equal(ExpectStatus)
        })
        cy.get('.el-table__body').find('.el-table__row').first().should('have.length', length + 1)
    })
    it('002--实验室信息采集表配置-推送表单', () => {
        //----------未关联实验室不能推送----------
        cy.intercept({
            method: 'PUT',
            url: '**/push*'
        }).as('push')
        cy.get('.el-table__body').find('.el-table__row').last().find('button').contains('推送').click()
        cy.wait('@push').then((xhr) => {
            let ExpectStatus = 400
            let ResponseStatus = xhr.response.statusCode
            expect(ResponseStatus).to.equal(ExpectStatus)
            cy.get('.el-message__content').should('have.text', '该表单未关联实验室，不能进行推送')
        })
    })
    it('003-实验室信息采集表配置-编辑表单', () => {
        let save = 3
        let typeWord = '文本字段'
        let newTypeWord = '其他字段'
        let formBox = 1
        let newFormName = '测试修改名称'
        //同一表单下列表名称不允许重名
        cy.get('.el-table__body').find('.el-table__row').last().find('.cell').first().invoke('text').then((getText) => {
            let oldFormName = getText
            cy.get('.el-table__body').find('.el-table__row').last().find('button').contains('编辑').click()
            cy.get('.el-icon-plus').last().click()
            cy.get('input[placeholder="请输入字段名称"]').last().type(typeWord)
            cy.get('.el-button.el-button--primary.el-button--medium').eq(save).click()
            cy.get('.el-message__content').should('have.text', '字段名称' + '"' + typeWord + '"' + '重复')
            //修改表单名称
            cy.get('input[placeholder="请输入字段名称"]').last().clear().type(newTypeWord)
            cy.get('.el-input__inner').eq(formBox).clear().type(newFormName)
            cy.intercept('**form*').as('editForm')
            cy.get('.el-button.el-button--primary.el-button--medium').eq(save).click()
            cy.wait(500)
            cy.wait('@editForm').then((xhr) => {
                let ExpectStatus = 200
                let ResponseStatus = xhr.response.statusCode
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-table__body').find('.el-table__row').last().find('.cell').first().invoke('text').then((getText) => {
                    let getNewName = getText
                    expect(oldFormName).not.to.eq(getNewName)
                })
            })
        })
    })
    it('004-实验室信息采集表配置-删除字段', () => {
        let save = 3
        // -------------------字段已关联数据不允许删除----------------
        cy.get('.el-table__body').find('.el-table__row').first().find('button').contains('编辑').click()
        cy.get('.el-button.el-button--danger.el-button--small').first().click()
        cy.intercept({
            method: 'DELETE',
            url: '**/fields/*'
        }).as('deleteFields')
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
        cy.wait('@deleteFields').then((xhr) => {
            let ExpectStatus = 400
            let ResponseStatus = xhr.response.statusCode
            expect(ResponseStatus).to.equal(ExpectStatus)
            cy.get('.el-message__content').should('have.text', '该实验室质量管理信息采集字段已经有关联的数据，不允许删除')
            cy.get('.el-button.el-button--primary.el-button--medium').eq(save).click()
        })
        // -------------------字段未关联数据可以删除----------------
        cy.get('.el-table__body').find('.el-table__row').last().find('button').contains('编辑').click()
        cy.get('.el-table__body').last().find('.el-table__row').then((getData) => {
            let length = getData.length
            cy.get('.el-button.el-button--danger.el-button--small').first().click()
            cy.intercept({
                method: 'DELETE',
                url: '**/fields/*'
            }).as('deleteFields')
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
            cy.wait('@deleteFields').then((xhr) => {
                let ExpectStatus = 200
                let ResponseStatus = xhr.response.statusCode
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-table__body').last().find('.el-table__row').should('have.length', length - 1)
                cy.get('.el-button.el-button--primary.el-button--medium').eq(save).click()
            })
        })
    })
    it('005-实验室信息采集表配置-关联实验室', () => {
        let save = 2
        cy.get('.el-table__body').find('.el-table__row').last().find('button').contains('编辑').click()
        cy.get('.el-button.ql-select-lab__new.el-button--text.el-button--mini').click()
        cy.get('input[placeholder="请输入实验室名称或编码"]').first().type('gdtest5')
        cy.get('button').contains('搜索').click()
        cy.get('.el-checkbox__inner').click()
        cy.get('.el-button.el-button--primary.el-button--medium').last().click()
        cy.intercept('**/cqb-base-mgr/service/mgr/collect/form*').as('updateForm')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(save).click()
        cy.wait('@updateForm').then((xhr) => {
            let ExpectStatus = 200
            let ResponseStatus = xhr.response.statusCode
            expect(ResponseStatus).to.equal(ExpectStatus)
        })
    })
    it('006-实验室信息采集表配置-正常推送/取消推送', () => {
        //--------正常推送--------------
        cy.intercept({
            method: 'PUT',
            url: '**/push*'
        }).as('pushForm')
        cy.get('.el-table__body').find('.el-table__row').last().find('button').contains('推送').click()
        cy.wait('@pushForm').then((xhr) => {
            let ExpectStatus = 200
            let ResponseStatus = xhr.response.statusCode
            expect(ResponseStatus).to.equal(ExpectStatus)
            cy.get('.el-message__content').should('have.text', '保存成功')
            cy.get('.el-table__body').find('.el-table__row').last().find('.cell').eq(2).invoke('text').then((getData) => {
                let getTime = getData
                expect(getTime).not.to.be.null
            })
        })
        //--------取消推送--------------
        cy.get('.el-table__body').find('.el-table__row').last().find('button').contains('取消推送').click()
        cy.intercept('**/cancelPush').as('cancelPush')
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click()
        cy.wait('@cancelPush').then((xhr) => {
            let ExpectStatus = 200
            let ResponseStatus = xhr.response.statusCode
            expect(ResponseStatus).to.equal(ExpectStatus)
            cy.get('.el-message__content').should('have.text', '保存成功')
        })
    })
    it('007-实验室信息采集表配置-删除表单', () => {
        //--------已关联数据的表单不允许删除--------------
        cy.get('.el-table__body').find('.el-table__row').then((getData) => {
            let length = getData.length
            cy.get('.el-table__body').find('.el-table__row').first().find('button').contains('删除').click()
            cy.intercept('**/form/*').as('deleteForm')
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
            cy.wait('@deleteForm').then((xhr) => {
                let ExpectStatus = 400
                let ResponseStatus = xhr.response.statusCode
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-message__content').should('have.text', '该实验室质量管理信息采集表已经有关联的数据，不允许删除')
                cy.get('.el-table__body').find('.el-table__row').should('have.length', length)
            })
            //--------未关联数据的表单可以删除--------------
            cy.get('.el-table__body').find('.el-table__row').last().find('button').contains('删除').click()
            cy.intercept('**/form/*').as('deleteForm')
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
            cy.wait('@deleteForm').then((xhr) => {
                let ExpectStatus = 200
                let ResponseStatus = xhr.response.statusCode
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-table__body').find('.el-table__row').should('have.length', length - 1)
            })
        })
    })
})