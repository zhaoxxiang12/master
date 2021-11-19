import dayjs from 'dayjs'
import { clickCancelInDialog, clickOkInDialog, withinDialog } from '../common/dialog'
import { elform } from '../mutual-result/mutual-item'
import { relateLab } from '../user-info/lab-info'

const trs = () => {
  return cy.get('.el-table__body').find('tbody>tr')
}
const btnText = () => {
  return cy.get('.el-button.el-button--text.el-button--medium').eq(0).invoke('text')
}

const creatBiiboard = () => {
  cy.get('button').contains('添加公告').click({
    force: true
  })
  //输入公告标题
  elform('bulletinTitle').type('自动化填写公告标题')
  //输入公告正文
  cy.get('label[for="bulletinContent"]+div textarea').type('自动化填写公告正文')
  relateLab('添加公告板','gd18020')
  withinDialog(clickOkInDialog,'选择实验室')
  cy.intercept('**/cqb-base-mgr/service/mgr/bulletin*').as('add')
  //点击确定
  withinDialog(clickOkInDialog,'添加公告板')
  cy.wait('@add').then((xhr) => {
    cy.compare(xhr)
  })
  cy.wait(1000)
}

const validBulletinRequiredFields = (bulletinTitle,bulletinContent,labCode) => {
  cy.get('button').contains('添加公告').click({
    force: true
  })
  cy.wait(1000)
  if (bulletinTitle) {
    elform('bulletinTitle').type(bulletinTitle)
  }
  if (bulletinContent) {
    cy.get('label[for="bulletinContent"]+div textarea').type(bulletinContent)
  }
  if (labCode) {
    relateLab('添加公告板',labCode)
    withinDialog(clickOkInDialog,'选择实验室')
  }
}

