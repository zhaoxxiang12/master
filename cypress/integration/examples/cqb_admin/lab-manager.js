//声明这是一个测试用例
describe('账户管理-实验室账户', function () {
    let saveButton = 8
    let closeButton = 6
    before(() => {
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/account/lab-manage')
    })
    // --------------------------------------------添加实验室------------------------------------------------
    it('001-添加实验室-实验室名称为空不能保存', () => {
        cy.wait(1000)
        //点击添加实验室
        cy.get('button').contains('添加实验室').click({
            force: true
        })
        cy.get('.el-input__inner')
        // 输入实验室编码
        var lab_Code = parseInt(Math.random() * 100000) //生成随机数
        cy.wait(1000)
        cy.get('input[class=el-input__inner').eq(9).type('gd' + lab_Code, {
            force: true
        })
        //选择所在地（选择省）
        cy.get('input[placeholder=请选择省]').eq(1).click({
            force: true
        }) //点击所在地的下拉框 选择广东省
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find("li").eq(2).click({
            force: true
        })
        //选择所在地（选择市） 
        cy.get('input[placeholder=所有市]').eq(1).click({
            force: true
        })
        // 选择佛山市
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(5).click({
            force: true
        })
        // 选择所在区
        cy.get('input[placeholder=所有区]').eq(1).click({
            force: true
        }) //点击所在区选择框 选择南海区
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(1).click({
            force: true
        })
        //获取GPS坐标
        cy.get('input[placeholder="如：113.124749,23.00637"]').type('113.124749,23.00637"')
        //输入联系人
        cy.get('input[class=el-input__inner').eq(14).type('AA', {
            force: true
        })
        //输入联系人电话
        cy.get('input[class=el-input__inner]').eq(15).type('18', {
            force: true
        })
        // 输入实验密码
        cy.get('input[class=el-input__inner]').eq(17).type('gd' + lab_Code, {
            force: true
        })
        // 点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        cy.get('body').should('contain', '请输入实验室名称')
        cy.wait(1000)
        // 关闭窗口
        cy.get('.el-button.el-button--default.el-button--medium').eq(closeButton).click({
            force: true
        })
    })
    it('002-添加实验室-实验室编码为空不能保存', () => {
        cy.wait(1000)
        //点击添加实验室
        cy.get('button').contains('添加实验室').click({
            force: true
        })
        // //输入实验室名称  
        cy.get('input[maxlength="64"').clear().type('佛山市医院', {
            force: true
        })
        //输入实验室编码
        var lab_Code = parseInt(Math.random() * 100000) //生成随机数
        cy.get('input[class=el-input__inner').eq(9).clear({
            force: true
        })
        //选择所在地（选择省）选择广东省
        cy.get('input[class=el-input__inner').eq(10).click({
            force: true
        }) //点击所在地的下拉框
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find("li").eq(2).click({
            force: true
        })
        //选择所在地（选择市）
        cy.get('input[placeholder=所有市]').eq(1).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(5).click({
            force: true
        })
        // 选择所在区  选择南海区
        cy.get('input[placeholder=所有区]').eq(1).click({
            force: true
        }) //点击所在区选择框
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(1).click({
            force: true
        })
        cy.get('input[placeholder="如：113.124749,23.00637"]').clear().type('113.124749,23.00637"')
        //输入联系人
        cy.get('input[class=el-input__inner').eq(14).clear().type('AA', {
            force: true
        })
        //输入联系人电话
        cy.get('input[class=el-input__inner]').eq(15).clear().type('18', {
            force: true
        })
        // 输入实验密码
        cy.get('input[class=el-input__inner]').eq(17).clear().type('gd' + lab_Code, {
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        cy.get('body').should('contain', '请输入编码')
        // 关闭窗口
        cy.get('.el-button.el-button--default.el-button--medium').eq(closeButton).click({
            force: true
        })
    })
    it('003-添加实验室-实验室编码重复不能保存', () => {
        cy.wait(1000)
        //点击添加实验室
        cy.get('i[class=el-icon-circle-plus]').click({
            force: true
        })
        //输入实验室名称  
        cy.get('input[maxlength="64"').type('佛山市医院')
        //输入实验室编码
        var lab_Code = parseInt(Math.random() * 100000) //生成随机数 
        cy.get('input[class=el-input__inner').eq(9).clear().type('gd18006', {
            force: true
        })
        //选择所在地（选择省） 选择广东省
        cy.get('input[class=el-input__inner').eq(10).click({
            force: true
        }) //点击所在地的下拉框
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find("li").eq(2).click({
            force: true
        })
        //选择所在地（选择市）
        cy.get('input[placeholder=所有市]').eq(1).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(5).click({
            force: true
        })
        // 选择所在区
        cy.get('input[placeholder=所有区]').eq(1).click({
            force: true
        })
        //点击所在区选择框  选择南海区
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(1).click({
            force: true
        })
        cy.get('input[placeholder="如：113.124749,23.00637"]').clear().type('113.124749,23.00637"')
        //输入联系人
        cy.get('input[class=el-input__inner').eq(14).clear().type('AA', {
            force: true
        })
        //输入联系人电话
        cy.get('input[class=el-input__inner]').eq(15).clear().type('18', {
            force: true
        })
        // 输入实验密码
        cy.get('input[class=el-input__inner]').eq(17).clear().type('gd' + lab_Code, {
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        cy.get('body').should('contain', '编码已存在，请重新输入')
        // 关闭窗口
        cy.get('.el-button.el-button--default.el-button--medium').eq(closeButton).click({
            force: true
        })
    })
    it('004-添加实验室-所在地为空不能保存', () => {
        cy.get('i[class=el-icon-circle-plus]').click({
            force: true
        })
        //输入实验室名称  
        cy.get('input[maxlength="64"').clear().type('佛山市医院')
        //输入实验室编码
        var lab_Code = parseInt(Math.random() * 100000) //生成随机数
        //  console.log('gd'+lab_Code)
        cy.get('input[class=el-input__inner').eq(9).clear().type('gd' + lab_Code, {
            force: true
        })
        //获取GPS坐标
        cy.get('input[placeholder="如：113.124749,23.00637"]').clear().type('113.124749,23.00637"')
        //输入联系人
        cy.get('input[class=el-input__inner').eq(14).clear().type('AA', {
            force: true
        })
        //输入联系人电话
        cy.get('input[class=el-input__inner]').eq(15).clear().type('18'), {
            force: true
        }
        // 输入实验密码
        cy.get('input[class=el-input__inner]').eq(17).clear().type('gd' + lab_Code, {
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        cy.get('body').should('contain', '请选择所在地')
        // 关闭窗口
        cy.get('.el-button.el-button--default.el-button--medium').eq(closeButton).click({
            force: true
        })
    })
    it('005-添加实验室-GPS坐标为空不能保存', () => {
        //点击添加实验室
        cy.get('i[class=el-icon-circle-plus]').click({
            force: true
        })
        //输入实验室名称  
        cy.get('input[maxlength="64"').clear().type('佛山市医院')
        //输入实验室编码
        var lab_Code = parseInt(Math.random() * 100000) //生成随机数
        //  console.log('gd'+lab_Code)
        cy.get('input[class=el-input__inner').eq(9).type('gd' + lab_Code, {
            force: true
        })
        //选择所在地（选择省）
        cy.get('input[placeholder=请选择省]').eq(1).click({
            force: true
        }) //点击所在地的下拉框 选择广东省
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find("li").eq(2).click({
            force: true
        })
        //选择所在地（选择市）
        cy.get('input[placeholder=所有市]').eq(1).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(5).click({
            force: true
        })
        // 选择所在区
        cy.get('input[placeholder=所有区]').eq(1).click({
            force: true
        })
        //点击所在区选择框  选择南海区
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(1).click({
            force: true
        })
        //输入联系人
        cy.get('input[class=el-input__inner').eq(14).clear().type('AA', {
            force: true
        })
        //输入联系人电话
        cy.get('input[class=el-input__inner]').eq(15).clear().type('18', {
            force: true
        })
        // 输入实验密码
        cy.get('input[class=el-input__inner]').eq(17).clear().type('gd' + lab_Code, {
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        // 关闭窗口
        cy.get('.el-button.el-button--default.el-button--medium').eq(closeButton).click({
            force: true
        })
    })
    it('006-添加实验室-联系人为空不能保存', () => {
        cy.get('button').contains('添加实验室').click({
            force: true
        })
        //输入实验室名称  
        cy.get('input[maxlength="64"').type('佛山市医院', {
            force: true
        })
        //输入实验室编码
        var lab_Code = parseInt(Math.random() * 100000) //生成随机数
        //  console.log('gd'+lab_Code)
        cy.get('input[class=el-input__inner').eq(9).clear().type('gd' + lab_Code, {
            force: true
        })
        //选择所在地（选择省）
        cy.get('input[placeholder=请选择省]').eq(1).click({
            force: true
        }) //点击所在地的下拉框  选择广东省
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find("li").eq(2).click({
            force: true
        })
        //选择所在地（选择市）
        cy.get('input[placeholder=所有市]').eq(1).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(5).click({
            force: true
        })
        // 选择所在区
        cy.get('input[placeholder=所有区]').eq(1).click({
            force: true
        }) //点击所在区选择框  选择南海区
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(1).click({
            force: true
        })
        //获取GPS坐标
        cy.get('div[class=el-input-group__append]').click({
            force: true
        })
        //输入联系人电话
        cy.get('input[class=el-input__inner]').eq(15).clear().type('18', {
            force: true
        })
        // 输入实验密码
        cy.get('input[class=el-input__inner]').eq(17).clear().type('gd' + lab_Code, {
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
         // 关闭窗口
         cy.get('.el-button.el-button--default.el-button--medium').eq(closeButton).click({
            force: true
        })
    })
    it('007-添加实验室-联系人电话为空不能保存', () => {
        cy.get('button').contains('添加实验室').click({
            force: true
        })
        //输入实验室名称  
        cy.get('input[maxlength="64"').type('佛山市医院', {
            force: true
        })
        //输入实验室编码
        var lab_Code = parseInt(Math.random() * 100000) //生成随机数
        //  console.log('gd'+lab_Code)
        cy.get('input[class=el-input__inner').eq(9).clear().type('gd' + lab_Code, {
            force: true
        })
        //选择所在地（选择省）
        cy.get('input[placeholder=请选择省]').eq(1).click({
            force: true
        }) //点击所在地的下拉框
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find("li").eq(2).click({
            force: true
        }) //选择广东省
        //选择所在地（选择市）
        cy.get('input[placeholder=所有市]').eq(1).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(5).click({
            force: true
        })
        // 选择所在区
        cy.get('input[placeholder=所有区]').eq(1).click({
            force: true
        }) //点击所在区选择框
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(1).click({
            force: true
        }) //选择南海区
        //获取GPS坐标
        cy.get('div[class=el-input-group__append]').click({
            force: true
        })
        cy.get('input[placeholder="如：113.124749,23.00637"]').type('113.124749,23.00637"')
        //输入联系人
        cy.get('input[class=el-input__inner').eq(14).clear().type('AA', {
            force: true
        })
        //输入联系人电话
        // cy.get('input[class=el-input__inner]').eq(15).type('18')
        // 输入实验密码
        cy.get('input[class=el-input__inner]').eq(17).clear().type('gd' + lab_Code, {
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        cy.get('body').should('contain', '请输入联系电话', {
            force: true
        })
        //关闭窗口
        cy.get('.el-button.el-button--default.el-button--medium').eq(closeButton).click({
            force: true
        })

    })
    it.skip('008-添加实验室-必填项按照正确格式填写保存成功', () => {
        //点击添加实验室
        cy.get('i[class=el-icon-circle-plus]').click({
            force: true
        })
        //输入实验室名称  
        cy.get('input[maxlength="64"').type('佛山市医院')
        //输入实验室编码
        var lab_Code = parseInt(Math.random() * 100000) //生成随机数
        //  console.log('gd'+lab_Code)
        cy.get('input[class=el-input__inner').eq(9).type('gd' + lab_Code)
        //选择所在地（选择省）
        cy.get('input[placeholder=请选择省]').eq(1).click({
            force: true
        }) //点击所在地的下拉框
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find("li").eq(2).click({
            force: true
        }) //选择广东省
        //选择所在地（选择市）
        cy.get('input[placeholder=所有市]').eq(1).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(5).click({
            force: true
        })
        // 选择所在区
        cy.get('input[placeholder=所有区]').eq(1).click({
            force: true
        }) //点击所在区选择框
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(1).click({
            force: true
        }) //选择南海区
        //获取GPS坐标
        cy.get('div[class=el-input-group__append]').click({
            force: true
        })
        //  cy.get('input[placeholder="如：113.124749,23.00637"]').type('113.124749,23.00637"')
        //输入联系人
        cy.get('input[class=el-input__inner').eq(14).type('AA')
        //输入联系人电话
        cy.get('input[class=el-input__inner]').eq(15).type('18888888888')
        // 输入实验密码
        cy.get('input[class=el-input__inner]').eq(17).type('gd' + lab_Code)
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        cy.get('body').should('contain', '实验室已添加')
        //    搜索输入框输入内容
        cy.get('input[placeholder="实验室名称或编码"').type('gd' + lab_Code)
        //    点击搜索按键
        cy.get('i[class="el-icon-search"]').click({
            force: true
        })
        //    断言
        cy.get('body').should('contain', '共 1 条')

    })


    // --------------------------------------------编辑实验室------------------------------------------------
    it('009-编辑实验室-修改实验室名称', () => {
        // 在搜索框输入数据
        cy.get('input[placeholder="实验室名称或编码"').type('测试实验室1', {
            force: true
        })
        //点击搜索按键
        cy.get('i[class="el-icon-search"]').click({
            force: true
        })
        // 点击编辑按键
        cy.get('table[class=el-table__body]').eq(2).find('button').eq(1).click({
            force: true
        })
        cy.wait(500)
        // 清除实验室原来的名称
        cy.get('input[maxlength="64"]').clear({
            force: true
        })
        var labCode = parseInt(Math.random() * 10000) //生成随机数
        var newlabName = '修改名称' + labCode
        // 填写修改后的名称
        cy.get('input[maxlength="64"]').clear({
            force: true
        }).type(newlabName)
        // 点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        // 保存成功断言
        cy.get('body').should('contain', '实验室已更新')
        //在搜索输入框输入实验室名称
        cy.get('input[placeholder="实验室名称或编码"').clear({
            force: true
        }).type(newlabName, {
            force: true
        })
        //点击搜索
        cy.get('i[class="el-icon-search"]').click({
            force: true
        })
        //断言
        cy.get('body').should('contain', '共 1 条')
        //---------将原来实验室名称修改回来(防止后面的用例执行失败)-----------------
        // 在搜索框输入数据
        cy.get('input[placeholder="实验室名称或编码"').clear({
            force: true
        }).type(newlabName, {
            force: true
        })
        //点击搜索按键
        cy.get('i[class="el-icon-search"]').click({
            force: true
        })
        // 点击编辑按键
        cy.get('table[class=el-table__body]').eq(2).find('button').eq(1).click({
            force: true
        })
        cy.wait(500)
        // 清除实验室原来的名称
        cy.get('input[maxlength="64"]').clear({
            force: true
        }).type("测试实验室1")
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        }) // 点击保存

    })
    it('010-编辑实验室-修改实验室编码(相同)', () => {
        //在搜索框输入数据
        cy.get('input[placeholder="实验室名称或编码"').clear().type('测试实验室1', {
            force: true
        })
        //点击搜索按键
        cy.get('i[class="el-icon-search"]').click({
            force: true
        })
        //点击编辑按键
        cy.get('table[class=el-table__body]').eq(2).find('button').eq(1).click({
            force: true
        })
        cy.wait(1000)
        //输入实验室编码(修改实验室编码)
        cy.get('.el-input__inner').eq(9).clear({
            force: true
        }).type('gd18006', {
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        //断言
        cy.get('body').should('contain', '编码已存在，请重新输入')
        cy.get('.el-button.el-button--default.el-button--medium').eq(closeButton).click({
            force: true
        })
    })
    it('011-编辑实验室-修改实验室编码', () => {
        //在搜索框输入数据
        cy.get('input[placeholder="实验室名称或编码"').clear().type('测试实验室1', {
            force: true
        })
        //点击搜索按键
        cy.get('i[class="el-icon-search"]').click({
            force: true
        })
        //点击编辑按键
        cy.get('table[class=el-table__body]').eq(2).find('button').eq(1).click({
            force: true
        })
        cy.wait(1000)
        //清除实验室编码输入框的内容
        cy.get('.el-input__inner').eq(9).clear({
            force: true
        })
        //输入实验室编码(修改实验室编码)
        var lab_Code = parseInt(Math.random() * 100) //生成随机数
        var New_lab_Code = 'test123' + lab_Code
        cy.get('input[class=el-input__inner').eq(9).type(New_lab_Code, {
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        //断言
        cy.get('body').should('contain', '实验室已更新')
        //清除搜索输入框的内容
        cy.get('input[placeholder="实验室名称或编码"').clear().type(New_lab_Code)
        //点击搜索
        cy.get('i[class="el-icon-search"]').click({
            force: true
        })
        cy.wait(1000)
        cy.get('body').should('contain', '共 1 条')
    })
    it('012-编辑实验室-修改联系人', () => {
        //在搜索框输入数据
        cy.get('input[placeholder="实验室名称或编码"').clear().type('测试实验室1', {
            force: true
        })
        //点击搜索按键
        cy.get('i[class="el-icon-search"]').click({
            force: true
        })
        //点击编辑按键
        cy.get('table[class=el-table__body]').eq(2).find('button').eq(1).click({
            force: true
        })
        cy.wait(500)
        //--------修改联系人--------
        var User_Name_Code = parseInt(Math.random() * 100) //生成随机数
        var New_User_Name = 'AAA' + User_Name_Code
        //输入联系人
        cy.get('input[class=el-input__inner').eq(14).clear({
            force: true
        }).type(New_User_Name, {
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })
        //断言
        cy.get('body').should('contain', '实验室已更新')
        //在搜索框输入数据
        cy.get('input[placeholder="实验室名称或编码"').clear({
            force: true
        }).type('测试实验室1', {
            force: true
        })
        //点击搜索按键
        cy.get('i[class="el-icon-search"]').click({
            force: true
        })
        //点击编辑按键
        cy.get('table[class=el-table__body]').eq(2).find('button').eq(1).click({
            force: true
        })
        // 断言
        cy.get('input[maxlength="16"').eq(1).should('have.value', New_User_Name)
    })
    it('013-编辑实验室-修改联系电话', () => {
        //在搜索框输入数据
        cy.get('input[placeholder="实验室名称或编码"').clear({
            force: true
        }).type('测试实验室1', {
            force: true
        })
        //点击搜索按键
        cy.get('i[class="el-icon-search"]').click({
            force: true
        })
        //点击编辑按键
        cy.get('table[class=el-table__body]').eq(2).find('button').eq(1).click({
            force: true
        })
        cy.wait(500)
        //------------修改联系电话------------
        cy.get('.el-input__inner').eq(15).clear() //清除以前的数据
        var Phone_Number = parseInt(Math.random() * 1000000) //生成随机数
        var New_Phone_Number = '188456' + Phone_Number
        //输入电话号码
        cy.get('.el-input__inner').eq(15).type(New_Phone_Number, {
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
            force: true
        })

        //断言
        cy.get('body').should('contain', '实验室已更新')
        //在搜索框输入数据
        cy.get('input[placeholder="实验室名称或编码"').clear().type('测试实验室1', {
            force: true
        })
        //点击搜索按键
        cy.get('i[class="el-icon-search"]').click({
            force: true
        })
        //点击编辑按键
        cy.get('table[class=el-table__body]').eq(2).find('button').eq(1).click({
            force: true
        })
        cy.wait(1000)
        //断言
        cy.get('input[maxlength="16"').eq(2).should('have.value', New_Phone_Number)
        //关闭窗口
        cy.get('.el-button.el-button--default.el-button--medium').eq(closeButton).click({
            force: true
        })
    })
    // --------------------------------------------启用/停用实验室------------------------------------------------
    it('014-启用/停用实验室实验室', () => {
        let keyWord = 1
        let status = 0
        let firstData = 0
        //在搜索框输入数据
        cy.get('input[placeholder="实验室名称或编码"').clear({
            force: true
        }).type('测试实验室1', {
            force: true
        })
        //点击搜索按键
        cy.get('i[class="el-icon-search"]').click({
            force: true
        })
        cy.wait(1000)
        cy.get('.el-table__row').eq(firstData).find('.el-button.el-button--text.el-button--medium').eq(keyWord).invoke('text').then((data) => {
            let judge = data
            if (judge == '启用') {
                cy.get('.el-button.el-button--text.el-button--medium').eq(keyWord).click({
                    force: true
                })
                cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click({
                    force: true
                })
                cy.wait(1000)
                // 断言
                cy.get('.el-table__row').eq(0).find('.ql-badge-status').eq(status).should('have.text', '已启用')
                cy.get('body').should('contain', '已启用')
            } else {
                cy.get('.el-button.el-button--text.el-button--medium').eq(keyWord).click({
                    force: true
                })
                cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                    foece: true
                })
                cy.wait(1000)
                // 断言
                cy.get('.el-table__row').eq(firstData).find('.ql-badge-status').eq(status).should('have.text', '已锁定')
                cy.get('body').should('contain', '已锁定')
            }
        })
    })
})