import { clickOkInDialog, withinDialog } from "../common/dialog"
import { interceptAll, waitIntercept } from "../common/http"
import { validSuccessMessage } from "../common/message"
import { getDialog } from "../message/message"
import { elform } from "../mutual-result/mutual-item"
import { clickSearch } from "./report-monitor/report-monitor"

const interceptQuerySystemData = () => {
  return interceptAll('service/system/paraminfo/page?paramName*', interceptQuerySystemData.name)
}

const interceptEditSystemMsg = () => {
  return interceptAll('service/system/paraminfo/update*', interceptEditSystemMsg.name)
}

const validSystemQueryData = () => {
  waitIntercept(interceptQuerySystemData, () => {
    clickSearch()
  }, data => {
    if (data.total > 20) {
      cy.get('.el-pagination__total').should('have.text', '共 ' + data.total + ' 条')
    } else if ( 0 < data.total && data.total <= 20) {
      cy.get('.el-table__body').find('.el-table__row').should('have.length', data.total)
    } else {
      cy.get('body').should('contain', '暂无数据')
    }
  })
}

context('系统参数', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/system-seting/system-param')
    cy.wait(500)
  })
  it('001-系统参数-使用关键字进行搜索', () => {
    const keyWord1 = '用户最大允许在线数'
    const keyWord2 = 'IQC快照索引名'
    const keyWord3 = 'IQC快照索引名3'
    cy.findAllByPlaceholderText('参数关键字').type(keyWord3)
    validSystemQueryData()
    cy.findAllByPlaceholderText('参数关键字').clear().type(keyWord2)
    validSystemQueryData()
    cy.findAllByPlaceholderText('参数关键字').clear().type(keyWord1)
    validSystemQueryData()
  })
  it('002-系统参数-编辑系统参数', () => {
    const dialogName = '编辑系统参数'
    cy.get('.el-table__body .el-table__row').findByText('编辑').click({
      force:true
    })
    getDialog(dialogName).within(() => {
      elform('paramValue').clear().type(100)
    })
    waitIntercept(interceptEditSystemMsg, () => {
      withinDialog(clickOkInDialog, '编辑系统参数')
    }, () => {
      validSuccessMessage()
    })
    cy.get('.el-table__body .el-table__row').findByText('编辑').click({
      force:true
    })
    getDialog(dialogName).within(() => {
      elform('paramValue').clear().type(50)
    })
    withinDialog(clickOkInDialog, '编辑系统参数')
  })
})