/**
 * 课程计划管理
 */
import {
  clickButton
} from '../common/button'
import {
  withinDialog,
  clickCancelInDialog,
  closeTips
} from '../common/dialog'
import {
  getInput,
  setInput,
  focusInput
} from '../common/input'
import {
  activeSelect
} from '../common/select'
import {
  findTableCell
} from '../common/table'
import {
  setRangeDate
} from '../cqb_admin/auth-manager'
import {
  validErrorMsg
} from '../common/message'
import {
  loginMgrWithGdccl
} from '../common/login'

function selectToday() {
  cy.document().its('body').find('.today:visible').click({
    force: true
  })
}

function openDateRange(text) {
  cy.get('label').contains(text).next().find('.el-date-editor').click({
    force: true
  })
}

function clickDialogOk(title) {
  cy.document().its('body').find(`[aria-label="${title}"] .el-dialog__footer`)
    .last()
    .find('button:visible')
    .contains('确定')
    .click({
      force: true
    })
}

function batchPush() {
  cy.wait(1000)
  cy.get('.el-table__header').find('th').eq(0).find('.el-checkbox__inner').click()
  cy.get('button').contains('批量推送').click()
  cy.get('.push-mgr-tree .el-input__inner').click()
  cy.get('.tree-dept-node-txt').each(element => {
    element.click()
  })
  cy.get('.el-dialog__title').contains('推送课程计划').click()
  cy.get('button').contains('确定').click()
}

function getLastOperation() {
  return cy.get('.el-table__body-wrapper tbody tr').last().find('td').eq(6)
}

