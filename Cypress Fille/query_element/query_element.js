describe('CQB测试用例',function(){
    before(()=>{
        
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
    it.only('lab-0001-添加实验室-实验室名称为空不能保存',()=>{
        //点击账户管理
        cy.get('div[class=el-submenu__title]').eq(4).click()
        //点击实验室账户
        cy.get('li[class=el-menu-item]').eq(8).click()
         // 在搜索框输入数据
        cy.get('input[placeholder="实验室名称或编码"').type('test123')
        // 点击搜索按键
        // cy.get('i[class="el-icon-search"]').click()
        // // 点击编辑按键
        // cy.get('table[class=el-table__body]').eq(2).find('button').eq(1).click()
        // //查找实验室名称输入框
        // cy.get('label[for="labName"]+div[class="el-form-item__content"]').find('input[class="el-input__inner"]').should('have.value','修改名称7321')
        // cy.get('label[for="labName"]+div[class="el-form-item__content"]').find('input[class="el-input__inner"]').should('contain','修改名称7321')
        //方法1：
        // cy.get('div[class="el-table__fixed-body-wrapper"]').eq(1).find('table[class="el-table__body"]')
        // .find('tbody').find('tr[class="el-table__row"]').eq(1).find('td').eq(9)
        // .find('button[class="el-button el-button--text el-button--medium"]').eq(1).find('span').click()
        //方法2：
        // cy.get('table[class=el-table__body]').eq(2).find('button').eq(2).click()
        // cy.get('table[class=el-table__body]').eq(2).find('button').eq(2).find('span').should('have.text','启用')
        
        
        // cy.get('div[class=el-message-box__btns').find('button[class="el-button el-button--default el-button--small el-button--primary el-button--danger "]')
        // .click()
        //获取text并用变量保存 
        // cy.get('table[class=el-table__body]').eq(2).find('button').eq(2).find('span').invoke('text').then((text)=>{
        //        var data=text
        //         console.log(data)
        // }

        //点击启用/锁定按键
        // cy.get('table[class=el-table__body]').eq(2).find('button').eq(2).click()
        // cy.get('div[class=el-message-box__btns').find('button').eq(1).find('span').invoke('text').then((text)=>{
        //     var data2=text
        //     data2=data2.replace(/\s+/g,"")//去除字符串所有空格
        //      console.log(data2)
        //      console.log(typeof data2)
        //      var judge_value='启用'
        //      if(data2===judge_value){
        //         cy.get('div[class=el-message-box__btns').find('button[ class="el-button el-button--default el-button--small el-button--primary "]')
        //         .click()
        //     }else{
        //         cy.get('div[class=el-message-box__btns')
        //         .find('button[class="el-button el-button--default el-button--small el-button--primary el-button--danger"]')
        //         .click()
        //     }
        // })
        // cy.get('div[class=el-message-box__btns')
        //     .find('button[class="el-button el-button--default el-button--small el-button--primary el-button--danger"]')
        //     .click()


        // if(data2=="启用"){
        //     cy.get('div[class=el-message-box__btns').find('button[ class="el-button el-button--default el-button--small el-button--primary "]')
        //     .click()
        // }else{
        //     cy.get('div[class=el-message-box__btns')
        //     .find('button[class="el-button el-button--default el-button--small el-button--primary el-button--danger"]')
        //     .click()
        // }

        //复选框
        cy.get('div[class="el-table__fixed"]').find('div[class="el-table__fixed-body-wrapper"]').find('tbody>tr>td>div>label>span>span')
        .eq(2).click()
   
    })
    it.only('iqc',()=>{
        cy.get('div[class="el-submenu__title"]').eq(7).click()
        cy.get('div[class="el-submenu__title"]').eq(9).click()
        cy.get('ul[role="menu"]').eq(9).find('li[class=el-menu-item]').eq(0).click()
    })
})