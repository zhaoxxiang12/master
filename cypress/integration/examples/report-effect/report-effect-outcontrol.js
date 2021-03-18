context('失控处理情况', () => {
    let judgeData
    let methodData = []
    // URL地址全局变量
    let urlHost = 'http://cqb-mgr.sh.test.sh-weiyi.com/cqb-base-mgr-fe/app.html'
    beforeEach(() => {
        cy.loginCQB()
        let dateIndex = 1
        let yearIndex = 0
        let startDate = 0
        let monthIndex = 4
        let MayIndex = 4
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-effect/report-effect-outcontrol')
        cy.get('input[placeholder="起始时间"]').eq(startDate).click({
            force: true
        })
        cy.get('.el-date-picker__header-label').eq(yearIndex).invoke('text').then((text) => {
            let currentYear = parseInt(text.slice(0, 4))
            let expectYear = 2020
            let endbutton = 0
            let endTime = 1
            let difference = Math.abs(currentYear - expectYear)
            if (difference == 0) {
                //开始月份选择5月
                cy.get('.el-month-table').find('tr').find('td').eq(monthIndex).click({
                    force: true
                })
                //点击结束时间选择框
                cy.get('[placeholder="结束时间"]').eq(dateIndex).click({
                    force: true
                })
                //结束月份选择5月
                cy.get('.el-month-table').find('tr').eq(4).find('td').eq(MayIndex).click({
                    force: true
                })
                //点击搜索
                cy.get('button').contains('搜索').click({
                    force: true
                })
            } else {
                for (let i = 1; i <= difference; i++) {
                    cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
                        force: true
                    })
                }
                //开始月份选择5月
                cy.get('.el-month-table').find('tr').find('td').eq(monthIndex).click({
                    force: true
                })
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
                let May = 0
                cy.get('.el-month-table').find('tr').eq(4).find('td').eq(May).click({
                    force: true
                })
                //点击搜索
                cy.get('button').contains('搜索').click({
                    force: true
                })
                cy.wait(1000)
            }
        })
    })
    it('001-失控处理情况-使用路由查询接口返回的数据有多少', () => {
        cy.server()
        // 拦截失控处理情况情况查询的接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/outControDeal?*').as('getLabdata')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-outcontrol')
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.outControDeals.length).then((data) => {
                judgeData = data[0]
                cy.log(judgeData)
            })
        })
    })

    it('002-失控处理情况-按原因查看-质控品原因', () => {
        let totalDataIndex = 1
        let boxIndex = 1
        let optionsIndex = 8
        let chooseIndex = 3
        //点击按原因查看
        cy.get('.effect__search').find('[role="radio"]').eq(2).click({
            force: true
        })
        //点击原因选择框
        cy.get('[placeholder="请选择"]').eq(boxIndex).click({
            force: true
        })
        //选择质控品原因
        cy.get('.el-select-group').eq(optionsIndex).find('li').eq(chooseIndex).click({
            force: true
        })
        cy.server()
        // 拦截接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/outControDeal/reason?startTime*').as('getLabdata')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-outcontrol')
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.total).then((data) => {
                judgeData = data[0]
                // cy.log(Judge_data)
                //断言(判断页面上的总数是否和接口返回的数量一致)
                judgeData = judgeData.toString()
                cy.log(judgeData)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(totalDataIndex)
                    .should('have.text', judgeData)
            })
        })

    })
    it('003-失控处理情况-按原因查看-定标曲线漂移', () => {
        let totalDataIndex = 1
        let boxIndex = 1
        let optionsIndex = 8
        let chooseIndex = 5
        //点击按原因查看
        cy.get('.effect__search').find('[role="radio"]').eq(2).click({
            force: true
        })
        //点击原因选择框
        cy.get('[placeholder="请选择"]').eq(boxIndex).click({
            force: true
        })
        //选择定标曲线漂移
        cy.get('.el-select-group').eq(optionsIndex).find('li').eq(chooseIndex).click({
            force: true
        })
        cy.server()
        // 拦截接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/outControDeal/reason?startTime*').as('getLabdata')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-outcontrol')
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.total).then((data) => {
                judgeData = data[0]
                // cy.log(JudgeData)
                //断言(判断页面上的总数是否和接口返回的数量一致)
                judgeData = judgeData.toString()
                cy.log(judgeData)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(totalDataIndex)
                    .should('have.text', judgeData)
            })
        })

    })
    it('004-失控处理情况-按原因查看-定标靶值改变', () => {
        let totalDataIndex = 1
        let boxIndex = 1
        let optionsIndex = 8
        let chooseIndex = 6
        //点击按原因查看
        cy.get('.effect__search').find('[role="radio"]').eq(2).click({
            force: true
        })
        //点击原因选择框
        cy.get('[placeholder="请选择"]').eq(boxIndex).click({
            force: true
        })
        //选择定标靶值改变
        cy.get('.el-select-group').eq(optionsIndex).find('li').eq(chooseIndex).click({
            force: true
        })
        cy.server()
        // 拦截接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/outControDeal/reason?startTime*').as('getLabdata')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-outcontrol')
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.total).then((data) => {
                judgeData = data[0]
                // cy.log(JudgeData)
                //断言(判断页面上的j总数是否和接口返回的数量一致)
                judgeData = judgeData.toString()
                cy.log(judgeData)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(totalDataIndex)
                    .should('have.text', judgeData)
            })
        })

    })
    it('005-失控处理情况-按原因查看-人为原因', () => {
        let totalDataIndex = 1
        let boxIndex = 1
        let optionsIndex = 8
        let chooseIndex = 1
        //点击按原因查看
        cy.get('.effect__search').find('[role="radio"]').eq(2).click({
            force: true
        })
        //点击原因选择框
        cy.get('[placeholder="请选择"]').eq(boxIndex).click({
            force: true
        })
        //选择人为原因
        cy.get('.el-select-group').eq(optionsIndex).find('li').eq(chooseIndex).click({
            force: true
        })
        cy.server()
        // 拦截接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/outControDeal/reason?startTime*').as('getLabdata')
        cy.get('button').contains('搜索').click({
            force: true
        })
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-outcontrol')
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.total).then((data) => {
                judgeData = data[0]
                // cy.log(Judge_data)
                //断言(判断页面上的总数是否和接口返回的数量一致)
                judgeData = judgeData.toString()
                cy.log(judgeData)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(totalDataIndex)
                    .should('have.text', judgeData)
            })
        })

    })
    it('006-失控处理情况-按原因查看(CV/符合率失控原因)-固定CV%/SD设置问题', () => {
        let totalDataIndex = 1
        let boxIndex = 1
        let optionsIndex = 9
        let chooseIndex = 0
        //点击按原因查看
        cy.get('.effect__search').find('[role="radio"]').eq(2).click({
            force: true
        })
        //点击原因选择框
        cy.get('[placeholder="请选择"]').eq(boxIndex).click({
            force: true
        })
        //选择固定CV%/SD设置问题
        cy.get('.el-select-group').eq(optionsIndex).find('li').eq(chooseIndex).click({
            force: true
        })
        cy.server()
        // 拦截接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/outControDeal/reason?startTime*').as('getLabdata')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-outcontrol')
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.total).then((data) => {
                judgeData = data[0]
                // cy.log(JudgeData)
                //断言(判断页面上的总数是否和接口返回的数量一致)
                judgeData = judgeData.toString()
                cy.log(judgeData)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(totalDataIndex)
                    .should('have.text', judgeData)
            })
        })

    })
    it('007-失控处理情况-按原因查看(CV/符合率失控原因)-仪器原因', () => {
        let totalDataIndex = 1
        let boxIndex = 1
        let optionsIndex = 9
        let chooseIndex = 2
        //点击按原因查看
        cy.get('.effect__search').find('[role="radio"]').eq(2).click({
            force: true
        })
        //点击原因选择框
        cy.get('[placeholder="请选择"]').eq(boxIndex).click({
            force: true
        })
        //选择仪器原因
        cy.get('.el-select-group').eq(optionsIndex).find('li').eq(chooseIndex).click({
            force: true
        })
        cy.server()
        // 拦截接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/outControDeal/reason?startTime*').as('getLabdata')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-outcontrol')
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.total).then((data) => {
                judgeData = data[0]
                // cy.log(Judge_data)
                //断言(判断页面上的总数是否和接口返回的数量一致)
                judgeData = judgeData.toString()
                cy.log(judgeData)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(totalDataIndex)
                    .should('have.text', judgeData)
            })
        })

    })
    it('008-失控处理情况-按原因查看(CV/符合率失控原因)-试剂原因', () => {
        let totalDataIndex = 1
        let boxIndex = 1
        let optionsIndex = 9
        let chooseIndex = 3
        //点击按原因查看
        cy.get('.effect__search').find('[role="radio"]').eq(2).click({
            force: true
        })
        //点击原因选择框
        cy.get('[placeholder="请选择"]').eq(boxIndex).click({
            force: true
        })
        //选择试剂原因
        cy.get('.el-select-group').eq(optionsIndex).find('li').eq(chooseIndex).click({
            force: true
        })
        cy.server()
        // 拦截接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/outControDeal/reason?startTime*').as('getLabdata')
        cy.get('button').contains('搜索').click({
            force: true
        })
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-outcontrol')
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.total).then((data) => {
                judgeData = data[0]
                // cy.log(Judge_data)
                //断言(判断页面上的总数是否和接口返回的数量一致)
                judgeData = judgeData.toString()
                cy.log(judgeData)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(totalDataIndex)
                    .should('have.text', judgeData)
            })
        })
    })
    it('009-失控处理情况-按原因查看(CV/符合率失控原因)-质控品原因', () => {
        let totalDataIndex = 1
        let boxIndex = 1
        let optionsIndex = 9
        let chooseIndex = 4
        //点击按原因查看
        cy.get('.effect__search').find('[role="radio"]').eq(2).click({
            force: true
        })
        //点击原因选择框
        cy.get('[placeholder="请选择"]').eq(boxIndex).click({
            force: true
        })
        //选择质控品原因
        cy.get('.el-select-group').eq(optionsIndex).find('li').eq(chooseIndex).click({
            force: true
        })
        cy.server()
        // 拦截接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/outControDeal/reason?startTime*').as('getLabdata')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-outcontrol')
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.total).then((data) => {
                judgeData = data[0]
                // cy.log(Judge_data)
                //断言(判断页面上的总数是否和接口返回的数量一致)
                judgeData = judgeData.toString()
                cy.log(judgeData)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(totalDataIndex)
                    .should('have.text', judgeData)
            })
        })
    })
    it('010-失控处理情况-按原因查看(CV/符合率失控原因)-人员问题', () => {
        let totalDataIndex = 1
        let boxIndex = 1
        let optionsIndex = 9
        let chooseIndex = 5
        //点击按原因查看
        cy.get('.effect__search').find('[role="radio"]').eq(2).click({
            force: true
        })
        //点击原因选择框
        cy.get('[placeholder="请选择"]').eq(boxIndex).click({
            force: true
        })
        //选择人员问题
        cy.get('.el-select-group').eq(optionsIndex).find('li').eq(chooseIndex).click({
            force: true
        })
        cy.server()
        // 拦截接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/outControDeal/reason?startTime*').as('getLabdata')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-outcontrol')
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.total).then((data) => {
                judgeData = data[0]
                // cy.log(Judge_data)
                //断言(判断页面上的总数是否和接口返回的数量一致)
                judgeData = judgeData.toString()
                cy.log(judgeData)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(totalDataIndex)
                    .should('have.text', judgeData)
            })
        })

    })
    it('011-失控处理情况-按原因查看(CV/符合率失控原因)-其他', () => {
        let totalDataIndex = 1
        let boxIndex = 1
        let optionsIndex = 9
        let chooseIndex = 6
        //点击按原因查看
        cy.get('.effect__search').find('[role="radio"]').eq(2).click({
            force: true
        })
        //点击原因选择框
        cy.get('[placeholder="请选择"]').eq(boxIndex).click({
            force: true
        })
        //选择其他
        cy.get('.el-select-group').eq(optionsIndex).find('li').eq(chooseIndex).click({
            force: true
        })
        cy.server()
        // 拦截接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/outControDeal/reason?startTime*').as('getLabdata')
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-outcontrol')
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.total).then((data) => {
                judgeData = data[0]
                // cy.log(Judge_data)
                //断言(判断页面上的总数是否和接口返回的数量一致)
                judgeData = judgeData.toString()
                cy.log(judgeData)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(totalDataIndex)
                    .should('have.text', judgeData)
            })
        })

    })
    it('012-失控处理情况-按原因查看-获取页面上处理方式数据', () => {
        let boxIndex = 1
        let optionsIndex = 8
        let chooseIndex = 9
        //点击按原因查看
        cy.get('.effect__search').find('[role="radio"]').eq(2).click({
            force: true
        })
        //点击原因选择框
        cy.get('[placeholder="请选择"]').eq(boxIndex).click({
            force: true
        })
        //选择随机误差
        cy.get('.el-select-group').eq(optionsIndex).find('li').eq(chooseIndex).click({
            force: true
        })
        //点击搜索按键
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(5000)
        //循环遍历获取失控原因的数据
        for (let i = 4; i <= 15; i++) {
            cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(0).find('td').eq(i).invoke('text')
                .then((data) => {
                    let webData = data
                    if (webData != null) {
                        methodData.push(webData)
                    } else { //如果标签<td><td>中的数据为null就赋值为0
                        webData = 0
                        methodData.push(webData)
                    }
                })
        }

    })
    it('013-失控处理情况-按原因查看-判断处理方式之和是否等于总数', () => {
        let totalDataIndex = 1
        let boxIndex = 1
        let optionsIndex = 8
        let chooseIndex = 9
        //点击按原因查看
        cy.get('.effect__search').find('[role="radio"]').eq(2).click({
            force: true
        })
        //点击原因选择框
        cy.get('[placeholder="请选择"]').eq(boxIndex).click({
            force: true
        })
        //选择随机误差
        cy.get('.el-select-group').eq(optionsIndex).find('li').eq(chooseIndex).click({
            force: true
        })
        //点击搜索按键
        cy.get('button').contains('搜索').click({
            force: true
        })
        // 处理方式之和
        var secondJudgeData = 0
        cy.log(methodData)
        for (let i = 0; i < methodData.length; i++) {
            // sum=sum+methodData[i]
            secondJudgeData += parseInt(methodData[i])

        }
        //整数转字符串
        secondJudgeData = secondJudgeData.toString()
        // cy.log(JudgeData)
        //断言(获取原因总数并和judgeData进行对比)
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(0).find('td').eq(totalDataIndex).should('have.text', secondJudgeData)
    })
    it('014-失控处理情况-切换质控主管单位进行搜索查询', () => {
        let boxIndex = 5
        let labIdex = 0
        let labName = '复旦大学中山医院青浦分院'
        let institutionsIndex = 1
        //点击质控主管单位
        cy.get('[placeholder="请选择"]').click({
            force: true
        })
        //选择青浦医联体
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(boxIndex).find('li').eq(institutionsIndex).click({
            force: true
        })
        //点击搜索
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        //获取页面实验室名称并进行对比
        cy.get('.table-line__fixed-header+.table-line').find('tr>td').eq(labIdex).should('have.text', labName)
    })
    it('015-失控处理情况-使用地区进行搜索查询', () => {
        let pronvinceIndex = 2
        let chooseIndex = 5
        let cityIndex = 2
        let foshanCityIndex = 5
        let clearIndex = 1
        //点击地区
        cy.get('.el-col.el-col-16').find('div>div>label>span').find('.el-radio__inner').eq(0).click({
            force: true
        })
        //点击省份选择框
        cy.get('[placeholder="请选择省"]').click({
            force: true
        })
        //选择广东省
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(chooseIndex).find('li').eq(pronvinceIndex).click({
            force: true
        })
        // 选择市(深圳市)
        cy.get('[placeholder="所有市"]').click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(chooseIndex).find('li').eq(cityIndex).click({
            force: true
        })
        // cy.get('button').contains('搜索').click({force:true})
        cy.server()
        // 拦截接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/outControDeal?*').as('getLabdata')
        cy.wait(1000)
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        // cy.get('button').contains('搜索').click({force:true})
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-outcontrol')
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data).then((value) => {
                let Data = value["outControDeals"]
                cy.log(Data)
                cy.get('body').should('not.contain', '测试实验室')
            })
        })
        //清除之前的选择
        cy.get('.el-tag__close.el-icon-close').eq(clearIndex).click({
            force: true
        })
        //选择市(佛山市)
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(chooseIndex).find('li').eq(foshanCityIndex).click({
            force: true
        })
        // cy.get('button').contains('搜索').click({force:true})
        cy.server()
        // 拦截接口，使用通配符*拦截更灵活
        cy.route('**/service/mgr/evaReport/outControDeal?*').as('getLabdata')
        cy.wait(1000)
        cy.get('button').contains('搜索').click({
            force: true
        })
        // 拦截请求必须写在visit之前
        cy.visit(urlHost + '#/manage/report-effect/report-effect-outcontrol')
        cy.wait('@getLabdata').then((xhr) => {
            cy.log(xhr.response)
            cy.get(xhr.response.body.data.outControDeals.length).then((data) => {
                judgeData = data
                // Judge_data=JSON.stringify(Judge_data)
                // cy.log(typeof Judge_data)
                judgeData = judgeData["0"]
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').should('have.length', judgeData)
            })
        })
    })

})