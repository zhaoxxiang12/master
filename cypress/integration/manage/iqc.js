context('月度IQC报告', () => {
  before(() => {
    let startDate = 0
    let startMonth = 0
    let chooseStartMonth = 0
    let endMonth = 2
    let expandButton = 0
    let endDate = 1
    let endDay = 0
    let chooseEndMonth = 1
    let searchButton = 1
    let startTime = 0
    let endTime = 0
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-mgr/lab/iqc')
    //选择开始时间2020/1
    cy.get('.el-button.el-button--text.el-button--medium').eq(expandButton).click({
      force: true
    })
    cy.get('input[placeholder="开始时间"]').eq(startTime).click({
      force: true
    })
    cy.get('.el-date-picker__header-label').eq(startDate).invoke('text').then((getData) => {
      let getYear = parseInt(getData.slice(0, 4))
      let differenceYear = getYear - 2020
      if (differenceYear == 0) {
        cy.get('.el-month-table').find('tbody>tr').eq(startMonth).find('td').eq(chooseStartMonth).click({
          force: true
        })
      } else {
        for (let i = 0; i < differenceYear; i++) {
          cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
            force: true
          })
        }
        cy.get('.el-month-table').find('tbody>tr').eq(startMonth).find('td').eq(chooseStartMonth).click({
          force: true
        })
      }
    })
    //选择结束时间2020/2
    cy.get('input[placeholder="结束时间"]').eq(endTime).click({
      force: true
    })
    cy.get('.el-date-picker__header-label').eq(endMonth).invoke('text').then((getData) => {
      let endYear = parseInt(getData.slice(0, 4))
      let differenceYear = endYear - 2020
      if (differenceYear == 0) {
        cy.get('.el-month-table').eq(endDate).find('tbody>tr').eq(endDay).find('td').eq(chooseEndMonth).click({
          force: true
        })
      } else {
        for (let i = 0; i < differenceYear; i++) {
          cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').eq(endDate).click({
            force: true
          })
        }
        cy.get('.el-month-table').eq(endDate).find('tbody>tr').eq(endDay).find('td').eq(chooseEndMonth).click({
          force: true
        })
      }
    })
    cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
      force: true
    })

  })
  it('report-001-月度IQC报告-生成IQC报告', () => {
    let labCode = 'gdtest5'
    let keywordBox = 1
    let choose = 2
    let monthReport = 0
    let month = 11
    let year = 0
    let choice = 0
    let chooseMonth = 1
    cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-mgr/lab/report-lab')
    cy.wait(1000)
    cy.get('input[placeholder="请输入实验室名称或编码"]').eq(keywordBox).type(labCode, {
      force: true
    })
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-checkbox__inner').eq(choose).click({
      force: true
    })
    cy.get('.el-button.el-button--primary.el-button--medium.is-plain').eq(monthReport).click({
      force: true
    })
    cy.wait(500)
    cy.get('button').contains('报告模板一').click({
      force: true
    })
    // 月度选择2021/2
    cy.get('.el-input__inner').eq(month).click({
      force: true
    })
    cy.get('.el-date-picker__header-label').eq(year).invoke('text').then((getData) => {
      let getYear = parseInt(getData.slice(0, 4))
      let differenceYear = getYear - 2020
      if (differenceYear == 0) {
        cy.get('.el-month-table').find('tbody>tr').eq(choice).find('td').eq(chooseMonth).click({
          force: true
        })
        cy.intercept('**/cqb-base-mgr/service/iqc/report/monthGenerate*').as('creatMonthReport')
        cy.get('button').contains('生成报告').click({
          force: true
        })
        cy.wait('@creatMonthReport').then((getData) => {
          let getStatus = getData.response.statusCode
          let expectStatus = 200
          expect(getStatus).to.eq(expectStatus)
          cy.get('body').should('contain', '生成任务已提交')
          cy.visit('/cqb-base-mgr-fe/app.html#/manage/report-mgr/lab/iqc')
        })
      } else {
        for (let i = 0; i < differenceYear; i++) {
          cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
            force: true
          })
        }
        cy.get('.el-month-table').find('tbody>tr').eq(choice).find('td').eq(chooseMonth).click({
          force: true
        })
        cy.intercept('**/cqb-base-mgr/service/iqc/report/monthGenerate*').as('creatMonthReport')
        cy.get('button').contains('生成报告').click({
          force: true
        })
        cy.wait('@creatMonthReport').then((getData) => {
          let getStatus = getData.response.statusCode
          let expectStatus = 200
          expect(getStatus).to.eq(expectStatus)
          cy.get('body').should('contain', '生成任务已提交')
        })
      }
    })
  })

  it('report-002-月度IQC报告_推送/取消推送IQC报告', () => {
    let labCode = 'gd18003'
    let keywordBox = 1
    let push = 2
    let startDate = 0
    let startMonth = 0
    let chooseStartMonth = 0
    let endMonth = 2
    let expandButton = 0
    let endDate = 1
    let endDay = 0
    let chooseEndMonth = 1
    let searchButton = 1
    let startTime = 0
    let endTime = 0
    cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/report-mgr/lab/iqc')
    cy.get('.el-message-box__btns button:first').click({
      force: true
    })
    //选择开始时间2020/1
    cy.get('.el-button.el-button--text.el-button--medium').eq(expandButton).click({
      force: true
    })
    cy.get('input[placeholder="开始时间"]').eq(startTime).click({
      force: true
    })
    cy.get('.el-date-picker__header-label').eq(startDate).invoke('text').then((getData) => {
      let getYear = parseInt(getData.slice(0, 4))
      let differenceYear = getYear - 2020
      if (differenceYear == 0) {
        cy.get('.el-month-table').find('tbody>tr').eq(startMonth).find('td').eq(chooseStartMonth).click({
          force: true
        })
      } else {
        for (let i = 0; i < differenceYear; i++) {
          cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
            force: true
          })
        }
        cy.get('.el-month-table').find('tbody>tr').eq(startMonth).find('td').eq(chooseStartMonth).click({
          force: true
        })
      }
    })
    //选择结束时间2020/2
    cy.get('input[placeholder="结束时间"]').eq(endTime).click({
      force: true
    })
    cy.get('.el-date-picker__header-label').eq(endMonth).invoke('text').then((getData) => {
      let endYear = parseInt(getData.slice(0, 4))
      let differenceYear = endYear - 2020
      if (differenceYear == 0) {
        cy.get('.el-month-table').eq(endDate).find('tbody>tr').eq(endDay).find('td').eq(chooseEndMonth).click({
          force: true
        })
      } else {
        for (let i = 0; i < differenceYear; i++) {
          cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').eq(endDate).click({
            force: true
          })
        }
        cy.get('.el-month-table').eq(endDate).find('tbody>tr').eq(endDay).find('td').eq(chooseEndMonth).click({
          force: true
        })
      }
    })
    cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
      force: true
    })
    cy.wait(1000)
    cy.get('input[placeholder="实验室名称或编码"]').eq(keywordBox).clear({
      force: true
    }).type(labCode, {
      force: true
    })
    //点击搜索
    cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-table__body').find('.el-table__row').eq(0).find('.el-button.el-button--text.el-button--medium').eq(push).invoke('text').then((data) => {
      let getText = data
      if (getText == '推送') {
        cy.intercept('**/cqb-base-mgr/service/mgr/iqc/month/push?*').as('push')
        //点击推送
        cy.get('.el-table__body').find('.el-table__row').eq(0).find('.el-button.el-button--text.el-button--medium').eq(push).click({
          force: true
        })
        //确认推送
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--primary').click({
          force: true
        })
        cy.wait('@push').then((data) => {
          let getStatus = data.response.statusCode
          let expectStatus = 200
          expect(getStatus).to.eq(expectStatus)
          cy.get('body').should('contain', '操作成功')
          cy.get('.el-table__body').find('.el-table__row').eq(0).find('.el-button.el-button--text.el-button--medium').eq(push).should('have.text', '取消推送')
        })
      } else {
        cy.intercept('**/cqb-base-mgr/service/mgr/iqc/month/push?*').as('unPush')
        //点击取消推送
        cy.get('.el-table__body').find('.el-table__row').eq(0).find('.el-button.el-button--text.el-button--medium').eq(push).click({
          force: true
        })
        //确认取消
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
          force: true
        })
        cy.wait('@unPush').then((data) => {
          let getStatus = data.response.statusCode
          let expectStatus = 200
          expect(getStatus).to.eq(expectStatus)
          cy.get('body').should('contain', '操作成功')
          cy.get('.el-table__body').find('.el-table__row').eq(0).find('.el-button.el-button--text.el-button--medium').eq(push).should('have.text', '推送')
        })
      }
    })
  })

  it('report-003-月度IQC报告_批量推送IQC报告', () => {
    let labCode = 'gd18002'
    let keywordBox = 1
    let searchButton = 1
    let chooseOne = 2
    let chooseTwo = 3
    cy.get('input[placeholder="实验室名称或编码"]').eq(keywordBox).clear({
      force: true
    }).type(labCode, {
      force: true
    })
    //点击搜索
    cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-checkbox__inner').eq(chooseOne).click({
      force: true
    })
    cy.get('.el-checkbox__inner').eq(chooseTwo).click({
      force: true
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/iqc/month/batchPush*').as('push')
    //点击批量推送   
    cy.get('.el-button.el-button--primary.el-button--medium.is-plain').click({
      force: true
    })
    //确认批量推送
    cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--primary').click({
      force: true
    })
    cy.wait('@push').then((data) => {
      let getStatus = data.response.statusCode
      let expectStatus = 200
      expect(getStatus).to.eq(expectStatus)
      cy.get('body').should('contain', '已批量推送')
    })
  })

  it('report-004-月度IQC报告_取消批量推送', () => {
    let labCode = 'gd18002'
    let keywordBox = 1
    let searchButton = 1
    let chooseOne = 2
    let chooseTwo = 3
    let unPush = 0
    cy.get('input[placeholder="实验室名称或编码"]').eq(keywordBox).clear().type(labCode, {
      force: true
    })
    //点击搜索
    cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-checkbox__inner').eq(chooseOne).click({
      force: true
    })
    cy.get('.el-checkbox__inner').eq(chooseTwo).click({
      force: true
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/iqc/month/batchPush*').as('push')
    //点击批量取消推送   
    cy.get('.el-button.el-button--danger.el-button--medium.is-plain').eq(unPush).click({
      force: true
    })
    //确认批量取消推送
    cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
      force: true
    })
    cy.wait('@push').then((data) => {
      let getStatus = data.response.statusCode
      let expectStatus = 200
      expect(getStatus).to.eq(expectStatus)
      cy.get('body').should('contain', '已批量取消推送')
    })
  })
  it('report-005-月度IQC报告_查看IQC报告', () => {
    let labCode = 'gdtest5'
    let keywordBox = 1
    let view = 0
    let searchButton = 1
    cy.get('input[placeholder="实验室名称或编码"]').eq(keywordBox).clear({
      force: true
    }).type(labCode, {
      force: true
    })
    //点击搜索
    cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
      force: true
    })
    cy.wait(1000)
    cy.intercept('**/cqb-base-mgr/service/system/file/preview/*').as('getLabUser')
    cy.get('.el-table__body').find('.el-table__row').eq(0).find('.el-button.el-button--text.el-button--medium').eq(view).click({
      force: true
    })
    cy.wait('@getLabUser').then((xhr) => {
      let getStatus = xhr.response.statusCode
      let expectStatus = 200
      //断言报告能正常打开，
      expect(getStatus).to.eq(expectStatus)
    })
    //关闭报告
    cy.get('.ql-frame-viewer__close').click({
      force: true
    })
  })
  it('report-006-月度IQC报告_删除IQC报告', () => {
    let labCode = 'gdtest5'
    let keywordBox = 1
    let searchButton = 1
    let deleteButton = 3
    let push = 2
    cy.get('input[placeholder="实验室名称或编码"]').eq(keywordBox).clear({
      force: true
    }).type(labCode, {
      force: true
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/iqc/month/new-page?*').as('getWebData')
    //点击搜索
    cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
      force: true
    })
    cy.wait(500)
    cy.wait('@getWebData').then((getData) => {
      let total = getData.response.body.data.total
      if (total == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else {
        cy.get('.el-table__body').find('.el-table__row').eq(0).find('.el-button.el-button--text.el-button--medium').then((getData) => {
          let getlength = getData.length
          if (getlength == 3) { //该条数据已被推送,没有删除按键
            //将其状态改为待推送
            cy.get('.el-table__body').find('.el-table__row').eq(0).find('.el-button.el-button--text.el-button--medium').eq(push).click({
              force: true
            })
            //确认取消
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
              force: true
            })
            cy.wait(1000)
            //点击删除
            cy.get('.el-table__body').find('.el-table__row').eq(0).find('.el-button.el-button--text.el-button--medium').eq(deleteButton).click({
              force: true
            })
            cy.intercept('**/cqb-base-mgr/service/mgr/iqc/month*').as('delete')
            //确认删除
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
              force: true
            })
            cy.wait('@delete').then((xhr) => {
              let getStatus = xhr.response.statusCode
              let expectStatus = 200
              expect(getStatus).to.eq(expectStatus)
              cy.get('body').should('contain', '已删除成功')
            })
          } else {
            //点击删除
            cy.get('.el-table__body').find('.el-table__row').eq(0).find('.el-button.el-button--text.el-button--medium').eq(deleteButton).click({
              force: true
            })
            cy.intercept('**/cqb-base-mgr/service/mgr/iqc/month*').as('delete')
            //确认删除
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
              force: true
            })
            cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
              force: true
            })
            cy.wait('@delete').then((xhr) => {
              let getStatus = xhr.response.statusCode
              let expectStatus = 200
              expect(getStatus).to.eq(expectStatus)
              cy.get('body').should('contain', '已删除成功')
            })
          }
        })
      }
    })
  })
  it('report-007-月度IQC报告_所在地进行搜索', () => {
    let searchButton = 1
    let keywordBox = 1
    //清除实验室编码
    cy.get('input[placeholder="实验室名称或编码"]').eq(keywordBox).clear({
      force: true
    })
    //----------------选择北京--------------------------------
    cy.get('input[placeholder="请选择省"]').click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-scrollbar__view.el-select-dropdown__list li').contains('北京市').click({
      force: true
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/iqc/month/new-page?areaId=110000*').as('getBeijingData')
    //点击搜索
    cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
      force: true
    })
    cy.wait('@getBeijingData').then((xhr) => {
      let getStatus = xhr.response.statusCode
      let total = xhr.response.body.data.total
      let expectStatus = 200
      expect(expectStatus).to.eq(getStatus)
      if (total == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (total <= 20) {
        cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
      }
    })
    //----------------选择上海--------------------------------
    cy.get('input[placeholder="请选择省"]').click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-scrollbar__view.el-select-dropdown__list li').contains('上海市').click({
      force: true
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/iqc/month/new-page?areaId=310000*').as('getShanghaiData')
    //点击搜索
    cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
      force: true
    })
    cy.wait('@getShanghaiData').then((xhr) => {
      let getStatus = xhr.response.statusCode
      let total = xhr.response.body.data.total
      let expectStatus = 200
      expect(expectStatus).to.eq(getStatus)
      if (total == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (total <= 20) {
        cy.log(toatl)
        cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
      }
    })
    //----------------选择广东-------------------------------
    cy.get('input[placeholder="请选择省"]').click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-scrollbar__view.el-select-dropdown__list li').contains('广东省').click({
      force: true
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/iqc/month/new-page?areaId=440000*').as('getGuangdongData')
    //点击搜索
    cy.get('.el-button.el-button--primary.el-button--medium').eq(searchButton).click({
      force: true
    })
    cy.wait('@getGuangdongData').then((xhr) => {
      let getStatus = xhr.response.statusCode
      let total = xhr.response.body.data.total
      let expectStatus = 200
      expect(expectStatus).to.eq(getStatus)
      if (total == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (total <= 20) {
        cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
      }
    })
  })
})