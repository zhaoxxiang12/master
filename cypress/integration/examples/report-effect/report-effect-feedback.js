context('信息反馈情况', () => {
    let totalMsg = [],
        notReportedMsg = [],
        outControlMsg = [],
        outControlCVMsg = [],
        labName
    let urlHost = 'http://cqb-mgr.sh.test.sh-weiyi.com/cqb-base-mgr-fe/app.html'
    beforeEach(() => {
        cy.loginCQB()
        let dateIndex = 1
        let monthIndex = 4
        let MayIndex = 0
        let yearIndex = 0
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-effect/report-effect-feedback')
        //点击管理机构下拉框
        cy.get('[placeholder="请选择管理机构"]').click({
            force: true
        })
        //选择广东省临床检验中心
        cy.get('[title="佛山市临床检验质量控制中心"]').click({
            force: true
        })
        //选择开始月份
        cy.get('[placeholder="起始时间"]').eq(dateIndex).click({
            force: true
        })
        // 获取界面当前年份
        cy.get('.el-date-picker__header-label').eq(yearIndex).invoke('text').then((text) => {
            let currentYear = parseInt(text.slice(0, 4))
            let expectYear = 2020
            let endbutton = 0
            let endTime = 1
            let difference = Math.abs(currentYear - expectYear)
            if (difference == 0) {
                //开始月份选择5月
                cy.get('.el-month-table').find('tr').find('td').eq(monthIndex).click()
                //点击结束时间选择框
                cy.get('[placeholder="结束时间"]').eq(dateIndex).click({
                    force: true
                })
                //结束月份选择5月
                cy.get('.el-month-table').find('tr').eq(4).find('td').eq(MayIndex).click({
                    force: true
                })
                //点击搜索
                cy.get('button').contains('搜索').click()
            } else {
                for (let i = 1; i <= difference; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click()
                }
                //开始月份选择5月
                cy.get('.el-month-table').find('tr').find('td').eq(monthIndex).click()
            }
            // 结束时间
            if (difference == 0) {
                //结束月份选择5月
                cy.get('.el-month-table').find('tr').eq(4).find('td').eq(MayIndex).click({
                    force: true
                })
            } else {
                cy.get('input[placeholder="结束时间"]').eq(endbutton).click({
                    force: true
                })
                for (let i = 1; i <= difference; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').eq(endTime).click({
                        force: true
                    })
                }
                //结束月份选择5月    
                cy.get('.el-month-table').find('tr').eq(4).find('td').eq(MayIndex).click({
                    force: true
                })
                //点击搜索
                cy.get('button').contains('搜索').click({
                    force: true
                })
            }
        })

    })
    it('001-信息反馈情况-获取页面数据', () => {
        let firstLabIndex = 7 //佛山市顺德区中医院在td下的下标
        let secondLabIndex = 16 //佛山市三水区疾病防治所
        let totalMsgIndex = 1
        let notReportedIndex = 2
        let outControlIndex = 3
        let outControlCVIndex = 4
        let labNameIndex = 0
        //获取总发消息数(佛山市顺德区中医院)
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(firstLabIndex).find('td').eq(totalMsgIndex).invoke('text')
            .then((text) => {
                totalMsg.push(text)
            })
        //获取未上报消息数(佛山市顺德区中医院)
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(firstLabIndex).find('td').eq(notReportedIndex).invoke('text')
            .then((text) => {
                notReportedMsg.push(text)
            })
        //获取失控消息数(佛山市顺德区中医院)
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(firstLabIndex).find('td').eq(outControlIndex).invoke('text')
            .then((text) => {
                outControlMsg.push(text)
            })
        //获取CV/符合率失控(佛山市顺德区中医院)
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(firstLabIndex).find('td').eq(outControlCVIndex).invoke('text')
            .then((text) => {
                outControlCVMsg.push(text)
            })
        //获取总发消息数(佛山市三水区疾病防治所)
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(secondLabIndex).find('td').eq(totalMsgIndex).invoke('text')
            .then((text) => {
                totalMsg.push(text)
            })
        //获取未上报消息数(佛山市三水区疾病防治所)
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(secondLabIndex).find('td').eq(notReportedIndex).invoke('text')
            .then((text) => {
                notReportedMsg.push(text)
            })
        //获取失控消息数(佛山市三水区疾病防治所)
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(secondLabIndex).find('td').eq(outControlIndex).invoke('text')
            .then((text) => {
                outControlMsg.push(text)
            })
        //获取CV/符合率失控(佛山市三水区疾病防治所)
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(secondLabIndex).find('td').eq(outControlCVIndex).invoke('text')
            .then((text) => {
                outControlCVMsg.push(text)
            })
        //获取实验室名称
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(secondLabIndex).find('td').eq(labNameIndex).invoke('text')
            .then((text) => {
                labName = text
            })
    })
    it('002-信息反馈情况-总消息数等于失控+未上报+CV/符合率失控', () => {
        let totalMsgIndex = 1
        let labIndex = 7
        //失控、未上报、CV/符合率失控进行相加
        let totalData = parseInt(notReportedMsg[0]) + parseInt(outControlCVMsg[0]) + parseInt(outControlMsg[0])
        //整数转字符串
        totalData = totalData.toString()
        // cy.log(typeof total_Data)
        //断言(判断)
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(labIndex).find('td').eq(totalMsgIndex)
            .should('have.text', totalData)
    })
    it('003-信息反馈情况-总消息数为零时，消息读取率和失控纠正率未100%', () => {
        //断言(总消息数为零时，失控纠正率是否为零)
        let rate = '100%'
        let labNameIndex = 16
        let msgReadRateIndex = 5
        let outControlIndex = 6
        cy.log(labName + '总消息数为' + totalMsg[1])
        cy.wait(1000)
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(labNameIndex).find('td').eq(msgReadRateIndex)
            .should('have.text', rate)
        //断言(总消息数为零时，失控纠正率是否为零)
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(labNameIndex).find('td').eq(outControlIndex)
            .should('have.text', rate)
    })
    it('004-信息反馈情况-在输入框输入实验室编码或者名称可以模糊匹配', () => {
        let labName = '佛山市顺德区慢性病防治中心'
        let typeName = '佛山市第二人民医院'
        let labCode = 'gd18020'
        //搜索输入框输入实验室代码
        cy.get('[placeholder="请输入实验室名称或编码"]').type(labCode)
        //断言
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').should('contain', labName)
        //搜索输入框输入实验室名称
        cy.get('[placeholder="请输入实验室名称或编码"]').clear().type(typeName)
        //断言
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').should('contain', typeName)
    })
    it('005-信息反馈情况-显示字段-取消勾选某个字段', () => {
        cy.wait(1000)
        cy.get('button').contains('显示字段').click()
        //取消勾选实验室
        cy.get('.print-tool__columns').find('li').then((getData) => {
            let tagLength = getData
            let realLength = tagLength.length
            // cy.log(tagLength)
            // cy.log(realLength)
            cy.get('.print-tool__columns').find('li>label').eq(0).get('[aria-checked="true"]').then((getSecondData) => {
                let secondTagLength = getSecondData
                let secondRealLength = secondTagLength.length
                // 使用for循环遍历勾选/取消勾选字段
                for (var i = 0, j = secondRealLength - 1; i < realLength, j >= Math.abs(secondRealLength - realLength); i++, j--) {
                    //取消勾选某个字段
                    cy.get('.print-tool__columns').find('li>label>span').find('.el-checkbox__inner').eq(i).click()
                    //断言(取消勾选某个字段后，aria-checked="true"会自减一)
                    cy.get('.print-tool__columns').find('li>label').eq(0).get('[aria-checked="true"]').should('have.length', j)
                }
            })
        })
    })
    it('006-信息反馈情况-使用地区进行搜索(选择贵州省)', () => {
        let areaIndex = 0
        let boxIndex = 4
        let guizhouProvinceIndex = 2
        let guizhouIndex = 1
        //点击地区
        cy.get('.el-radio__inner').eq(areaIndex).click()
        //点击省选择框
        cy.get('[placeholder="请选择省"]').click()
        //选择贵州省
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(boxIndex).find('li').eq(guizhouProvinceIndex).click()
        //点击搜索
        // cy.get('button').contains('搜索').click()
        cy.server()
        cy.route('**/service/mgr/evaReport/messFeedback?*').as('getLabdata')
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-feedback')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(0).click({
            force: true
        })
        // 从接口获取实验室名称并进行断言
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data).then((data) => {
                let labName = data[0]
                labName = labName['labName']
                // cy.log(labName)
                //断言
                cy.get('body').should('contain', labName)
            })
        })
    })
    it('007-信息反馈情况-切换质控主管单位(青浦医联体)', () => {
        //清除之前的选择
        cy.get('.el-tag__close.el-icon-close').click({
            force: true
        })
        //点击管理机构下拉框
        cy.get('[placeholder="请选择管理机构"]').click({
            force: true
        })
        //选择贵州省临床检验中心
        cy.get('.el-tree-node__children').find('.el-tree-node.is-focusable').find('[title="青浦医联体"]').click({
            force: true
        })
        cy.get('button').contains('搜索').click()
        cy.server()
        cy.route('**/service/mgr/evaReport/messFeedback?*').as('getLabdata')
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-feedback')
        cy.get('button').contains('搜索').click()
        // 从接口获取实验室名称并进行断言
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data).then((data) => {
                let labName = data[0]
                labName = labName['labName']
                // cy.log(labName)
                //断言
                cy.get('body').should('contain', labName)
            })
        })
    })
    it('008-信息反馈情况-使用标签进行搜索查询(标签选择广西)', () => {
        let tagIndex = 2 //实验室标签下标
        let systemTag = 7
        let GuangxiTag = 5
        let labNameIndex = 0
        //点击实验室标签
        cy.get('.el-radio__inner').eq(tagIndex).click()
        //点击标签选择框
        cy.get('[placeholder="请选择实验室标签"]').click({
            force: true
        })
        //标签选择广西
        cy.get('.el-select-group').eq(systemTag).find('li').eq(GuangxiTag).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/evaReport/messFeedback?*').as('getLabdata')
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-feedback')
        cy.get('button').contains('搜索').click()
        // 从接口获取有多少条数据
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.length).then((data) => {
                //定义数据的长度
                let returnLength = data[0]
                // cy.log(returnLength)
                //断言
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').should('have.length', returnLength)
                //从接口获取实验室名称
                cy.get(xhr.response.body.data).then((labNameData) => {
                    //使用for循环遍历从接口获取的实验室名称以便后续使用
                    for (var i = 0; i < returnLength; i++) {
                        let labName = labNameData[i]
                        let realLabName = labName['labName']
                        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(i).find('td').eq(labNameIndex).should('have.text', realLabName)
                    }
                })
            })
        })
    })
    it('009-信息反馈情况-使用标签进行搜索查询(标签选择佛山)', () => {
        let tagIndex = 2 //实验室标签下标
        let systemTag = 7
        let foshanTag = 6
        let labNameIndex = 0
        //点击实验室标签
        cy.get('.el-radio__inner').eq(tagIndex).click()
        //点击标签选择框
        cy.get('[placeholder="请选择实验室标签"]').click({
            force: true
        })
        //标签选择佛山
        cy.get('.el-select-group__wrap').eq(systemTag).find('li').eq(foshanTag).click({
            force: true
        })
        cy.server()
        cy.route('**/service/mgr/evaReport/messFeedback?*').as('getLabdata')
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-feedback')
        cy.get('button').contains('搜索').click()
        // 从接口获取有多少条数据
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.length).then((data) => {
                //定义数据的长度
                let returnLength = data[0]
                // cy.log(returnLength)
                //断言
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').should('have.length', returnLength)
                //从接口获取实验室名称
                cy.get(xhr.response.body.data).then((labNameData) => {
                    //使用for循环遍历从接口获取的实验室名称以便后续使用
                    for (var i = 0; i < returnLength; i++) {
                        let labName = labNameData[i]
                        let realLabName = labName['labName']
                        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(i).find('td').eq(labNameIndex).should('have.text', realLabName)
                    }
                })
            })
        })

    })
})