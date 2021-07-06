context('年度互认证书', () => {
    before(() => {
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/cert/cert-year')
    })
    it('cert-year-001-年度互认证书-搜索', () => {
        //-------------关键字搜索---------------
        let typeName = '佛山市中医院'
        cy.get('.el-button.el-button--text.el-button--medium').first().click()
        cy.get('input[placeholder="请输入实验室名称或编码"]').last().type(typeName)
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport?keyword=*').as('Search')
        cy.get('.el-icon-search').last().click()
        cy.wait(500)
        cy.wait('@Search').then((getData) => {
            let expectStatus = 200
            let responseStatus = getData.response.statusCode
            let total = getData.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else {
                cy.get('.el-table__row').first().find('.cell').eq(1).invoke('text').then((text) => {
                    let getText = text.replace(/(^\s*)|(\s*$)/g, '')
                    expect(getText).to.eq(typeName)
                    cy.get('input[placeholder="请输入实验室名称或编码"]').last().clear()
                })
            }
        })
        //-------------所在地搜索---------------
        cy.get('input[placeholder="请选择省"]').click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('上海市').click()
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport?keyword=*').as('Search')
        cy.get('.el-icon-search').last().click()
        cy.wait(500)
        cy.wait('@Search').then((getData) => {
            let expectStatus = 200
            let responseStatus = getData.response.statusCode
            let total = getData.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
        //-------------北京------------
        cy.get('input[placeholder="请选择省"]').click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('北京市').click()
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport?keyword=*').as('Search')
        cy.get('.el-icon-search').last().click()
        cy.wait(500)
        cy.wait('@Search').then((getData) => {
            let expectStatus = 200
            let responseStatus = getData.response.statusCode
            let total = getData.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
        //------------广东------------------
        cy.get('input[placeholder="请选择省"]').click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('广东省').click()
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport?keyword=*').as('Search')
        cy.get('.el-icon-search').last().click()
        cy.wait(500)
        cy.wait('@Search').then((getData) => {
            let expectStatus = 200
            let responseStatus = getData.response.statusCode
            let total = getData.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
        cy.get('input[placeholder="请选择省"]').click()
        cy.get('.el-select__caret.el-input__icon.el-icon-circle-close').click()
        //-------------标签搜索(佛山)---------------
        cy.get('.el-select__input.is-medium').click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('佛山').click()
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport?keyword=*').as('Search')
        cy.get('input[placeholder="请输入实验室名称或编码"]').last().click()
        cy.get('.el-icon-search').last().click()
        cy.wait(500)
        cy.wait('@Search').then((getData) => {
            let expectStatus = 200
            let responseStatus = getData.response.statusCode
            let total = getData.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
            cy.get('.el-tag__close.el-icon-close').click()
        })
        //-------------标签搜索(广西)---------------
        cy.get('.el-select__input.is-medium').click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('广西').click()
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport?keyword=*').as('Search')
        cy.get('input[placeholder="请输入实验室名称或编码"]').last().click()
        cy.get('.el-icon-search').last().click()
        cy.wait(500)
        cy.wait('@Search').then((getData) => {
            let expectStatus = 200
            let responseStatus = getData.response.statusCode
            let total = getData.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__row').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
            cy.get('.el-tag__close.el-icon-close').click()
        })
    })
    it('cert-year-002-年度互认证书-预览互认报告', () => {
        let report = 10
        //-------------预览互认报告------------
        let typeName = '佛山市第二人民医院'
        cy.get('input[placeholder="请输入实验室名称或编码"]').last().type(typeName)
        cy.get('.el-icon-search').last().click()
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/preview/%E4%BA%92%E8%AE%A4GD180022021040210%E5%B9%BF%E4%B8%9C%E7%9C%81%E4%BD%9B%E5%B1%B1%E5%B8%82%E4%B8%B4%E5%BA%8A%E6%A3%80%E9%AA%8C%E7%BB%93%E6%9E%9C%E4%BA%92%E8%AE%A4%E6%8A%A5%E5%91%8A?url=http://cqb-gz-test-001.oss-cn-shenzhen.aliyuncs.com/cqb-produce/iqc/recog/1548657878691305724/1000000016-2-5-4-3-1-1000000015-6-14/202101/202103/4/2021-05-15/%E4%BA%92%E8%AE%A4%E6%8A%A5%E5%91%8A.pdf*').as('view')
        cy.get('.el-table__row').first().find('.cell').eq(report).find('button').contains('预览').click()
        cy.wait('@view').then((xhr) => {
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            expect(responseStatus).to.eq(expectStatus)
        })
        cy.get('.ql-frame-viewer__close').click()
    })
    it('cert-year-003-年度互认证书-证书预览', () => {
        let cert = 11
        //-------------预览互认证书------------
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/preview/%E4%BA%92%E8%AE%A4GD180022021040210%E5%B9%BF%E4%B8%9C%E7%9C%81%E4%BD%9B%E5%B1%B1%E5%B8%82%E4%B8%B4%E5%BA%8A%E6%A3%80%E9%AA%8C%E7%BB%93%E6%9E%9C%E4%BA%92%E8%AE%A4%E8%AF%81%E4%B9%A6?url=http://cqb-gz-test-001.oss-cn-shenzhen.aliyuncs.com/cqb-produce/iqc/recog/certificate/%E4%BA%92%E8%AE%A4GD180022021040210.pdf*').as('view')
        cy.get('.el-table__row').first().find('.cell').eq(cert).find('button').contains('预览').click()
        cy.wait('@view').then((xhr) => {
            let responseStatus = xhr.response.statusCode
            let expectStatus = 200
            expect(responseStatus).to.eq(expectStatus)
        })
        cy.get('.ql-frame-viewer__close').click()
    })
    it('cert-year-004-年度互认证书-推送', () => {
        cy.get('.el-table__row').first().find('.cell').last().find('button').last().invoke('text').then((text) => {
            let getText = text.replace(/(^\s*)|(\s*$)/g, '')
            if (getText == '取消推送') { //说明该条数据已被推送过了,只能选择取消推送
                cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/pushStatus*').as('canclePush')
                cy.get('.el-table__row').first().find('.cell').last().find('button').contains('取消推送').click()
                cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--primary').click()
                cy.wait('@canclePush').then((xhr) => {
                    let responseStatus = xhr.response.statusCode
                    let expectStatus = 200
                    expect(responseStatus).to.eq(expectStatus)
                    cy.get('.el-message.el-message--success').should('contain', '已取消推送')
                })
            } else { //说明该条数据还未被推送,可以选择推送
                cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/pushStatus*').as('push')
                cy.get('.el-table__row').first().find('.cell').last().find('button').contains('推送').click()
                cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--primary').click()
                cy.wait('@push').then((xhr) => {
                    let responseStatus = xhr.response.statusCode
                    let expectStatus = 200
                    expect(responseStatus).to.eq(expectStatus)
                    cy.get('.el-message.el-message--success').should('contain', '已推送')
                })
            }
        })
    })
    it('cert-year-005-年度互认证书-批量推送', () => {
        let currentPage = 1
        cy.get('.el-table__row').then((length) => {
            let getLength = length.length
            // 勾选当前页面所有数据
            cy.get('.el-checkbox__inner').eq(currentPage).click()
            cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/pushStatus*').as('push')
            cy.get('button').contains('批量推送').click()
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--primary').click()
            cy.wait('@push').then((xhr) => {
                let responseStatus = xhr.response.statusCode
                let expectStatus = 200
                expect(responseStatus).to.eq(expectStatus)
                cy.get('.el-message.el-message--success').should('contain', '已批量推送')
                cy.wait(500)
                for (let i = 0; i < getLength; i++) {
                    cy.get('.el-table__row').eq(i).find('.cell').last().find('button').last().should('have.text', '取消推送')
                }
            })
        })
    })
    it('cert-year-006-年度互认证书-批量取消推送', () => {
        let currentPage = 1
        //---------------批量取消推送--------------------
        cy.get('.el-table__row').then((length) => {
            let getLength = length.length
            // 勾选当前页面所有数据
            cy.get('.el-checkbox__inner').eq(currentPage).click()
            cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/pushStatus*').as('push')
            cy.get('button').contains('批量取消推送').click()
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--primary').click()
            cy.wait('@push').then((xhr) => {
                let responseStatus = xhr.response.statusCode
                let expectStatus = 200
                expect(responseStatus).to.eq(expectStatus)
                cy.get('.el-message.el-message--success').should('contain', '已批量取消推送')
                cy.wait(500)
                for (let i = 0; i < getLength; i++) {
                    cy.get('.el-table__row').eq(i).find('.cell').last().find('button').last().should('have.text', '删除')
                }
            })
        })
    })
    it('cert-year-007-年度互认证书-重新生成', () => {
        cy.get('.el-table__row').first().find('.cell').find('button').contains('重新生成').click()
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/reGenerate*').as('generate')
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--primary').click()
        cy.wait('@generate').then((xhr) => {
            let expectStatus = 200
            let responseStatus = xhr.response.statusCode
            expect(responseStatus).to.eq(expectStatus)
            cy.get('.el-message.el-message--success').should('contain', '证书已重新生成')
        })
    })
})