context('消息互通-公告板', () => {
  const dialogName = '添加公告板'
  before(() => {
    let startDate = 0
    let endMonth = 3
    let endYear = 3
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/message-mgr/billboard')
    cy.get('input[placeholder="开始时间"]').click({
      force: true
    })
    // ------------------选择开始时间--------------------
    cy.get('.el-date-picker__header-label').eq(startDate).invoke('text').then((getData) => {
      let getYear = parseInt(getData.slice(0, 4))
      let chooseYear = 2021
      let startMonth = 1
      let difference = getYear - chooseYear
      //年份相减不等于0就点击
      if (difference != 0) {
        for (let i = 0; i < difference; i++) {
          cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
            force: true
          })
        }
      }
      cy.get('.el-date-picker__header-label').eq(startMonth).invoke('text').then((getData) => {
        let getMonth = parseInt(getData.slice(0))
        let chooseMonth = 2
        let trIndex = 1
        let tdIndex = 4
        let differentMonth = getMonth - chooseMonth
        if (differentMonth < 0) {
          for (let i = 0; i < Math.abs(differentMonth); i++) {
            cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').click({
              force: true
            })
          }
        } else if (differentMonth > 0) {
          for (let i = 0; i < Math.abs(differentMonth); i++) {
            cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').click({
              force: true
            })
          }
        } else {
          cy.get('.el-date-table').find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
            force: true
          })
        }
      })
      //------------------选择结束时间--------------------
      cy.get('input[placeholder="结束时间"]').click({
        force: true
      })
      cy.get('.el-date-picker__header-label').eq(endYear).invoke('text').then((getData) => {
        // 年份相减不等于0就点击
        let getYear = parseInt(getData.slice(0, 4))
        let chooseYear = 2021
        let differenceValue = getYear - chooseYear
        if (differenceValue != 0) {
          for (let i = 0; i < differenceValue; i++) {
            cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left').click({
              force: true
            })
          }
        }
        cy.get('.el-date-picker__header-label').eq(endMonth).invoke('text').then((getData) => {
          let getMonth = parseInt(getData.slice(0))
          let chooseMonth = 3
          let trIndex = 1
          let tdIndex = 4
          let nextMonth = 1
          let differentMonth = getMonth - chooseMonth
          if (differentMonth < 0) {
            for (let i = 0; i < Math.abs(differentMonth); i++) {
              cy.get('.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-arrow-right').eq(nextMonth).click({
                force: true
              })
            }
          } else if (differentMonth > 0) {
            for (let i = 0; i < Math.abs(differentMonth); i++) {
              cy.get('.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left').eq(nextMonth).click({
                force: true
              })
            }
          } else {
            cy.get('.el-date-table').eq(1).find('.el-date-table__row').eq(trIndex).find('td').eq(tdIndex).click({
              force: true
            })
          }
          cy.get('button').contains('搜索').click({
            force: true
          })
        })
      })
    })
  })
  it('001-公告板-未填写公告标题不能保存', () => {
    cy.wait(1000)
    validBulletinRequiredFields(null,'自动化正文','gd18020')
    withinDialog(clickOkInDialog,dialogName)
    //断言
    cy.get('body').should('contain', '请输入公告标题')
    // 点击取消
   withinDialog(clickCancelInDialog,dialogName)
  })
  it('002-公告板-未填写公告正文不能保存', () => {
    cy.wait(1000)
    validBulletinRequiredFields('自动化填写公告标题',null,'gd18020')
    withinDialog(clickOkInDialog,dialogName)
    //断言
    cy.get('body').should('contain', '请输入公告内容')
    // 点击取消
    withinDialog(clickCancelInDialog,dialogName)
  })
  it('003-公告板-未选择实验室不能保存', () => {
    cy.wait(1000)
    validBulletinRequiredFields('自动化填写公告标题','自动化填写公告正文')
    withinDialog(clickOkInDialog,dialogName)
    //断言
    cy.get('body').should('contain', '请选择关联实验室')
    // 点击取消
    withinDialog(clickCancelInDialog,dialogName)
  })
  it('004-公告板-数据填写完整正常保存', () => {
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.get('.el-table__body tbody').then((Data) => {
      let getLength = Data.children().length
      if (getLength >= 20) {
        cy.get('.el-pagination__total').invoke('text').then((data) => {
          let getData = data.split(' ')
          let total = parseInt(getData[1])
          creatBiiboard()
          //断言
          cy.get('.el-pagination__total').should('have.text', '共 ' + (total + 1) + ' 条')
        })
      } else {
        creatBiiboard()
        trs().should('have.length', getLength + 1)
      }
    })
  })
  it('005-公告板-推送/取消推送公告', () => {
    trs().then((Data) => {
      let getLength = Data.length
      if (getLength != 0) {
        btnText().then((getText) => {
          let data = getText
          if (data == '推送') {
            cy.intercept('**/cqb-base-mgr/service/mgr/bulletin/push/*').as('push')
            cy.get('.el-button.el-button--text.el-button--medium').eq(0).click({
              force: true
            })
            cy.wait('@push').then((res) => {
              cy.compare(res)
            })
            cy.get('body').should('contain', '推送成功')
          } else {
            cy.intercept('**/cqb-base-mgr/service/mgr/bulletin/unPush/*').as('push')
            cy.get('.el-button.el-button--text.el-button--medium').eq(0).click({
              force: true
            })
            cy.wait('@push').then((res) => {
              cy.compare(res)
            })
            cy.get('body').should('contain', '取消推送成功')
          }
        })
      }
    })
  })
  it('006-公告板-搜索', () => {
    cy.intercept('**/cqb-base-mgr/service/mgr/bulletin?*').as('search')
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait('@search').then((data) => {
      let responseStatus = data.response.statusCode
      let expectStatus = 200
      expect(responseStatus).to.equal(expectStatus)
      //查询得到的总的数据条数
      let totalData = data.response.body.data.total
      if (totalData == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (totalData <= 20) {
        trs().should('have.length', totalData)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + totalData + ' 条')
      }
    })
  })
  it('007-公告板-关键字搜索', () => {
    cy.get('input[placeholder="请输入关键字"]').type('自动化填写公告标题', {
      force: true
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/bulletin?*').as('search')
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait('@search').then((data) => {
      let responseStatus = data.response.statusCode
      let expectStatus = 200
      expect(responseStatus).to.equal(expectStatus)
      //查询得到的总的数据条数
      let totalData = data.response.body.data.total
      if (totalData == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (totalData <= 20) {
        trs().should('have.length', totalData)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + totalData + ' 条')
      }
    })
  })
  it('008-公告板-添加推送公告板', () => {
    validBulletinRequiredFields('自动化填写公告标题','自动化测试添加推送公告板','gd18020')
    withinDialog(clickOkInDialog,'选择实验室')
    withinDialog(clickOkInDialog,dialogName)
    cy.wait(1000)
    trs().then((Data) => {
      let getLength = Data.length
      if (getLength != 0) {
        btnText().then((getText) => {
          let data = getText
          if (data == '推送') {
            cy.intercept('**/cqb-base-mgr/service/mgr/bulletin/push/*').as('push')
            const firstBtn = cy.get('.el-button.el-button--text.el-button--medium').eq(0)
            firstBtn.click({
              force: true
            })
            cy.wait('@push').then((res) => {
              let getData = res
              let expectStatus = 200
              let responseStatus = getData.response.statusCode
              expect(responseStatus).to.equal(expectStatus)
            })
            cy.get('body').should('contain', '推送成功')
          }
        })
      }
    })
  })
  it('删除测试数据', () => {
    const year = dayjs().format('YYYY')
    const month = dayjs().format('MM')
    const day = dayjs().format('DD')
    const monthString = year +'-' + month + '-' + day
    cy.task('executeCqbSql',`delete from base_bulletin_board where create_time like "%${monthString}%"`)
  })
})