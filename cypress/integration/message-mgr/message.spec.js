/**
 * 消息列表页， 该测试模块设计发送短信， 暂时先注释
 * */
import {
  activeSelect
} from '../common/select'
import {
  clickButton
} from '../common/button'
import {
  interceptGet,
  waitIntercept
} from '../common/http'
context('CQB实验室端-消息列表页', () => {
  before(() => {
    cy.visitLabPage('message','gd18001')
    cy.wait(1000)
  })

  function queryWarnList() {
    return interceptGet('cqb-base/service/base/messages/base?**', queryWarnList.name, '')
  }

  function openHelpDialog() {
    return interceptGet('cqb-base/service/base/help/status/**', openHelpDialog.name, '')
  }
  it('001-使用质控主管单位账号登录-失控的项目‘HELP’帮助按键', () => {
    cy.get('[placeholder="请选择状态"]').click({
      force: true
    })
    activeSelect('全部状态')
    cy.wait(200)
    cy.get('[placeholder="请选择消息类型"]').click({
      force: true
    })
    activeSelect('失控')
    cy.wait(200)
    cy.get('[placeholder="开始时间"]:visible').click({
      force: true
    })
    cy.get('button[aria-label="前一年"]').click({
      force: true
    })
    cy.get('.available').contains('1').click({
      force: true
    })
    waitIntercept(queryWarnList, () => {
      clickButton('搜索')
    }, () => {
      waitIntercept(openHelpDialog, () => {
        cy.get('.message-page .el-table tbody tr').first().click({
          force: true
        })
      }, () => {
        cy.wait(3000)
        clickButton('HELP')
        cy.get('[aria-label="消息详情 - 佛山市第一人民医院"] .el-dialog__headerbtn').first().click()
      })
    })
  })

  it('002-使用质控主管单位账号登录-未失控项目没有HELP帮助按键', () => {
    cy.wait(1000)
    // cy.get('[placeholder="请选择状态"]').click({
    //   force: true
    // })
    // activeSelect('全部状态')
    cy.wait(200)
    cy.get('[placeholder="请选择消息类型"]').click({
      force: true
    })
    activeSelect('CV/符合率失控')
    cy.wait(200)
    cy.get('[placeholder="开始时间"]:visible').click({
      force: true
    })
    cy.get('button[aria-label="前一年"]').click({
      force: true
    })
    cy.get('.available').contains('1').click({
      force: true
    })
    waitIntercept(queryWarnList, () => {
      clickButton('搜索')
    }, () => {
      waitIntercept(openHelpDialog, () => {
        cy.wait(1000)
        cy.get('.message-page .el-table tbody tr').first().click({
          force: true
        })
      }, () => {
        cy.wait(3000)
        cy.get('[aria-label="消息详情 - 佛山市第一人民医院"] .el-dialog__headerbtn').first().click()
      })
    })

  })

  it('003-使用质控主管单位账号登录-失控的项目‘HELP’帮助按键-权限验证', () => {
    // cy.get('[placeholder="请选择状态"]').click({
    //   force: true
    // })
    // activeSelect('全部状态')
    cy.wait(200)
    cy.get('[placeholder="请选择消息类型"]').click({
      force: true
    })
    activeSelect('失控')
    cy.wait(200)
    cy.get('[placeholder="开始时间"]:visible').click({
      force: true
    })
    cy.get('button[aria-label="前一年"]').click({
      force: true
    })
    cy.get('.available').contains('1').click({
      force: true
    })
    waitIntercept(queryWarnList, () => {
      clickButton('搜索')
    }, () => {
      waitIntercept(openHelpDialog, () => {
        cy.get('.message-page .el-table tbody tr').first().click({
          force: true
        })
      }, () => {
        clickButton('HELP')
        cy.wait(3500)
        cy.get('[aria-label="消息详情 - 佛山市第一人民医院"] .el-dialog__headerbtn').first().click({
          force: true
        })
        cy.gdfslj_user_login()
        cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/message-mgr/message')
      })
    })
  })
})