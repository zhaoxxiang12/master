context('互认报告和证书管理', () => {
    before(() => {
        cy.loginCQB()
    })
    it('001-月度汇总报告-月度汇总报告生成', () => {
        let reportMonth = 0
        let foshan = 1
        let yearBox = 2
        let currentYear = 0
        let choose = 0
        cy.intercept('**/service/mgr/report/ccls*').as('ccls')
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-mgr/dept/report-gen')
        cy.wait(500)
        cy.wait('@ccls').then((xhr) => {
            //选择佛山市临检的复选框
            cy.get('.el-checkbox__inner').eq(foshan).click({
                force: true
            })
            // //点击‘生成报告’按钮
            cy.get('.report-mgr__tools').find('button').click({
                force: true
            })
            // //选择报告类型(月度汇总报告生成)
            cy.get('.el-date-editor').click({
                force: true
            })
            // //选择生成报告的月份 2021/3
            cy.get('.el-input__inner').eq(yearBox).click({
                force: true
            })
            cy.get('.el-date-picker__header-label').eq(currentYear).invoke('text').then((text) => {
                let getYear = parseInt(text.slice(0, 4))
                let differenceYear = getYear - 2020
                if (differenceYear == 0) {
                    cy.get('.el-month-table').find('tbody>tr').eq(choose).find('td').eq(reportMonth).click({
                        force: true
                    })
                } else if (differenceYear < 0) {
                    for (let i = 0; i < Math.abs(differenceYear); i++) {
                        cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-d-arrow-right').click({
                            force: true
                        })
                    }
                    cy.get('.el-month-table').find('tbody>tr').eq(choose).find('td').eq(reportMonth).click({
                        force: true
                    })
                } else {
                    for (let i = 0; i < Math.abs(differenceYear); i++) {
                        cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
                            force: true
                        })
                    }
                    cy.get('.el-month-table').find('tbody>tr').eq(choose).find('td').eq(reportMonth).click({
                        force: true
                    })
                }
            })
            //点击弹窗中的‘生成报告’按钮
            cy.get('.el-dialog__footer').contains('生成报告').click({
                force: true
            })
            //操作开始执行,请查阅系统日志了解执行进展
            cy.get('.el-message--success').should('contain', '操作开始执行,请查阅系统日志了解执行进展')
        })
    })

    it('002-月度汇总报告-互认报告和证书管理-生成互认报告', () => {
        let monthTime = 3
        let dayTime = 15
        let checkBox = 2
        cy.wait(500)
        cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/report-mgr/lab/report-lab')
        cy.get('.el-message-box__btns button:first').click({
            force: true
        })
        //输入实验室名称
        cy.get('input[placeholder="请输入实验室名称或编码"]').first().type('gd18002')
        //点击搜索
        cy.get('.el-form-item__content > .el-button--primary > .el-icon-search ').click({
            force: true
        })
        cy.wait(1000)
        //勾取复选框（勾选搜索结果中的实验室）
        cy.get('.el-checkbox__inner').eq(checkBox).click({
            force: true
        })
        //点击生成互认报告按钮
        cy.get('.ql-search__tools-top').find('button').contains('生成互认报告').click({
            force: true
        })
        //在弹窗中选择认可专业下拉选项
        // cy.wait(1000)
        // cy.get('.el-dialog__body').find('label[for="category"] + div').click()
        // cy.get('label[for="category"]').click()
        // cy.get('.el-select-dropdown').filter(':visible').contains('全部专业').click() 
        //选择模板
        cy.get('.el-dialog__body').find('button').contains('报告模版一').click({
            force: true
        })
        //点击有效期下拉框
        cy.get('.el-dialog__body').find('label[for="validTime"] + div').find('.el-input__suffix').click({
            force: true
        })
        //选择有效期月份
        cy.get('.el-select-dropdown').filter(':visible').find('.el-select-dropdown__item').eq(monthTime).click({
            force: true
        })
        //点击报告有效期下拉框
        cy.get('.el-input__inner').eq(14).click({
            force: true
        })
        // 选择下个月
        cy.get('.el-date-picker__header').find('button').eq(3).click({
            force: true
        })
        //选择有效期的天数
        cy.get('.el-picker-panel__content > table > tbody').find('tr').eq(3).contains(dayTime).click({
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/check?*').as('pageWithRole')
        // 点击生成报告关闭弹窗
        cy.get('.el-dialog__wrapper').filter(':visible').find('button').contains('生成报告').click({
            force: true
        })
        cy.wait('@pageWithRole').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200)
            //断言弹窗提示语 
            cy.get('.el-message--success').should('contain', '生成任务已提交')
        })
    })

    it('003-月度汇总报告-互认报告和证书管理-单个条件搜索实验室', () => {
        cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/report-mgr/lab/report-lab')
        cy.get('.el-message-box__btns button:first').click({
            force: true
        })
        cy.intercept('**/service/mgr/lab/pageWithRole*').as('pageWithRole')
        //输入实验室名称
        cy.get('input[placeholder="请输入实验室名称或编码"]').first().clear({
            force: true
        }).type('gd18006')
        //点击搜索
        cy.get('.el-form-item__content > .el-button--primary > .el-icon-search ').click({
            force: true
        })
        cy.wait('@pageWithRole').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200)
            //断言，判断搜索结果与搜索条件相符
            cy.get('.ql-search__body').find('tbody').should('contain', 'gd18006')
            cy.get('.ql-search__body').find('tbody').should('contain', '佛山市高明区人民医院')
        })
    })

    it('004-月度汇总报告-互认报告和证书管理-组合条件搜索实验室', () => {
        cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/report-mgr/lab/report-lab')
        cy.get('.el-message-box__btns button:first').click({
            force: true
        })
        //输入实验室编码
        cy.get('.ql-search--advanced').find('input[placeholder="请输入实验室名称或编码"]').clear({
            force: true
        }).type('gd18003', {
            force: true
        })
        //点击标签下拉框
        cy.get('.el-select__tags').click({
            force: true
        })
        //选择标签
        cy.get('.el-select-group__wrap').eq(1).contains('公立').click({
            force: true
        })
        cy.intercept('**/service/mgr/lab/pageWithRole*').as('pageWithRole')
        //点击搜索
        cy.get('.ql-search__btns').find('button[type="submit"]').click({
            force: true
        })
        cy.wait('@pageWithRole').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200)
            //对搜索结果进行断言
            cy.get('.el-table__body-wrapper').find('.el-table__row').should('contain', '佛山市三水区人民医院')
        })
    })


    it('005-月度汇总报告-互认报告和证书管理-预览互认报告', () => {
        let keywordBox = 0
        let startMonth = 3
        let startDay = 4
        let startTr = 3
        let endMonth = 15
        let endTr = 3
        let endDay = 0
        cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/cert/cert-year')
        cy.get('.el-message-box__btns button:first').click({
            force: true
        })
        cy.get('button').contains('展开').click()
        //-----------------------选择创建开始时间---------------------------------
        cy.get('[placeholder="开始时间"]').first().click()
        cy.get('.el-date-picker__header-label').first().invoke('text').then((data) => {
            let getYear = parseInt(data.slice(0, 4))
            let difference = getYear - 2021
            if (difference == 0) {
                cy.get('.el-date-picker__header-label').last().click()
                cy.get('.el-month-table').find('.cell').eq(startMonth).click()
                cy.get('.el-date-table').find('.el-date-table__row').eq(startTr).find('.available').eq(startDay).click()

            } else {
                for (let i = 0; i < Math.abs(difference); i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click()
                }
                cy.get('.el-date-picker__header-label').last().click()
                cy.get('.el-month-table').find('.cell').eq(startMonth).click()
                cy.get('.el-date-table').find('.el-date-table__row').eq(startTr).find('.available').eq(startDay).click()
            }
        })
        //-----------------------选择创建结束时间---------------------------------
        cy.get('[placeholder="结束时间"]').first().click()
        cy.get('.el-date-picker__header-label').first().invoke('text').then((data) => {
            let getYear = parseInt(data.slice(0, 4))
            let difference = getYear - 2021
            if (difference == 0) {
                cy.get('.el-date-picker__header-label').last().click()
                cy.get('.el-month-table').find('.cell').eq(endMonth).click()
                cy.get('.el-date-table').last().find('.el-date-table__row').eq(endTr).find('.available').eq(endDay).click()

            } else {
                for (let i = 0; i < Math.abs(difference); i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click()
                }
                cy.get('.el-date-picker__header-label').last().click()
                cy.get('.el-month-table').find('.cell').eq(endMonth).click()
                cy.get('.el-date-table').last().find('.el-date-table__row').eq(endTr).find('.available').eq(endDay).click()
            }
        })
        //搜索出要预览的实验室  
        cy.get('input[placeholder="请输入实验室名称或编码"]').eq(keywordBox).type('gd18001', {
            force: true
        })
        cy.get('.ql-search__header').contains('搜索').click({
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/preview/%E4%BA%92%E8%AE%A4GD180012021042212%E5%B9%BF%E4%B8%9C%E7%9C%81%E4%BD%9B%E5%B1%B1%E5%B8%82%E4%B8%B4%E5%BA%8A%E6%A3%80%E9%AA%8C%E7%BB%93%E6%9E%9C%E4%BA%92%E8%AE%A4%E6%8A%A5%E5%91%8A?url=http://cqb-gz-test-001.oss-cn-shenzhen.aliyuncs.com/cqb-produce/iqc/recog/1548657878624853640/1000000016-2-5-4-3-1-1000000015-6-14/201910/202003/3/2021-04-30/%E4%BA%92%E8%AE%A4%E6%8A%A5%E5%91%8A.pdf*').as('mutualRecogReport')
        cy.get('.el-table__row').first().find('button').contains('预览').first().click({
            force: true
        })
        cy.wait('@mutualRecogReport').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200)
        })
        cy.get('.ql-frame-viewer__close').click({
            force: true
        })
    })
    it('006-月度汇总报告-互认报告和证书管理-预览证书', () => {
        let view = 2
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/preview/%E4%BA%92%E8%AE%A4GD180012021042212%E5%B9%BF%E4%B8%9C%E7%9C%81%E4%BD%9B%E5%B1%B1%E5%B8%82%E4%B8%B4%E5%BA%8A%E6%A3%80%E9%AA%8C%E7%BB%93%E6%9E%9C%E4%BA%92%E8%AE%A4%E8%AF%81%E4%B9%A6?url=http://cqb-gz-test-001.oss-cn-shenzhen.aliyuncs.com/cqb-produce/iqc/recog/certificate/%E4%BA%92%E8%AE%A4GD180012021042212.pdf*').as('mutualRecogReport')
        //点击预览按钮 
        cy.get('.el-table__row').first().find('button').eq(view).click({
            force: true
        })
        cy.wait('@mutualRecogReport').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200)
            //断言弹窗内容
            cy.get('.ql-frame-viewer__header').contains('报告预览')
            //关闭预览窗口
            cy.get('.ql-frame-viewer__close').click({
                force: true
            })
        })
        cy.get('[placeholder="开始时间"]').first().click()
        cy.get('.el-input__icon.el-icon-circle-close').click()
        cy.get('[placeholder="结束时间"]').first().click()
        cy.get('.el-input__icon.el-icon-circle-close').click()
    })
    it('007-月度汇总报告-互认报告和证书管理-推送或取消互认报告', () => {
        let keywordBox = 0
        let first = 0
        let push = 3
        let endMonth = 15
        let endTr = 3
        let endDay = 0
        //-----------------------选择创建结束时间---------------------------------
        cy.get('[placeholder="结束时间"]').first().click()
        cy.get('.el-date-picker__header-label').first().invoke('text').then((data) => {
            let getYear = parseInt(data.slice(0, 4))
            let difference = getYear - 2021
            if (difference == 0) {
                cy.get('.el-date-picker__header-label').last().click()
                cy.get('.el-month-table').find('.cell').eq(endMonth).click()
                cy.get('.el-date-table').last().find('.el-date-table__row').eq(endTr).find('.available').eq(endDay).click()

            } else {
                for (let i = 0; i < Math.abs(difference); i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click()
                }
                cy.get('.el-date-picker__header-label').last().click()
                cy.get('.el-month-table').find('.cell').eq(endMonth).click()
                cy.get('.el-date-table').last().find('.el-date-table__row').eq(endTr).find('.available').eq(endDay).click()
            }
        })
        //搜索要取消推送的实验室报告   
        cy.get('input[placeholder="请输入实验室名称或编码"]').eq(keywordBox).clear({
            force: true
        }).type('gd18002', {
            force: true
        })
        cy.get('.ql-search__header').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        //获取操作前的推送/取消推送文案
        cy.get('.el-table__body').find('.el-table__row').eq(first).find('.el-button.el-button--text.el-button--medium').eq(push).invoke('text').then((text) => {
            let oldText = text
            if (oldText == '推送') {
                //点击推送/取消推送
                cy.get('.el-table__body').find('.el-table__row').eq(first).find('.el-button.el-button--text.el-button--medium').eq(push).click({
                    force: true
                })
                cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/pushStatus*').as('push')
                //确认推送/取消推送
                cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--primary').click({
                    force: true
                })
                cy.wait('@push').then((data) => {
                    let getStatus = data.response.statusCode
                    let expectStatus = 200
                    expect(expectStatus).to.eq(getStatus)
                })
                cy.get('body').should('contain', '已推送')
            } else {
                //点击推送/取消推送
                cy.get('.el-table__body').find('.el-table__row').eq(first).find('.el-button.el-button--text.el-button--medium').eq(push).click({
                    force: true
                })
                cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/pushStatus*').as('push')
                //确认推送/取消推送
                cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--primary').click({
                    force: true
                })
                cy.wait('@push').then((data) => {
                    let getStatus = data.response.statusCode
                    let expectStatus = 200
                    expect(expectStatus).to.eq(getStatus)
                })
                cy.get('body').should('contain', '已取消推送')
            }
            cy.wait(1000)
            cy.get('.el-table__body').find('.el-table__row').eq(first).find('.el-button.el-button--text.el-button--medium').eq(push).invoke('text').then((text) => {
                let newText = text
                expect(oldText).not.to.eq(newText)
            })
        })
    })

    it('008-月度汇总报告-互认报告和证书管理-批量推送互认报告', () => {
        //搜索出要推送的报告    
        cy.get('.ql-search__header').find('input[placeholder="请输入实验室名称或编码"]').eq(0).clear({
            force: true
        }).eq(0).type('gd18009', {
            force: true
        })
        cy.get('.ql-search__header').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        //点击全选复选框
        cy.get('.el-table__header-wrapper').find('.el-checkbox').click({
            force: true
        })
        //点击批量推送按钮
        cy.get('.ql-search__tools-top').contains('批量推送').click({
            force: true
        })
        //点击确认弹窗
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport?*').as('mutualRecogReport')
        cy.get('.el-message-box__btns').contains('推送').click({
            force: true
        })
        cy.wait('@mutualRecogReport').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200)
            //断言推送提示
            cy.get('.el-message--success').should('contain', '已批量推送')
        })
    })
    it('009-月度汇总报告-互认报告和证书管理-批量取消推送', () => {
        cy.get('.ql-search__header').find('input[placeholder="请输入实验室名称或编码"]').first().clear({
            force: true
        }).eq(0).type('gd18001', {
            force: true
        })
        cy.get('.ql-search__header').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        cy.get('.el-table__header-wrapper').find('.el-checkbox').click({
            force: true
        })
        //点击批量取消推送按钮 
        cy.get('.ql-search__tools-top').contains('批量取消推送').click({
            force: true
        })
        cy.intercept('**/service/mgr/mutualRecogReport*').as('mutualRecogReport')
        //点击确认弹窗按钮
        cy.get('.el-message-box__btns').contains('取消推送').click({
            force: true
        })
        cy.wait('@mutualRecogReport').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200)
            //断言弹窗内容
            cy.get('.el-message--success').should('contain', '已批量取消推送')
        })
    })

    it.skip('互认报告和证书管理-批量删除互认报告', () => {
        cy.intercept('**/service/mgr/mutualRecogReport*').as('mutualRecogReport')
        cy.wait('@mutualRecogReport').then((xhr) => {
            //搜索出要推送的报告     
            cy.get('.ql-search__header').find('input[placeholder="请输入实验室名称或编码"]').eq(0).type('gd18001')
            cy.get('.ql-search__header').contains('搜索').click()
            cy.get('.el-table__header-wrapper').find('.el-checkbox').click({
                force: true
            })
            //点击批量批量删除按钮 
            cy.get('.ql-search__tools-top').contains('批量删除').click({
                force: true
            })
            //点击确认弹窗按钮
            cy.get('.el-message-box__btns').contains('删除').click({
                force: true
            })
            //断言弹窗内容
            cy.get('.el-message--success').should('contain', '已删除成功')
        })
    })

    it('010-月度汇总报告-预览月度汇总报告', () => {
        let reportMonth = 2
        let currentYear = 0
        let choose = 0
        let year = 0
        cy.intercept('**/service/mgr/report/summary/month*').as('monthReport')
        cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/report-mgr/dept/summary-month')
        cy.get('.el-message-box__btns button:first').click({
            force: true
        })
        cy.wait('@monthReport').then((xhr) => {
            //搜索出要推送的报告     
            cy.get('.ql-search__header').find('.el-date-editor').click({
                force: true
            })
            cy.get('.el-input__inner').eq(year).click({
                force: true
            })
            //搜索栏时间选择，如一月
            cy.get('.el-date-picker__header-label').eq(currentYear).invoke('text').then((text) => {
                let getYear = parseInt(text.slice(0, 4))
                let differenceYear = getYear - 2021
                if (differenceYear == 0) {
                    cy.get('.el-month-table').find('tbody>tr').eq(choose).find('td').eq(reportMonth).click({
                        force: true
                    })
                } else if (differenceYear < 0) {
                    for (let i = 0; i < Math.abs(differenceYear); i++) {
                        cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-d-arrow-right').click({
                            force: true
                        })
                    }
                    cy.get('.el-month-table').find('tbody>tr').eq(choose).find('td').eq(reportMonth).click({
                        force: true
                    })
                } else {
                    for (let i = 0; i < Math.abs(differenceYear); i++) {
                        cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
                            force: true
                        })
                    }
                    cy.get('.el-month-table').find('tbody>tr').eq(choose).find('td').eq(reportMonth).click({
                        force: true
                    })
                }
            })
            //点击搜索按钮
            cy.get('.ql-search__header').contains('搜索').click({
                force: true
            })
            //点击预览按钮 
            cy.get('.el-table__body-wrapper').contains('预览').click({
                force: true
            })
            cy.get('.ql-frame-viewer__header').should('contain', '报告预览').and('contain', '关闭')
            cy.get('.ql-frame-viewer__header').contains('关闭').click({
                force: true
            })
        })
    })

    it('011-月度汇总报告-删除月度汇总报告', () => {
        let time = 0
        let startDate = 0
        let startMonth = 0
        let chooseStartMonth = 0
        cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/report-mgr/dept/summary-month')
        cy.get('.el-message-box__btns button:first').click({
            force: true
        })
        //搜索出要推送的报告     
        cy.get('.ql-search__header').find('.el-date-editor').click({
            force: true
        })
        //搜索栏时间选择，如2021/3
        cy.get('.el-input__inner').eq(time).click({
            force: true
        })
        cy.get('.el-date-picker__header-label').eq(startDate).invoke('text').then((getData) => {
            let getYear = parseInt(getData.slice(0, 4))
            let differenceYear = getYear - 2020
            if (differenceYear == 0) {
                cy.get('.el-month-table').find('tbody>tr').eq(startMonth).find('td').eq(chooseStartMonth).click({
                    force: true
                })
            } else {
                for (let i = 0; i < differenceYear; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
                        force: true
                    })
                }
                cy.get('.el-month-table').find('tbody>tr').eq(startMonth).find('td').eq(chooseStartMonth).click({
                    force: true
                })
            }
        })
        //点击搜索按钮
        cy.get('.ql-search__header').contains('搜索').click({
            force: true
        })
        cy.wait(500)
        cy.get('button').contains('删除').click({
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/report/summary/*').as('deleteReport')
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
            force: true
        })
        cy.wait('@deleteReport').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200)
            cy.get('.el-table__empty-block').should('contain', '暂无数据')
        })
    })
})