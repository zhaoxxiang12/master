context('信息互通设置-推送设置', () => {
    let urlHost = 'http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html'
    beforeEach(() => {
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/setting/message-setting/push-setting')
    })
    it('001-新建失控告警规则(未上报质控数据)-消息内容为空不能保存', () => {
        cy.wait(1000)
        let TimeIndex = 2
        let TimeBoxIndex = 3
        let LabIndex = 1
        let ChoiceIndex = 0
        let ChooseTime = 0
        let ButtonIndex = 2
        //点击添加
        cy.get('.el-button.el-button--primary.el-button--medium.is-plain').click({
            force: true
        })
        //选择检测时间-00：00
        cy.get('.el-input__inner').eq(TimeBoxIndex).click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(TimeIndex).find('li').eq(ChooseTime).click({
            force: true
        })
        // 发送对象选择实验室端
        cy.get('.el-checkbox-group').eq(LabIndex).find('.el-checkbox>.el-checkbox__input').eq(ChoiceIndex).click({
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(ButtonIndex).click({
            force: true
        })
        // 断言(界面请选择消息内容则通过)
        cy.get('body').should('contain', '请选择消息内容')
    })
    it('002-新建失控告警规则(未上报质控数据)-检测时间为空不能保存', () => {
        cy.wait(1000)
        let SelectIndex = 2
        let MessageIndex = 1
        let NotReportedIndex = 2
        let LabIndex = 1
        let ChoiceIndex = 0
        let ButtonIndex = 2
        //点击添加
        cy.get('.el-button.el-button--primary.el-button--medium.is-plain').click({
            force: true
        })
        //点击消息内容(设置消息)
        cy.get('input[placeholder="请选择"]').eq(MessageIndex).click({
            force: true
        })
        //选择消息内容-未上报
        cy.get('.el-select-dropdown__wrap.el-scrollbar__wrap').eq(SelectIndex).find('li').eq(NotReportedIndex).click({
            force: true
        })
        //发送对象选择实验室端
        cy.get('.el-checkbox-group').eq(LabIndex).find('.el-checkbox>.el-checkbox__input').eq(ChoiceIndex).click({
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(ButtonIndex).click({
            force: true
        })
        // 断言(界面请选择检测时间则通过)
        cy.get('body').should('contain', '请选择检测时间')

    })
    it('003-新建失控告警规则(未上报质控数据)-未选择发送对象不能保存', () => {
        cy.wait(1000)
        let SelectIndex = 2
        let MessageIndex = 1
        let NotReportedIndex = 2
        let TimeIndex = 0
        let TimeBoxIndex = 1
        let ButtonIndex = 2
        //点击添加
        cy.get('.el-button.el-button--primary.el-button--medium.is-plain').click({
            force: true
        })
        //点击消息内容(设置消息)
        cy.get('input[placeholder="请选择"]').eq(MessageIndex).click({
            force: true
        })
        //选择消息内容-未上报
        cy.get('.el-select-dropdown__wrap.el-scrollbar__wrap').eq(SelectIndex).find('li').eq(NotReportedIndex).click({
            force: true
        })
        //选择检测时间-00：00
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(TimeBoxIndex).find('li').eq(TimeIndex).click({
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(ButtonIndex).click({
            force: true
        })
        // 断言(界面出现请选择发送对象则通过)
        cy.get('body').should('contain', '请选择发送对象')

    })
    it('004-新建失控告警规则-未上报质控数据', () => {
        cy.wait(1000)
        let SelectIndex = 2
        let MessageIndex = 1
        let NotReportedIndex = 2
        let TimeIndex = 0
        let TimeBoxIndex = 1
        let LabIndex = 1
        let ChoiceIndex = 0
        let ButtonIndex = 2
        //点击添加
        cy.get('.el-button.el-button--primary.el-button--medium.is-plain').click({
            force: true
        })
        //点击消息内容(设置消息)
        cy.get('input[placeholder="请选择"]').eq(MessageIndex).click({
            force: true
        })
        //选择消息内容-未上报
        cy.get('.el-select-dropdown__wrap.el-scrollbar__wrap').eq(SelectIndex).find('li').eq(NotReportedIndex).click({
            force: true
        })
        //选择检测时间-00：00
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(TimeBoxIndex).find('li').eq(TimeIndex).click({
            force: true
        })
        //发送对象选择实验室端
        cy.get('.el-checkbox-group').eq(LabIndex).find('.el-checkbox>.el-checkbox__input').eq(ChoiceIndex).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/message/rules?*').as('getData')
        cy.visit(urlHost + '#/setting/message-setting/push-setting')
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(ButtonIndex).click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let status = 200
            expect(xhr.status).to.equal(status)

        })
        // 断言(界面出现自动推送规则已添加则通过)
        cy.get('body').should('contain', '自动推送规则已添加')

    })
    it('005-删除失控告警规则-未上报质控数据', () => {
        // 强制等待防止元素找错
        cy.wait(1000)
        //点击删除
        cy.get('.el-table__fixed-body-wrapper').find('table>tbody>.el-table__row').eq(9).find('.el-button.el-button--text.el-button--medium').eq(1).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/message/rules?*').as('getData')
        cy.visit(urlHost + '#/setting/message-setting/push-setting')
        //点击确认删除
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let status = 200
            expect(xhr.status).to.equal(status)
        })

    })
    it('006-新建失控告警规则(项目失控)-消息内容为空不能保存', () => {
        cy.wait(1000)
        let LabIndex = 1
        let ChoiceIndex = 0
        let ButtonIndex = 2
        let Warnning = 1
        let PushIndex = 0
        //点击添加
        cy.get('.el-button.el-button--primary.el-button--medium.is-plain').click({
            force: true
        })
        //选择项目失控
        cy.get('.el-radio__inner').eq(Warnning).click({
            force: true
        })
        //推送形式选择实时推送
        cy.get('.el-checkbox__input').eq(PushIndex).click({
            force: true
        })
        // 发送对象选择实验室端
        cy.get('.el-checkbox-group').eq(LabIndex).find('.el-checkbox>.el-checkbox__input').eq(ChoiceIndex).click({
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(ButtonIndex).click({
            force: true
        })
        // 断言(界面出现请选择消息内容则通过)
        cy.get('body').should('contain', '请选择消息内容')
    })
    it('007-新建失控告警规则(项目失控)-推送形式选择定时推送,未选择检测时间不能保存', () => {
        cy.wait(1000)
        let LabIndex = 1
        let ChoiceIndex = 0
        let ButtonIndex = 2
        let Warnning = 1
        let PushIndex = 1
        let MessageIndex = 1
        let IteamOutOfControl = 4
        let SelectIndex = 1
        //点击添加
        cy.get('.el-button.el-button--primary.el-button--medium.is-plain').click({
            force: true
        })
        //选择项目失控
        cy.get('.el-radio__inner').eq(Warnning).click({
            force: true
        })
        //点击消息内容(设置消息)
        cy.get('input[placeholder="请选择"]').eq(MessageIndex).click({
            force: true
        })
        //选择消息内容-未上报
        cy.get('.el-select-dropdown__wrap.el-scrollbar__wrap').eq(SelectIndex).find('li').eq(IteamOutOfControl).click({
            force: true
        })
        //推送形式选择实时推送
        cy.get('.el-checkbox__input').eq(PushIndex).click({
            force: true
        })
        // 发送对象选择实验室端
        cy.get('.el-checkbox-group').eq(LabIndex).find('.el-checkbox>.el-checkbox__input').eq(ChoiceIndex).click({
            force: true
        })
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(ButtonIndex).click({
            force: true
        })
        // 断言(界面出现请选择消息内容则通过)
        cy.get('body').should('contain', '请选择检测时间')
    })
    it('008-新建失控告警规则-检测目标(指定实验室)未选择不能保存', () => {
        cy.wait(1000)
        let SelectIndex = 2
        let MessageIndex = 1
        let NotReportedIndex = 2
        let TimeIndex = 0
        let TimeBoxIndex = 1
        let LabIndex = 1
        let ChoiceIndex = 0
        let DesignatedLabIndex = 10
        let ButtonIndex = 2
        //点击添加
        cy.get('.el-button.el-button--primary.el-button--medium.is-plain').click({
            force: true
        })
        //点击消息内容(设置消息)
        cy.get('input[placeholder="请选择"]').eq(MessageIndex).click({
            force: true
        })
        //选择消息内容-未上报
        cy.get('.el-select-dropdown__wrap.el-scrollbar__wrap').eq(SelectIndex).find('li').eq(NotReportedIndex).click({
            force: true
        })
        //选择检测时间-00：00
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(TimeBoxIndex).find('li').eq(TimeIndex).click({
            force: true
        })
        //发送对象选择实验室端
        cy.get('.el-checkbox-group').eq(LabIndex).find('.el-checkbox>.el-checkbox__input').eq(ChoiceIndex).click({
            force: true
        })
        // 检测目标选择指定实验室
        cy.get('.el-radio__inner').eq(DesignatedLabIndex).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--medium').eq(ButtonIndex).click({
            force: true
        })
        //断言(界面出现请选择检测目标则通过)
        cy.get('body').should('contain', '请选择检测目标')
    })
    it('009-新建失控告警规则-检测目标选择后正常保存', () => {
        cy.wait(1000)
        let SelectIndex = 2
        let MessageIndex = 1
        let NotReportedIndex = 2
        let TimeIndex = 0
        let TimeBoxIndex = 1
        let LabIndex = 1
        let ChoiceIndex = 0
        let DesignatedLabIndex = 9
        let TypeIndex = 0
        let ButtonIndex = 1
        let AddLabButton = 8
        let ChooseLab = 3
        let DeleteButton = 9
        let DeleteIndex = 1
        //点击添加
        cy.get('.el-button.el-button--primary.el-button--medium.is-plain').click({
            force: true
        })
        //点击消息内容(设置消息)
        cy.get('input[placeholder="请选择"]').eq(MessageIndex).click({
            force: true
        })
        //选择消息内容-未上报
        cy.get('.el-select-dropdown__wrap.el-scrollbar__wrap').eq(SelectIndex).find('li').eq(NotReportedIndex).click({
            force: true
        })
        //选择检测时间-00：00
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(TimeBoxIndex).find('li').eq(TimeIndex).click({
            force: true
        })
        //发送对象选择实验室端
        cy.get('.el-checkbox-group').eq(LabIndex).find('.el-checkbox>.el-checkbox__input').eq(ChoiceIndex).click({
            force: true
        })
        // 检测目标选择指定实验室
        cy.get('.el-radio__inner').eq(DesignatedLabIndex).click({
            force: true
        })
        //点击添加
        cy.get('.el-button.ql-select-lab__new.el-button--text.el-button--mini').click({
            force: true
        })
        cy.get('input[placeholder="请输入实验室名称或编码"]').eq(TypeIndex).type("gd18020")
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.get('.el-checkbox__inner').eq(ChooseLab).click({
            force: true
        })
        cy.get('.el-button.el-button--primary.el-button--medium').eq(AddLabButton).click({
            force: true
        })
        // cy.wait(1000)
        cy.server()
        cy.route('**/service/mgr/message/rules?*').as('getData')
        cy.visit(urlHost + '#/setting/message-setting/push-setting')
        //点击保存
        cy.get('.el-button.el-button--primary.el-button--medium').eq(ButtonIndex).click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let status = 200
            //断言 判断请求是否发送成功(200)
            expect(xhr.status).to.equal(status)
        })
        // 断言(界面出现自动推送规则已添加则通过)
        cy.get('body').should('contain', '自动推送规则已添加')
        //执行删除操作防止后面或者下次运行执行失败
        //点击删除
        cy.get('.el-table__fixed-body-wrapper').find('table>tbody>.el-table__row').eq(DeleteButton).find('.el-button.el-button--text.el-button--medium').eq(DeleteIndex).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/message/rules?*').as('getData')
        cy.visit(urlHost + '#/setting/message-setting/push-setting')
        //点击确认删除
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
            force: true
        })
        cy.wait('@getData').then((xhr) => {
            let status = 200
            expect(xhr.status).to.equal(status)
        })

    })
    it('010失控告警规则-启用/停用', () => {
        cy.wait(1000)
        let TurnOnOff = 0
        let index = 2
        let text;
        // 获取按钮文字
        cy.get('.el-table__fixed-body-wrapper').find('table>tbody>.el-table__row').eq(TurnOnOff).find('.el-button.el-button--text.el-button--medium').eq(index).invoke('text').then((data) => {
            text = data
            //判断文字是否是启用,启用执行if语句,否则执行else语句
            if (text == '启用') {
                cy.get('.el-table__fixed-body-wrapper').find('table>tbody>.el-table__row').eq(TurnOnOff).find('.el-button.el-button--text.el-button--medium').eq(index).click({
                    force: true
                })
                cy.server()
                cy.route('**/service/mgr/message/rules?*').as('getData')
                cy.visit(urlHost + '#/setting/message-setting/push-setting')
                cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click({
                    force: true
                })
                cy.wait('@getData').then((xhr) => {
                    let status = xhr.status
                    //断言状态码
                    expect(status).to.equal(200)
                    //断言界面启用按键是否变为停用
                    cy.get('.el-table__fixed-body-wrapper').find('table>tbody>.el-table__row').eq(TurnOnOff).find('.el-button.el-button--text.el-button--medium').eq(index).should('have.text', '停用')
                })
            } else if (text == '停用') {
                cy.get('.el-table__fixed-body-wrapper').find('table>tbody>.el-table__row').eq(TurnOnOff).find('.el-button.el-button--text.el-button--medium').eq(index).click({
                    force: true
                })
                cy.server()
                cy.route('**/service/mgr/message/rules?*').as('getData')
                cy.visit(urlHost + '#/setting/message-setting/push-setting')
                cy.get('.el-button.el-button--default.el-button--small.el-button--primary ').click({
                    force: true
                })
                cy.wait('@getData').then((xhr) => {
                    let status = xhr.status
                    //断言状态码
                    expect(status).to.equal(200)
                    //断言界面停用按键是否变为启用
                    cy.get('.el-table__fixed-body-wrapper').find('table>tbody>.el-table__row').eq(TurnOnOff).find('.el-button.el-button--text.el-button--medium').eq(index).should('have.text', '启用')
                })

            } else {
                cy.log('文本为其他数据')
            }
        })

    })
    it('011-失控告警规则-编辑失控规则', () => {
        let index = 0
        let ButtonIndex = 2
        let NotReportedIndex = 0
        let ChooseIndex = 0
        let IteamOutOfControl = 1
        let time = 2
        let dropList = 2
        let body = 0
        cy.wait(1000)
        cy.get('.el-table__body').eq(0).find('.el-table__row').then((data) => {
            let getLength = data.length
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 1).find('.el-button.el-button--text.el-button--medium').eq(index).click({
                force: true
            })
            cy.wait(500)
            // 选择未上报质控数据
            cy.get('.el-radio__inner').eq(NotReportedIndex).click({
                force: true
            })
            cy.wait(500)
            cy.get('input[placeholder="请选择"]').eq(time).click({
                force: true
            })
            //选择检测时间
            cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(0).click({
                force: true
            })
            cy.server()
            cy.route('**/service/mgr/message/rules?*').as('getData')
            cy.visit(urlHost + '#/setting/message-setting/push-setting')
            //点击保存
            cy.get('.el-button.el-button--primary.el-button--medium').eq(ButtonIndex).click({
                force: true
            })
            cy.wait('@getData').then((xhr) => {
                let ExpectStatus = 200
                let ResponseStatus = xhr.status
                expect(ResponseStatus).to.equal(ExpectStatus)
            })
            cy.get('body').should('contain', '自动推送规则已更新')
            // 选择项目失控
            cy.get('.el-table__body').eq(body).find('.el-table__row').eq(getLength - 1).find('.el-button.el-button--text.el-button--medium').eq(index).click({
                force: true
            })
            cy.wait(1000)
            cy.get('.el-radio__inner').eq(IteamOutOfControl).click({
                force: true
            })
            cy.get('.el-checkbox__inner').eq(ChooseIndex).click({
                force: true
            })
            //点击保存
            cy.get('.el-button.el-button--primary.el-button--medium').eq(ButtonIndex).click({
                force: true
            })
        })
    })
})