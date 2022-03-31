import dayjs from "dayjs"
import { activeDateDay } from "../common/date"
import { interceptAll, waitIntercept } from "../common/http"
import { activeSelect } from "../common/select"
import { getDialog } from "../message/message"
import { findLabel } from "../mutual-result/mutual-item"
import { clickSearch } from "./report-monitor/report-monitor"

/**
 * 
 * @param {boolean} previewLog 是否查看操作日志 默认为false 不查看
 */
const optlogValidData = (previewLog = false) => {
  waitIntercept(interceptOptData, () => {
    clickSearch()
  }, data => {
    if (previewLog === true) {
      if (data.total) {
        waitIntercept(interceptPreviewLog, () => {
          cy.get('.el-table__body .el-table__row').first().findByText('查看').click({
            force:true
          })
        }, () => {
          cy.get('body').should('contain', '操作日志详情').and('contain', '签名结果')
          getDialog('操作日志详情').within(() => {
            cy.get('.el-dialog__close').click({
              force:true
            })
          })
        })
      }
    } else {
      if (data.total > 20) {
        cy.get('.el-pagination__total').should('have.text', '共 ' + data.total + ' 条')
      } else if ( 0 < data.total && data.total <= 20) {
        cy.get('.el-table__body').find('.el-table__row').should('have.length', data.total)
      } else {
        cy.get('body').should('contain', '暂无数据')
      }
    }
  })
}

const interceptPreviewLog = () => {
  return interceptAll('service/system/operLogs/*',interceptPreviewLog.name)
}

const interceptOptData = () => {
  return interceptAll('service/system/operLogs?startTime=*', interceptOptData.name)
}

context('操作日志', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/system-seting/opt-log')
    cy.wait(1000)
    findLabel('时间').click({
      force:true
    })
    const currentTime = dayjs().format('YYYY/MM/DD')
    activeDateDay(currentTime)
  })
  it('001-操作日志-使用操作人进行查询', () => {
    const system = '管理员'
    const labName = '佛山市顺德区中医院'
    optlogValidData()
    findLabel('操作人').type(system)
    optlogValidData()
    findLabel('操作人').clear().type(labName)
    optlogValidData()
    findLabel('操作人').clear()
  })
  it('002-操作日志-查看操作日志', () => {
    optlogValidData(true)
  })
  it('003-操作日志-使用模块进行查询', () => {
    //-------------------模块选择质控品管理------------
    findLabel('模块').click({
      force:true
    })
    activeSelect('质控品管理')
    optlogValidData()
    //-------------------模块选择公告板------------
    findLabel('模块').click({
      force:true
    })
    activeSelect('信息公告板')
    optlogValidData()
  })
})