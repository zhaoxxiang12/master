import dayjs from "dayjs"
import { activeDateDay } from "../common/date"
import { interceptAll, waitIntercept } from "../common/http"
import { activeSelect } from "../common/select"
import { findLabel } from "../mutual-result/mutual-item"
import { clickSearch } from "./report-monitor/report-monitor"

const interceptQueryLog = () => {
  return interceptAll('service/system/log/page?startTime=*', interceptQueryLog.name)
}

const validLogData = () => {
  waitIntercept(interceptQueryLog, () => {
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


context('系统日志', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/system-seting/system-log')
    cy.wait(1000)
    const currentTime = dayjs().format('YYYY/MM/DD')
    findLabel('时间').click({
      force:true
    })
    cy.wait(1000)
    activeDateDay(currentTime)
  })
  it('001-系统日志-级别选择信息进行查询', () => {
    findLabel('事件级别').click({
      force:true
    })
    activeSelect('信息')
    validLogData()
  })
  it('002-系统日志-级别选择告警进行查询', () => {
    findLabel('事件级别').click({
      force:true
    })
    activeSelect('警告')
    validLogData()
  })
  it('003-系统日志-级别选择异常进行查询', () => {
    let eventLevel = 0
    cy.wait(500)
    findLabel('事件级别').click({
      force:true
    })
    activeSelect('异常')
    validLogData()
    })
})