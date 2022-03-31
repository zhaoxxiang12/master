import dayjs from 'dayjs'
import {
  visitPage
} from '../../shared/route'
import {
  clickButton,
  dialogButton,
  elformOperation
} from '../common/button'
import {
  activeDateDay,
  activeDateMonth
} from '../common/date'
import {
  clickCancelInDialog,
  clickOkInDialog,
  confirmDelete,
  withinDialog
} from '../common/dialog'
import {
  elFormInput
} from '../common/form'
import {
  interceptAll,
  interceptPost,
  waitIntercept,
  waitRequest
} from '../common/http'
import {
  validSuccessMessage
} from '../common/message'
import {
  activeSelect
} from '../common/select'
import {
  expandSearchConditions
} from '../eqa/eqa-order/eqa-order'
import {
  getDialog
} from '../message/message'
import {
  elform,
  findLabel
} from '../mutual-result/mutual-item'
import {
  clickSearch
} from '../setting/report-monitor/report-monitor'
import {
  relateLab
} from '../user-info/lab-info'
import {
  previewCertReport,
  pushData,
  interceQueryData,
  closePreviewWindow
} from './cert-year'
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
        withinDialog(clickOkInDialog, '编辑模板')
      },
      onSuccess: (data) => {
        onSuccess && onSuccess(data)
      },
      onError: (msg) => {
        onError && onError(msg)
      }
    })
  }

  const interceptSummaryMonth = () => {
    return interceptAll('service/mgr/report/summary/month?*', interceptSummaryMonth.name)
  }

  const interceptDeleteCompareGroup = () => {
    return interceptAll('service/iqc/compareGroup/*', interceptDeleteCompareGroup.name)
  }

  const findButton = (prop, text) => {
    return cy.get(`[aria-label=${prop}]`).findByText(text)
  }

  const interceptMutualRecogReport = () => {
    return interceptAll('service/mgr/mutualRecogReport/check?*', interceptMutualRecogReport.name)
  }

  const interceptGetMutualRecogReport = () => {
    return interceptAll('service/mgr/mutualRecogReport?*', interceptGetMutualRecogReport.name)
  }


  const visitCertPage = (alias) => { //访问年度互认证书页面
    let labCode = 'gdtest2'
    visitPage('cert-year')
    cy.wait(2000)
    expandSearchConditions('高级搜索')
    cy.wait(1000)
    elform('keyword').type(labCode)
    waitIntercept(interceptGetMutualRecogReport, () => {
      clickSearch()
    }, () => {
      cy.wait(1000)
    })
  }

  const interceptSearchLab = () => {
    return interceptAll('service/mgr/lab/pageWithRole?*', interceptSearchLab.name)
  }

  const searchReportLab = (labCode = 'gdtest2') => {
    expandSearchConditions('高级搜索')
    cy.wait(1000)
    elform('labName').clear({
      force: true
    }).type(labCode, {
      force: true
    })
    clickSearch()
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
    waitIntercept(interceptMutualRecogReport, () => {
      withinDialog(clickOkInDialog, '生成报告')
    }, (data) => {})
  }
  const reportModel = (alias) => {
    cy.clickButton('生成月度报告')
    cy.get('.el-icon-edit-outline.ql-dlgrm__tpl-edit').last().click({
      force: true
    })
  }
  const editReportModel = (position, perform, judge, value) => {
    let word = '自动测试页眉'
    cy.get('.el-form').last().find('.el-input__inner').last().clear({
      force: true
    }).type(word, {
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
    withinDialog(clickOkInDialog, '编辑模板')
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
    cy.wait(2000)
    cy.get('.el-icon-edit-outline.ql-dlgrm__tpl-edit').last().click({
      force: true
    })
    //-----------------添加仪器分组--------------------
    cy.get('.el-button.el-button--primary.el-button--mini.is-plain').click()
    cy.get('.el-form').last().find('.el-input__inner').first().type(groupName)
    cy.get('.el-form').last().find('[type="checkbox"]').check(group, {
      force: true
    })
    //关联实验室
    relateLab('添加分组', 'gd18001', '指定实验室')
    cy.wait(1000)
    withinDialog(clickOkInDialog, '选择实验室')
    addGroup('addInstrGroup' + number)
    withinDialog(clickOkInDialog, '添加分组')
    cy.wait('@addInstrGroup' + number).then((xhr) => {
      cy.compare(xhr)
      cy.get('.el-message.el-message--success').should('have.text', '已添加分组')
      let value = (xhr.response.body.data.id)
      let stringValue = value.toString()
      cy.get('.el-form').eq(4).find('[type="checkbox"]').check(stringValue, {
        force: true
      })
      cy.wait(2000)
      withinDialog(clickOkInDialog, '编辑模板')
      getDialog('生成报告').within(() => {
        dialogButton('templateId').last().click({
          force: true
        })
      })
      cy.wait(2000)
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
        getDialog('编辑模板').within(() => {
          elformOperation('compareGroup').find('.el-icon-close').then((getData) => {
            elformOperation('compareGroup').find('.el-icon-close:visible').last().click({
              force: true
            })
            waitIntercept(interceptDeleteCompareGroup, () => {
              confirmDelete()
              cy.wait(1000)
            }, () => {
              elformOperation('compareGroup').find('.el-icon-close').should('have.length', getData.length - 1)
            })
          })
        })
        withinDialog(clickOkInDialog, '编辑模板')
        withinDialog(clickCancelInDialog, '生成报告')
        // cy.get('.el-form').eq(4).find('.compare-group .el-checkbox-group.compare-group__tags .el-icon-close').then((getData) => {
        //   let length = getData.length
        //   cy.get('.el-form').eq(4).find('.compare-group .el-checkbox-group.compare-group__tags .el-icon-close').last().click({
        //     force: true
        //   })
        //     getDialog('编辑模板').within(() => {
        //       
        //     })
        //     cy.get('.el-form').eq(4).find('.compare-group .el-checkbox-group.compare-group__tags .el-icon-close').should('have.length', length - 1)
        //    
        //    
        //   })
        // })
      })
    })
  }

  before(() => {
    cy.loginCQB()
  })
  context('月度汇总报告', () => {
    const summaryMonthTime = '2021年三月'
    before(() => {
      visitPage('report-gen')
    })
    it('001-月度汇总报告-月度汇总报告生成', () => {
      // cy.intercept('**/service/mgr/report/ccls*').as('ccls')
      // cy.visitPage('report-gen')
      // cy.wait(500)
      // cy.wait('@ccls').then((xhr) => {
      //   //选择佛山市临检的复选框
      //   cy.get('[role="treeitem"]').contains('佛山市').parents('.el-tree-node__content')
      //   .find('[type="checkbox"]').check({
      //     force: true
      //   })
      //   //点击‘生成报告’按钮
      //  clickButton('生成报告')
      //   //选择报告类型(月度汇总报告生成)
      //   cy.get('.el-date-editor').click({
      //     force: true
      //   })
      //   //选择生成报告的月份 2021/3
      //   elform('month').click({
      //     force:true
      //   })
      //   cy.wait(1000)
      //   activeDateMonth(summaryMonthTime)
      //   //点击弹窗中的‘生成报告’按钮
      //   cy.get('.el-dialog__footer').contains('生成报告').click({
      //     force: true
      //   })
      //   //操作开始执行,请查阅系统日志了解执行进展
      //   cy.get('.el-message--success').should('contain', '操作开始执行,请查阅系统日志了解执行进展')
      // })
    })
    context('互认报告和证书管理', () => {
      before(() => {
        visitPage('report-lab')
        expandSearchConditions('高级搜索')
      })
      it('002-月度汇总报告-互认报告和证书管理-生成互认报告', () => {
        //   const labCode = 'gd18002'
        //   elform('labName').type(labCode, {
        //     force:true
        //   })
        //   clickButton('搜索')
        //   cy.wait(1000)
        //   cy.get('.el-table__body .el-table__row')
        //   .contains(labCode)
        //   .parents('.el-table__row')
        //   .find('[type = "checkbox"]')
        //   .check({
        //     force:true
        //   })
        //   clickButton('生成互认报告')
        //   //选择模板
        //   cy.get('.el-dialog__body').find('button').contains('报告模版一').click({
        //     force: true
        //   })
        //   elform('validTime').click()
        //   activeSelect(6)
        //   elform('validDateUntil').click()
        //   const currentTime = dayjs().format('YYYY/MM/DD')
        //   activeDateDay(currentTime)
        //   waitIntercept(interceptMutualRecogReport, () => {
        //     withinDialog(clickOkInDialog, '生成报告')
        //   }, () => {
        //     validSuccessMessage()
        //   })
      })
    })
    context('筛选条件', () => {
      before(() => {
        visitPage('report-lab')
        expandSearchConditions('高级搜索')
      })
      it('003-单个条件搜索实验室', () => {
        const labCode = 'gd18006'
        elform('labName').type(labCode, {
          force: true
        })
        waitIntercept(interceptSearchLab, () => {
          clickButton('搜索')
        }, () => {
          cy.get('.ql-search__body').find('tbody').should('contain', 'gd18006')
          cy.get('.ql-search__body').find('tbody').should('contain', '佛山市高明区人民医院')
        })
      })
      it('004-组合条件搜索', () => {
        const labCode = 'gd18003'
        elform('labName').clear({
          force: true
        }).type(labCode, {
          force: true
        })
        elform('tags').click({
          force: true
        })
        activeSelect('公立')
        waitIntercept(interceptSearchLab, () => {
          clickButton('搜索')
        }, () => {
          cy.get('.el-table__body-wrapper').find('.el-table__row').should('contain', '佛山市三水区人民医院')
        })
      })
    })
    context('互认报告管理', () => {
      before(() => {
        const creatStartTime = '2020/5/11'
        const creatEndTime = dayjs().format('YYYY/MM/DD')
        visitPage('cert-year')
        expandSearchConditions('高级搜索')
        findLabel('创建时间').first().click({
          force: true
        })
        activeDateDay(creatStartTime)
        cy.wait(1000)
        findLabel('创建时间').last().click({
          force: true
        })
        activeDateDay(creatEndTime)
      })
      context('报告和证书预览', () => {
        it('005-预览互认报告', () => {
          const labCode = 'gd18001'
          elform('keyword').type(labCode, {
            force: true
          })
          previewCertReport()
        })
        it('006-预览证书', () => {
          const labCode = 'gd18002'
          elform('keyword').clear({
            force: true
          }).type(labCode, {
            force: true
          })
          previewCertReport(false)
        })
      })
      context('推送操作', () => {
        context('单个操作', () => {
          it('007-单个推送', () => {
            pushData(false, '推送')
          })
          it('008-单个取消推送', () => {
            pushData(false, '取消推送', true)
          })
        })
        context('批量操作', () => {
          it('009-批量推送', () => {
            pushData(true, '批量推送', false)
          })
          it('010-批量取消推送', () => {
            pushData(true, '批量取消推送', true)
          })
        })
      })
      context('删除', () => {
        it('011-批量删除', () => {
          const labCode = 'gd18030'
          elform('keyword').type(labCode, {
            force: true
          })
          waitIntercept(interceQueryData, () => {
            clickSearch()
          }, data => {
            console.log(data);
            if (data.total) {
              const rowIndex = data.data.findIndex(item => item.pushStatus === false)
              if (rowIndex !== -1) {
                cy.get('.el-table__row').eq(rowIndex).find('[type="checkbox"]').check({
                  force: true
                })
                clickButton('批量删除')
                confirmDelete()
                validSuccessMessage()
              }
            }
          })
        })
      })
    })
    context('月度汇总报告操作', () => {
      before(() => {
        visitPage('summary-month')
      })
      it('012-预览', () => {
        elform('date').click({
          force: true
        })
        activeDateMonth(summaryMonthTime)
        waitIntercept(interceptSummaryMonth, () => {
          clickSearch()
        }, data => {
          if (data.total) {
            cy.get('.el-table__row').findByText('预览').click({
              force: true
            })
            closePreviewWindow()
          }
        })
      })
      it('013-删除', () => {
        cy.wait(2000)
        waitIntercept(interceptSummaryMonth, () => {
          clickSearch()
        }, data => {
          if (data.total) {
            cy.get('.el-table__row').findByText('删除').click({
              force: true
            })
            if (data.total === 1) {
              confirmDelete()
              cy.wait(2000)
              cy.get('.el-table__empty-block').should('contain', '暂无数据')
            }
          }
        })
      })
    })
    context('总结分析报告', () => {
      before(() => {
        visitPage('report-lab')
      })
      it('014-生成总结分析报告', () => {
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
      it('015-使用不同模板生成报告', () => {
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
      it('016-实验室报告生成-添加自定义组并生成报告', () => {
        let instrGroupName = '仪器自定义分组'
        let reaGroupName = '试剂自定义分组'
        let methodGroupName = '方法自定义分组'
        let instr = 'INSTR'
        let rea = 'REA'
        let meth = 'METH'
        //--------------添加仪器分组--------------
        addCompareGroup(instrGroupName, instr, addGroup, generateReport)
        cy.wait(1000)
        // //--------------添加试剂分组--------------
        addCompareGroup(reaGroupName, rea, addGroup, generateReport)
        cy.wait(1000)
        // // --------------添加方法分组--------------
        addCompareGroup(methodGroupName, meth, addGroup, generateReport)
      })
      it('017-显示参数勾选与取消勾选', () => {
        let choice = 'msgOutControCorrectRate'
        let SDI = 'sdi'
        reportModel()
        cy.get('.el-form').last().find('[type="checkbox"]').uncheck(choice, {
          force: true
        })
        cy.get('.el-form').last().find('[type="checkbox"]').uncheck(SDI, {
          force: true
        })
        withinDialog(clickOkInDialog, '编辑模板')
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
        withinDialog(clickOkInDialog, '编辑模板')
        cy.get('button').contains('生成报告').click({
          force: true
        })
      })
      it('018-实验室报告生成-模板页眉编辑页码勾选', () => {
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
      it('019-互认报告以及证书生成-条件相同报告会覆盖', () => {
        let month = 6
        generateCertReport(month)
        visitCertPage()
        cy.get('.el-table__body').find('.el-table__row').first().find('td').eq(7).invoke('text').then((createTime) => {
          let time = createTime.replace(/(\s*$)/g, '')
          cy.visitPage('report-lab')
          //再次生成报告
          searchReportLab()
          generateCertReport(month)
          visitCertPage()
          cy.get('.el-table__body').find('.el-table__row').first().find('td').eq(7).invoke('text').then((createTime) => {
            let newTime = createTime.replace(/(\s*$)/g, '')
            expect(time).not.to.eq(newTime)
          })
        })
      })
      it('020-条件不同报告会新增(有效期限不同)', () => {
        let month = 7
        cy.get('.el-table__body').first()
          .find('.el-table__row')
          .then((getLength) => {
            let length = getLength.length
            visitPage('report-lab')
            cy.wait(2000)
            searchReportLab()
            // 生成不同月份报告
            generateCertReport(month)
            visitCertPage()
            let newLength = length + 1
            cy.get('.el-table__body').first()
              .find('.el-table__row').should('have.length', newLength)
            //删除报告
            cy.get('.ql-search__tools-top.is-left').find('[type=checkbox]').check('', {
              force: true
            })
            cy.clickButton('批量删除')
            confirmDelete()
          })
      })
      it('021-报告模板编辑', () => {
        let reportMobelName = '报告模板三'
        let repeatModelName = '报告模版一'
        let title = '互认报告标题'
        let subTitleName = '副标题'
        let headerTemplate = 'headerTemplate'
        visitPage('report-lab')
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
        elFormInput('headerTemplate', headerTemplate, 'function', () => {

        })
        //模板名称重复不能保存
        elFormInput('name', repeatModelName, () => {

        })
        waitSave(null, (data) => {
          cy.get('.el-message__content').should('have.text', '模板名称不能重复')
        })
        //副标题为空不能保存
        elFormInput('subtitle', null, () => {

        })
        elFormInput('name', reportMobelName, 'function', () => {

        })
        cy.get('.el-form-item__error').should('contain', '请输入副标题')
        //取消勾选【结果互认判断标准】
        elFormInput('subtitle', subTitleName, () => {

        })
        cy.get('.el-form').last().find('[type="checkbox"]').uncheck('mutualStandard', {
          force: true
        })

        waitSave((data) => {
          expect(data).to.eq('true')
          generateCertReport(6, true)
        })
        // 取消勾选专业
        cy.get('.ql-search__tools-top.is-left').find('.el-button.el-button--primary.el-button--medium.is-plain').last().click()
        cy.get('.el-form').last().find('.el-icon-edit-outline.ql-dlgrm__tpl-edit').last().click({
          force: true
        })
        cy.get('.el-form').last().find('[type="checkbox"]').check('mutualStandard', {
          force: true
        })
        cy.get('.el-form').last().find('[type="checkbox"]').uncheck('spec', {
          force: true
        })
        waitSave()
        cy.wait(2000)
        generateCertReport(6, true)
        cy.get('.ql-search__tools-top.is-left').find('.el-button.el-button--primary.el-button--medium.is-plain').last().click()
        cy.get('.el-form').last().find('.el-icon-edit-outline.ql-dlgrm__tpl-edit').last().click({
          force: true
        })
        cy.get('.el-form').last().find('[type="checkbox"]').check('spec', {
          force: true
        })
        withinDialog(clickOkInDialog, '编辑模板')
        //删除报告
        visitCertPage()
        cy.get('.ql-search__tools-top.is-left').find('[type=checkbox]').check('', {
          force: true
        })
        cy.clickButton('批量删除')
        confirmDelete()
      })
    })
  })
})