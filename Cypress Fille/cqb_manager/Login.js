///<reference types="Cypress" />
describe('CQB管理端登录',function(){
    beforeEach(()=>{
        cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/login')
    })
    // it.only('用户名',()=>{
    //     // console.log('123')
    //     //点击弹窗的关闭按键
    //     cy.get('button[class="el-button el-button--default el-button--small"').click()
    //     //输入用户名
    //     cy.get('input[placeholder=用户名]').type('admin')
    //     //输入密码
    //     cy.get('input[placeholder=密码').type('weiyi-2019')
    //     //输入验证码
    //     cy.get('input[placeholder=验证码]').type('1234')
    //     //点击登录按键
    //     cy.get('button[type=submit').click()
    //     cy.get()
    //     //为输入验证码进行登录
    //     // cy.get('body').should('contain','请输入验证码')
    //     cy.get('bu')

    // })
    it.only('User Wrong Can not Login',()=>{
        //点击弹窗的关闭按键
        cy.get('button[class="el-button el-button--default el-button--small"').click()
        //输入用户名
        cy.get('input[placeholder=用户名]').type('admi')
          //输入密码
        cy.get('input[placeholder=密码').type('weiyi-2019')
         //输入验证码
        cy.get('input[placeholder=验证码]').type('1234')
        //点击登录按键
        cy.get('button[type=submit').click()
        //断言
        cy.get('body').should('contain','用户名或密码不正确')
    })
    it.only('Password Wrong Can  not Login',()=>{
        cy.get('button[class="el-button el-button--default el-button--small"').click()
        //输入用户名
        cy.get('input[placeholder=用户名]').type('admin')
          //输入密码
        cy.get('input[placeholder=密码').type('123456')
         //输入验证码
        cy.get('input[placeholder=验证码]').type('1AAC')
        //点击登录按键
        cy.get('button[type=submit').click()
        //断言
        cy.get('body').should('contain','用户名或密码不正确')
    })
    it.only('Verification code is null Can not Login',()=>{
        cy.get('button[class="el-button el-button--default el-button--small"').click()
        //输入用户名
        cy.get('input[placeholder=用户名]').type('admin')
          //输入密码
        cy.get('input[placeholder=密码').type('weiyi-2019')
         //输入验证码
        // cy.get('input[placeholder=验证码]').type('1AAC')
        //点击登录按键
        cy.get('button[type=submit').click()
        //断言
        cy.get('body').should('contain','请输入验证码')
    })
    it.only('Login Success',()=>{
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
    })
})