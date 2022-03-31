import { visitPage } from "../../shared/route"
import { clickButton } from "../common/button"
import { activeDateMonth } from "../common/date"
import { clickOkInDialog, closeTips, withinDialog } from "../common/dialog"
import { waitIntercept, waitRequest } from "../common/http"
import { expandSearchConditions } from "../eqa/eqa-order/eqa-order"
import { getDialog } from "../message/message"
import { elform, findLabel, findLabelOption } from "../mutual-result/mutual-item"
import { getQcData } from "../qc-data/qc-data"
import { interceptQueryIqcReport } from "../report/report-iqc"
import { clickSearch } from "../setting/report-monitor/report-monitor"
import { closePreviewWindow } from "./cert-year"
import {  deleteIqcReport, findLabelTime, interceptPreviewIqc, interceptQueryLab, pushIqcData, searchIqcReport} from "./iqc"


context('月度IQC报告', () => {
  before(() => {
    cy.visitPage('report-lab')
  })
  beforeEach(() => {
    cy.wait(3000)
  })
  it('report-001-月度IQC报告-生成IQC报告', () => {
    const labCode = 'gdtest2'
    cy.wait(1000)
    expandSearchConditions('高级搜索')
    cy.wait(1000)
    elform('labName').type(labCode, {
      force:true
    })
    waitIntercept(interceptQueryLab, () => {
      clickSearch()
    }, () => {
      getQcData().contains(labCode).parents('.el-table__row').find('[type = "checkbox"]').check({
        force:true
      })
      cy.get('.ql-search__tools-top').contains('生成月度报告').click({
        force:true
      })
      getDialog('生成报告').within(() => {
        findLabelOption('项目分析模板').findByText('报告模板一').click({
          force:true
        })
      //月度选择2021/2
      elform('date').click({
        force:true
        })
        activeDateMonth('2021-2')
        cy.intercept('**/cqb-base-mgr/service/iqc/report/monthGenerate*').as('creatMonthReport')
        withinDialog(clickOkInDialog, '生成报告')
        cy.wait('@creatMonthReport').then((getData) => {
          let getStatus = getData.response.statusCode
          let expectStatus = 200
          expect(getStatus).to.eq(expectStatus)
        })
      })
      cy.get('body').should('contain', '生成任务已提交')
    })
  })
  context('月度报告', () => {
    before(() => {
      visitPage('iqc')
      expandSearchConditions('高级搜索')
    })
    it('report-002-月度IQC报告_查看IQC报告', () => {
      let labCode = 'gd18001'
      elform('labName').type(labCode, {
        force:true
      })
      //点击搜索
      waitIntercept(interceptQueryIqcReport, () => {
        clickSearch()
      }, data => {
        if (data.total) {
          const year = (data.data[0].month).toString().slice(0,4) + '年'
          const month = (data.data[0].month).toString().slice(4,7) + '月'
          const province = data.data[0].province
          const categoryName = data.data[0].categoryName
          const fixedWord = '室内质控数据室间化比对报告'
          const id = (data.data[0].id)
          const path = encodeURI(year + month + province + categoryName + fixedWord +'?'+'id='+id+'&type=IQC月度报告')
          waitRequest({
            intercept: interceptPreviewIqc(path), 
            onBefore: () =>{
            cy.get('.el-table__body .el-table__row').first().findByText('查看').click({
              force:true
            })
          }, 
          onSuccess:() => {
            closePreviewWindow()
          },
          onError: (msg) => {
            console.log(msg);
            closePreviewWindow()
            }
          }) 
        }
      })
    })
    context('报告操作', () => {
      const labName = '佛山市第一人民医院'
      before(() => {
        findLabelTime('月份范围', '开始时间')
        activeDateMonth('2020年一月')
        cy.wait(2000)
        findLabelTime('月份范围', '结束时间')
        activeDateMonth('2020年二月')
      })
      it('report-003-月度IQC报告_删除IQC报告', () => {
        const labCode = 'gd18001'
        elform('labName').clear().type(labCode, {
          force:true
        })
        findLabelTime('月份范围', '开始时间')
        activeDateMonth('2020年一月')
        cy.wait(2000)
        findLabelTime('月份范围', '结束时间')
        activeDateMonth('2022年二月')
        waitIntercept(interceptQueryIqcReport, () => {
          clickSearch()
        }, data => {
          if (data.total) {
            let rowIndex = data.data.findIndex(item => item.push === false)
            if (rowIndex === -1) { // 当前界面没有可以删除的数据
              cy.get('.el-table__body').first().find('.el-table__row')
                .eq(rowIndex)
                .find('span')
                .should('not.contain', '删除')
              rowIndex = 0
              cy.get('.el-table__body').first().find('.el-table__row')
                .eq(rowIndex)
                .findByText('取消推送')
                .click({
                  force:true
                })
              closeTips('提示', '取消推送')
              cy.wait(2000)
              deleteIqcReport(rowIndex)
            } else {
              deleteIqcReport(rowIndex)
            }
          }
        })
      })
      context('单个推送/取消推送', () => {
        it('report-004-推送', () => {
          elform('labName').clear().type(labName,{
            force:true
          })
          pushIqcData(false, '推送', false)
        })
        it('report-005-取消推送', () => {
          elform('labName').clear().type(labName,{
            force:true
          })
          pushIqcData(false, '取消推送', true)
        })
      })
      context('批量操作', () => {
        it('report-006-批量推送', () => {
          elform('labName').clear().type(labName,{
            force:true
          })
          pushIqcData(true, '批量推送', false)
        })
        it('report-007-批量取消推送', () => {
          elform('labName').clear().type(labName,{
            force:true
          })
          pushIqcData(true, '批量取消推送', true)
        })
      })
    })
    context('筛选条件', () => {
      it('report-008-所在地', () => {
        searchIqcReport('广东')
        clickButton('重置')
        searchIqcReport('上海')
        clickButton('重置')
      })
      it('report-009-关键字搜索', () => {
        const labName = '佛山市第一人民医院'
        const labCode = '18030'
        searchIqcReport(null, labName)
        clickButton('重置')
        searchIqcReport(null, labCode, true)
      })
    })
  })
})