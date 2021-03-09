context('参与实验室情况', () => {
  let joinData
  //储存实验室数的数组
  let joinLabData = []
  //储存实验室未标签未配置的数据
  let newData = []
  // URL地址全局变量
  let urlHost = 'http://cqb-mgr.sh.test.sh-weiyi.com/cqb-base-mgr-fe/app.html'

  // let New_rate = []
  // let Join_lab_rate = []
  beforeEach(() => {
    cy.loginCQB()
    let listIndex = 8
    let tagIndex = 0

    cy.get('.el-submenu__title').eq(listIndex).click({
      force: true
    })
    cy.get('.el-menu.el-menu--inline').eq(listIndex).find('.el-menu-item').eq(tagIndex).click({
      force: true
    })
  })
  // it('001-参与实验室情况-未参与标签实验室数', () => {
  //   let businessTag = 5
  //   let notJoinTag = 1
  //   let tagIndex = 2
  //   let clickNotJoin =3
  //   //点击实验室标签
  //   cy.get('.el-col.el-col-16').find('.el-form-item.el-form-item--medium').eq(tagIndex).find('div>label>span')
  //     .get('.el-radio__input').eq(tagIndex).click({
  //       force: true
  //     })
  //   //点击实验室标签下拉框
  //   cy.get('.el-select__input.is-medium').click({
  //     force: true
  //   })
  //   //选择标签未参与
  //   cy.get('.el-select-group').eq(businessTag).find('li').eq(notJoinTag).click({
  //     force: true
  //   })
  //   //点击搜索按键
  //   cy.get('button').contains('搜索').click({
  //     force: true
  //   })
  //   //在输入框输入数据
  //   cy.get('[placeholder="实验室名称或编码"]').type('gd18065')
  //   cy.get('.table-line.table-main').find('tr>th').eq(clickNotJoin).click({
  //     force: true
  //   })
  //   //断言
  //   cy.get('body').should('contain', '佛山市南海区中医院沙头分院')
  // })
  // it('002-参与实验室情况-申请中标签实验室数', () => {
  //   let businessTag = 5
  //   let applyingTag = 0
  //   let tagIndex = 2
  //   let labName = '广东医科大学顺德妇女儿童医院（顺德区妇幼保健院）'
  //   //点击实验室标签
  //   cy.get('.el-col.el-col-16').find('.el-form-item.el-form-item--medium').eq(tagIndex).find('div>label>span')
  //     .get('.el-radio__input').eq(tagIndex).click({
  //       force: true
  //     })
  //   //点击实验室标签下拉框
  //   cy.get('.el-select__input.is-medium').click({
  //     force: true
  //   })
  //   //选择标签申请中
  //   cy.get('.el-select-group').eq(businessTag).find('li').eq(applyingTag).click({
  //     force: true
  //   })
  //   //点击搜索按键
  //   cy.get('button').contains('搜索').click()
  //   //在输入框输入数据
  //   cy.get('[placeholder="实验室名称或编码"]').clear().type(labName)
  //   //断言
  //   cy.get('body').should('contain', labName)
  // })
  // it('003-参与实验室情况-点击参与显示数据', () => {
  //   let tagIndex = 2
  //   let buttonIndex = 1
  //   let businessTag = 5
  //   let joinTag = 2
  //   cy.get('.el-col.el-col-16').find('.el-form-item.el-form-item--medium').eq(tagIndex).find('div>label>span')
  //     .get('.el-radio__input').eq(tagIndex).click({
  //       force: true
  //     })
  //   //点击实验室标签下拉框
  //   cy.get('.el-select__input.is-medium').click({
  //     force: true
  //   })
  //   //选择标签参与
  //   cy.get('.el-select-group').eq(businessTag).find('li').eq(joinTag).click({
  //     force: true
  //   })
  //   //点击搜索按键
  //   cy.get('button').contains('搜索').click({
  //     force: true
  //   })
  //   cy.wait(500)
  //   //点击参与字样
  //   cy.get('.table-line').eq(buttonIndex).find('thead>tr>th').eq(buttonIndex).click({
  //     force: true
  //   })
  //   //断言
  //   cy.get('body').should('contain', '佛山市第一人民医院').and("contain", '佛山市第二人民医院').and('contain', '佛山市三水区人民医院')
  //     .and('contain', '佛山市南海区人民医院').and('contain', '佛山市高明区人民医院')
  // })
  // it('004-参与实验室情况-获取实验室数据', () => {
  //   //点击管理机构
  //   cy.get('[placeholder="请选择管理机构"]').click({
  //     force: true
  //   })
  //   //选择广东省临床检验中心
  //   cy.get('[title="佛山市临床检验质量控制中心"]').click({
  //     force: true
  //   })
  //   //点击搜索按键
  //   cy.get('button').contains('搜索').click({
  //     force: true
  //   })
  //   //--------------获取参与标签的实验室数----------------------
  //   cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(1).invoke('text').then((data) => {
  //     //切割字符串
  //     joinData = data.split('(')
  //     //转换成字符串
  //     joinData = joinData + ''
  //     //切割字符串
  //     joinData = joinData.split(')')
  //     //转换成字符串
  //     joinData = joinData + ''
  //     //切割字符串
  //     joinData = joinData.split(',')
  //     joinLabData.push(joinData[0])
  //     //  Join_lab_rate.push(Join_data[1])
  //   })
  //   // --------------获取申请中标签的实验室数----------------------
  //   cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(2).invoke('text').then((data) => {
  //     //切割字符串
  //     joinData = data.split('(')
  //     //转换成字符串
  //     joinData = joinData + ''
  //     //切割字符串
  //     joinData = joinData.split(')')
  //     //转换成字符串
  //     joinData = joinData + ''
  //     //切割字符串
  //     joinData = joinData.split(',')
  //     joinLabData.push(joinData[0])
  //     // Join_lab_rate.push(Join_data[1])
  //   })
  //   // --------------获取未参与标签的实验室数----------------------
  //   cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(3).invoke('text').then((data) => {
  //     joinData = data.split('(')
  //     //转换成字符串
  //     joinData = joinData + ''
  //     //切割字符串
  //     joinData = joinData.split(')')
  //     //转换成字符串
  //     joinData = joinData + ''
  //     //切割字符串
  //     joinData = joinData.split(',')
  //     joinLabData.push(joinData[0])
  //   })
  //   //获取标签未配置的实验室数
  //   cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(4).invoke('text').then((data) => {
  //     //切割字符串
  //     joinData = data.split('(')
  //     cy.log(joinData)
  //     //转换成字符串
  //     joinData = joinData + ''
  //     //切割字符串
  //     joinData = joinData.split(')')
  //     //转换成字符串
  //     joinData = joinData + ''
  //     //切割字符串
  //     joinData = joinData.split(',')
  //     // cy.log(joinData)
  //     newData.push(joinData[0])
  //   })
  // })
  // it('005-参与实验室情况-数据校验', () => {
  //   //点击管理机构
  //   cy.get('[placeholder="请选择管理机构"]').click({
  //     force: true
  //   })
  //   //选择广东省临床检验中心
  //   cy.get('[title="佛山市临床检验质量控制中心"]').click({
  //     force: true
  //   })
  //   //点击搜索按键
  //   cy.get('button').contains('搜索').click({
  //     force: true
  //   })
  //   let totalLab = parseInt(joinLabData[0]) + parseInt(joinLabData[1]) + parseInt(joinLabData[2]) + parseInt(newData[0])
  //   //参与百分比计算结果保留两位小数
  //   let joinedRate = Math.round(parseInt(joinLabData[0]) / totalLab * 10000) / 100 + "%"
  //   //申请中百分比计算结果保留两位小数
  //   let applyRate = Math.round(parseInt(joinLabData[1]) / totalLab * 10000) / 100
  //   cy.log(applyRate)
  //   // let stringApplyRate = applyRate.toString().split('.')
  //   // if (stringApplyRate.length == 1) {
  //   //   applyRate = applyRate.toString() + ".00"
  //   // }
  //   // if (stringApplyRate.length > 1) {
  //   //   if (stringApplyRate[1].length < 3) {
  //   //     applyRate = applyRate.toString() + ""
  //   //   }
  //   //   if (stringApplyRate[1].length < 2) {
  //   //     applyRate = applyRate.toString() + "0"
  //   //   }
  //   // }
  //   //未参与百分比计算结果保留两位小数
  //   let notjoinedRate = Math.round(parseInt(joinLabData[2]) / totalLab * 10000) / 100
  //   // cy.log(notjoinedRate)
  //   // let stringNotJoinedRate = notjoinedRate.toString().split('.')
  //   // if (stringNotJoinedRate.length == 1) {
  //   //   notjoinedRate = notjoinedRate.toString() + ".00"
  //   // }
  //   // if (stringNotJoinedRate.length > 1) {
  //   //   if (stringNotJoinedRate[1].length < 3) {
  //   //     notjoinedRate = notjoinedRate.toString() + "0"
  //   //   }
  //   //   if (stringNotJoinedRate[1].length < 2) {
  //   //     notjoinedRate = notjoinedRate.toString() + "0"
  //   //   }
  //   // }
  //   //标签未配置百分比计算结果保留两位小数
  //   let tagNotConfigured = Math.round(parseInt(newData[0]) / totalLab * 10000) / 100 + "%"
  //   //参与实验室数据校验
  //   let judgeJoined = joinLabData[0] + '(' + joinedRate + ')'
  //   //标签为申请中的实验室数据
  //   let judgeApply = joinLabData[1] + '(' + applyRate + '%)'
  //   //未参与实验室数据
  //   let judgeNotJoined = joinLabData[2] + '(' + notjoinedRate + '%)'
  //   //标签未配置数据
  //   let judgeTagNotConfigured = newData[0] + '(' + tagNotConfigured + ')'
  //   //断言(判断参与实验室数据是否数据正确)
  //   cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(1).should('have.text', judgeJoined)
  //   //断言(判断申请中的实验室是否数据正确)
  //   cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(2).should('have.text', judgeApply)
  //   //断言(判断未参与实验室是否数据正确)
  //   cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(3).should('have.text', judgeNotJoined)
  //   cy.get('.table-line__fixed-header+.table-line').find('tbody>tr>td').eq(4).should('have.text', judgeTagNotConfigured)
  // })
  // it('006-参与实验室情况-显示字段-取消勾选某个字段', () => {
  //   cy.wait(1000)
  //   //点击显示字段
  //   cy.get('button').contains('显示字段').click({
  //     force: true
  //   })
  //   //取消勾选参与情况
  //   cy.get('.print-tool__columns').find('li').then((data) => {
  //     let webData = data
  //     webData = webData.length
  //     // cy.log(webData)
  //     cy.get('.table-line__wrapper').find('.table-line').eq(0).find('thead>tr').find(" .is-clickable").then((getData) => {
  //       let dataLength = getData.length
  //       // cy.log(dataLength)
  //       for (var i = 0, j = dataLength; i < webData, j >= 0; i++, j--) {
  //         //取消勾选字段
  //         cy.get('.print-tool__columns').find('[role="checkbox"]').eq(i).click({
  //           force: true
  //         })
  //         if (j == 0) {
  //           //断言(显示字段全部取消勾选，tr下就没有  .is-clickable 这个class类)
  //           cy.get('.table-line__wrapper').find('.table-line').eq(0).find('thead>tr').should('not.have.class', " .is-clickable")
  //         } else {
  //           //断言(每取消一个字段名， .is-clickable这个class类的长度就减少一个)
  //           cy.get('.table-line__wrapper').find('.table-line').eq(0).find('thead>tr').find(" .is-clickable").should('have.length', j)
  //         }

  //       }

  //     })
  //   })
  // })
  // it('007-参与实验室情况-使用地区进行搜索(广东省佛山市)', () => {
  //   let areaIndex = 0
  //   let boxIndex = 4
  //   let cityIndex = 4
  //   let guangdongIndex = 2
  //   let foshanCityindex = 5
  //   let resultIndex = 4
  //   //勾选地区
  //   cy.get('.el-radio__inner').eq(areaIndex).click({
  //     force: true
  //   })
  //   //选择广东省
  //   cy.get('[placeholder="请选择省"]').click({
  //     force: true
  //   })
  //   cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(boxIndex).find('li').eq(guangdongIndex).click({
  //     force: true
  //   })
  //   //选择佛山市
  //   cy.get('[placeholder="所有市"]').click({
  //     force: true
  //   })
  //   cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(cityIndex).find('li').eq(foshanCityindex).click({
  //     force: true
  //   })
  //   cy.server()
  //   // 拦截接口，使用通配符*拦截更灵活
  //   cy.route('**/service/mgr/evaReport/joinLab?startTime*').as('getLabdata')
  //   // 拦截请求必须写在visit之前
  //   cy.visit(urlHost + '#/manage/report-effect/report-effect-partake')
  //   cy.get('button').contains('搜索').click({
  //     force: true
  //   })
  //   //获取参与实验室的数量
  //   cy.wait('@getLabdata').then((xhr) => {
  //     cy.log(xhr.response)
  //     cy.get(xhr.response.body.data.unTag).then((data) => {
  //       let labJoin = data[0]
  //       //结果转换成字符串
  //       cy.log(labJoin)
  //       labJoin = labJoin.toString()

  //       //获取参与率
  //       cy.visit(urlHost + '#/manage/report-effect/report-effect-partake')
  //       cy.get('button').contains('搜索').click({
  //         force: true
  //       })
  //       cy.wait('@getLabdata').then((Result) => {
  //         cy.log(Result.response)
  //         cy.get(Result.response.body.data.unTagRate).then((labRate) => {
  //           let joinRate = labRate[0]
  //           //结果转换为百分比并保留两位小数
  //           let percentData = Math.round(joinRate * 10000) / 100 + '%'
  //           cy.log(percentData)
  //           //将结果labJoin的结果与percentData进行连接
  //           let resultData = labJoin + '(' + percentData + ')'
  //           // cy.log(resultData)
  //           //断言
  //           cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').find('td').eq(resultIndex).should('have.text', resultData)
  //         })
  //       })
  //     })
  //   })
  // })
  // it('008-参与实验室情况-使用地区进行搜索(上海)', () => {
  //   let areaIndex = 0
  //   let boxIndex = 4
  //   let cityIndex = 4
  //   let ShanghaiIndex = 1
  //   let resultIndex = 4
  //   //勾选地区
  //   cy.get('.el-radio__inner').eq(areaIndex).click({
  //     force: true
  //   })
  //   //选择广东省
  //   cy.get('[placeholder="请选择省"]').click({
  //     force: true
  //   })
  //   cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(boxIndex).find('li').eq(ShanghaiIndex).click({
  //     force: true
  //   })
  //   //选择市辖区
  //   cy.get('[placeholder="所有市"]').click()
  //   cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(cityIndex).click({
  //     force: true
  //   })
  //   cy.server()
  //   // 拦截接口，使用通配符*拦截更灵活
  //   cy.route('**/service/mgr/evaReport/joinLab?startTime*').as('getLabdata')
  //   // 拦截请求必须写在visit之前
  //   cy.visit(urlHost + '#/manage/report-effect/report-effect-partake')
  //   cy.get('button').contains('搜索').click({
  //     force: true
  //   })
  //   // 获取标签未配置的实验室数量
  //   cy.wait('@getLabdata').then((xhr) => {
  //     cy.log(xhr.response)
  //     cy.get(xhr.response.body.data.unTag).then((data) => {
  //       let labJoin = data[0]
  //       //结果转换成字符串
  //       labJoin = labJoin.toString()
  //       cy.log(labJoin)
  //       //获取标签未配置参与率
  //       cy.visit(urlHost + '#/manage/report-effect/report-effect-partake')
  //       cy.get('button').contains('搜索').click({
  //         force: true
  //       })
  //       cy.wait('@getLabdata').then((Result) => {
  //         cy.log(Result.response)
  //         cy.get(Result.response.body.data.unTagRate).then((labRate) => {
  //           let joinRate = labRate[0]
  //           //结果转换为百分比并保留两位小数
  //           let percentData = Math.round(joinRate * 10000) / 100 + '%'
  //           cy.log(percentData)
  //           cy.log(typeof percentData)
  //           //将结果labJoin的结果与percentData进行连接
  //           let resultData = labJoin + '(' + percentData + ')'
  //           cy.log(resultData)
  //           // 断言
  //           cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').find('td').eq(resultIndex)
  //             .should('have.text', resultData)
  //         })
  //       })
  //     })
  //   })
  // })
  it('009-参与实验室情况-使用标签进行搜索(标签为佛山)', () => {
    let tagIndex = 2
    let foshanTag = 4
    let boxIndex = 7
    let resultIndex = 4
    let firstLabIndex = 1
    let labNameIndex = 0
    let unTagIndex = 3
    let joinNum
    let joinRtate
    let applyNum
    let applyRate
    let nojoinNum
    let notJoinRate
    let unTag
    let unTagRate
    let joinResult
    let applyResult
    let notJoinResult
    let unTagResult
    //点击实验室标签
    cy.get('.el-radio__inner').eq(tagIndex).click({
      force: true
    })
    //选择标签为佛山
    cy.get('[placeholder="请选择实验室标签"]').click({
      force: true
    })
    cy.get('.el-select-group').eq(boxIndex).find('li').eq(foshanTag).click({
      force: true
    })
    cy.server()
    cy.route('**/service/mgr/evaReport/joinLab?startTime*').as('getLabdata')
    // 拦截请求必须写在visit之前
    cy.visit(urlHost + '#/manage/report-effect/report-effect-partake')
    cy.get('button').contains('搜索').click({
      force: true
    })
    // 获取参与的实验室数量
    cy.wait('@getLabdata').then((xhr) => {
      cy.get(xhr.response.body.data).then((data) => {
        //查询出来的总的实验室数量
        let totalLab = data[0].details.length
        if (totalLab == 0) {
          let joinRtate = '0(0%)'
          let applyRate = '0(0%)'
          let notJoinRate = '0(0%)'
          let unTagRate = '0(0%)'
        } else {
          /**
           * 获取各个指标并将其计算出百分比
           */

          //参与
          joinRtate = Math.round(data[0]['joinRtate'] * 10000) / 100 + '%'
          cy.log(joinRtate)
          joinNum = data[0]['joinNum']
          cy.log(joinNum)
          // 申请中
          applyRate = Math.round(data[0]['applyRate'] * 10000) / 100 + '%'
          applyNum = data[0]['applyNum']
          //未参与
          nojoinNum = data[0]['nojoinNum']
          notJoinRate = Math.round(data[0]['noJoinRate'] * 10000) / 100 + '%'
          //标签未配置 
          unTag = data[0]['unTag']
          unTagRate = Math.round(data[0]['unTagRate'] * 10000) / 100 + '%'

          /**
           * 将各个指标的值与各个指标的百分比进行拼接
           */

          //参与
          joinResult = joinNum + '(' + joinRtate + ')'
          //申请中
          applyResult = applyNum + '(' + joinRtate + ')'
          //未参与
          notJoinResult = nojoinNum + '(' + notJoinRate + ')'
          //标签未配置
          unTagResult = unTag + '(' + unTagRate + ')'
          cy.log(joinResult)
          cy.log(applyResult)
          cy.log(notJoinResult)
          cy.log(unTagResult)
        }
        // let joinNum = data[0]['joinNum']
        // // 结果转换成字符串
        // joinNum = joinNum.toString()
        // // 获取参与率
        // let joinRtate = data[0]['joinRtate']
        // joinRtate = joinRtate.toString()
        // //结果转换为百分比并保留两位小数
        // let percentData = Math.round(joinRtate * 10000) / 100 + '%'
        // cy.log(percentData)
        // //将结果joinNum的结果与percentData进行连接
        // let resultData = joinNum + '(' + percentData + ')'
        // //获取实验室名称

        // let guizhouLabName = labName[0]
        // //结果转换为百分比并保留两位小数
        // let guizhouRealLabName = guizhouLabName['labName']
        // cy.log(guizhouRealLabName)
        // //点击标签未配置
        // cy.get('.table-line__fixed-header+.table-line').find(' .is-clickable').eq(unTagIndex).click()
        // // 断言
        // cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').find('td').eq(resultIndex)
        //   .should('have.text', resultData)
        // cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(firstLabIndex).find('td').eq(labNameIndex).should('have.text', guizhouRealLabName)


      })
    })
  })
  // it('010-参与实验室情况-使用标签进行搜索(标签为广西)', () => {
  //   let secondtagIndex = 2
  //   let GuangxiTag = 9
  //   let GuangxiRealTag = 1
  //   let realResultIndex = 1
  //   let secondJoinIndex = 0
  //   let realfirstLabIndex = 1
  //   let realLabNameIndex = 0
  //   let secondLabIndex = 2
  //   let systemTag = 0
  //   //点击实验室标签
  //   cy.get('.el-radio__inner').eq(secondtagIndex).click({
  //     force: true
  //   })
  //   //选择标签为佛山
  //   cy.get('[placeholder="请选择实验室标签"]').click({
  //     force: true
  //   })
  //   cy.get('.el-select-group__wrap').eq(systemTag).find('li>ul>li').eq(GuangxiRealTag).click({
  //     force: true
  //   })

  //   cy.server()
  //   cy.route('**/service/mgr/evaReport/joinLab?startTime*').as('getLabdata')
  //   // 拦截请求必须写在visit之前
  //   cy.visit(urlHost + '#/manage/report-effect/report-effect-partake')
  //   cy.get('button').contains('搜索').click({
  //     force: true
  //   })
  //   // 获取参与的实验室数量
  //   cy.wait('@getLabdata').then((xhr) => {
  //     cy.log(xhr.response)
  //     cy.get(xhr.response.body.data.joinNum).then((data) => {
  //       let labJoin = data[0]
  //       //结果转换成字符串
  //       labJoin = labJoin.toString()
  //       cy.log(labJoin)
  //       //获取参与率
  //       cy.visit(urlHost + '#/manage/report-effect/report-effect-partake')
  //       cy.get('button').contains('搜索').click({
  //         force: true
  //       })
  //       cy.wait('@getLabdata').then((Result) => {
  //         cy.log(Result.response)
  //         cy.get(Result.response.body.data.joinRtate).then((labRate) => {
  //           let joinRate = labRate[0]
  //           //结果转换为百分比并保留两位小数
  //           let percentData = Math.round(joinRate * 10000) / 100 + '%'
  //           cy.log(percentData)
  //           // cy.log(typeof percentData)
  //           // 将结果labJoin的结果与percentData进行连接
  //           //获取实验室名称
  //           cy.visit(urlHost + '#/manage/report-effect/report-effect-partake')
  //           cy.get('button').contains('搜索').click()
  //           cy.wait('@getLabdata').then((resultLabName) => {
  //             cy.log(resultLabName.response)
  //             cy.get(resultLabName.response.body.data.details).then((labName) => {
  //               let firstLabName = labName[0]
  //               //结果转换为百分比并保留两位小数
  //               let firstRealLabName = firstLabName['labName']
  //               cy.log(firstRealLabName)
  //               cy.visit(urlHost + '#/manage/report-effect/report-effect-partake')
  //               cy.get('button').contains('搜索').click()
  //               cy.wait('@getLabdata').then((resultRealLabName) => {
  //                 cy.log(resultRealLabName.response)
  //                 cy.get(resultRealLabName.response.body.data.details).then((RealLabName) => {
  //                   let secondLabName = RealLabName[1]
  //                   //结果转换为百分比并保留两位小数
  //                   let secondRealLabName = secondLabName['labName']
  //                   // cy.log(secondRealLabName)
  //                   //将结果labJoin的结果与percentData进行连接
  //                   let resultData = labJoin + '(' + percentData + ')'
  //                   //点击参与
  //                   cy.get('.table-line__fixed-header+.table-line').find('.is-clickable').eq(secondJoinIndex).click()
  //                   // 断言
  //                   cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').find('td').eq(realResultIndex)
  //                     .should('have.text', resultData)
  //                   // .find('td').eq(0).should('have.text',firstLabName)
  //                   cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(realfirstLabIndex).find('td').eq(realLabNameIndex).should('have.text', firstRealLabName)
  //                   cy.get('.table-line__fixed-header+.table-line').find('tbody>tr').eq(secondLabIndex).find('td').eq(realLabNameIndex).should('have.text', secondRealLabName)
  //                 })
  //               })
  //             })
  //           })
  //         })
  //       })
  //     })
  //   })
  // })
})