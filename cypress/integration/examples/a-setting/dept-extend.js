context('管理单位扩展属性', () => {
    before(() => {
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/system/dept-extend')
        cy.wait(500)
    })
    it('001-管理单位扩展属性-使用关键字进行搜索', () => {
        let keyWord1 = 'IQC_ADMIN'
        let keyWord2 = 'IQC_PROVINCE_CODE'
        let keyWord3 = 'EQA_SRC_CODE3'
        cy.get('[placeholder="参数关键字"]').type(keyWord3)
        cy.intercept('**/cqb-base-mgr/service/mgr/ccl/ext?*').as('getData')
        cy.get('button').contains('搜索').click()
        cy.wait('@getData').then((xhr) => {
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
        cy.get('[placeholder="参数关键字"]').clear().type(keyWord2)
        cy.intercept('**/cqb-base-mgr/service/mgr/ccl/ext?*').as('getData')
        cy.get('button').contains('搜索').click()
        cy.wait('@getData').then((xhr) => {
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
        cy.get('[placeholder="参数关键字"]').clear().type(keyWord1)
        cy.intercept('**/cqb-base-mgr/service/mgr/ccl/ext?*').as('getData')
        cy.get('button').contains('搜索').click()
        cy.wait('@getData').then((xhr) => {
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
    })
    it('002-管理单位扩展属性-使用质控主管单位进行搜索', () => {
        let box = 0
        let foshan = 0
        let Shanghai = 3
        //--------------------选择佛山市临床检验中心------------
        cy.get('[placeholder="请选择"]').eq(box).click()
        cy.get('.el-tree-node__children>div').eq(foshan).click()
        cy.intercept('**/cqb-base-mgr/service/mgr/ccl/ext?*').as('getData')
        cy.get('button').contains('搜索').click()
        cy.wait('@getData').then((xhr) => {
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
        //--------------------选择青浦医联体------------
        cy.get('[placeholder="请选择"]').eq(box).click()
        cy.get('.el-tree-node__children>div').eq(Shanghai).click()
        cy.intercept('**/cqb-base-mgr/service/mgr/ccl/ext?*').as('getData')
        cy.get('button').contains('搜索').click()
        cy.wait('@getData').then((xhr) => {
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
    })
    it('003-管理单位扩展属性-搜索条件重置功能', () => {
        cy.get('[placeholder="参数关键字"]').should('have.value','IQC_ADMIN')
        cy.get('button').contains('重置').click()
        cy.get('[placeholder="参数关键字"]').should('have.value','')
    })
    it('004-管理单位扩展属性-添加功能', () => {
        let box = 2
        let foshan = 8
        let model = 5
        let paramCode = 6
        let param = 7
        cy.get('button').contains('搜索').click()
        cy.get('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('button').contains('添加').click()
            cy.get('[placeholder="请选择"]').eq(box).click()
            cy.get('.el-tree-node__children>div').eq(foshan).click()
            cy.get('.el-input__inner').eq(model).type('IQC')
            cy.get('.el-input__inner').eq(paramCode).type('IQC')
            cy.get('.el-input__inner').eq(param).type('1')
            cy.intercept('**/cqb-base-mgr/service/mgr/ccl/ext*').as('getData')
            cy.get('button').contains('确定').click()
            cy.wait('@getData').then((xhr) => {
                let responseStatus = xhr.response.statusCode
                let expectStatus = 200
                expect(responseStatus).to.eq(expectStatus)
                cy.get('body').should('contain', '添加成功')
                cy.get('.el-table__row').should('have.length', getLength + 1)
            })
        })
    })
    it('005-管理单位扩展属性-添加功能(未选择质控主管单位不能保存)', () => {
        let model = 5
        let paramCode = 6
        let param = 7
        cy.get('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('button').contains('搜索').click()
            cy.get('button').contains('添加').click()
            cy.get('.el-input__inner').eq(model).type('IQC')
            cy.get('.el-input__inner').eq(paramCode).type('IQC')
            cy.get('.el-input__inner').eq(param).type('1')
            cy.intercept('**/cqb-base-mgr/service/mgr/ccl/ext*').as('getData')
            cy.get('button').contains('确定').click()
            cy.get('body').should('contain', '请选择管理单位')
            cy.get('.el-table__row').should('have.length', getLength)
        })
        cy.get('button').contains('取消').click()
    })
    it('006-管理单位扩展属性-添加功能(模块名称未填写不能保存)', () => {
        let box = 2
        let foshan = 8
        let paramCode = 6
        let param = 7
        cy.get('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('button').contains('搜索').click()
            cy.get('button').contains('添加').click()
            cy.get('[placeholder="请选择"]').eq(box).click()
            cy.get('.el-tree-node__children>div').eq(foshan).click()
            cy.get('.el-input__inner').eq(paramCode).type('IQC')
            cy.get('.el-input__inner').eq(param).type('1')
            cy.intercept('**/cqb-base-mgr/service/mgr/ccl/ext*').as('getData')
            cy.get('button').contains('确定').click()
            cy.get('body').should('contain', '请输入模块名称')
            cy.get('.el-table__row').should('have.length', getLength)
        })
        cy.get('button').contains('取消').click()
    })
    it('007-管理单位扩展属性-添加功能(参数编码未填写不能保存)', () => {
        let box = 2
        let foshan = 8
        let param = 7
        let model = 5
        cy.get('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('button').contains('搜索').click()
            cy.get('button').contains('添加').click()
            cy.get('[placeholder="请选择"]').eq(box).click()
            cy.get('.el-tree-node__children>div').eq(foshan).click()
            cy.get('.el-input__inner').eq(model).type('IQC')
            cy.get('.el-input__inner').eq(param).type('1')
            cy.intercept('**/cqb-base-mgr/service/mgr/ccl/ext*').as('getData')
            cy.get('button').contains('确定').click()
            cy.get('body').should('contain', '请输入参数编码')
            cy.get('.el-table__row').should('have.length', getLength)
        })
        cy.get('button').contains('取消').click()
    })
    it('008-管理单位扩展属性-添加功能(参数值未填写不能保存)', () => {
        let box = 2
        let foshan = 8
        let paramCode = 6
        let model = 5
        cy.get('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('button').contains('搜索').click()
            cy.get('button').contains('添加').click()
            cy.get('[placeholder="请选择"]').eq(box).click()
            cy.get('.el-tree-node__children>div').eq(foshan).click()
            cy.get('.el-input__inner').eq(model).type('IQC')
            cy.get('.el-input__inner').eq(paramCode).type('IQC')
            cy.intercept('**/cqb-base-mgr/service/mgr/ccl/ext*').as('getData')
            cy.get('button').contains('确定').click()
            cy.get('body').should('contain', '请输入参数值')
            cy.get('.el-table__row').should('have.length', getLength)
        })
        cy.get('button').contains('取消').click()
    })
    it('009-管理单位扩展属性-编辑功能', () => {
        let words = '自动化参数'
        let remark = 4
        cy.get('.el-table__row').then((data) => {
            let getLength = data.length
            if (getLength <= 13) {
                return
            } else {
                cy.get('.el-table__row').first().find('button').contains('编辑').click()
                cy.get('.el-textarea__inner').type(words, {
                    force: true
                })
                cy.intercept('**/cqb-base-mgr/service/mgr/ccl/ext*').as('getData')
                cy.get('button').contains('确定').click()
                cy.wait('@getData').then((xhr) => {
                    let responseStatus = xhr.response.statusCode
                    let expectStatus = 200
                    expect(responseStatus).to.eq(expectStatus)
                    cy.get('body').should('contain', '编辑成功')
                    cy.get('.el-table__row').first().find('td').eq(remark).should('have.text', words)
                })
            }
        })
    })
    it('010-管理单位扩展属性-删除功能', () => {
        cy.get('.el-table__row').then((data) => {
            let getLength = data.length
            if (getLength <= 11) {
                return
            } else {
                cy.get('.el-table__row').first().find('button').contains('删除').click()
                cy.intercept('**/cqb-base-mgr/service/mgr/ccl/ext/*').as('getData')
                cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
                cy.wait('@getData').then((xhr) => {
                    let responseStatus = xhr.response.statusCode
                    let expectStatus = 200
                    expect(responseStatus).to.eq(expectStatus)
                    cy.get('.el-table__row').should('have.length', getLength - 1)
                })
            }
        })
    })
})