context('实验室上报情况', () => {
    let judgeData
    let reporteData
    before(() => {
        cy.loginCQB()
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-effect/report-effect-appear')
        //日期选择框下标
        let dateIndex = 0
        //tr标签下标
        let trIndex = 1
        //五月份的下标
        let MayIndex = 0
        //起始时间
        let startDate = 0
        //结束时间
        let endDate = 2
        let chose = 1
        //点击开始时间选择框
        cy.get('[placeholder="起始时间"]').eq(dateIndex).click()
        cy.get('.el-date-picker__header-label').eq(startDate).invoke('text').then((getData) => {
            let getYear = parseInt(getData.slice(0, 4))
            let difference = getYear - 2020
            for (let i = 1; i <= difference; i++) {
                cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
                    force: true
                })
            }
            //月份选择五月
            cy.get('.el-month-table').find('tr').eq(trIndex).find('td').eq(MayIndex).click({
                force: true
            })
        })
        //点击结束时间选择框
        cy.get('[placeholder="结束时间"]').eq(dateIndex).click({
            force: true
        })
        cy.get('.el-date-picker__header-label').eq(endDate).invoke('text').then((getData) => {
            let getYear = parseInt(getData.slice(0, 4))
            let difference = getYear - 2020
            for (let i = 1; i <= difference; i++) {
                cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').eq(chose).click({
                    force: true
                })
            }
            // //月份选择五月
            cy.get('.el-month-table').find('tr').eq(4).find('td').eq(MayIndex).click({
                force: true
            })
        })
    })
    it('001-实验室上报情况-切换质控主管单位(广东环境-切换至青浦医联体)', () => {
        let boxIndex = 5
        let ShanghaiIndex = 1
        let choiceIndex = 5
        //点击质控主管单位
        cy.get('[placeholder="请选择"]').click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(choiceIndex).find('li').then((data) => {
            let judgle = data
            let getData = judgle.length
            let shanghaiEnvironment = 1
            if (getData == shanghaiEnvironment) {
                cy.log('上海医联体系统，无其他管理机构选项')
            } else {
                //点击质控主管单位选择框
                cy.get('[placeholder="请选择"]').click({
                    force: true
                })
                cy.wait(1000)
                //选择青浦医联体
                cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(boxIndex).find('li').eq(ShanghaiIndex).click({
                    force: true
                })
                cy.intercept('**/service/mgr/evaReport/labReport?*').as('getLabdata')
                // 拦截请求必须写在visit之前
                cy.get('button').contains('搜索').click({
                    force: true
                })
                // 获取标签未配置的实验室数量
                cy.wait('@getLabdata').then((xhr) => {
                    cy.get(xhr.response.body.data.detail).then((getLabData) => {
                        let labName = getLabData[0]
                        labName = labName['labName']
                        let labNameIndex = 0
                        //   cy.log(labName)
                        //断言(判断界面是否有符合的实验室名字)
                        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(labNameIndex).should('have.text', labName)
                    })
                })
            }
        })

    })
    it('002-实验室上报情况-使用地区进行查询(上海)', () => {
        let areaIndex = 0
        let boxIndex = 5
        let ShanghaiProvinceIndex = 1
        let ShanghaiIndex = 1
        //点击质控主管单位选择框
        cy.get('[placeholder="请选择"]').click({
            force: true
        })
        //选择青浦医联体
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(boxIndex).find('li').eq(ShanghaiIndex).click({
            force: true
        })
        //点击地区
        cy.get('.el-radio__inner').eq(areaIndex).click()
        //点击省选择框
        cy.get('[placeholder="请选择省"]').click({
            force: true
        })
        //选择上海
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(boxIndex).find('li').eq(ShanghaiProvinceIndex).click({
            force: true
        })
        cy.intercept('**/service/mgr/evaReport/labReport?*').as('getLabdata')
        // 拦截请求必须写在visit之前
        cy.get('button').contains('搜索').click()
        // 获取标签未配置的实验室数量
        cy.wait('@getLabdata').then((xhr) => {
            cy.get(xhr.response.body.data.detail).then((data) => {
                let labName = data[0]
                labName = labName['labName']
                let labNameIndex = 0
                //   cy.log(labName)
                //断言
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(labNameIndex).should('have.text', labName)
            })
        })
    })
    it('003-实验室上报情况-使用路由查询接口返回的数据有多少', () => {
        let Foshan = 0
        let checkInner = 1
        let choiceIndex = 5
        //点击质控主管单位
        cy.get('[placeholder="请选择"]').click({
            force: true
        })
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(choiceIndex).find('li').eq(Foshan).click({
            force: true
        })
        cy.get('.el-radio__inner').eq(checkInner ).click({
            force: true
        })
        // 拦截参与实验室情况查询的接口，使用通配符*拦截更灵活
        cy.intercept('**/service/mgr/evaReport/labReport?*').as('getLabdata')
        // 拦截请求必须写在visit之前
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait('@getLabdata').then((xhr) => {
            //获取接口返回了多少条数据
            cy.get(xhr.response.body.data.detail.length).then((data) => {
                judgeData = data[0]
            })
        })
    })
    it('004-实验室上报情况-进行数据对比', () => {
        //接口返回的数据量与前端元素tr的长度进行对比
        cy.get('.table-line__fixed-header+.table-line').find('tbody').find('tr').should('have.length', judgeData)
    })
    it('005-实验室上报情况-总上报天数为零工作日上报率就为零', () => {
        //实验室下标
        let labIndex = 66
        //总上报天数下标
        let reportIndex = 2
        //上报率下标
        let reportedRateIndex = 1
        //点击搜索
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        //断言
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(labIndex).find('td').eq(reportIndex).invoke('text')
            .then((data) => {
                reporteData = data
                reporteData = parseInt(reporteData)
                let reportedRate = Math.round(reporteData / 19 * 1000) / 10 + '%'
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(labIndex).find('td[class]').eq(reportedRateIndex)
                    .should('have.text', reportedRate)
            })
    })
    it('006-实验室上报情况-规定上报记录数为零工作日上报率就为零', () => {
        //实验室下标
        let labIndex = 66
        //规定上报记录数下标
        let reportIndex = 4
        //上报率下标
        let reportedRateIndex = 1
        //点击搜索
        cy.get('button').contains('搜索').click({
            force: true
        })
        cy.wait(1000)
        //
        cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(labIndex).find('td[class]').eq(reportIndex).invoke('text')
            .then((data) => {
                let reportedData = data
                reportedData = parseInt(reportedData)
                let reportedRate = Math.round(reportedData / 19 * 1000) / 10 + '%'
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(labIndex).find('td[class]').eq(reportedRateIndex)
                    .should('have.text', reportedRate)
            })
    })
    it('007-实验室上报情况-输入关键字进行模糊搜索查询', () => {
        let labCode = 'yl1250'
        let typeLabName = '青浦区重固镇社区卫生服务中心'
        let labName = '上海市测试专用实验室'
        let guangdongLabCode = 'gd18030'
        let guangdongTypeLabName = '佛山市南海区第五人民医院'
        let guangdongLabName = '佛山市妇幼保健院'
        let labNameIndex = 0
        let choiceIndex = 5
        //点击质控主管单位
        cy.get('[placeholder="请选择"]').click({
            force: true
        })
        //获取质控主管单位里面有多少个选项，即多少个管理机构
        cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(choiceIndex).find('li').then((data) => {
            let judgle = data
            let getData = judgle.length
            //判断管理机构里面有多少个选项，如果管理机构只有一个，说明是上海环境；如果选项大于1说明为广东环境，就执行else语句
            if (getData == 1) {

                //输入实验室编码
                cy.get('[placeholder="实验室名称或编码"]').type(labCode, {
                    force: true
                })
                //断言(判断界面是否有符合的实验室名字)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(labNameIndex).should('have.text', labName)
                //输入实验室名称
                cy.get('[placeholder="实验室名称或编码"]').clear().type(typeLabName)
                //断言(判断界面是否有符合的实验室名字)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(labNameIndex).should('have.text', typeLabName)
            } else {
                //输入实验室编码
                cy.get('[placeholder="实验室名称或编码"]').type(guangdongLabCode)
                //断言(判断界面是否有符合的实验室名字)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(labNameIndex).should('have.text', guangdongLabName)
                //输入实验室名称
                cy.get('[placeholder="实验室名称或编码"]').clear().type(guangdongTypeLabName)
                //断言(判断界面是否有符合的实验室名字)
                cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(labNameIndex).should('have.text', guangdongTypeLabName)
            }

        })
        cy.get('[placeholder="实验室名称或编码"]').clear()
    })
    it('008-实验室上报情况-显示字段-取消勾选某个字段', () => {
        //点击显示字段
        cy.get('button').contains('显示字段').click({
            force: true
        })
        //获取显示字段的长度
        cy.get('.print-tool__columns').find('li').then((data) => {
            let webData = data
            webData = data.length
            cy.get('.el-checkbox.is-checked').then((getData) => {
                let lengthData = getData.length
                //使用for 循环取消勾选显示字段
                for (var i = 0, j = lengthData - 1; i < webData, j >= Math.abs(webData - lengthData); i++, j--) {
                    cy.get('.print-tool__columns').find('li>label>span').find('.el-checkbox__inner').eq(i).click()
                    //断言(每次取消勾选一个显示字段，.el-checkbox.is-checked长度就会减少一个)
                    cy.get('.el-checkbox.is-checked').should('have.length', j)

                }
            })
        })
    })
})