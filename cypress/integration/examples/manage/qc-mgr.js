context('质控品管理', () => {
    beforeEach(() => {
        cy.loginCQB()
    })
  
  
    it('001-质控品管理-添加质控品', () => {
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/qc-mgr')
        // 给质控品信息添加随机数避免重复
        let num = Math.ceil(Math.random() * 10000)
        cy.server()
        cy.route('**/service/mgr/qc/item/page*').as('getPcPage')
        cy.wait('@getPcPage').then((xhr) => {
            //点击添加按钮
            cy.get('.ql-search__tools-top button').contains('添加').click()
            //输入质控品名称
            cy.get('[aria-label="添加质控品"] input').first().type('质控品名称' + num)
            //输入质控品批号
            cy.get('[aria-label="添加质控品"] input').eq(2).type('lot' + num)
            //输入货号
            cy.get('[aria-label="添加质控品"] input').eq(3).type('prod' + num)
            // 由于组件的下拉框是模拟的，不能使用select，因此需要通过点击操作
            cy.get('[aria-label="添加质控品"] input').eq(6).click()
            // 下拉菜单是在body下生成的
            cy.get('body>.el-select-dropdown li').first().click()
            //输入厂商信息
            cy.get('[aria-label="添加质控品"] input').eq(7).type('厂商' + num)
            //保存弹窗信息
            cy.get('[aria-label="添加质控品"] .el-dialog__footer button').contains('保存').click()
            // 没有错误提示
            cy.get('.el-form-item__error').should('have.length', 0)
            // 提示成功添加
            cy.get('.el-message--success').contains('已添加质控品')
        })              
    })

    it('002-质控品管理-添加重复的质控品', () => {
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/qc-mgr')
        let num = Math.ceil(Math.random() * 10000) 
        cy.server()
        cy.route('**/service/mgr/qc/item/page*').as('getPcPage')
        cy.wait('@getPcPage').then((xhr) => {
            //点击添加按钮
            cy.get('.ql-search__tools-top button').contains('添加').click()
            //弹窗中填写质控品名称
            cy.get('[aria-label="添加质控品"] input').first().type('质控品名称' + num)
            //弹窗中添加质控品批号
            cy.get('[aria-label="添加质控品"] input').eq(2).type('HCV-20190826')
            //输入货号
            cy.get('[aria-label="添加质控品"] input').eq(3).type('prod' + num)
            // 由于组件的下拉框是模拟的，不是使用select，因此需要通过点击操作
            cy.get('[aria-label="添加质控品"] input').eq(6).click()
            // 下拉菜单是在body下生成的
            cy.get('body>.el-select-dropdown li').first().click()
            //添加厂商信息
            cy.get('[aria-label="添加质控品"] input').eq(7).type('厂商' + num)
            cy.get('[aria-label="添加质控品"] .el-dialog__footer button').contains('保存').click()
            // 对添加失败的提示进行断言
            cy.get('.el-message--error').should('contain','校验失败，您添加的质控品批号已存在。') 
        })
    })

    it('003-质控品管理-编辑质控品', () => {
        cy.server()
        cy.route('**/service/mgr/qc/item/page*').as('getQcPage')
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/qc-mgr')
        cy.wait('@getQcPage')
        let num = Math.ceil(Math.random() * 10000)
        //点击输入框，输入搜索条件
        cy.get('input[placeholder="请输入批号"]').type('lot5072')
        //点击搜索按钮
        cy.get('button[type="submit"]').first().click()
        // 点击编辑按钮
        cy.get('.el-table__fixed-right tbody tr').first().find('button').contains('编辑').click()
        cy.wait(1000)
        //清空质控品名称输入框
        cy.get('[aria-label="编辑质控品"] input').first().clear()
        //在弹窗中输入质控品名称
        cy.get('[aria-label="编辑质控品"] input').first().type('质控品名称' + num)
        //点击保存按钮
        cy.get('[aria-label="编辑质控品"] .el-dialog__footer button').contains('保存').click()
        cy.get('.el-form-item__error').should('have.length', 0)
        // 断言编辑成功提示框
        cy.get('.el-message--success').should('contain','已更新质控品')
    }) 
    
    it('004-质控品管理-取消删除质控品',()=>{   
        cy.server()
        cy.route('**/service/mgr/qc/item/page*').as('getQcPage')   
        //进入质控品管理页面   
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/qc-mgr') 
        cy.wait('@getQcPage').then((xhr) => {
            //点击展开搜索条件
            cy.get('button[type="button"]').contains('展开').click()
            //点击质控品名称输入框，输入搜索条件
            // cy.get('input[placeholder="请输入质控品名称"]').type('质控品名称')
            //点击搜索按钮
            // cy.get('button[type="submit"]').first().contains('搜索').click()     
            cy.get('.el-table__fixed-right tbody tr').first().find('button').contains('删除').click()
            //点击取消弹窗
            cy.get('button[class="el-button el-button--default el-button--small"]').click()
        })              
    })
        
    it('005-质控品管理-删除质控品',()=>{  
        cy.server()
        cy.route('**/service/mgr/qc/item/page*').as('getQcPage')   
        //进入质控品管理页面   
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/qc-mgr') 
        cy.wait('@getQcPage').then((xhr) => {
            //点击展开搜索条件
            cy.get('button[type="button"]').contains('展开').click()
            //点击质控品名称输入框，输入搜索条件
            cy.get('input[placeholder="请输入质控品名称"]').type('质控品名称')
            //点击搜索按钮
            // cy.get('button[type="submit"]').get('.el-button el-button--text el-button--medium').click() 
            cy.get('.ql-search__btns').find('button[type="submit"]').click() 

            //点击批号输入框，输入搜索条件
            // cy.get('input[placeholder="请输入批号"]').type('lot9442')
            //点击删除按钮    
            cy.get('.el-table__fixed-right tbody tr').first().find('button').contains('删除').click()
            //点击弹窗中的确认‘删除’
            cy.get('button[class="el-button el-button--default el-button--small el-button--primary el-button--danger"]').click()
            //删除后，对页面文案的断言
            // cy.get('.el-table__empty-text').should('contain','暂无数据')
        })
    })
        
   
      
    it('006-质控品管理-停用质控品',()=>{         
        //进入质控品管理页面   
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/qc-mgr')  
        //点击输入框，输入搜索条件
        cy.get('input[placeholder="请输入批号"]').type('lot5072')
        //点击搜索按钮
        cy.get('button[type="submit"]').first().click()
        // 在搜索结果中，点击‘编辑’按钮
        cy.get('.el-table__fixed-right tbody tr').first().find('button').contains('编辑').click().then(()=>{
            cy.get('.el-table__fixed-right .ql-badge-status__text').invoke('text').then((text)=>{
                cy.log(text)
                cy.get('.el-switch__core').click() //在编辑弹窗中，点击停用/启用按钮
                cy.get('.el-dialog__body + div').find('button').eq(1).click() //点击保存弹窗按钮
                cy.server()
                // 拦截实验室账号分页接口，使用通配符*拦截更灵活
                cy.route('**/service/mgr/qc/item/page*').as('getPage')    
                // 访问界面后等待接口返回数据
                cy.wait('@getPage').then((xhr) => {                   
                    cy.get('.el-table__fixed-right .ql-badge-status__text').invoke('text').then((text2)=>{
                        expect(text).to.not.eq(text2)
                    })                       
                })
            })
        })       
    })         
})