function studentTime() {
  cy.document().its('body').find('.start-date.end-date:visible').click({
    force: true
  })
}
describe('课程计划管理', () => {
  context('课程计划管理', () => {
    before(() => {
      cy.loginCQB()
      cy.visitPage('lesson-plan')
    })
    it('001-系统管理员推送课程组合', () => {
      cy.wait(1000)
      batchPush()
    })
    it('002-课程计划添加“年度”字段-可以选择(2020年开始，当前年度+5)的年份', () => {
      cy.wait(1000)
      clickButton('自定义课程计划')
      withinDialog(() => {
        getInput('所属年度').click({
          force: true
        })
        activeSelect('2025')
        clickCancelInDialog()
      }, '创建课程计划')
    })
    it('003-删除失败的情况', () => {
      cy.wait(1000)
      getLastOperation().contains('删除').click({
        force: true
      })
      closeTips('删除提示', '删除')
    })
    it('004-创建计划', () => {
      cy.wait(1000)
      clickButton('自定义课程计划')
      withinDialog(() => {
        setInput('课程计划名称', '创建计划')
        cy.get('.el-range-editor').click({
          force: true
        })
        cy.wait(100)
        setRangeDate(1, 1, '1')
        setRangeDate(1, 1, '1')
        cy.get('.el-transfer-panel__body .el-checkbox__input').eq(2).click({
          force: true
        })
        clickButton('添加')
        clickButton('课程组合设置')
        withinDialog(() => {
          cy.get('.el-range-editor').click({
            force: true
          })
          cy.wait(100)
          setRangeDate(1, 3, '1')
          setRangeDate(1, 3, '1')
          focusInput('开课模式')
          activeSelect('闯关模式')
          clickDialogOk('课程组合设置')
        }, '课程组合设置')
        clickDialogOk('创建课程计划')
      }, '创建课程计划')
    })

    it('005-修改计划', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      cy.get('[placeholder="请输入课程计划名称"]')
        .clear({
          force: true
        }).type('B计划', {
          force: true
        })
      clickButton('搜索')
      cy.wait(1000)
      findTableCell(0, 6).find('button').contains('修改').click({
        force: true
      })
      withinDialog(() => {
        getInput('课程计划名称').clear({
          force: true
        }).type('B计划1', {
          force: true
        })
        openDateRange('报名时间')
        selectToday()
        selectToday()
        clickButton('课程组合设置')
        withinDialog(() => {
          openDateRange('开课时间')
          cy.wait(1000)
          studentTime()
          studentTime()
          clickDialogOk('课程组合设置')
        }, '课程组合设置')
        clickDialogOk('修改课程计划')
      }, '修改课程计划')
    })
    it('006-删除计划', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      cy.get('[placeholder="请输入课程计划名称"]')
        .clear({
          force: true
        }).type('创建计划', {
          force: true
        })
      clickButton('搜索')
      cy.wait(1000)
      getLastOperation().contains('删除').click({
        force: true
      })
      closeTips('删除提示', '删除')
    })
    it('007-【课程计划详情弹窗】查看课程计划详情弹窗', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      cy.get('[placeholder="请输入课程计划名称"]')
        .clear({
          force: true
        }).type('D计划', {
          force: true
        })
      clickButton('搜索')
      cy.wait(1000)
      findTableCell(0, 1).contains('D计划').click({
        force: true
      })
      withinDialog(() => {
        findTableCell(0, 2).find('button').first().click({
          force: true
        })
        cy.wait(5000)
        cy.document().its('body').find('button').contains('关闭').click({
          force: true
        })
        cy.wait(1000)
        clickButton('关闭')
      }, '课程计划详情')
    })
    it('008-创建计划开始时间不小于报名截止时间', () => {
      cy.wait(1000)
      clickButton('自定义课程计划')
      withinDialog(() => {
        setInput('课程计划名称', '创建计划')
        cy.get('.el-range-editor').click({
          force: true
        })
        cy.wait(100)
        setRangeDate(1, 1, '1')
        setRangeDate(1, 1, '1')
        cy.get('.el-transfer-panel__body .el-checkbox__input').eq(2).click({
          force: true
        })
        clickButton('添加')
        clickButton('课程组合设置')
        withinDialog(() => {
          cy.get('.el-range-editor').click({
            force: true
          })
          cy.wait(100)
          setRangeDate(0, 1, '1')
          setRangeDate(0, 1, '1')
          focusInput('开课模式')
          activeSelect('闯关模式')
          clickDialogOk('课程组合设置')
        }, '课程组合设置')
        clickDialogOk('创建课程计划')
        cy.document().its('body').find('.el-message--error')
          .should('contain', '开课时间开始时间必须大于等于今天')
        clickButton('取消')
      }, '创建课程计划')
    })
    it('009-单个推送', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      cy.get('[placeholder="请输入课程计划名称"]')
        .clear({
          force: true
        }).type('D计划', {
          force: true
        })
      clickButton('搜索')
      cy.wait(1000)
      findTableCell(0, 6).find('button').contains('推送').click({
        force: true
      })
      withinDialog(() => {
        cy.get('label').contains('推送所选课程给以下管理单位').next().find('input').click({
          force: true
        })
        cy.wait(1000)
        cy.document().its('body').find('.tree-dept .el-tree .el-tree-node .tree-dept-node span').last().click({
          force: true
        })
        cy.get('.el-dialog__header').click({
          force: true
        })
        cy.wait(1000)
        cy.get('.el-dialog__footer button').eq(1).click({
          force: true
        })
      }, '推送课程计划')
    })
    it('010-继续推送（追加）', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      cy.get('[placeholder="请输入课程计划名称"]')
        .clear({
          force: true
        }).type('D计划', {
          force: true
        })
      clickButton('搜索')
      cy.wait(1000)
      findTableCell(0, 6).find('button').contains('推送').click({
        force: true
      })
      withinDialog(() => {
        cy.get('label').contains('推送所选课程给以下管理单位').next().find('input').click({
          force: true
        })
        cy.wait(1000)
        cy.document().its('body').find('.tree-dept .el-tree .el-tree-node .tree-dept-node span').eq(12).click({
          force: true
        })
        cy.get('.el-dialog__header').click({
          force: true
        })
        cy.wait(1000)
        cy.get('.el-dialog__footer button').eq(1).click({
          force: true
        })
      }, '推送课程计划')
    })
    it('011-取消推送', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      cy.get('[placeholder="请输入课程计划名称"]')
        .clear({
          force: true
        }).type('D计划', {
          force: true
        })
      clickButton('搜索')
      cy.wait(1000)
      findTableCell(0, 6).find('button').contains('取消推送').click({
        force: true
      })
      closeTips('提示', '确定')
    })
    it('012-取消推送失败', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      cy.get('[placeholder="请输入课程计划名称"]')
        .clear({
          force: true
        }).type('计划test', {
          force: true
        })
      clickButton('搜索')
      cy.wait(1000)
      findTableCell(0, 6).find('button').contains('取消推送').click({
        force: true
      })
      closeTips('提示', '确定')
      validErrorMsg('计划test课程计划已经应用到实验室中，不允许取消推送')
    })
    it('013-列表页操作列按钮验证', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      cy.get('[placeholder="请输入课程计划名称"]')
        .clear({
          force: true
        }).type('计划test', {
          force: true
        })
      clickButton('搜索')
      cy.wait(1000)
      findTableCell(0, 6).find('button').contains('修改').should('exist')
      findTableCell(0, 6).find('button').contains('删除').should('exist')
      findTableCell(0, 6).find('button').contains('导出').should('exist')
      findTableCell(0, 6).find('button').contains('推送').should('exist')
      findTableCell(0, 6).find('button').contains('取消推送').should('exist')
      // findTableCell(0, 6).find('button').contains('应用').should('exist')
    })
    it('014-【添加计划弹窗】计划名称', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      clickButton('自定义课程计划')
      withinDialog(() => {
        cy.get('.el-range-editor').click({
          force: true
        })
        cy.wait(100)
        setRangeDate(1, 1, '1')
        setRangeDate(1, 1, '1')
        cy.get('.el-transfer-panel__body .el-checkbox__input').eq(2).click({
          force: true
        })
        clickButton('添加')
        clickButton('课程组合设置')
        withinDialog(() => {
          cy.get('.el-range-editor').click({
            force: true
          })
          cy.wait(1000)
          setRangeDate(1, 3, '1')
          setRangeDate(1, 3, '1')
          cy.wait(1000)
          focusInput('开课模式')
          activeSelect('闯关模式')
          clickDialogOk('课程组合设置')
        }, '课程组合设置')
        cy.wait(1000)
        clickDialogOk('创建课程计划')
        cy.wait(1000)
        cy.get('label').contains('课程计划名称').next().find('.el-form-item__error').should('exist') // 名称必填
        const longName = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].join('')
        setInput('课程计划名称', longName)
        clickDialogOk('创建课程计划')
        // const sqlErr = "Data truncation: Data too long for column 'plan_name'"
        // cy.document().its('body').find('.el-message--error')
        //   .should('contain', sqlErr) // 太长
        cy.wait(1000)
        setInput('课程计划名称', 'C计划')
        clickDialogOk('创建课程计划')
        cy.document().its('body').find('.el-message--error')
          .should('contain', '课程计划名称已存在') // 唯一
      }, '创建课程计划')
    })
    it('015-【添加计划弹窗】报名时间', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      clickButton('自定义课程计划')
      withinDialog(() => {
        setInput('课程计划名称', '不填报名时间')
        cy.get('.el-transfer-panel__body .el-checkbox__input').eq(2).click({
          force: true
        })
        clickButton('添加')
        clickButton('课程组合设置')
        withinDialog(() => {
          cy.get('.el-range-editor').click({
            force: true
          })
          cy.wait(1000)
          setRangeDate(0, 1, '1')
          setRangeDate(0, 1, '1')
          focusInput('开课模式')
          activeSelect('闯关模式')
          clickDialogOk('课程组合设置')
        }, '课程组合设置')
        clickDialogOk('创建课程计划')
        cy.get('label').contains('报名时间').next().find('.el-form-item__error').should('exist') // 报名时间必填
      }, '创建课程计划')
    })
  })
  // context('质控主管单位', () => {
  //   it('001.质控主管单位应用计划', () => {
  //     // loginMgrWithGdccl('lesson')
  //     cy.gdfslj_user_login(() => {
  //       cy.visitPage('lesson-plan')
  //     })
  //     cy.wait(1000)
  //   })
  // })
})