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
import dayjs from 'dayjs'
import {
  getDialog
} from '../message/message'
import {
  interceptAll,
  waitIntercept,
  waitRequest
} from '../common/http'

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
  cy.wait(3000)
  cy.get('.tree-dept-node-txt').each(element => {
    element.click()
  })
  cy.get('.el-dialog__title').contains('推送课程计划').click()
  getDialog('推送课程计划').within(() => {
    cy.get('button').contains('确定').click()
  })
}

function getLastOperation() {
  return cy.get('.el-table__body-wrapper tbody tr').last().find('td').eq(6)
}

const selectDay = (currentDay) => {
  cy.get('.available').findByText(currentDay + 1).click({
    force: true
  })
}

const selectNextMonthDay = () => {
  cy.get('.next-month')
    .contains(1)
    .click({
      force: true
    })
}

const isLeapYear = (year) => {
  if (year % 100 !== 0 && year % 4 === 0 || year % 4 === 0) {
    return true
  } else {
    return false
  }
}

/**
 * 
 * @param {number} month 月份
 * @param {number} currentDay 日期几号
 * @param {number} year 年份
 */
const endTimeSelect = (month, currentDay, year) => {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      if (currentDay === 31) { //等于31号就选择下个月1号
        selectNextMonthDay()
      } else {
        selectDay(currentDay)
      }
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      if (currentDay === 30) { //等于31号就选择下个月1号
        selectNextMonthDay()
      } else {
        selectDay(currentDay)
      }
      break;
    case 2:
      if (isLeapYear(year) === true) {
        if (currentDay === 29) {
          selectNextMonthDay()
        } else {
          selectDay()
        }
      } else {
        if (currentDay === 28) {
          selectNextMonthDay()
        } else {
          selectDay(currentDay)
        }
      }
  }
}

function studentTime() {
  const currentDay = parseInt((dayjs().format('YYYY/MM/DD').split('/'))[2])
  const currentMonth = parseInt((dayjs().format('YYYY/MM/DD').split('/'))[1])
  const currentYear = parseInt((dayjs().format('YYYY/MM/DD').split('/'))[0])
  cy.document()
    .its('body')
    .find('.el-picker-panel__body:visible').within(() => {
      cy.get('.available.today').parents('.el-date-table').within(() => {
        //开始时间
        cy.get('.available').findByText(currentDay).click({
          force: true
        })
        //结束时间
        endTimeSelect(currentMonth, currentDay, currentYear)
      })
    })
}

const compareTimeAndSelectDate = (differenceYear, differenceMonth) => {
  if (differenceYear > 0) {
    // 选择年份
    for (let i = 0; i < differenceYear; i++) {
      cy.get('.el-icon-d-arrow-left').click({
        force: true
      })
    }
    //选择月份
    if (differenceMonth > 0) {
      for (let i = 0; i < differenceMonth; i++) {
        cy.get('.el-icon-arrow-left').click({
          force: true
        })
      }
    } else if (differenceMonth < 0) {
      for (let i = 0; i < Math.abs(differenceMonth); i++) {
        cy.get('.el-icon-arrow-right').click({
          force: true
        })
      }
    }
  } else if (differenceYear < 0) {
    // 选择年份
    for (let i = 0; i < Math.abs(differenceYear); i++) {
      cy.get('.el-icon-d-arrow-right').click({
        force: true
      })
    }
    //选择月份
    if (differenceMonth > 0) {
      for (let i = 0; i < differenceMonth; i++) {
        cy.get('.el-icon-arrow-left').click({
          force: true
        })
      }
    } else if (differenceMonth < 0) {
      for (let i = 0; i < Math.abs(differenceMonth); i++) {
        cy.get('.el-icon-arrow-right').click({
          force: true
        })
      }
    }
  } else { // 等于0 直接选择月份
    //选择月份
    if (differenceMonth > 0) {
      for (let i = 0; i < differenceMonth; i++) {
        cy.get('.el-icon-arrow-left').click({
          force: true
        })
      }
    } else if (differenceMonth < 0) {
      for (let i = 0; i < Math.abs(differenceMonth); i++) {
        cy.get('.el-icon-arrow-right').click({
          force: true
        })
      }
    }
  }
}

/**
 * 
 * @param {*} currentTime 当前时间
 * @param {*} currentMonth 当前年份
 */
const getLeftDate = (currentTime, currentMonth) => {
  cy.document()
    .its('body')
    .find('.el-date-range-picker__content.is-left:visible').within(() => {
      cy.get('.el-date-range-picker__header').invoke('text').then(getTime => {
        const differenceYear = parseInt(getTime.split(' ')[0]) - parseInt(currentTime[0])
        const diffrenceMonth = parseInt(getTime.split(' ')[2] - parseInt(currentMonth))
        compareTimeAndSelectDate(differenceYear, diffrenceMonth)
      })
    })
}

const interceptQueryGroup = () => {
  return interceptAll('service/edu/group/page?*', interceptQueryGroup.name)
}

const interceptQueryPlan = () => {
  return interceptAll('service/edu/plan/admin/page?*', interceptQueryPlan.name)
}

/**
 * 
 * @param {number} rightMonth 月份
 */
