context('互认标准设置',() => {
    beforeEach(() => {
        cy.loginCQB()
    })

    // it('cqb-001-互认标准设置-添加标准-添加定量项目标准',() => {
    //     cy.server()
    //     cy.route('**/service/mgr/std/yearrecog/list*').as('getList')
    //     cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
    //     cy.wait('@getList').then((xhr) => {
    //         //点击添加标准按钮
    //         cy.get('.el-card__body').find('.el-icon-plus').click()
    //         //输入标准名称
    //         let standardName = Math.ceil(Math.random() * 1000)
    //         cy.get('label[for="stdName"] + div').find('.el-input__inner').type('标准' + standardName)
    //         //点击规则设置
    //         cy.get('tbody > tr').eq(5).find('button').click()
    //         //输入阈值标准
    //         cy.get('.mutual-rule-double').find('input[placeholder="0 < 阈值 < 100"]').type('2.5')
    //         //点击连续合格月数下拉框
    //         cy.get('input[placeholder="连续合格月数"]').eq(0).click({ force: true })
    //         //下拉选择月数--选择2
    //         cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq('1').click() 
    //         //点击合格判定规则  下拉框       
    //         cy.get('input[placeholder="合格判定规则"]').click({ force: true })
    //         //CV%判定规则选择
    //         cy.get('.el-scrollbar__view.el-select-dropdown__list').contains('有一个批号的CV%通过则算通过').click()
    //         //勾选‘部中心EQA合格次数’复选框
    //         cy.get('label[for="partEqaPassTimes"]').find('input[type="checkbox"]').eq(0).click({force: true})
    //         //点击部中心‘不判定’下拉框
    //         cy.get('input[placeholder="不判定"]').first().click()
    //         //下拉框选择次数   选择3次     
    //         cy.get('.el-select-dropdown__wrap.el-scrollbar__wrap').eq(9).find('li').eq('2').click()        
    //         //点击规则设置弹窗中的‘保存’按钮
    //         cy.get('.el-dialog__footer').eq(6).find('button').eq(7).click({force: true})
    //         //点击最外层弹窗的‘保存’按钮
    //         cy.get('.el-dialog__footer').find('button').eq(5).click({force: true})
    //         // // 关闭提示弹窗
    //         cy.get('.el-message-box__btns').find('button').contains('确定').click({force: true})
    //     })  
    // })

    // it('cqb-002-互认标准设置-删除标准',() => {
    //     cy.server()
    //     cy.route('**/service/mgr/std/yearrecog/list*').as('getList')
    //     cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
    //     cy.wait('@getList').then((xhr) => {
    //     //点击添加标准按钮
    //         cy.get('.el-card.sd-cfg__item.is-hover-shadow').eq(1).get('button').eq(5).click()
    //         cy.get('.el-message-box__btns').find('button').contains('删除').click()
    //     })  
    // })

    it('cqb-003-互认标准设置-添加标准-批量设置规则',() => {
        cy.server()
        cy.route('**/service/mgr/std/yearrecog/list*').as('getList')
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
        cy.wait('@getList').then((xhr) => {
            //点击添加标准按钮
            cy.get('.el-card__body').find('.el-icon-plus').click()
            //输入标准名称
            let standardName = Math.ceil(Math.random() * 1000)
            cy.get('label[for="stdName"] + div').find('.el-input__inner').type('标准' + standardName)
            //点击复选框（选择几个项目设置规则）
            cy.get('tbody > tr').eq(6).find('.el-checkbox__inner').click()
            cy.get('tbody > tr').eq(7).find('.el-checkbox__inner').click()
            //点击批量设置按钮
            cy.get('.el-icon-edit').click()
            //设置阈值标准2.5
            cy.get('input[placeholder="不覆盖当前值"]').eq(0).type('2.5')
            //设置连续合格月数
            cy.get('input[placeholder="不覆盖当前值"]').eq(1).click()
            //下拉选择月份2
            cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq('2').click({force: true})
            //点击‘CV%判定规则’下拉框
            cy.get('input[placeholder="不覆盖当前值"]').eq(2).click()
            //下拉选择CV判定规则，选第一个（选择不同规则，修改最后一个eq里面的参数）
            cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click({force: true})
            //点击选择部中复选框
            cy.get('label[for="partEqaPassTimes"]').find('.el-checkbox__label').click()
            //点击部中心下拉框
            cy.get('input[placeholder="不覆盖当前值"]').eq(3).click()
            //部级选择次数，2次
            cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click({force: true})
            //设置工作日上报率
            cy.get('label[for="workDayRepRate"] + div').find('input[placeholder="不覆盖当前值"]').type('100')
            //设置消息读取率
            cy.get('label[for="messageReadRate"] + div').find('input[placeholder="不覆盖当前值"]').type('90')
            //设置失控纠正率
            cy.get('label[for="itemCorrectRate"] + div').find('input[placeholder="不覆盖当前值"]').type('90')
            //设置工作日上报的合格月数  //选择合格月数-次数-2次(选择多少次修改最后一个eq里面的参数)
            cy.get('label[for="workDayPassTimes"] + div').find('input[placeholder="不覆盖当前值"]').click()          
            cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click()
            //设置消息读取率的合格月数  //选择消息读取率次数-2次(选择多少次修改最后一个eq里面的参数)
            cy.get('label[for="messageReadPassTimes"] + div').find('input[placeholder="不覆盖当前值"]').click()           
            cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click()
            //设置消息读取率的合格月数  //选择消息读取率次数-2次(选择多少次修改最后一个eq里面的参数)
            cy.get('label[for="itemCorrectPassTimes"] + div').find('input[placeholder="不覆盖当前值"]').click()           
            cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click()
            //点击关闭规则设置弹窗底部保存按钮
            cy.get('.el-dialog__footer').eq(7).find('button').eq(1).click({force: true})
            //关闭弹窗
            cy.get('.el-message-box__btns').find('button').eq(1).click({force: true})
            //点击‘添加’按钮添加实验室
            cy.get('.el-button.ql-select-lab__new.el-button--text.el-button--mini').click()
            //搜索框输入关键字yl0011
            cy.get('input[placeholder="请输入实验室名称或编码"]').eq(0).type('yl0011')
            //点击搜索按钮
            cy.get('button[type="submit"]').eq(0).click()
            cy.wait(500)
            //点击复选框
            cy.get('.el-checkbox__input').eq(16).click({force: true})
            //点击‘保存’按钮
            cy.get('.el-dialog__footer').find('button').eq(18).click()         
            //保存关闭最外层的弹窗
            cy.get('.el-dialog__footer').eq(2).find('button').contains('保存').click({force: true})
            //关闭提示弹窗
            cy.get('.el-message-box__btns').find('button').eq(1).click({force: true})
        })  
    })

    // it('cqb-0119-互认标准设置-添加标准-批量设置规则-不限项目',() => {
    //     cy.server()
    //     cy.route('**/service/mgr/std/yearrecog/list*').as('getList')
    //     cy.visit(host + '/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-standard')
    //     cy.wait('@getList').then((xhr) => {
    //         //点击添加标准按钮
    //         cy.get('.el-card__body').find('.el-icon-plus').click()
    //         //输入标准名称
    //         let standardName = Math.ceil(Math.random() * 1000)
    //         cy.get('label[for="stdName"] + div').find('.el-input__inner').type('标准' + standardName)
    //         //点击复选框（选择几个项目设置规则）
    //         cy.get('tbody > tr').eq(0).find('.el-checkbox__inner').click()
    //         cy.get('tbody > tr').eq(1).find('.el-checkbox__inner').click()
    //         cy.get('tbody > tr').eq(2).find('.el-checkbox__inner').click()
    //         //点击批量设置按钮
    //         cy.get('.el-icon-edit').click()
    //         //设置阈值标准2.5
    //         cy.get('input[placeholder="不覆盖当前值"]').eq(0).type('2.5')
    //         //设置连续合格月数
    //         cy.get('input[placeholder="不覆盖当前值"]').eq(1).click()
    //         //下拉选择月份3
    //         cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq('2').click({force: true})
    //         //点击‘CV%判定规则’下拉框
    //         cy.get('input[placeholder="不覆盖当前值"]').eq(2).click()
    //         //下拉选择CV判定规则，选第一个（选择不同规则，修改最后一个eq里面的参数）
    //         cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(18).find('li').eq(1).click({force: true})
    //         //点击选择部中复选框
    //         cy.get('label[for="partEqaPassTimes"]').eq(0).find('.el-checkbox__label').click()           
    //         //点击部中心下拉框
    //         cy.get('input[placeholder="不覆盖当前值"]').eq(5).click({force: true})

    //         //部级选择次数，2次
    //         cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click({force: true})
    // //设置工作日上报率
    // cy.get('label[for="workDayRepRate"] + div').find('input[placeholder="不覆盖当前值"]').type('100')
    // //设置消息读取率
    // cy.get('label[for="messageReadRate"] + div').find('input[placeholder="不覆盖当前值"]').type('90')
    // //设置失控纠正率
    // cy.get('label[for="itemCorrectRate"] + div').find('input[placeholder="不覆盖当前值"]').type('90')
    // //设置工作日上报的合格月数  //选择合格月数-次数-2次(选择多少次修改最后一个eq里面的参数)
    // cy.get('label[for="workDayPassTimes"] + div').find('input[placeholder="不覆盖当前值"]').click()          
    // cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click()
    // //设置消息读取率的合格月数  //选择消息读取率次数-2次(选择多少次修改最后一个eq里面的参数)
    // cy.get('label[for="messageReadPassTimes"] + div').find('input[placeholder="不覆盖当前值"]').click()           
    // cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click()
    // //设置消息读取率的合格月数  //选择消息读取率次数-2次(选择多少次修改最后一个eq里面的参数)
    // cy.get('label[for="itemCorrectPassTimes"] + div').find('input[placeholder="不覆盖当前值"]').click()           
    // cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(9).find('li').eq(1).click()
    // //点击关闭规则设置弹窗底部保存按钮
    // cy.get('.el-dialog__footer').eq(7).find('button').eq(1).click({force: true})
    // //关闭弹窗
    // cy.get('.el-message-box__btns').find('button').eq(1).click({force: true})
    // //点击‘添加’按钮添加实验室
    // cy.get('.el-button.ql-select-lab__new.el-button--text.el-button--mini').click()
    // //搜索框输入关键字yl0011
    // cy.get('input[placeholder="请输入实验室名称或编码"]').eq(0).type('yl0011')
    // //点击搜索按钮
    // cy.get('button[type="submit"]').eq(0).click()
    // cy.wait(500)
    // //点击复选框
    // cy.get('.el-checkbox__input').eq(16).click({force: true})
    // //点击‘保存’按钮
    // cy.get('.el-dialog__footer').find('button').eq(18).click()         
    // //保存关闭最外层的弹窗
    // cy.get('.el-dialog__footer').eq(2).find('button').contains('保存').click({force: true})
    // //关闭提示弹窗
    // cy.get('.el-message-box__btns').find('button').eq(1).click({force: true})

    //     })  
    // })

    
})