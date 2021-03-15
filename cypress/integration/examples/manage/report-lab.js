context('互认报告和证书管理', () => {
    beforeEach(() => {
        cy.loginCQB()      
    })

    it('001-月度汇总报告-互认报告和证书管理-生成互认报告', () => {
        let monthTime = 3
        let dayTime = 15
        cy.server()
        cy.route('**/service/mgr/lab/pageWithRole*').as('pageWithRole')
        cy.wait(2000)
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-mgr/lab/report-lab')
        //输入实验室名称
        cy.wait('@pageWithRole').then((xhr) => {
            cy.get('input[placeholder="请输入实验室名称或编码"]').first().type('gd18002')
            //点击搜索
            cy.get('.el-form-item__content > .el-button--primary > .el-icon-search ').click()
            //勾取复选框（勾选搜索结果中的实验室）
            cy.get('tbody > tr').first().find('.el-checkbox__inner').click()
            //点击生成互认报告按钮
            cy.get('.ql-search__tools-top').find('button').contains('生成互认报告').click()
            //在弹窗中选择认可专业下拉选项
            // cy.wait(1000)
            // cy.get('.el-dialog__body').find('label[for="category"] + div').click()
            // cy.get('label[for="category"]').click()
            // cy.get('.el-select-dropdown').filter(':visible').contains('全部专业').click() 
            //选择模板
            cy.get('.el-dialog__body').find('button').contains('报告模版一').click()
            //点击有效期下拉框
            cy.get('.el-dialog__body').find('label[for="validTime"] + div').find('.el-input__suffix').click({force: true})
            //选择有效期月份
            cy.get('.el-select-dropdown').filter(':visible').find('.el-select-dropdown__item').eq(monthTime).click()
            //点击报告有效期下拉框
            cy.wait(1000)
            cy.get('.el-dialog__body').find('.el-date-editor').eq(2).click()
            // 选择下个月
            cy.get('.el-date-picker__header').find('button').eq(3).click()
            //选择有效期的天数
            cy.get('.el-picker-panel__content > table > tbody').find('tr').eq(3).contains(dayTime).click()
            cy.wait(2000)
            // 点击生成报告关闭弹窗
            cy.get('.el-dialog__wrapper').filter(':visible').find('button').contains('生成报告').click()
            //断言弹窗提示语 
            cy.get('.el-message--success').should('contain','生成任务已提交')
        })                  
    })
  
    it('002-月度汇总报告-互认报告和证书管理-单个条件搜索实验室', () => {
        cy.server()
        cy.route('**/service/mgr/lab/pageWithRole*').as('pageWithRole')
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-mgr/lab/report-lab')
        cy.wait('@pageWithRole').then((xhr) => {
            //输入实验室名称
            cy.get('input[placeholder="请输入实验室名称或编码"]').first().type('gd18006')
            //点击搜索
            cy.get('.el-form-item__content > .el-button--primary > .el-icon-search ').click({force: true})
            //断言，判断搜索结果与搜索条件相符
            cy.get('.ql-search__body').find('tbody').should('contain','gd18006')
            cy.get('.ql-search__body').find('tbody').should('contain','佛山市高明区人民医院') 
        })       
    })

    it('003-月度汇总报告-互认报告和证书管理-组合条件搜索实验室', () => {
        cy.server()
        cy.route('**/service/mgr/lab/pageWithRole*').as('pageWithRole')
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-mgr/lab/report-lab')
        cy.wait('@pageWithRole').then((xhr) => {
            //点击展开搜索条件
            cy.get('.ql-search__header').find('button[type=button]').contains('展开').click({force: true})
            //输入实验室编码
            cy.get('.ql-search--advanced').find('input[placeholder="请输入实验室名称或编码"]').type('gd18003')
            //点击标签下拉框
            cy.get('.el-select__tags').click()
            //选择标签
            // cy.get('.el-select-group__wrap').eq(1).contains('公立').click()        
            //点击搜索
            cy.get('.ql-search__btns').find('button[type="submit"]').click({force: true})
            //对搜索结果进行断言
            cy.get('.el-table__body-wrapper').find('.el-table__row').should('contain','佛山市三水区人民医院')  
        })     
    })


    it('004-月度汇总报告-互认报告和证书管理-预览互认报告',()=>{  
        cy.server()
        cy.route('**/cqb-base-mgr/service/mgr/mutualRecogReport*').as('mutualRecogReport')
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/cert/cert-year')  
        cy.wait('@mutualRecogReport').then((xhr) => {  
            //搜索出要预览的实验室  
            cy.get('.ql-search__header').find('input[placeholder="请输入实验室名称或编码"]').first().type('gd18001')
            cy.get('.ql-search__header').contains('搜索').click({force: true})
            cy.wait(1000)
            cy.get('.ql-search__body').contains('预览').click({force: true})
            //断言有成功打开预览页
            cy.get('.ql-frame-viewer__header').contains('报告预览')
        })
    })
      
    it('005-月度汇总报告-互认报告和证书管理-推送或取消互认报告',()=>{ 
        cy.visit( '/cqb-base-mgr-fe/app.html#/manage/cert/cert-year')
        cy.wait(1000)  
        //搜索要取消推送的实验室报告   
        cy.get('.ql-search__header').find('input[placeholder="请输入实验室名称或编码"]').first().type('gd18003')
        cy.get('.ql-search__header').contains('搜索').click()
        cy.wait(1000) 
        //获取操作前的推送/取消推送文案
        cy.get('.el-table__body-wrapper').find('tbody>tr').first().find('td').eq(12).find('button').eq(1).invoke('text').then((text)=>{
            cy.log(text)
            //点击推送/取消推送按钮
            cy.get('.el-table__body-wrapper').find('tbody>tr').first().find('td').eq(12).click({force: true})
            cy.wait(1000)
            //点击弹窗中的确认按钮
            cy.get('.el-message-box__btns').find('button').eq(1).click({force: true})
            cy.wait(2000)
            //获取操作后的文案
            cy.get('.el-table__body-wrapper').find('tbody>tr').first().find('td').eq(12).find('button').eq(1).invoke('text').then((text2)=>{
                cy.log(text2)
                expect(text).to.eq(text2)
            })          
        })               
    })   
    
    it('006-月度汇总报告-互认报告和证书管理-批量推送互认报告',()=>{ 
        cy.server()
        cy.route('**/service/mgr/mutualRecogReport*').as('mutualRecogReport')
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/cert/cert-year')
        cy.wait('@mutualRecogReport').then((xhr) => {
            //搜索出要推送的报告    
            cy.get('.ql-search__header').find('input[placeholder="请输入实验室名称或编码"]').eq(0).type('gd18003')
            cy.get('.ql-search__header').contains('搜索').click() 
            //点击全选复选框
            cy.get('.el-table__header-wrapper').find('.el-checkbox').click() 
            //点击批量推送按钮
            cy.get('.ql-search__tools-top').contains('批量推送').click()
            cy.wait(1000)
            //点击确认弹窗
            cy.get('.el-message-box__btns').contains('推送').click()
            //断言推送提示
            cy.get('.el-message--success').should('contain','已批量推送')
        })                   
    }) 

    it('007-月度汇总报告-互认报告和证书管理-批量取消推送',()=>{ 
        cy.server()
        cy.route('**/service/mgr/mutualRecogReport*').as('mutualRecogReport')
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/cert/cert-year') 
        cy.wait('@mutualRecogReport').then((xhr) => {
            cy.get('.ql-search__header').find('input[placeholder="请输入实验室名称或编码"]').eq(0).type('gd18003')
            cy.get('.ql-search__header').contains('搜索').click() 
            cy.get('.el-table__header-wrapper').find('.el-checkbox').click()
            //点击批量取消推送按钮 
            cy.get('.ql-search__tools-top').contains('批量取消推送').click()
            //点击确认弹窗按钮
            cy.get('.el-message-box__btns').contains('取消推送').click()
            //断言弹窗内容
            cy.get('.el-message--success').should('contain','已批量取消推送') 
        })                            
    }) 

    it.skip('互认报告和证书管理-批量删除互认报告',()=>{    
        cy.server()
        cy.route('**/service/mgr/mutualRecogReport*').as('mutualRecogReport')    
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/cert/cert-year')
        cy.wait('@mutualRecogReport').then((xhr) => {
            //搜索出要推送的报告     
            cy.get('.ql-search__header').find('input[placeholder="请输入实验室名称或编码"]').eq(0).type('gd18001')
            cy.get('.ql-search__header').contains('搜索').click() 
            cy.get('.el-table__header-wrapper').find('.el-checkbox').click({force: true})
            //点击批量批量删除按钮 
            cy.get('.ql-search__tools-top').contains('批量删除').click({force: true})
            //点击确认弹窗按钮
            cy.get('.el-message-box__btns').contains('删除').click({force: true})
            //断言弹窗内容
            cy.get('.el-message--success').should('contain','已删除成功')  
        })                     
    }) 

    it('008-月度汇总报告-互认报告和证书管理-预览证书',()=>{ 
        cy.server()
        cy.route('**/service/mgr/mutualRecogReport*').as('mutualRecogReport')         
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/cert/cert-year')
        cy.wait('@mutualRecogReport').then((xhr) => {
            //搜索出要推送的报告     
            cy.get('.ql-search__header').find('input[placeholder="请输入实验室名称或编码"]').first().type('gd18003')
            cy.get('.ql-search__header').contains('搜索').click() 
            //点击预览按钮 
            cy.get('.ql-search__body').contains('预览').click()
            //断言弹窗内容
            cy.get('.ql-frame-viewer__header').contains('报告预览') 
        })                  
    })


    it('009-月度汇总报告-月度汇总报告生成',() => { 
        let reportMonth = '三月'
        cy.server()
        cy.route('**/service/mgr/report/ccls*').as('ccls') 
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-mgr/dept/report-gen')
        cy.wait('@ccls').then((xhr) => {
            //点击展开按钮--广东省临床检验中心
            cy.get('.el-card__body').find('.el-tree-node__children').first().find('.el-tree-node__expand-icon').first().click()
            //选择佛山市临检的复选框
            cy.get('.el-tree-node__children').eq(1).find('.el-checkbox__inner').click()
            //点击‘生成报告’按钮
            cy.get('.report-mgr__tools').find('button').click()
            //选择报告类型
            cy.get('.el-date-editor').click()
            //选择生成报告的月份
            cy.get('.el-picker-panel__content').find('.el-month-table').contains(reportMonth).click()
            //点击弹窗中的‘生成报告’按钮
            cy.get('.el-dialog__footer').contains('生成报告').click()
            //操作开始执行,请查阅系统日志了解执行进展
            cy.get('.el-message--success').should('contain','操作开始执行,请查阅系统日志了解执行进展') 
        })         
    })

    it('010-月度汇总报告-预览月度汇总报告',() => {  
        cy.server()
        cy.route('**/service/mgr/report/summary/month*').as('monthReport')   
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-mgr/dept/summary-month')
        cy.wait('@monthReport').then((xhr)=>{
            //搜索出要推送的报告     
            cy.get('.ql-search__header').find('.el-date-editor').click()
            //搜索栏时间选择，如一月
            cy.get('.el-picker-panel__content').find('.el-month-table').contains('三月').click()
            //点击搜索按钮
            cy.get('.ql-search__header').contains('搜索').click() 
            //点击预览按钮 
            cy.get('.el-table__body-wrapper').contains('预览').click()
            cy.get('.ql-frame-viewer__header').should('contain','报告预览').and('contain','关闭')
            cy.get('.ql-frame-viewer__header').contains('关闭').click()            
        })        
    })

    it('011-月度汇总报告-删除月度汇总报告',()=>{ 
        cy.server()
        cy.route('**/service/mgr/report/summary/month*').as('monthReport')        
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-mgr/dept/summary-month')
        cy.wait('@monthReport').then((xhr)=>{
            //搜索出要推送的报告     
            cy.get('.ql-search__header').find('.el-date-editor').click()
            //搜索栏时间选择，如一月
            cy.get('.el-picker-panel__content').find('.el-month-table').contains('三月').click()
            //点击搜索按钮
            cy.get('.ql-search__header').contains('搜索').click() 
            //点击预览按钮 
            cy.get('.el-table__body-wrapper').contains('删除').click() 
            cy.get('.el-message-box__wrapper').find('button').contains('删除').click()
            cy.get('.el-table__empty-block').should('contain','暂无数据')
        }) 
    })         
})