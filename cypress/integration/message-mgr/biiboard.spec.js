import dayjs from 'dayjs'
import { activeDateDay } from '../common/date'
import { clickCancelInDialog, clickOkInDialog, withinDialog } from '../common/dialog'
import { interceptAll, waitIntercept } from '../common/http'
import { validSuccessMessage } from '../common/message'
import { getDialog } from '../message/message'
import { elform, findLabel } from '../mutual-result/mutual-item'
import { clickSearch } from '../setting/report-monitor/report-monitor'
import { relateLab } from '../user-info/lab-info'

const trs = () => {
  return cy.get('.el-table__body').find('tbody>tr')
}
const btnText = () => {
  return cy.get('.el-button.el-button--text.el-button--medium').eq(0).invoke('text')
}

const interceptQueryBillboard = () => {
  return interceptAll('/service/mgr/bulletin?*', interceptQueryBillboard.name)
}

const interceptPushBillboard = () => {
  return interceptAll('service/mgr/bulletin/push/*', interceptPushBillboard.name)
}

const creatBiiboard = () => {
  cy.get('button').contains('添加公告').click({
    force: true
  })
  getDialog('添加公告板').within(() => {
  //输入公告标题
  elform('bulletinTitle').type('自动化填写公告标题')
  //输入公告正文
  cy.get('label[for="bulletinContent"]+div textarea').type('自动化填写公告正文')
  })
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

const interceptUnpushBillboard = () => {
  return interceptAll('service/mgr/bulletin/unPush/*', interceptUnpushBillboard.name)
}

const validBulletinRequiredFields = (bulletinTitle,bulletinContent,labCode) => {
  cy.get('button').contains('添加公告').click({
    force: true
  })
  cy.wait(1000)
  if (bulletinTitle) {
    getDialog('添加公告板').within(() => {
      elform('bulletinTitle').type(bulletinTitle)
    })
  }
  if (bulletinContent) {
    getDialog('添加公告板').within(() => {
      cy.get('label[for="bulletinContent"]+div textarea').type(bulletinContent)    
    })
  }
  if (labCode) {
    relateLab('添加公告板',labCode)
    withinDialog(clickOkInDialog,'选择实验室')
  }
}

context('消息互通-公告板', () => {
  const dialogName = '添加公告板'
  before(() => {
    const startDate = '2021/2/11'
    const endDate = '2022/3/10'
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/message-mgr/billboard')
    findLabel('开始时间').click({
      force:true
    })
    activeDateDay(startDate)
    cy.wait(2000)
    findLabel('结束时间').click({
      force:true
    })
    activeDateDay(endDate)
  })
  context('添加公告板', () => {
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
      const endTime = dayjs().format('YYYY/MM/DD')
      findLabel('结束时间').click({
        force:true
      })
      activeDateDay(endTime)
      waitIntercept(interceptQueryBillboard, () => {
        cy.get('button').contains('搜索').click({
          force: true
        })
      }, data => {
        if (data.total) {
          if (data.total > 20) {
            creatBiiboard()
            //断言
            cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total + 1) + ' 条')
          } else {
            creatBiiboard()
            trs().should('have.length', (data.total) + 1)
          }
        }
      })
    })
  })
  context('推送/取消推送', () => {
    it('005-公告板推送', () => {
      waitIntercept(interceptQueryBillboard, () => {
        clickSearch()
      }, data => {
        if (data.total) {
          const rowIndex = data.data.findIndex(item => item.pushStatus === false)
          if (rowIndex !== -1) {
            waitIntercept(interceptPushBillboard, () => {
              cy.get('.el-table__body .el-table__row').eq(rowIndex).findByText('推送').click({
                force:true
              })
            }, () => {
              validSuccessMessage()
            })  
          }
        }
      })
    })
    it('006-公告板取消推送', () => {
      waitIntercept(interceptQueryBillboard, () => {
        clickSearch()
      }, data => {
        if (data.total) {
          const rowIndex = data.data.findIndex(item => item.pushStatus)
          if (rowIndex !== -1) {
            waitIntercept(interceptUnpushBillboard, () => {
              cy.get('.el-table__body .el-table__row').eq(rowIndex).findByText('取消推送').click({
                force:true
              })
            }, () => {
              validSuccessMessage()
            })  
          }
        }
      })
    })
  })
  context('筛选功能', () => {
    it('007-公告板-搜索', () => {
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
    it('008-公告板-关键字搜索', () => {
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
  })
  context('其他操作', () => {
    it('009-公告板-添加推送公告板', () => {
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
})