// describe('a suite', () => {
//     // this creates a closure around
//     // 'text' so we can access it
context('数据分析管理', () => {
    let reportedLabData, normalLabData, outLabData, totalLabData, notReportLabData
    beforeEach(() => {
        cy.loginCQB()
        let timeIndex = 2
        let labIndex = 1
        let shanghaiLabIndex = 0
        let boxIndex = 1
        let provinceIndex = 0
        let province = '贵州省'
        cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-data/report-rate')
        //获取页面上的数据(判断页面上是否存在贵州省)
        cy.wait(1000)
        //判断是广东环境还是上海环境；如果是广东环境就执行if语句；反之执行else语句
        cy.get('.el-table__body').eq(boxIndex).find('tbody').find('tr>td').eq(provinceIndex).find('.cell').invoke('text').then((data) => {
            let webData = data
            // cy.log(webData)
            if (webData = province) {
                // 点击时间下拉框
                cy.get('[placeholder="请选择"]').click()
                //选择时间(指定时间范围内)
                cy.get('body>div[class="el-select-dropdown el-popper"]>div>div>ul>li>span').eq(timeIndex).click()
                //点击时间控件
                cy.get('i[class="el-input__icon el-range__icon el-icon-date"]').click()
                //选择年份2019年(上一年)
                cy.get('[class="el-picker-panel__icon-btn el-icon-d-arrow-left"]').click()
                //
                for (var i = 1; i <= 3; i++) {
                    cy.get('[class="el-picker-panel__icon-btn el-icon-arrow-right"]').click()
                }
                //选择开始日期2019年9月1日
                cy.get('div[class="el-picker-panel__content el-date-range-picker__content is-left"]').find('table>tbody>tr')
                    .find('td[class="available"]').find('div').eq(0).click()
                //选择结束时间(月份)
                for (var j = 1; j <= 2; j++) {
                    cy.get('[class="el-picker-panel__icon-btn el-icon-arrow-right"]').click()
                }
                //选择日期
                cy.get('[class="el-picker-panel__content el-date-range-picker__content is-right"]').find('table>tbody>tr')
                    .find('td[class="available"]').find('div').eq(28).click()
                //点击搜索按键
                cy.get('[class="el-form el-form--inline"]').find('div>div>button').click()
                //
                // cy.wait(1000)
                //获取已上报实验室的个数
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(labIndex).find('[class="el-table_2_column_11  "]')
                    .find('div').invoke('text').then((data) => {
                        reportedLabData = data
                    })
                //获取正常的实验室个数
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(labIndex).find('[class="el-table_2_column_12  "]')
                    .find('div').invoke('text').then((data) => {
                        normalLabData = data

                    })
                // 获取失控的实验室个数
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(labIndex).find('[class="el-table_2_column_13  "]')
                    .find('div').invoke('text').then((data) => {
                        outLabData = data

                    })
                //获取未上报的实验室个数
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(labIndex).find('[class="el-table_2_column_14  "]')
                    .find('div').invoke('text').then((data) => {
                        notReportLabData = data

                    })
                //获取实验室总数
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(labIndex).find('[class="el-table_2_column_10  "]')
                    .find('div').invoke('text').then((totalLab) => {
                        totalLabData = totalLab

                    })
            } else {
                // 点击时间下拉框
                cy.get('[placeholder="请选择"]').click()
                //选择时间(指定时间范围内)
                cy.get('body>div[class="el-select-dropdown el-popper"]>div>div>ul>li>span').eq(timeIndex).click()
                //点击时间控件
                cy.get('i[class="el-input__icon el-range__icon el-icon-date"]').click()
                //选择年份2019年(上一年)
                cy.get('[class="el-picker-panel__icon-btn el-icon-d-arrow-left"]').click()
                //
                for (var i = 1; i <= 3; i++) {
                    cy.get('[class="el-picker-panel__icon-btn el-icon-arrow-right"]').click()
                }
                //选择开始日期2019年9月1日
                cy.get('div[class="el-picker-panel__content el-date-range-picker__content is-left"]').find('table>tbody>tr')
                    .find('td[class="available"]').find('div').eq(0).click()
                //选择结束时间(月份)
                for (var j = 1; j <= 2; j++) {
                    cy.get('[class="el-picker-panel__icon-btn el-icon-arrow-right"]').click()
                }
                //选择日期
                cy.get('[class="el-picker-panel__content el-date-range-picker__content is-right"]').find('table>tbody>tr')
                    .find('td[class="available"]').find('div').eq(28).click()
                //点击搜索按键
                cy.get('[class="el-form el-form--inline"]').find('div>div>button').click()
                //
                // cy.wait(1000)
                //获取已上报实验室的个数
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(shanghaiLabIndex).find('[class="el-table_2_column_11  "]')
                    .find('div').invoke('text').then((data) => {
                        reportedLabData = data
                    })
                //获取正常的实验室个数
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(shanghaiLabIndex).find('[class="el-table_2_column_12  "]')
                    .find('div').invoke('text').then((data) => {
                        normalLabData = data

                    })
                // 获取失控的实验室个数
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(shanghaiLabIndex).find('[class="el-table_2_column_13  "]')
                    .find('div').invoke('text').then((data) => {
                        outLabData = data

                    })
                //获取未上报的实验室个数
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(shanghaiLabIndex).find('[class="el-table_2_column_14  "]')
                    .find('div').invoke('text').then((data) => {
                        notReportLabData = data

                    })
                //获取实验室总数
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(shanghaiLabIndex).find('[class="el-table_2_column_10  "]')
                    .find('div').invoke('text').then((totalLab) => {
                        totalLabData = totalLab
                    })
            }
        })
    })
    it('001-数据分析管理-上报率-数据验证', () => {
        let shanghaiLabIndex = 0
        let labIndex = 1
        let provinceIndex = 0
        let provinceName = '贵州省'
        let boxIndex = 0
        //判断是广东环境还是上海环境；如果是广东环境就执行if语句；反之执行else语句
        cy.get('.el-table__body').eq(boxIndex).find('tbody').find('tr>td').eq(provinceIndex).find('.cell').invoke('text').then((data) => {
            let webData = data
            if (webData = provinceName) {
                //把字符串转换成整数
                reportedLabData = parseInt(reportedLabData)
                notReportLabData = parseInt(notReportLabData)
                totalLabData = parseInt(totalLabData)
                normalLabData = parseInt(normalLabData)
                outLabData = parseInt(outLabData)
                //已上报加未上报等于总的实验室数
                let judgeLabData = reportedLabData + notReportLabData
                //正常的实验室数加上失控的实验室数等于已上报的实验室数
                let judgeReportedData = normalLabData + outLabData
                //上报率
                let judgeReportedRate = Math.round(reportedLabData / totalLabData * 1000) / 10 + "%"
                //将数字转换成字符串
                judgeLabData = judgeLabData + ''
                judgeReportedData = judgeReportedData + ''
                judgeReportedRate = judgeReportedRate + ''
                // cy.log(typeof judgeLabData)
                //断言(判断已上报加未上报等于总的实验室数)
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(labIndex).find('[class="el-table_2_column_10  "]')
                    .find('div').should('have.text', judgeLabData)
                //断言(判断失控的实验室数加正常的实验室数等于已上报的实验室数)
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(labIndex).find('[class="el-table_2_column_11  "]')
                    .find('div').should('have.text', judgeReportedData)
                //断言(判断上报率是否正确)
                cy.get('body').should('contain', judgeReportedRate)
            } else {
                //把字符串转换成整数
                reportedLabData = parseInt(reportedLabData)
                notReportLabData = parseInt(notReportLabData)
                totalLabData = parseInt(totalLabData)
                normalLabData = parseInt(normalLabData)
                outLabData = parseInt(outLabData)
                //已上报加未上报等于总的实验室数
                let judgeLabData = reportedLabData + notReportLabData
                //正常的实验室数加上失控的实验室数等于已上报的实验室数
                let judgeReportedData = normalLabData + outLabData
                //上报率
                let judgeReportedRate = Math.round(reportedLabData / totalLabData * 1000) / 10 + "%"
                //将数字转换成字符串
                judgeLabData = judgeLabData + ''
                judgeReportedData = judgeReportedData + ''
                judgeReportedRate = judgeReportedRate + ''
                // cy.log(typeof judgeLabData)
                //断言(判断已上报加未上报等于总的实验室数)
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(shanghaiLabIndex).find('[class="el-table_2_column_10  "]')
                    .find('div').should('have.text', judgeLabData)
                //断言(判断失控的实验室数加正常的实验室数等于已上报的实验室数)
                cy.get('[class="el-row is-justify-center el-row--flex"]').find('div>div>div>table>tbody>tr').eq(shanghaiLabIndex).find('[class="el-table_2_column_11  "]')
                    .find('div').should('have.text', judgeReportedData)
                //断言(判断上报率是否正确)
                cy.get('body').should('contain', judgeReportedRate)
            }
        })
    })

    it('002-数据分析管理-上报率-推送大屏', () => {
        //设置随机数
        var screenIndex = 8
        var buttonIndex = 0
        var number = parseInt(Math.random() * 100000)
        //点击推送到大屏
        cy.get('.el-button.el-button--success.el-button--medium').eq(buttonIndex).click()
        //输入分屏的标题
        cy.get('[for="title"]+.el-form-item__content').find('.el-input.el-input--medium.el-input--suffix').type("UI" + number)
        //选择推送大屏的区域
        cy.get('.screen-area').find('tr>td>div').eq(screenIndex).click()
        //点击确定推送
        cy.get('button').contains('确定推送').click()
        //点击覆盖按键
        cy.get('button').contains('覆盖').click()
        //断言
        cy.get('body').should('contain', '已推送到分屏 9')
    })
    it('003-数据分析管理-上报率-推送大屏-标题为空不能进行推送', () => {
        let screenIndex = 8
        var buttonIndex = 0
        // cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/report-data/report-rate')
        // cy.loginCQB()
        cy.get('.el-button.el-button--success.el-button--medium').eq(buttonIndex).click({
            force: true
        })
        cy.get('[for="title"]+.el-form-item__content').find('.el-input.el-input--medium.el-input--suffix').type('123')
        cy.get('.screen-area').find('tr>td>div').eq(screenIndex).click()
        cy.get('[for="title"]+.el-form-item__content').find('.el-input.el-input--medium.el-input--suffix').find('.el-input__inner').clear()
        cy.get('button').contains('确定推送').click()
        //断言
        cy.get('body').should('contain', '请输入分屏标题')
        //点击取消按键
        cy.get('button').contains('取消').click()
    })
    it('004-数据分析管理-上报率-使用地区进行搜索(选择广东省)', () => {
        //省选择框下标
        let boxIndex = 3
        //广东省下标
        let guangdongProvice = 2
        // 判断环境是广东还是上海的下标
        let judgeIndex = 1
        // 环境如果是广东，表单中的第一个地区是贵州省的下标
        let provinceIndex = 0
        //判断变量(if 语句)
        let province = '贵州省'
        cy.get('.el-table__body').eq(judgeIndex).find('tbody').find('tr>td').eq(provinceIndex).find('.cell').invoke('text').then((data) => {
            let webData = data
            if (webData = province) {
                //点击省份选择框
                cy.get('[placeholder="请选择省"]').click()
                //选择广东省
                cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(boxIndex).find('li').eq(guangdongProvice).click()
                //点击搜索
                cy.get('button').contains('搜索').click()
                //断言
                cy.get('body').should('contain', '佛山市')
            } else {
                //点击省份选择框
                cy.get('[placeholder="请选择省"]').click()
                //选择广东省
                cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(boxIndex).find('li').eq(guangdongProvice).click()
                //点击搜索
                cy.get('button').contains('搜索').click()
                //断言
                cy.get('body').should('contain', '该地区数据尚未开放')
            }
        })
    })
    it('005-数据分析管理-上报率-不同分级机构查看的数据不一样', () => {
        let queryIndex = 1
        //点击搜索按键
        cy.get('[placeholder="请选择省"]').click()
        //断言
        cy.get('body').should('contain', '北京市').and('contain', '广东省').and('contain', '广西壮族自治区')
        //点击右上角的管理员
        cy.get('span[aria-haspopup="list"]').eq(queryIndex).click()
        //点击注销，切换用户登录
        cy.get('.cqbicon.icon-logout').click()
        // 关闭登录界面弹窗提示
        cy.get('button').contains('关闭').click({
            force: true
        })
        //调用QPYLTl账户登录的函数
        cy.QPYLT_user_login()
        //----------------QPYLT账户登录 省账户只能查看本省市的数据-----------
        //断言
        cy.get('[placeholder="请选择省"]').should('not.have.css', 'disabled')
        cy.get('body').should('contain', '青浦区').and('not.contain', '佛山市')

        // ---------gdfskj账户登录  市账户只能查看本市的数据------------
        // 点击右上角的管理员
        cy.get('span[aria-haspopup="list"]').eq(queryIndex).click()
        //点击注销，切换用户登录
        cy.get('.cqbicon.icon-logout').click()
        // cy.wait(3000)
        //关闭登录弹窗
        cy.get('button').contains('关闭').click({
            force: true
        })
        //gdfslj账户登录(调用函数)
        cy.gdfslj_user_login()
        //断言
        cy.get('[placeholder="所有市"]').should('not.have.css', 'disabled')
        cy.get('body').should('contain', '高明区').and('contain', '三水区').and('contain', '禅城区')


    })
})