const selectLeftTime = (rightMonth) => {
  cy.document()
    .its('body')
    .find('.el-date-range-picker__content.is-left:visible').within(() => {
      cy.get('.el-date-range-picker__header').invoke('text').then(getTime => {
        const differentLeftMonth = parseInt(getTime.split(' ')[2] - parseInt(rightMonth))
        if (differentLeftMonth === 0 || differentLeftMonth === 1) {
          return
        } else {
          for (let i = 0; i < Math.abs(differentLeftMonth); i++) {
            cy.get('.el-icon-arrow-left').click({
              force: true
            })
          }
        }
      })
    })
}

const compareDate = () => {
  const currentTime = (dayjs().format("YYYY/MM/DD")).split('/')
  const currentMonth = currentTime[1]
  cy.document()
    .its('body')
    .find('.el-date-range-picker__content.is-right:visible').within(() => {
      cy.get('.el-date-range-picker__header').invoke('text').then(getTime => {
        const differenceYear = parseInt(getTime.split(' ')[0]) - parseInt(currentTime[0])
        const diffrenceMonth = parseInt(getTime.split(' ')[2] - parseInt(currentMonth))
        cy.get('.el-icon-d-arrow-left').then(yearEL => {
          if (yearEL.hasClass('is-disabled')) { //年份不可选
            cy.get('.el-icon-arrow-left').then(monthEl => {
              if (monthEl.hasClass('is-disabled')) { //月份也不可选
                if (differenceYear > 0) { //判断是否大于0，大于0则为明年
                  getLeftDate(currentTime, currentMonth)
                } else if (differenceYear < 0) {

                } else { //当前年
                  if (diffrenceMonth === 0 || diffrenceMonth === 1) {
                    getLeftDate(currentTime, currentMonth)
                  } else if (diffrenceMonth > 0) {
                    selectLeftTime(parseInt(getTime.split(' ')[2]))
                  } 
                } 
              } else {
                if (differenceYear > 0) {
                  getLeftDate(currentTime, currentMonth)
                }
              }
            })
          } else {
            compareTimeAndSelectDate(differenceYear, diffrenceMonth)
          }
        })
      })
    })
}

const searchPlanOption = (planName, option) => {
  cy.get('[placeholder="请输入课程计划名称"]')
  .clear({
    force: true
  }).type(planName, {
    force: true
  })
  waitIntercept(interceptQueryPlan, () => {
    clickButton('搜索')
  }, data => {
    if (data.total) {
      option() && option()
    }
  })
}

const interceptCancelPush = () => {
  return interceptAll('service/edu/plan/cancel-push', interceptCancelPush.name)
}

describe('课程计划管理', () => {
  context('课程计划管理', () => {
    const planName = 'D计划'
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
      waitIntercept(interceptQueryGroup, () => {
        findTableCell(0, 6).find('button').contains('修改').click({
          force: true
        })
      }, () => {
        withinDialog(() => {
          getInput('课程计划名称').clear({
            force: true
          }).type('B计划1', {
            force: true
          })
          openDateRange('报名时间')
          cy.wait(2000)
          compareDate()
          selectToday()
          selectToday()
          cy.wait(5000)
          clickButton('课程组合设置')
          withinDialog(() => {
            openDateRange('开课时间')
            cy.wait(1000)
            compareDate()
            studentTime()
            clickDialogOk('课程组合设置')
          }, '课程组合设置')
          clickDialogOk('修改课程计划')
        }, '修改课程计划')
          // })
        // })
      })
    })
    it('006-删除计划', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      searchPlanOption('创建计划', () => {
        cy.wait(1000)
        getLastOperation().contains('删除').click({
          force: true
        })
        closeTips('删除提示', '删除')
      })
    })
    it('007-【课程计划详情弹窗】查看课程计划详情弹窗', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      searchPlanOption(planName, () => {
        cy.wait(1000)
        findTableCell(0, 1).contains(planName).click({
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
      searchPlanOption(planName, () => {
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
    })
    it('010-继续推送（追加）', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      searchPlanOption(planName, () => {
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
    })
    it('011-取消推送', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      searchPlanOption(planName, () => {
        cy.wait(1000)
      findTableCell(0, 6).find('button').contains('取消推送').click({
        force: true
      })
      closeTips('提示', '确定')
      })
    })
    it('012-取消推送失败', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      searchPlanOption('内部学习', () => {
        cy.wait(1000)
        findTableCell(0, 6).find('button').contains('取消推送').click({
          force: true
        })
        waitRequest({
          intercept:interceptCancelPush,
          onBefore: () => {
            closeTips('提示', '确定')
          },
          onError: (message) => {
            validErrorMsg(message)
          }
        })
      })
    })
    it('013-列表页操作列按钮验证', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      clickButton('搜索')
      searchPlanOption('C计划', () => {
        cy.wait(1000)
        findTableCell(0, 6).find('button').contains('修改').should('exist')
        findTableCell(0, 6).find('button').contains('删除').should('exist')
        findTableCell(0, 6).find('button').contains('导出').should('exist')
        findTableCell(0, 6).find('button').contains('推送').should('exist')
        findTableCell(0, 6).find('button').contains('取消推送').should('exist')
      })
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