/**
 * 业务标签
 */
context('标签管理-业务标签', () => {
    before(() => {
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/tags/tags-service')
        cy.wait(500)
    })
    it('001-业务标签-添加标签分类', () => {
        cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').then((getData) => {
            let length = getData.length
            //----------未填写标签名称不能保存----------   
            cy.get('button').contains('添加标签分类').click()
            cy.get('button').contains('保存').click()
            cy.get('body').should('contain', '请输入分类名称')
            cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length)
            //----------分类名称已存在不能保存---------
            cy.get('.el-input__inner').first().type('数据上报')
            cy.get('button').contains('保存').click()
            cy.get('body').should('contain', '分类已存在，请重新输入')
            cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length)
            //----------正常保存----------------------
            cy.get('.el-input__inner').first().clear().type('自动添加')
            cy.intercept('**/cqb-base-mgr/service/mgr/tag/types/service*').as('tag')
            cy.get('button').contains('保存').click()
            cy.wait('@tag').then((xhr) => {
                let ExpectStatus = 200
                let ResponseStatus = xhr.response.statusCode
                expect(ResponseStatus).to.equal(ExpectStatus)
            })
            cy.get('.el-message.el-message--success').should('have.text', '标签分类已添加')
            cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length + 1)
        })
    })
    it('002-业务标签-修改标签分类名', () => {
        cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').then((getData) => {
            let length = getData.length
            //---------修改为已存在的名称------------
            cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').last()
                .find('.el-button.el-button--primary.el-button--mini').click()
            cy.get('.el-input__inner').first().clear().type('数据上报')
            cy.get('button').contains('保存').click()
            cy.get('body').should('contain', '分类已存在，请重新输入')
            cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length)
            //---------成功修改---------------- 
            cy.get('.el-input__inner').first().clear().type('自动修改')
            cy.intercept('**/cqb-base-mgr/service/mgr/tag/types/service/*').as('update')
            cy.get('button').contains('保存').click()
            cy.wait('@update').then((xhr) => {
                let ExpectStatus = 200
                let ResponseStatus = xhr.response.statusCode
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-message.el-message--success').should('have.text', '标签分类已更新')
                cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length)
            })
        })
    })
    it('003-业务标签-添加标签', () => {
        let save = 2
        let close = 1
        cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').last().click()
        //-------标签名为空不能保存-----------
        cy.get('.el-icon-plus').last().click()
        cy.get('.el-button.el-button--primary.el-button--medium').eq(save).click()
        cy.get('body').should('contain', '请输入标签名称')
        //-------添加成功-----------
        cy.get('.el-input__inner').first().clear().type('自动添加标签1')
        cy.intercept('**/cqb-base-mgr/service/mgr/tags/service*').as('add')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(save).click()
        cy.wait('@add').then((xhr) => {
            let ExpectStatus = 200
            let ResponseStatus = xhr.response.statusCode
            expect(ResponseStatus).to.equal(ExpectStatus)
            cy.get('.el-message__content').should('have.text', '标签已添加')
            //--------添加重复的标签-------------
            cy.get('.el-icon-plus').last().click()
            cy.get('.el-input__inner').first().clear().type('自动添加标签1')
            cy.get('.el-button.el-button--primary.el-button--medium').eq(save).click()
            cy.get('body').should('contain', '标签已存在，请重新输入')
            cy.get('.el-button.el-button--default.el-button--medium').eq(close).click()
        })
    })
    it('004-业务标签-修改标签名', () => {
        let save= 2
        //-----标签名已存在,保存失败-------------
        cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').last().click()
        cy.get('.el-collapse-item__content').last().find('.ql-tag.el-tag.el-tag--medium').then((getData) => {
            let length = getData.length
            cy.get('.el-collapse-item__content').last().find('.ql-tag.el-tag.el-tag--medium').first().click()
            cy.get('.el-input__inner').first().clear().type('未完成')
            cy.get('button').contains('保存').click({
                force: true
            })
            cy.get('.el-collapse-item__content').last().find('.ql-tag.el-tag.el-tag--medium').should('have.length', length)
            //-----标签修改成功----------
            cy.get('.el-input__inner').first().clear().type('自动修改')
            cy.intercept('**/cqb-base-mgr/service/mgr/tags/service/*').as('update')
            cy.get('.el-button.el-button--primary.el-button--medium').eq(save).click()
            cy.wait('@update').then((xhr) => {
                let ExpectStatus = 200
                let ResponseStatus = xhr.response.statusCode
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('body').should('contain', '标签已更新')
                cy.get('.el-collapse-item__content').last().find('.ql-tag.el-tag.el-tag--medium').should('have.length', length)
            })
        })
    })
    it('005-业务标签-删除标签', () => {
        cy.get('.el-tag__close.el-icon-close').last().click()
        cy.intercept('**/cqb-base-mgr/service/mgr/tags/service/*').as('delete')
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
        cy.wait('@delete').then((xhr) => {
            let ExpectStatus = 200
            let ResponseStatus = xhr.response.statusCode
            expect(ResponseStatus).to.equal(ExpectStatus)
        })
    })
    it('006-业务标签-删除标签分类', () => {
        cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').then((getData) => {
            let length = getData.length
            //-------分类下存在标签，不允许删除--------    
            cy.get('.el-button.el-button--danger.el-button--mini').first().click()
            cy.intercept('**/cqb-base-mgr/service/mgr/tag/types/service/*').as('delete')
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
            cy.wait('@delete').then((xhr) => {
                let ExpectStatus = 400
                let ResponseStatus = xhr.response.statusCode
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-message__content').should('have.text', '该标签类型有子标签，请删除后再进行此操作。')
                cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length)
            })
            //-----成功删除-----------
            cy.get('.el-button.el-button--danger.el-button--mini').last().click()
            cy.intercept('**/cqb-base-mgr/service/mgr/tag/types/service/*').as('delete')
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
            cy.wait('@delete').then((xhr) => {
                let ExpectStatus = 200
                let ResponseStatus = xhr.response.statusCode
                expect(ResponseStatus).to.equal(ExpectStatus)
                cy.get('.el-message__content').should('have.text', '该标签类型有子标签，请删除后再进行此操作。')
                cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length - 1)
            })
        })
    })
})