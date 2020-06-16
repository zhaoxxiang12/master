

describe('CQB测试用例',function(){
    //定义一个变量
    var data2='1'
    var data3=2
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
    })
    it.only('Show and close Fugtive dust',()=>{
        var data={"search":"ABC","goods":"123"}
        //显示浮沉
        cy.get('div[class=ql-splitview__top').trigger('mouseover')
        //断言
        cy.get('#accordion').should('not.have.css','display','none')
        //关闭浮沉
        cy.get('i[class=el-icon-close]').click()
        //断言
        // cy.get('body').should('contain','Sigma指数比较分析')
        //后台打印值
       console.log(data)
       console.log(data2)
       console.log(typeof data)
       console.log(typeof data2)
       console.log(typeof data3)

    })
})