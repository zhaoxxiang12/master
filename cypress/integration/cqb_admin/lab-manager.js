//声明这是一个测试用例
describe('账户管理-实验室账户', function () {
    let saveButton = 5
    let closeButton = 2
    before(() => {
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/account/lab-manage')
    })
    // --------------------------------------------添加实验室------------------------------------------------
    it('001-添加实验室-实验室名称为空不能保存', () => {
        cy.wait(1000)
        console.log(1)
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
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(2).click({
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
        cy.get('input[placeholder="如：113.124749,23.00637"]').type('113.124749,23.00637')
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
        cy.get('.dialog-lab button').contains('保存').click({
            force: true
        })
        cy.get('body').should('contain', '请输入实验室名称')
        cy.wait(1000)
        // 关闭窗口
        cy.get('[aria-label="添加实验室"] .el-dialog__footer button').eq(closeButton).click({
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
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(2).click({
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
        cy.get('input[placeholder="如：113.124749,23.00637"]').clear().type('113.124749,23.00637')
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
        cy.get('.dialog-lab button').contains('保存').click({
            force: true
        })
        cy.get('body').should('contain', '请输入编码')
        // 关闭窗口
        cy.get('[aria-label="添加实验室"] .el-dialog__footer button').eq(closeButton).click({
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
        //  console.log('gd'+lab_Code)
        cy.get('input[class=el-input__inner').eq(9).clear().type('gd18006', {
            force: true
        })
        //选择所在地（选择省） 选择广东省
        cy.get('input[class=el-input__inner').eq(10).click({
            force: true
        }) //点击所在地的下拉框
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(2).click({
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
        cy.get('input[placeholder="如：113.124749,23.00637"]').clear().type('113.124749,23.00637')
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
        cy.get('.dialog-lab button').contains('保存').click({
            force: true
        })
        cy.get('body').should('contain', '编码已存在，请重新输入')
        // 关闭窗口
        cy.get('[aria-label="添加实验室"] .el-dialog__footer button').eq(closeButton).click({
            force: true
        })
    })
    it('004-添加实验室-所在地为空不能保存', () => {
        cy.get('button').contains('添加实验室').click({
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
        cy.get('input[placeholder="如：113.124749,23.00637"]').clear().type('113.124749,23.00637')
        //输入联系人
        cy.get('input[class=el-input__inner').eq(14).clear().type('AA', {
            force: true
        })
        //输入联系人电话
        cy.get('input[class=el-input__inner]').eq(15).clear().type('18')
        // 输入实验密码
        cy.get('input[class=el-input__inner]').eq(17).clear().type('gd' + lab_Code, {
            force: true
        })
        //点击保存
        cy.get('.dialog-lab button').contains('保存').click({
            force: true
        })
        cy.get('body').should('contain', '请选择所在地')
        // 关闭窗口
        cy.get('[aria-label="添加实验室"] .el-dialog__footer button').eq(closeButton).click({
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
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(2).click({
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
        cy.get('.dialog-lab button').contains('保存').click({
            force: true
        })
        // 关闭窗口
        cy.get('[aria-label="添加实验室"] .el-dialog__footer button').eq(closeButton).click({
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
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(2).click({
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
        cy.get('input[placeholder="如：113.124749,23.00637"]').clear().type('113.124749,23.00637')
        //输入联系人电话
        cy.get('input[class=el-input__inner]').eq(15).clear().type('18', {
            force: true
        })
        // 输入实验密码
        cy.get('input[class=el-input__inner]').eq(17).clear().type('gd' + lab_Code, {
            force: true
        })
        //点击保存
        cy.get('.dialog-lab button').contains('保存').click({
            force: true
        })
        // 关闭窗口
        cy.get('[aria-label="添加实验室"] .el-dialog__footer button').eq(closeButton).click({
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
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(2).click({
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
        cy.get('input[placeholder="如：113.124749,23.00637"]').type('113.124749,23.00637')
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
        cy.get('.dialog-lab button').contains('保存').click({
            force: true
        })
        cy.get('body').should('contain', '请输入联系电话', {
            force: true
        })
        //关闭窗口
        cy.get('[aria-label="添加实验室"] .el-dialog__footer button').eq(closeButton).click({
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
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(7).find('li').eq(2).click({
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
        cy.get('input[placeholder="如：113.124749,23.00637"]').clear().type('113.124749,23.00637')
        //  cy.get('input[placeholder="如：113.124749,23.00637"]').type('113.124749,23.00637')
        //输入联系人
        cy.get('input[class=el-input__inner').eq(14).type('AA')
        //输入联系人电话
        cy.get('input[class=el-input__inner]').eq(15).type('18888888888')
        // 输入实验密码
        cy.get('input[class=el-input__inner]').eq(17).type('gd' + lab_Code)
        //点击保存
        cy.get('.dialog-lab button').contains('保存').click({
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
        cy.get('input[placeholder="实验室名称或编码"').clear().type('测试实验室1', {
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
        cy.get('.dialog-lab button').contains('保存').click({
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
        // 清除实验室原来的名称
        cy.get('input[maxlength="64"]').clear({
            force: true
        }).type('测试实验室1')
        // 点击保存
        cy.get('.dialog-lab button').contains('保存').click({
            force: true
        })

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
        cy.get('.dialog-lab button').contains('保存').click({
            force: true
        })
        //断言
        cy.get('body').should('contain', '编码已存在，请重新输入')
        cy.get('[aria-label="编辑实验室"] .el-dialog__footer button').eq(closeButton).click({
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
        cy.get('.dialog-lab button').contains('保存').click({
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
        cy.get('.dialog-lab button').contains('保存').click({
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
        cy.wait(500)
        //断言
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
        //------------修改联系电话------------
        cy.get('input[maxlength="16"').eq(2).clear() //清除以前的数据
        var Phone_Number = parseInt(Math.random() * 1000000) //生成随机数
        var New_Phone_Number = '188456' + Phone_Number
        //输入电话号码
        cy.get('input[maxlength="16"').eq(2).type(New_Phone_Number, {
            force: true
        })
        //点击保存
        cy.get('.dialog-lab button').contains('保存').click({
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
        cy.get('[aria-label="编辑实验室"] .el-dialog__footer button').eq(closeButton).click({
            force: true
        })
    })
    // --------------------------------------------启用/停用实验室------------------------------------------------
    it('014-启用/停用实验室实验室', () => {
        //在搜索框输入数据
        cy.get('input[placeholder="实验室名称或编码"').clear({
            force: true
        }).type('测试实验室1', {
            force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/lab/page?*').as('search')
        //点击搜索按键
        cy.get('i[class="el-icon-search"]').click({
            force: true
        })
        cy.wait('@search').then(() => {
            cy.get('tbody td:last-child button').eq(1).invoke('text').then((text) => {
                if (text == '启用') {
                    cy.get('tbody td:last-child button').eq(1).click({
                        force: true
                    })
                    cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click({
                        force: true
                    })
                    cy.wait(500)
                    // 断言
                    cy.get('tbody .ql-badge-status__text').eq(0).should('have.text', '已启用')
                    cy.get('[role="alert"]').should('contain', '已启用')
                } else {
                    cy.get('tbody td:last-child button').eq(1).click({
                        force: true
                    })
                    cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
                        force: true
                    })
                    cy.wait(500)
                    // 断言
                    cy.get('tbody .ql-badge-status__text').eq(0).should('have.text', '已锁定')
                    cy.get('[role="alert"]').should('contain', '已锁定')
                }
            })
        })
    })
    it('015-编辑实验室-关联业务标签', () => {
        let labName = 'UI测试实验室'
        cy.get('input[placeholder="实验室名称或编码"]').clear().type(labName)
        cy.get('button').contains('搜索').click()
        cy.wait(500)
        cy.get('.el-table__row').first().find('button').contains('编辑').click({
            force: true
        })
        cy.get('.ql-select-tag__selected').first().find('.el-tag.el-tag--success.el-tag--medium')
            .then((length) => {
                let getLength = length.length
                cy.get('button').contains('添加标签').first().click()
                cy.wait(500)
                cy.get('.el-tabs__item.is-left').eq(3).click()
                cy.get('button').contains('佛山').click()
                cy.get('.el-button.el-button--default.el-button--medium').last().click({
                    force: true
                })
                cy.intercept('**/cqb-base-mgr/service/mgr/lab/checkLabId?*').as('update')
                cy.get('button').contains('保存').click({
                    force: true
                })
                cy.wait('@update').then((xhr) => {
                    let expectStatus = 200
                    let responseStatus = xhr.response.statusCode
                    expect(responseStatus).to.eq(expectStatus)
                    cy.get('.el-message.el-message--success').should('contain', '实验室已更新')
                    cy.get('.el-table__row').first().find('.el-button.el-button--text.el-button--medium').first().contains('编辑').click({
                        force: true
                    })
                    cy.get('.ql-select-tag__selected').first().find('.el-tag.el-tag--success.el-tag--medium').should('have.length', getLength + 1)
                    //-------------清除之前添加的标签-------------------
                    cy.get('.ql-select-tag__selected').first().find('.el-tag__close.el-icon-close').last().click()
                    cy.get('button').contains('保存').click({
                        force: true
                    })
                    cy.wait(1000)
                    //点击编辑
                    cy.get('.el-table__row').first().find('.el-button.el-button--text.el-button--medium').first().click({
                        force: true
                    })
                    cy.get('.ql-select-tag__selected').first().find('.el-tag.el-tag--success.el-tag--medium').should('have.length', getLength)
                    //关闭窗口
                    cy.get('.el-button.el-button--default.el-button--medium').last().click({
                        force: true
                    })
                })
            })
    })
    it('016-编辑实验室-关联系统标签', () => {
        let labName = 'UI测试实验室'
        cy.get('input[placeholder="实验室名称或编码"]').clear().type(labName)
        cy.get('button').contains('搜索').click()
        cy.wait(500)
        cy.get('.el-table__row').first().find('button').contains('编辑').click({
            force: true
        })
        cy.get('.ql-select-tag__selected').last().find('.el-tag.el-tag--success.el-tag--medium')
            .then((length) => {
                let getLength = length.length
                console.log(getLength)
                cy.get('.el-button.el-button--default.el-button--mini').last().click()
                cy.wait(500)
                cy.get('.el-tabs__item.is-left').eq(2).click()
                cy.get('button').contains('UI测试标签').click()
                cy.get('.el-button.el-button--default.el-button--medium').last().click({
                    force: true
                })
                cy.intercept('**/cqb-base-mgr/service/mgr/lab/checkLabId?*').as('update')
                cy.get('button').contains('保存').click({
                    force: true
                })
                cy.wait('@update').then((xhr) => {
                    let expectStatus = 200
                    let responseStatus = xhr.response.statusCode
                    expect(responseStatus).to.eq(expectStatus)
                    cy.get('.el-message.el-message--success').should('contain', '实验室已更新')
                    cy.get('.el-table__row').first().find('button').contains('编辑').click({
                        force: true
                    })
                    cy.get('.ql-select-tag__selected').last().find('.el-tag.el-tag--success.el-tag--medium').should('have.length', getLength + 1)
                    //-------------清除之前添加的标签-------------------
                    cy.get('.el-tag__close.el-icon-close').last().click()
                    cy.get('button').contains('保存').click({
                        force: true
                    })
                    cy.wait(1000)
                    cy.get('.el-table__row').first().find('.el-button.el-button--text.el-button--medium').first().click({
                        force: true
                    })
                    cy.get('.ql-select-tag__selected').last().find('.el-tag.el-tag--success.el-tag--medium').should('have.length', getLength)
                    //关闭窗口
                    cy.get('.el-button.el-button--default.el-button--medium').last().click({
                        force: true
                    })
                    cy.get('input[placeholder="实验室名称或编码"]').clear()
                })
            })
    })
    it('017-实验室账户-标签筛选', () => {
        //-----------标签选择佛山Ⅱ--------------
        cy.get('.el-select__input.is-medium').click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('佛山II').click()
        cy.intercept('**/cqb-base-mgr/service/mgr/lab/page?labName=*').as('search')
        cy.get('button').contains('搜索').click()
        cy.wait('@search').then((xhr) => {
            let expectStatus = 200
            let responseStatus = xhr.response.statusCode
            let total = xhr.response.body.data.total
            console.log(total)
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').eq(1).find('tr').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
        cy.get('.el-tag__close.el-icon-close').click()
        //-----------标签选择广西Ⅱ--------------
        cy.get('.el-select__input.is-medium').click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('广西').click()
        cy.intercept('**/cqb-base-mgr/service/mgr/lab/page?labName=*').as('search')
        cy.get('button').contains('搜索').click()
        cy.wait('@search').then((xhr) => {
            let expectStatus = 200
            let responseStatus = xhr.response.statusCode
            let total = xhr.response.body.data.total
            console.log(total)
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').eq(1).find('tr').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
        cy.get('.el-tag__close.el-icon-close').click()
    })
    it('018-实验室账户-所在地筛选', () => {
        let area = 2
        let areaName = '北京市'
        let otherAreaName = '广东省'
        //-----------地区选择北京市------------------
        cy.get('input[placeholder="请选择省"]').click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains(areaName).click()
        cy.intercept('**/cqb-base-mgr/service/mgr/lab/page?labName=*').as('areaSearch')
        cy.get('button').contains('搜索').click()
        cy.wait('@areaSearch').then((xhr) => {
            let expectStatus = 200
            let responseStatus = xhr.response.statusCode
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').eq(1).find('tr').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
        cy.get('.el-table__body').eq(1).find('tr').then((data) => {
            let getLength = data.length
            for (let i = 0; i < getLength; i++) {
                cy.get('.el-table__body').eq(1).find('tr').eq(i).find('.cell').eq(area).should('contain', areaName).and('not.contain', otherAreaName)
            }
        })
        //-----------地区选择广东省-----------------
        cy.get('input[placeholder="请选择省"]').click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains(otherAreaName).click()
        cy.intercept('**/cqb-base-mgr/service/mgr/lab/page?labName=*').as('areaSearch')
        cy.get('button').contains('搜索').click()
        cy.wait('@areaSearch').then((xhr) => {
            let expectStatus = 200
            let responseStatus = xhr.response.statusCode
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').eq(1).find('tr').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
        cy.get('.el-table__body').eq(1).find('tr').then((data) => {
            let getLength = data.length
            for (let i = 0; i < getLength; i++) {
                cy.get('.el-table__body').eq(1).find('tr').eq(i).find('.cell').eq(area).should('contain', otherAreaName).and('not.contain', areaName)
            }
        })
        cy.get('input[placeholder="请选择省"]').click()
        cy.get('.el-select__caret.el-input__icon.el-icon-circle-close').click()
    })
    it('019-实验室账户-关键字搜索', () => {
        let labName = '佛山市第一人民医院'
        let lab = 3
        cy.get('input[placeholder="实验室名称或编码"]').clear().type(labName)
        cy.intercept('**/cqb-base-mgr/service/mgr/lab/page?labName=*').as('keywordSearch')
        cy.get('button').contains('搜索').click()
        cy.wait('@keywordSearch').then((xhr) => {
            let expectStatus = 200
            let responseStatus = xhr.response.statusCode
            let total = xhr.response.body.data.total
            expect(responseStatus).to.eq(expectStatus)
            if (total == 0) {
                cy.get('body').should('contain', '暂无数据')
            } else if (total <= 20) {
                cy.get('.el-table__body').eq(1).find('tr').should('have.length', total)
            } else {
                cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
            }
        })
        cy.get('.el-table__body').eq(1).find('tr').then((data) => {
            let getLength = data.length
            for (let i = 0; i < getLength; i++) {
                cy.get('.el-table__body').eq(1).find('tr').eq(i).find('.cell').eq(lab).should('contain', labName)
            }
        })

    })
    it('020-实验室账户-关联新冠质管', () => {
        let labName = 'UI测试实验室'
        let user = 8
        cy.get('input[placeholder="实验室名称或编码"]').clear().type(labName)
        cy.get('button').contains('搜索').click()
        cy.get('button').contains('New').click()
        cy.get('input[placeholder="请选择"]').last().click()
        cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains('COVID19_QC_WEIYI').click()
        cy.get('.el-input__inner').eq(user).type(1)
        cy.intercept('**/cqb-base-mgr/service/mgr/lab/addLabSysRela*').as('addLabSysRela')
        cy.get('button').contains('确定').click()
        cy.wait('@addLabSysRela').then((xhr) => {
            let expectStatus = 200
            let responseStatus = xhr.response.statusCode
            expect(responseStatus).to.eq(expectStatus)
            cy.get('.el-message.el-message--success').should('contain', '帐号关联已更新')
        })
        // 删除关联
        cy.wait(1000)
        cy.get('.el-table__row').eq(1).find('.ql-tag.el-tag.el-tag--medium').then((data) => {
            let getLength = data.length
            cy.get('.el-table__row').eq(1).find('.ql-tag.el-tag.el-tag--medium').contains('COVID19_QC_WEIYI').click({
                force: true
            })
            cy.get('button').contains('删除').click()
            cy.intercept('**/cqb-base-mgr/service/mgr/lab/delLabSysRela*').as('LabSysRela')
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
            cy.wait('@LabSysRela').then((xhr) => {
                let expectStatus = 200
                let responseStatus = xhr.response.statusCode
                expect(responseStatus).to.eq(expectStatus)
                cy.get('.el-table__row').eq(1).find('.ql-tag.el-tag.el-tag--medium').should('have.length', getLength - 1)
            })
        })
    })
    it('021-实验室账户-重置密码', () => {
        let labName = 'UI测试实验室'
        let newPassWord = 8
        let confirmPassWord = 9
        let confirmButton = 10
        cy.get('input[placeholder="实验室名称或编码"]').clear().type(labName)
        cy.get('button').contains('搜索').click()
        cy.get('button').contains('重置密码').click({
            force: true
        })
        //--------------新密码与确认密码输入不同不能进行保存-------------------
        cy.get('.el-input__inner').eq(newPassWord).clear().type('1234')
        cy.get('.el-input__inner').eq(confirmPassWord).clear().type('4567')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(confirmButton).click({
            force: true
        })
        cy.get('body').should('contain', '两次输入密码不一致!')
        //--------------新密码与确认密码输入相同可以保存-------------
        cy.get('.el-input__inner').eq(newPassWord).clear().type('1234')
        cy.get('.el-input__inner').eq(confirmPassWord).clear().type('1234')
        cy.intercept('**/cqb-base-mgr/service/mgr/lab/changePwd*').as('pwd')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(confirmButton).click({
            force: true
        })
        cy.wait('@pwd').then((xhr) => {
            let expectStatus = 200
            let responseStatus = xhr.response.statusCode
            expect(responseStatus).to.eq(expectStatus)
            cy.get('.el-message.el-message--success').should('contain', '密码修改成功！')
        })
        //--------------不填写密码保存正常-------------
        cy.get('button').contains('重置密码').click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--medium').eq(confirmButton).click({
            force: true
        })
        cy.wait('@pwd').then((xhr) => {
            let expectStatus = 200
            let responseStatus = xhr.response.statusCode
            expect(responseStatus).to.eq(expectStatus)
            cy.get('.el-message.el-message--success').should('contain', '密码修改成功！')
        })
    })
    it('022-实验室账户-批量编辑', () => {
        let typeWord = '测试'
        let userName = '明' + parseInt(Math.random() * 100000)
        let phoneNumber = parseInt(Math.random() * 100000)
        let editName = 21
        let editPhone = 22
        cy.get('input[placeholder="实验室名称或编码"]').clear().type(typeWord)
        cy.get('button').contains('搜索').click()
        cy.get('.el-checkbox__inner').eq(1).click({
            force: true
        })
        cy.get('.el-checkbox__inner').eq(2).click({
            force: true
        })
        cy.get('button').contains('批量编辑').click()
        cy.get('.el-checkbox-group').find('span').contains('联系人').click()
        cy.get('.el-checkbox-group').find('span').contains('联系电话').click()
        cy.get('.el-input__inner').eq(15).type(userName)
        cy.get('.el-input__inner').last().type(phoneNumber)
        cy.intercept('**/cqb-base-mgr/service/mgr/lab/updateBatch*').as('edit')
        cy.get('button').contains('保存').click()
        cy.wait('@edit').then((xhr) => {
            let expectStatus = 200
            let responseStatus = xhr.response.statusCode
            expect(responseStatus).to.eq(expectStatus)
            cy.get('.el-message.el-message--success').should('contain', '实验室已批量更新')
        })
        for (let i = 0; i < 2; i++) {
            cy.get('.el-table__body').eq(1).find('tr').eq(i).find('button').contains('编辑').click({
                force: true
            })
            //联系人
            cy.get('.el-input__inner').eq(editName).should('have.value', userName)
            //联系电话
            cy.get('.el-input__inner').eq(editPhone).should('have.value', phoneNumber)
            cy.get('.el-button.el-button--default.el-button--medium').last().click({
                force: true
            })
        }
    })
})