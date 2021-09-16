/**
 * 消息列表页， 该测试模块设计发送短信， 暂时先注释
 * */
context('CQB实验室端-消息列表页', () => {
  /* before(() => {
    cy.loginLabCQB()
    cy.visit('/cqb-base-gz-fe/app.html#/message')
    cy.wait(1000)
  })
  it('001-使用质控主管单位账号登录-失控的项目‘HELP’帮助按键', () => {
    cy.get('input').first().click().should('be.visible')
    cy.get('body>.el-select-dropdown').first().find('.el-select-dropdown__item span').each(ele => {
      if (ele[0].innerText === '全部状态') {
        ele.click()
      }
    })

    cy.get('input').eq(1).click().should('be.visible')
    cy.get('body>.el-select-dropdown').eq(1).find('.el-select-dropdown__item span').each(ele => {
      if (ele[0].innerText === '失控') {
        ele.click()
      }
    })
    cy.get('input').eq(2).click().should('be.visible')
    cy.get('button[aria-label="前一年"]').click()
    cy.get('.available').contains('1').click()
    cy.get('button').contains('搜索').click()
    cy.wait(1000)
    cy.get('.message-page .el-table tbody tr').first().click()
    cy.get('button').contains('HELP').click()
    cy.wait(3500)
    cy.get('[aria-label="消息详情 - 佛山市第一人民医院"] .el-dialog__headerbtn').first().click()
  })

  it('002-使用质控主管单位账号登录-未失控项目没有HELP帮助按键', () => {
    cy.get('input').first().click().should('be.visible')
    cy.get('body>.el-select-dropdown').first().find('.el-select-dropdown__item span').each(ele => {
      if (ele[0].innerText === '全部状态') {
        ele.click()
      }
    })

    cy.get('input').eq(1).click().should('be.visible')
    cy.get('body>.el-select-dropdown').eq(1).find('.el-select-dropdown__item span').each(ele => {
      if (ele[0].innerText === 'CV/符合率失控') {
        ele.click()
      }
    })
    cy.get('input').eq(2).click().should('be.visible')
    cy.get('button[aria-label="前一年"]').click()
    cy.get('.available').contains('1').click()
    cy.get('button').contains('搜索').click()
    cy.wait(1000)
    cy.get('.message-page .el-table tbody tr').first().click()

    cy.wait(3500)
    cy.get('[aria-label="消息详情 - 佛山市第一人民医院"] .el-dialog__headerbtn').first().click()

  })

    it('003-使用质控主管单位账号登录-失控的项目‘HELP’帮助按键-权限验证', () => {
      cy.get('input').first().click().should('be.visible')
      cy.get('body>.el-select-dropdown').first().find('.el-select-dropdown__item span').each(ele => {
        if (ele[0].innerText === '全部状态') {
          ele.click()
        }
      })

      cy.get('input').eq(1).click().should('be.visible')
      cy.get('body>.el-select-dropdown').eq(1).find('.el-select-dropdown__item span').each(ele => {
        if (ele[0].innerText === '失控') {
          ele.click()
        }
      })
      cy.get('input').eq(2).click().should('be.visible')
      cy.get('button[aria-label="前一年"]').click()
      cy.get('.available').contains('1').click()
      cy.get('button').contains('搜索').click()
      cy.wait(1000)
      cy.get('.message-page .el-table tbody tr').first().click()
      cy.get('button').contains('HELP').click()
      cy.wait(3500)
      cy.get('[aria-label="消息详情 - 佛山市第一人民医院"] .el-dialog__headerbtn').first().click()
      cy.gdfslj_user_login()
      cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/report-data/report-rate')
    }) */
})