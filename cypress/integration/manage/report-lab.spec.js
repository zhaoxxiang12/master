import { visitPage } from '../../shared/route'
import {
  confirmDelete
} from '../common/dialog'
import {
  elFormInput
} from '../common/form'
import {
  interceptDelete,
  interceptGet,
  interceptPost,
  waitRequest
} from '../common/http'
context('互认报告和证书管理', () => {
  const path = '**/cqb-base-mgr/service/iqc/report/monthGenerate*'
  const addGroup = (alias) => {
    cy.intercept({
      url: '**/cqb-base-mgr/service/iqc/compareGroup*',
      method: 'POST'
    }).as(alias)
  }
  const editCertModel = () => {
    return interceptPost('service/mgr/template/saveOrUpdate', editCertModel.name)
  }
  const waitSave = (onSuccess, onError) => {
    waitRequest({
      intercept: editCertModel,
      onBefore: () => {
        cy.get('.el-dialog__footer').eq(3).find('button').contains('保存').click()
      },
      onSuccess: (data) => {
        onSuccess && onSuccess(data)
      },
      onError: (msg) => {
        onError && onError(msg)
      }
    })
  }

  const findButton = (prop,text) => {
    return cy.get(`[aria-label=${prop}]`).findByText(text)
  }

  const visitCertPage = (alias) => { //访问年度互认证书页面
    let labCode = 'gdtest5'
    visitPage('cert-year')
    findButton('提示','关闭').click({
      force:true
    })
    cy.wait(2000)
    cy.get('.el-form.el-form--inline').findByPlaceholderText('请输入实验室名称或编码').type(labCode)
    interceptGet('/service/mgr/mutualRecogReport?*', 'getData')
    cy.wait(5000)
    cy.get('.el-form.el-form--inline').find('button').contains('搜索').click()
    cy.wait(1000)
    cy.wait('@getData')
  }
  const searchReportLab = (alias) => {
    let labCode = 'gdtest5'
    const $input = cy.findAllByPlaceholderText('请输入实验室名称或编码').first()
    $input.type(labCode)
    cy.intercept({
      url: '**/cqb-base-mgr/service/mgr/lab/pageWithRole?*',
      method: 'GET'
    }).as('searchLab')
    cy.clickButton('搜索')
    cy.wait('@searchLab')
    cy.wait(2000)
    cy.get('.el-checkbox__inner').last().click({
      force: true
    })
  }
  const generateReport = (alias) => {
    cy.intercept({
      url: path,
      method: 'POST'
    }).as(alias)
  }
  const generateCertReport = (month, editModel) => { //生成互认报告以及证书
    if (editModel == true) {
      cy.get('.el-form').last().find('.el-button.ql-dlgrm__tpl-item.el-button--medium').last().click({
        force: true
      })
    } else {
      cy.clickButton('生成互认报告')
      cy.get('button').contains('生成报告').should('be.exist')
      cy.get('.el-form').last().find('.el-button.ql-dlgrm__tpl-item.el-button--medium').first().click({
        force: true
      })
    }
    cy.get('.el-form').last().findAllByPlaceholderText('请选择').last().click({
      force: true
    })
    //报告合格有效期限
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains(month).click()
    //报告有效期
    cy.get('.el-form').last().find('[name=\'\']').last().click()
    cy.get('.el-picker-panel__content').find('.el-date-table__row').last().find('td').last().click({
      force: true
    })
    interceptGet('/service/mgr/mutualRecogReport/check?*', 'certReport')
    cy.get('.el-dialog__footer').eq(2)
      .find('button').contains('生成报告').click({
        force: true
      })
    cy.wait('@certReport').then((xhr) => {
      cy.compare(xhr)
    })
  }
  const reportModel = (alias) => {
    cy.clickButton('生成月度报告')
    cy.get('.el-icon-edit-outline.ql-dlgrm__tpl-edit').last().click({
      force: true
    })
  }
  const editReportModel = (position, perform, judge, value) => {
    let word = '自动测试页眉'
    cy.get('.el-form').last().find('.el-input__inner').last().clear().type(word, {
      force: true
    })
    // 页眉对齐方式
    cy.get('.el-form').last().find('[ type="radio"]').check(position, {
      force: true
    })
    //是否取消勾选自动生成页码
    if (perform == true) { //判断是否需要执行勾选生成页码
      if (1 == judge) {
        cy.get('.el-form').last().find('[type="checkbox"]').uncheck(value, {
          force: true
        })
      } else {
        cy.get('.el-form').last().find('[type="checkbox"]').check(value, {
          force: true
        })
      }
    }
    cy.get('.el-dialog__footer').eq(2).find('button').contains('保存').click()
    generateReport(position + 'Report')
    cy.get('button').contains('生成报告').click({
      force: true
    })
    cy.wait('@' + position + 'Report').then((xhr) => {
      cy.compare(xhr)
      cy.get('.el-message--success').should('contain', '生成任务已提交')
    })
  }
  const addCompareGroup = (groupName, group, addGroup, generateReport) => {
    let number = parseInt(Math.random() * 100000)
    cy.clickButton('生成月度报告')
    cy.get('.el-icon-edit-outline.ql-dlgrm__tpl-edit').last().click({
      force: true
    })
    //-----------------添加仪器分组--------------------
    cy.get('.el-button.el-button--primary.el-button--mini.is-plain').click()
    cy.get('.el-form').last().find('.el-input__inner').first().type(groupName)
    cy.get('.el-form').last().find('[type="checkbox"]').check(group, {
      force: true
    })
    cy.get('.el-form').last().find('button').contains('添加').click({
      force: true
    })
    cy.get('.ql-search').last().find('.el-form.el-form--inline').findAllByPlaceholderText('请输入实验室名称或编码').type('gd18001')
    cy.get('.ql-search').last().find('.el-form.el-form--inline').find('button').contains('搜索').click()
    cy.wait(1000)
    cy.get('.ql-search').last().find('[type="checkbox"]').first().check({
      force: true
    })
    cy.get('.el-dialog__footer').last().find('button').contains('保存').click()
    addGroup('addInstrGroup' + number)
    cy.get('.el-dialog__footer').eq(7).find('button').contains('保存').click()
    cy.wait('@addInstrGroup' + number).then((xhr) => {
      cy.compare(xhr)
      cy.get('.el-message.el-message--success').should('have.text', '已添加分组')
      let value = (xhr.response.body.data.id)
      let stringValue = value.toString()
      cy.get('.el-form').eq(4).find('[type="checkbox"]').check(stringValue, {
        force: true
      })
      cy.get('.el-dialog__footer').eq(1).find('button').contains('保存').click({
        force: true
      })
      generateReport('customerReport' + number)
      cy.get('button').contains('生成报告').click({
        force: true
      })
      cy.wait('@customerReport' + number).then((xhr) => {
        cy.compare(xhr)
        cy.get('.el-message--success').should('contain', '生成任务已提交')
        //删除新增的自定义组
        cy.clickButton('生成月度报告')
        cy.get('.el-icon-edit-outline.ql-dlgrm__tpl-edit').last().click({
          force: true
        })
        cy.get('button').contains('添加自定义组').should('be.exist')
        cy.get('.el-form').eq(4).find('.compare-group .el-checkbox-group.compare-group__tags .el-icon-close').then((getData) => {
          let length = getData.length
          cy.get('.el-form').eq(4).find('.compare-group .el-checkbox-group.compare-group__tags .el-icon-close').last().click({
            force: true
          })
          interceptDelete('/service/iqc/compareGroup/*', 'getGroup' + number)
          confirmDelete()
          cy.wait('@getGroup' + number).then((xhr) => {
            cy.compare(xhr)
            cy.get('.el-form').eq(4).find('.compare-group .el-checkbox-group.compare-group__tags .el-icon-close').should('have.length', length - 1)
            cy.get('.el-dialog__footer').eq(2).find('button').contains('保存').click({
              force: true
            })
            cy.get('button').contains('取消').click({
              force: true
            })
          })
        })
      })
    })
  }

  before(() => {
    cy.loginCQB()
  })
  it('001-月度汇总报告-月度汇总报告生成', () => {
    let reportMonth = 0
    let foshan = 1
    let yearBox = 2
    let currentYear = 0
    let choose = 0
    cy.intercept('**/service/mgr/report/ccls*').as('ccls')
    cy.visitPage('report-gen')
    cy.wait(500)
    cy.wait('@ccls').then((xhr) => {
      //选择佛山市临检的复选框
      cy.get('.el-checkbox__inner').eq(foshan).click({
        force: true
      })
      //点击‘生成报告’按钮
      cy.get('.report-mgr__tools').find('button').click({
        force: true
      })
      //选择报告类型(月度汇总报告生成)
      cy.get('.el-date-editor').click({
        force: true
      })
      //选择生成报告的月份 2021/3
      cy.get('.el-input__inner').eq(yearBox).click({
        force: true
      })
      cy.get('.el-date-picker__header-label').eq(currentYear).invoke('text').then((text) => {
        let getYear = parseInt(text.slice(0, 4))
        let differenceYear = getYear - 2020
        if (differenceYear == 0) {
          cy.get('.el-month-table').find('tbody>tr').eq(choose).find('td').eq(reportMonth).click({
            force: true
          })
        } else if (differenceYear < 0) {
          for (let i = 0; i < Math.abs(differenceYear); i++) {
            cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-d-arrow-right').click({
              force: true
            })
          }
          cy.get('.el-month-table').find('tbody>tr').eq(choose).find('td').eq(reportMonth).click({
            force: true
          })
        } else {
          for (let i = 0; i < Math.abs(differenceYear); i++) {
            cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
              force: true
            })
          }
          cy.get('.el-month-table').find('tbody>tr').eq(choose).find('td').eq(reportMonth).click({
            force: true
          })
        }
      })
      //点击弹窗中的‘生成报告’按钮
      cy.get('.el-dialog__footer').contains('生成报告').click({
        force: true
      })
      //操作开始执行,请查阅系统日志了解执行进展
      cy.get('.el-message--success').should('contain', '操作开始执行,请查阅系统日志了解执行进展')
    })
  })

  it('002-月度汇总报告-互认报告和证书管理-生成互认报告', () => {
    let monthTime = 3
    let dayTime = 5
    let checkBox = 2
    cy.wait(500)
    cy.visitPage('report-lab')
    cy.get('.el-message-box__btns button:first').click({
      force: true
    })
    //输入实验室名称
    cy.get('input[placeholder="请输入实验室名称或编码"]').first().type('gd18002')
    //点击搜索
    cy.get('.el-form-item__content > .el-button--primary > .el-icon-search ').click({
      force: true
    })
    cy.wait(1000)
    //勾取复选框（勾选搜索结果中的实验室）
    cy.get('.el-checkbox__inner').eq(checkBox).click({
      force: true
    })
    //点击生成互认报告按钮
    cy.get('.ql-search__tools-top').find('button').contains('生成互认报告').click({
      force: true
    })
    //选择模板
    cy.get('.el-dialog__body').find('button').contains('报告模版一').click({
      force: true
    })
    //点击有效期下拉框
    cy.get('.el-dialog__body').find('label[for="validTime"] + div').find('.el-input__suffix').click({
      force: true
    })
    //选择有效期月份
    cy.get('.el-select-dropdown').filter(':visible').find('.el-select-dropdown__item').eq(monthTime).click({
      force: true
    })
    //点击报告有效期下拉框
    cy.get('.el-input__inner').eq(14).click({
      force: true
    })
    // 选择下个月
    cy.get('.el-date-picker__header').find('button').eq(3).click({
      force: true
    })
    //选择有效期的天数
    cy.get('.el-picker-panel__content > table > tbody').find('tr').eq(3).find('td').eq(dayTime).click({
      force: true
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/check?*').as('pageWithRole')
    // 点击生成报告关闭弹窗
    cy.get('.el-dialog__wrapper').filter(':visible').find('button').contains('生成报告').click({
      force: true
    })
    cy.wait('@pageWithRole').then((xhr) => {
      expect(xhr.response.statusCode).to.eq(200)
      //断言弹窗提示语 
      cy.get('.el-message--success').should('contain', '生成任务已提交')
    })
  })

  it('003-月度汇总报告-互认报告和证书管理-单个条件搜索实验室', () => {
    cy.visitPage('report-lab')
    cy.get('.el-message-box__btns button:first').click({
      force: true
    })
    cy.intercept('**/service/mgr/lab/pageWithRole*').as('pageWithRole')
    //输入实验室名称
    cy.get('input[placeholder="请输入实验室名称或编码"]').first().clear({
      force: true
    }).type('gd18006')
    //点击搜索
    cy.get('.el-form-item__content > .el-button--primary > .el-icon-search ').click({
      force: true
    })
    cy.wait('@pageWithRole').then((xhr) => {
      expect(xhr.response.statusCode).to.eq(200)
      //断言，判断搜索结果与搜索条件相符
      cy.get('.ql-search__body').find('tbody').should('contain', 'gd18006')
      cy.get('.ql-search__body').find('tbody').should('contain', '佛山市高明区人民医院')
    })
  })

  it('004-月度汇总报告-互认报告和证书管理-组合条件搜索实验室', () => {
    cy.visitPage('report-lab')
    cy.get('.el-message-box__btns button:first').click({
      force: true
    })
    //点击展开
    cy.get('.el-form.el-form--inline').find('button').contains('展开').click({
      force: true
    })
    //输入实验室编码
    cy.get('.ql-search--advanced').find('input[placeholder="请输入实验室名称或编码"]').clear({
      force: true
    }).type('gd18003', {
      force: true
    })
    //点击标签下拉框
    cy.get('.el-select__tags').click({
      force: true
    })
    //选择标签
    cy.get('.el-select-group__wrap').eq(3).contains('公立').click({
      force: true
    })
    cy.intercept('**/service/mgr/lab/pageWithRole*').as('pageWithRole')
    //点击搜索
    cy.get('.ql-search__btns').find('button[type="submit"]').click({
      force: true
    })
    cy.wait('@pageWithRole').then((xhr) => {
      expect(xhr.response.statusCode).to.eq(200)
      //对搜索结果进行断言
      cy.get('.el-table__body-wrapper').find('.el-table__row').should('contain', '佛山市三水区人民医院')
    })
  })

  it('005-月度汇总报告-互认报告和证书管理-预览互认报告', () => {
    let keywordBox = 0
    let startMonth = 3
    let startDay = 4
    let startTr = 3
    let endMonth = 15
    let endTr = 3
    let endDay = 0
    cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/cert/cert-year')
    cy.get('.el-message-box__btns button:first').click({
      force: true
    })
    cy.get('.el-form.el-form--inline')
      .find('button').contains('展开').click()
    //-----------------------选择创建开始时间---------------------------------
    cy.get('[placeholder="开始时间"]').first().click()
    cy.get('.el-date-picker__header-label').first().invoke('text').then((data) => {
      let getYear = parseInt(data.slice(0, 4))
      let difference = getYear - 2021
      if (difference == 0) {
        cy.get('.el-date-picker__header-label').last().click()
        cy.get('.el-month-table').find('.cell').eq(startMonth).click()
        cy.get('.el-date-table').find('.el-date-table__row').eq(startTr).find('.available').eq(startDay).click()

      } else {
        for (let i = 0; i < Math.abs(difference); i++) {
          cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click()
        }
        cy.get('.el-date-picker__header-label').last().click()
        cy.get('.el-month-table').find('.cell').eq(startMonth).click()
        cy.get('.el-date-table').find('.el-date-table__row').eq(startTr).find('.available').eq(startDay).click()
      }
    })
    //-----------------------选择创建结束时间---------------------------------
    cy.get('[placeholder="结束时间"]').first().click()
    cy.get('.el-date-picker__header-label').first().invoke('text').then((data) => {
      let getYear = parseInt(data.slice(0, 4))
      let difference = getYear - 2021
      if (difference == 0) {
        cy.get('.el-date-picker__header-label').last().click()
        cy.get('.el-month-table').find('.cell').eq(endMonth).click()
        cy.get('.el-date-table').last().find('.el-date-table__row').eq(endTr).find('.available').eq(endDay).click()

      } else {
        for (let i = 0; i < Math.abs(difference); i++) {
          cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click()
        }
        cy.get('.el-date-picker__header-label').last().click()
        cy.get('.el-month-table').find('.cell').eq(endMonth).click()
        cy.get('.el-date-table').last().find('.el-date-table__row').eq(endTr).find('.available').eq(endDay).click()
      }
    })
    //搜索出要预览的实验室  
    cy.get('input[placeholder="请输入实验室名称或编码"]').eq(keywordBox).type('gd18001', {
      force: true
    })
    cy.get('.ql-search__header').contains('搜索').click({
      force: true
    })
    cy.intercept({
      url: '**.pdf*',
      method: 'GET'
    }).as('mutualRecogReport')
    cy.get('.el-table__row').first().find('button').contains('预览').first().click({
      force: true
    })
    cy.wait('@mutualRecogReport').then((xhr) => {
      expect(xhr.response.statusCode).to.eq(200)
    })
    cy.get('.ql-frame-viewer__close').click({
      force: true
    })
  })
  it('006-月度汇总报告-互认报告和证书管理-预览证书', () => {
    let view = 2
    cy.intercept('**.pdf*').as('mutualRecogReport')
    //点击预览按钮 
    cy.get('.el-table__row').first().find('button').eq(view).click({
      force: true
    })
    cy.wait('@mutualRecogReport').then((xhr) => {
      expect(xhr.response.statusCode).to.eq(200)
      //断言弹窗内容
      cy.get('.ql-frame-viewer__header').contains('报告预览')
      //关闭预览窗口
      cy.get('.ql-frame-viewer__close').click({
        force: true
      })
    })
    cy.get('[placeholder="开始时间"]').first().click()
    cy.get('.el-input__icon.el-icon-circle-close').click()
    cy.get('[placeholder="结束时间"]').first().click()
    cy.get('.el-input__icon.el-icon-circle-close').click()
  })
  it('007-月度汇总报告-互认报告和证书管理-推送或取消互认报告', () => {
    let keywordBox = 0
    let first = 0
    let push = 3
    let endMonth = 15
    let endTr = 3
    let endDay = 0
    //-----------------------选择创建结束时间---------------------------------
    cy.get('[placeholder="结束时间"]').first().click()
    cy.get('.el-date-picker__header-label').first().invoke('text').then((data) => {
      let getYear = parseInt(data.slice(0, 4))
      let difference = getYear - 2021
      if (difference == 0) {
        cy.get('.el-date-picker__header-label').last().click()
        cy.get('.el-month-table').find('.cell').eq(endMonth).click()
        cy.get('.el-date-table').last().find('.el-date-table__row').eq(endTr).find('.available').eq(endDay).click()

      } else {
        for (let i = 0; i < Math.abs(difference); i++) {
          cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click()
        }
        cy.get('.el-date-picker__header-label').last().click()
        cy.get('.el-month-table').find('.cell').eq(endMonth).click()
        cy.get('.el-date-table').last().find('.el-date-table__row').eq(endTr).find('.available').eq(endDay).click()
      }
    })
    //搜索要取消推送的实验室报告   
    cy.get('input[placeholder="请输入实验室名称或编码"]').eq(keywordBox).clear({
      force: true
    }).type('gd18002', {
      force: true
    })
    cy.get('.ql-search__header').contains('搜索').click({
      force: true
    })
    cy.wait(1000)
    //获取操作前的推送/取消推送文案
    cy.get('.el-table__body').find('.el-table__row').eq(first).find('.el-button.el-button--text.el-button--medium').eq(push).invoke('text').then((text) => {
      let oldText = text
      if (oldText == '推送') {
        //点击推送/取消推送
        cy.get('.el-table__body').find('.el-table__row').eq(first).find('.el-button.el-button--text.el-button--medium').eq(push).click({
          force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/pushStatus*').as('push')
        //确认推送/取消推送
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--primary').click({
          force: true
        })
        cy.wait('@push').then((data) => {
          let getStatus = data.response.statusCode
          let expectStatus = 200
          expect(expectStatus).to.eq(getStatus)
        })
        cy.get('body').should('contain', '已推送')
      } else {
        //点击推送/取消推送
        cy.get('.el-table__body').find('.el-table__row').eq(first).find('.el-button.el-button--text.el-button--medium').eq(push).click({
          force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport/pushStatus*').as('push')
        //确认推送/取消推送
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--primary').click({
          force: true
        })
        cy.wait('@push').then((data) => {
          let getStatus = data.response.statusCode
          let expectStatus = 200
          expect(expectStatus).to.eq(getStatus)
        })
        cy.get('body').should('contain', '已取消推送')
      }
      cy.wait(1000)
      cy.get('.el-table__body').find('.el-table__row').eq(first).find('.el-button.el-button--text.el-button--medium').eq(push).invoke('text').then((text) => {
        let newText = text
        expect(oldText).not.to.eq(newText)
      })
    })
  })

  it('008-月度汇总报告-互认报告和证书管理-批量推送互认报告', () => {
    //搜索出要推送的报告    
    cy.get('.ql-search__header').find('input[placeholder="请输入实验室名称或编码"]').eq(0).clear({
      force: true
    }).eq(0).type('gd18009', {
      force: true
    })
    cy.get('.ql-search__header').contains('搜索').click({
      force: true
    })
    cy.wait(1000)
    //点击全选复选框
    cy.get('.el-table__header-wrapper').find('.el-checkbox').click({
      force: true
    })
    //点击批量推送按钮
    cy.get('.ql-search__tools-top').contains('批量推送').click({
      force: true
    })
    //点击确认弹窗
    cy.intercept('**/cqb-base-mgr/service/mgr/mutualRecogReport?*').as('mutualRecogReport')
    cy.get('.el-message-box__btns').contains('推送').click({
      force: true
    })
    cy.wait('@mutualRecogReport').then((xhr) => {
      expect(xhr.response.statusCode).to.eq(200)
      //断言推送提示
      cy.get('.el-message--success').should('contain', '已批量推送')
    })
  })
  it('009-月度汇总报告-互认报告和证书管理-批量取消推送', () => {
    cy.wait(300)
    cy.get('.ql-search__header').find('input[placeholder="请输入实验室名称或编码"]').first().clear({
      force: true
    }).eq(0).type('gd18001', {
      force: true
    })
    cy.get('.ql-search__header').contains('搜索').click({
      force: true
    })
    cy.wait(1000)
    cy.get('.el-table__header-wrapper').find('.el-checkbox').click({
      force: true
    })
    //点击批量取消推送按钮 
    cy.get('.ql-search__tools-top').contains('批量取消推送').click({
      force: true
    })
    cy.intercept('**/service/mgr/mutualRecogReport*').as('mutualRecogReport')
    //点击确认弹窗按钮
    cy.get('.el-message-box__btns').contains('取消推送').click({
      force: true
    })
    cy.wait('@mutualRecogReport').then((xhr) => {
      expect(xhr.response.statusCode).to.eq(200)
      //断言弹窗内容
      cy.get('.el-message--success').should('contain', '已批量取消推送')
    })
  })

  it('010-月度汇总报告-批量删除互认报告', () => {
    cy.get('input[placeholder="请输入实验室名称或编码"]').last().clear()
    cy.get('[placeholder="结束时间"]').first().click()
    cy.get('.el-input__icon.el-icon-circle-close').click()
    cy.get('.ql-search__header').contains('搜索').click({
      force: true
    })
    cy.get('.el-table__row').first().find('.el-checkbox__inner').click()
    //点击批量批量删除按钮 
    cy.get('.ql-search__tools-top').contains('批量删除').click({
      force: true
    })
    cy.intercept('**/service/mgr/mutualRecogReport*').as('mutualRecogReport')
    //点击确认弹窗按钮
    confirmDelete()
    cy.wait('@mutualRecogReport').then((xhr) => {
      let expectStatus = 200
      let responseStatus = xhr.response.statusCode
      expect(responseStatus).to.eq(expectStatus)
      //断言弹窗内容
      cy.get('.el-message--success').should('contain', '已删除成功')
    })
  })

  it('011-月度汇总报告-预览月度汇总报告', () => {
    let reportMonth = 2
    let currentYear = 0
    let choose = 0
    let year = 0
    cy.intercept('**/service/mgr/report/summary/month*').as('monthReport')
    cy.visitPage('summary-month')
    cy.get('.el-message-box__btns button:first').click({
      force: true
    })
    cy.wait('@monthReport').then((xhr) => {
      //搜索出要推送的报告     
      cy.get('.ql-search__header').find('.el-date-editor').click({
        force: true
      })
      cy.get('.el-input__inner').eq(year).click({
        force: true
      })
      //搜索栏时间选择，如一月
      cy.get('.el-date-picker__header-label').eq(currentYear).invoke('text').then((text) => {
        let getYear = parseInt(text.slice(0, 4))
        let differenceYear = getYear - 2021
        if (differenceYear == 0) {
          cy.get('.el-month-table').find('tbody>tr').eq(choose).find('td').eq(reportMonth).click({
            force: true
          })
        } else if (differenceYear < 0) {
          for (let i = 0; i < Math.abs(differenceYear); i++) {
            cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-d-arrow-right').click({
              force: true
            })
          }
          cy.get('.el-month-table').find('tbody>tr').eq(choose).find('td').eq(reportMonth).click({
            force: true
          })
        } else {
          for (let i = 0; i < Math.abs(differenceYear); i++) {
            cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
              force: true
            })
          }
          cy.get('.el-month-table').find('tbody>tr').eq(choose).find('td').eq(reportMonth).click({
            force: true
          })
        }
      })
      //点击搜索按钮
      cy.get('.ql-search__header').contains('搜索').click({
        force: true
      })
      //点击预览按钮 
      cy.get('.el-table__body-wrapper').contains('预览').click({
        force: true
      })
      cy.get('.ql-frame-viewer__header').should('contain', '报告预览').and('contain', '关闭')
      cy.get('.ql-frame-viewer__header').contains('关闭').click({
        force: true
      })
    })
  })

  it('012-月度汇总报告-删除月度汇总报告', () => {
    let time = 0
    let startDate = 0
    let startMonth = 0
    let chooseStartMonth = 0
    cy.visitPage('summary-month')
    cy.get('.el-message-box__btns button:first').click({
      force: true
    })
    //搜索出要推送的报告     
    cy.get('.ql-search__header').find('.el-date-editor').click({
      force: true
    })
    //搜索栏时间选择，如2021/3
    cy.get('.el-input__inner').eq(time).click({
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
    cy.wait(5000)
    //点击搜索按钮
    cy.get('.ql-search__header').contains('搜索').click({
      force: true
    })
    cy.wait(1000)
    cy.get('.el-table__body .el-table__row').first().findByText('删除').click({
      force:true
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/report/summary/*').as('deleteReport')
    confirmDelete()
    cy.wait('@deleteReport').then((xhr) => {
      expect(xhr.response.statusCode).to.eq(200)
      cy.get('.el-table__empty-block').should('contain', '暂无数据')
    })
  })
  it('013-实验室报告生成-生成总结分析报告', () => {
    cy.visitPage('report-lab')
    searchReportLab()
    cy.clickButton('生成月度报告')
    cy.get('button', {
      timeout: 10000
    }).contains('预览').should('be.exist')
    cy.get('.el-checkbox__inner').last().click({
       
      force: true
    })
    cy.get('.el-button.ql-dlgrm__tpl-item.el-button--medium').first().click({
      force: true
    })
    generateReport('generateReport')
    cy.clickButton('生成报告')
    cy.wait('@generateReport').then((xhr) => {
      cy.compare(xhr)
    })
  })
  it('014-实验室报告生成-使用不同模板生成报告', () => {
    //-------------模板选择一----------------
    cy.clickButton('生成月度报告')
    cy.get('button', {
      timeout: 10000
    }).contains('预览').should('be.exist')
    cy.get('.el-button.ql-dlgrm__tpl-item.el-button--medium').first().click()
    cy.get('button', {
      timeout: 10000
    }).contains('预览').should('be.exist')
    cy.get('.el-checkbox__inner').last().click()
    cy.get('.el-button.ql-dlgrm__tpl-item.el-button--medium').first().click()
    generateReport('modelOneReport')
    cy.clickButton('生成报告')
    cy.wait('@modelOneReport').then((xhr) => {
      cy.compare(xhr)
    })
    //-------------模板选择二----------------
    cy.clickButton('生成月度报告')
    cy.get('button', {
      timeout: 10000
    }).contains('预览').should('be.exist')
    cy.get('.el-button.ql-dlgrm__tpl-item.el-button--medium').first().click()
    cy.get('button', {
      timeout: 10000
    }).contains('预览').should('be.exist')
    cy.get('.el-checkbox__inner').last().click()
    cy.get('.el-button.ql-dlgrm__tpl-item.el-button--medium').eq(1).click()
    generateReport('modelTwoReport')
    cy.clickButton('生成报告')
    cy.wait('@modelTwoReport').then((xhr) => {
      cy.compare(xhr)
    })
    //-------------模板选择三----------------
    cy.clickButton('生成月度报告')
    cy.get('button', {
      timeout: 10000
    }).contains('预览').should('be.exist')
    cy.get('.el-button.ql-dlgrm__tpl-item.el-button--medium').first().click()
    cy.get('button', {
      timeout: 10000
    }).contains('预览').should('be.exist')
    cy.get('.el-checkbox__inner').last().click()
    cy.get('.el-button.ql-dlgrm__tpl-item.el-button--medium').last().click()
    generateReport('modelThreeReport')
    cy.clickButton('生成报告')
    cy.wait('@modelThreeReport').then((xhr) => {
      cy.compare(xhr)
    })
  })
  it('015-实验室报告生成-添加自定义组并生成报告', () => {
    let instrGroupName = '仪器自定义分组'
    let reaGroupName = '试剂自定义分组'
    let methodGroupName = '方法自定义分组'
    let instr = 'INSTR'
    let rea = 'REA'
    let meth = 'METH'

    //--------------添加仪器分组--------------
    addCompareGroup(instrGroupName, instr, addGroup, generateReport)
    //--------------添加试剂分组--------------
    addCompareGroup(reaGroupName, rea, addGroup, generateReport)
    // --------------添加方法分组--------------
    addCompareGroup(methodGroupName, meth, addGroup, generateReport)
  })
  it('016-实验室报告生成-显示参数勾选与取消勾选', () => {
    let choice = 'msgOutControCorrectRate'
    let SDI = 'sdi'
    reportModel()
    cy.get('.el-form').last().find('[type="checkbox"]').uncheck(choice, {
      force: true
    })
    cy.get('.el-form').last().find('[type="checkbox"]').uncheck(SDI, {
      force: true
    })
    cy.get('.el-dialog__footer').eq(2).find('button').contains('保存').click()
    generateReport('report')
    cy.get('button').contains('生成报告').click({
      force: true
    })
    cy.wait('@report').then((xhr) => {
      cy.compare(xhr)
    })
    reportModel()
    cy.get('.el-form').last().find('[type="checkbox"]').check(choice, {
      force: true
    })
    cy.get('.el-form').last().find('[type="checkbox"]').check(SDI, {
      force: true
    })
    cy.get('.el-dialog__footer').eq(2).find('button').contains('保存').click()
    cy.get('button').contains('生成报告').click({
      force: true
    })
  })
  it('017-实验室报告生成-模板页眉编辑页码勾选', () => {
    let left = 'left'
    let right = 'right'
    let middle = 'center'
    let value = ''
    let perform = true
    //页眉左对齐
    reportModel()
    editReportModel(left, perform, 1, value)
    //页眉右对齐
    reportModel()
    editReportModel(right, perform, 2, value)
    //页眉居中对齐
    reportModel()
    editReportModel(middle, false)
  })
  it('018-互认报告以及证书生成-条件相同报告会覆盖', () => {
    let month = 6
    generateCertReport(month)
    visitCertPage()
    cy.get('.el-table__body').find('.el-table__row').first().find('td').eq(5).invoke('text').then((createTime) => {
      let time = createTime.replace(/(\s*$)/g, '')
      cy.visitPage('report-lab')
      //再次生成报告
      searchReportLab()
      generateCertReport(month)
      visitCertPage()
      cy.get('.el-table__body').find('.el-table__row').first().find('td').eq(5).invoke('text').then((createTime) => {
        let newTime = createTime.replace(/(\s*$)/g, '')
        expect(time).not.to.eq(newTime)
      })
    })
  })
  it('019-互认报告以及证书生成-条件不同报告会新增(有效期限不同)', () => {
    let month = 7
    cy.get('.el-table__body').find('.el-table__row').then((getLength) => {
      let length = getLength.length
      visitPage('report-lab')
      findButton('提示','关闭').click({
        force:true
      })
      cy.wait(2000)
      searchReportLab()
      // 生成不同月份报告
      generateCertReport(month)
      visitCertPage()
      let newLength = length + 1
      cy.get('.el-table__body').find('.el-table__row').should('have.length', newLength)
      //删除报告
      cy.get('.ql-search__tools-top.is-left').find('[type=checkbox]').check('',{
        force:true
      })
      cy.clickButton('批量删除')
      confirmDelete()
    })
  })
  it('020-互认报告-模板编辑', () => {
    let reportMobelName = '报告模板三'
    let repeatModelName = '报告模版一'
    let title = '互认报告标题'
    let subTitleName = '副标题'
    let headerTemplate = 'headerTemplate' 
    visitPage('report-lab')
    findButton('提示','关闭').click({
      force:true
    })
    cy.wait(2000)
    searchReportLab()
    cy.clickButton('生成互认报告')
    cy.get('.el-form').last().find('.el-icon-edit-outline.ql-dlgrm__tpl-edit').last().click({
      force: true
    })

    //模板名称为空不能保存
    elFormInput('name', null, () => {

    })
    cy.get('.el-form-item__error').should('contain', '请输入模板名称')
    //上传logo
    cy.get('.el-form').last().find('[type="file"]').first().attachFile('logo.png')
    //上传印章
    cy.get('.el-form').last().find('[type="file"]').last().attachFile('logo.png')
    //标题
    elFormInput('title', title, () => {

    })
    //副标题
    elFormInput('subtitle', subTitleName, () => {

    })
    //页眉
    elFormInput('headerTemplate',headerTemplate,'function',()=>{

    })
    //模板名称重复不能保存
    elFormInput('name', repeatModelName, () => {

    })
    waitSave(null, (data) => {
      cy.get('.el-message__content').should('have.text','模板名称不能重复')
    })
    //副标题为空不能保存
    elFormInput('subtitle',null,()=>{

    })
    elFormInput('name',reportMobelName,'function',()=>{

    })
    cy.get('.el-form-item__error').should('contain', '请输入副标题')
    //取消勾选【结果互认判断标准】
    elFormInput('subtitle',subTitleName,()=>{

    })
    cy.get('.el-form').last().find('[type="checkbox"]').uncheck('mutualStandard',{
      force:true
    })

    waitSave((data)=>{
      expect(data).to.eq('true')
      generateCertReport(6,true)
    })
    // 取消勾选专业
    cy.get('.ql-search__tools-top.is-left').find('.el-button.el-button--primary.el-button--medium.is-plain').last().click()
    cy.get('.el-form').last().find('.el-icon-edit-outline.ql-dlgrm__tpl-edit').last().click({
      force: true
    })
    cy.get('.el-form').last().find('[type="checkbox"]').check('mutualStandard',{
      force:true
    })
    cy.get('.el-form').last().find('[type="checkbox"]').uncheck('spec',{
      force:true
    })
    waitSave()
    cy.wait(2000)
    generateCertReport(6,true)

    cy.get('.ql-search__tools-top.is-left').find('.el-button.el-button--primary.el-button--medium.is-plain').last().click()
    cy.get('.el-form').last().find('.el-icon-edit-outline.ql-dlgrm__tpl-edit').last().click({
      force: true
    })
    cy.get('.el-form').last().find('[type="checkbox"]').check('spec',{
      force:true
    })
    cy.get('.el-dialog__footer').eq(3).find('button').contains('保存').click()
    //删除报告
    visitCertPage()
    cy.get('.ql-search__tools-top.is-left').find('[type=checkbox]').check('',{
      force:true
    })
    cy.clickButton('批量删除')
    confirmDelete()
  })
})