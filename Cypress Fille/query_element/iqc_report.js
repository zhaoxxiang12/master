describe('CQB测试用例',function(){
    beforeEach(()=>{
        
        cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/login')
        cy.get('button[class="el-button el-button--default el-button--small"').click()
        //输入用户名
        cy.get('input[placeholder=用户名]').type('admin')
          //输入密码
        cy.get('input[placeholder=密码').type('weiyi-2019')
         //输入验证码
        cy.get('input[placeholder=验证码]').type('1AAC')
        //点击登录按键
        cy.get('button[type=submit').click()
        //断言
        cy.get('body').should('contain','实验室总数')
        //显示浮沉
        cy.get('div[class=ql-splitview__top').trigger('mouseover')
        //关闭浮沉
        cy.get('i[class=el-icon-close]').click()
    })
    it.only('report',()=>{
        cy.get('div[class="el-submenu__title"]').eq(7).click()
        cy.get('div[class="el-submenu__title"]').eq(9).click()
        cy.get('ul[role="menu"]').eq(9).find('li[class=el-menu-item]').eq(0).click()
    })
})