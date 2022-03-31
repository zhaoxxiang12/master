import { visitPage } from "../../shared/route"
import { clickButton } from "../common/button"
import { closeTips } from "../common/dialog"
import { waitIntercept } from "../common/http"
import { validSuccessMessage } from "../common/message"
import { expandSearchConditions } from "../eqa/eqa-order/eqa-order"
import { elform } from "../mutual-result/mutual-item"
import { clickSearch } from "../setting/report-monitor/report-monitor"
import { certYearSearch, interceptReGenerate, interceQueryData, previewCertReport, pushData } from "./cert-year"

context('年度互认证书', () => {
  before(() => {
   cy.loginCQB()
   visitPage('cert-year')
   expandSearchConditions('高级搜索')
  })
  context('筛选条件', () => {
    it('cert-year-001-关键字筛选', () => {
      const labName = '佛山市中医院'
      certYearSearch(labName)
      clickButton('重置')
    })
    it('cert-year-002-所在地', () => {
      certYearSearch(null,'上海市')
      clickButton('重置')
      certYearSearch(null,'北京')
      clickButton('重置')
      certYearSearch(null,'广东')
      clickButton('重置')
    })
    it('cert-year-003-标签', () => {
      certYearSearch(null, null, '佛山')
      clickButton('重置')
      certYearSearch(null, null, '完成')
      clickButton('重置')
    })
  })
  context('报告和证书预览', () => {
    it('cert-year-004-年度互认证书-预览互认报告', () => {
      cy.wait(1000)
      const labName = '佛山市第一人民医院'
      elform('keyword').type(labName,{
        force:true
      })
      previewCertReport()
    })
    it('cert-year-005-年度互认证书-预览互认证书', () => {
      previewCertReport(false)
      clickButton('重置')
    })
  })
  context('证书操作', () => {
    context('单个推送和取消推送', () => {  
      it('cert-year-006-年度互认证书-单个推送', () => {
        pushData(false, '推送')
      })
      it('cert-year-007-年度互认证书-单个取消推送', () => {
        pushData(false, '取消推送', true)
      })
    })
    context('批量推送', () => {
      it('cert-year-008-年度互认证书-批量推送', () => {
        pushData(true, '批量推送', false)
      })
      it('cert-year-006-年度互认证书-批量取消推送', () => {
        pushData(true, '批量取消推送', true)
      })
    })
    context('报告生成', () => {
      it('cert-year-009-年度互认证书-重新生成', () => {
        waitIntercept(interceQueryData, () => {
          clickSearch()
        }, data => {
          if (data.total) {
            waitIntercept(interceptReGenerate, () => {
              cy.get('.el-table__body').first().find('.el-table__row')
              .eq(0)
              .findAllByText('重新生成')
              .last()
              .click({
                force:true
              })
              closeTips('提示', '重新生成证书')
            }, () => {
              validSuccessMessage()
            })
          }
        })
      })
    })
  })
})