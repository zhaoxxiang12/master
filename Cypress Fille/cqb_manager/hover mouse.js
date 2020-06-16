
describe('My First Test Suite', function() {
    beforeEach(()=>{
    cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/monitor/national-screen/')
    
})
           
    //         cy.get('button').trigger('mouseover')
    //         cy.wait(3000)
    //         cy.get('#office').rightclick()
    //         cy.wait(3000)
        it.only('admin账户登录CQB',()=>{
            cy.get('button[class="el-button el-button--default el-button--small"').click()
            cy.get('input[placeholder=用户名]').type('admin')
            cy.get('input[placeholder=密码]').type('weiyi-2019')
            cy.get('input[placeholder=验证码]').type('2109')
            cy.get('button[type=submit]').click()
            cy.get('body').should('contain','上报记录数')
        //显示浮沉
            cy.get('div[class=ql-splitview__top').trigger('mouseover')
        //断言
            cy.get('#accordion').should('not.have.css','display','none')
        //关闭浮沉
        cy.get('i[class=el-icon-close').click()
        cy.get('body').should('contain','质控品管理')
            
  
        })
       
})