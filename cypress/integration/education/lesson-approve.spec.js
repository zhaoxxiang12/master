/**
 * 在线教育人员授权管理页面
 */
import {
  findTableCell
} from '../common/table'
import {
  closeTips,
  withinDialog
} from '../common/dialog'
import {
  setInput,
  focusInput,
  clearInput
} from '../common/input'
import {
  activeSelect
} from '../common/select'

import {
  interceptAll,
  interceptGet,
  interceptPost,
  waitIntercept
} from '../common/http'
import {
  clickButton
} from '../common/button'
import {
  loginMgrWithGdccl
} from '../common/login'
import {
  visitPage
} from '../../shared/route'
import {
  getDialog
} from '../message/message'
import { getQcData } from '../qc-data/qc-data'
const queryPlanApplyReq = () => {
  return interceptGet('service/edu/plan-apply/page?*', 'planApply')
}
const queryLessonGroupReq = (planId) => {
  return interceptAll(`service/edu/plan/${planId}/lesson-group`, queryLessonGroupReq.name)
}
const querySingleLessonReq = (lessonId) => {
  return interceptGet(`service/edu/lesson/${lessonId}`, 'lessonGroup')
}

function clearInputs() {
  let labels = ['课程计划', '课程组合', '实验室', '手机号']
  labels.forEach(item => {
    clearInput(item)
    cy.wait(300)
  })
}

function cancelApply() {
  clearInputs()
  focusInput('状态')
  activeSelect('已审核')
  waitIntercept(queryPlanApplyReq, () => {
    clickButton('搜索')
  }, (data) => {
    if (data.total) {
      getQcData().first().findByText('取消审核').click({
        force:true
      })
      cy.wait(500)
      withinDialog(() => {
        cy.get('.el-dialog__footer button')
          .contains('取消审核')
          .click({
            force: true
          })
      }, '申请人员详情')
      cy.wait(500)
      closeTips('提示', '确定')
    }
  })
}

function selectAll() {
  cy.get('.el-table__header-wrapper thead tr .el-checkbox').click({
    force: true
  })
}

function closeDialog(text) {
  withinDialog(() => {
    cy.get('.el-dialog__footer button')
      .contains('关闭')
      .click({
        force: true
      })
  }, text)
}

function openLessonGroupDialog(lessonId, cb) {
  waitIntercept(querySingleLessonReq(lessonId), () => {
    cb && cb()
  }, () => {
    withinDialog(() => {
      findTableCell(0, 2)
        .find('button')
        .first()
        .click({
          force: true
        })
    }, '课程计划详情')
  })
}

const interceptQueryData = () => {
  return interceptAll('service/edu/plan-apply/page?planName*', interceptQueryData.name)
}

const searchAndOperate = (status, operate) => {
  focusInput('状态')
  activeSelect(status)
  waitIntercept(interceptQueryData, () => {
    clickButton('搜索')
  }, data => {
    if (data.total) {
      cy.wait(1000)
      selectAll()
      clickButton(operate)
      closeTips('提示', '确定')
    }
  })
}

function closeLessonGroupDialog(cb) {
  cy.wait(1000)
  closeDialog('课程信息')
  cy.wait(1000)
  withinDialog(() => {
    cy.get('.el-dialog__footer button')
      .last()
      .click({
        force: true
      })
  }, '课程计划详情')
  cy.wait(1000)
  cb && cb()
}
context('在线教育人员授权管理页面', () => {
  before(() => {
    cy.gdfslj_user_login()
    visitPage('lesson-approve')
    waitIntercept(interceptQueryData, () => {
      loginMgrWithGdccl('lesson-approve')
    }, () => {

    })
  })
  it('001-列表页包含字段', () => {
    cy.wait(5000)
    findTableCell(0, 4)
      .contains('查看详情')
      .should('exist')
      .click({
        force: true
      })
    withinDialog(() => {
      cy.get('.el-dialog__footer button')
        .last()
        .click({
          force: true
        })
    }, '申请人员详情')
  })
  it('002-搜索功能', () => {
    setInput('课程计划', '相同名称计划')
    setInput('课程组合', '相同名称的组合')
    setInput('实验室', '佛山市顺德区中医院')
    setInput('手机号', '15460092191')
    focusInput('状态')
    clickButton('搜索')
  })
  it('003-单个审核申请', () => {
    clearInputs()
    focusInput('状态')
    activeSelect('未审核')

    waitIntercept(queryPlanApplyReq, () => {
      clickButton('搜索')
    }, (data) => {
      if (data.total) {
       getQcData().first()
       .findByText('审核')
       .click({
        force: true
      })
        withinDialog(() => {
          cy.get('.el-dialog__footer button')
            .contains('审核通过')
            .click({
              force: true
            })
        }, '申请人员详情')
        closeTips('提示', '确定')
      }
    })
  })
  it('004-批量取消审核', () => {
    cy.wait(2000)
    searchAndOperate('已审核', '批量取消审核')
  })
  it('005-批量审核', () => {
    cy.wait(2000)
    searchAndOperate('未审核', '批量审核')
  })
  it('006-单个审核取消申请', () => {
    cancelApply()
  })
  it('007-查看课程组合信息', () => {
    clearInputs()
    waitIntercept(queryPlanApplyReq, () => {
      clickButton('搜索')
    }, (data) => {
      if (data.total) {
        const lessonGroupName = data.records[0].userApplys[0].lessonGroups[0].lessonGroupName
        const planId = data.records[0].planId
        findTableCell(0, 4)
          .find('button')
          .contains('查看详情')
          .click({
            force: true
          })
        waitIntercept(queryLessonGroupReq(planId), () => {
          withinDialog(() => {
            findTableCell(0, 5)
              .contains(lessonGroupName)
              .click({
                force: true
              })
          }, '申请人员详情')
        }, data => {
           withinDialog(() => {
            findTableCell(0, 2)
              .find('button')
              .first()
              .click({
                force: true
              })
          }, '课程计划详情')
            closeLessonGroupDialog(() => {
            closeDialog('申请人员详情')
          })
        }) 
      }
    })
  })
  it('008-查看课程信息', () => {
    clearInputs()
    setInput('课程计划', '计划test')
    // focusInput('状态')
    // activeSelect('已审核')
    waitIntercept(queryPlanApplyReq, () => {
      clickButton('搜索')
    }, (data) => {
      if (data.total) {
        openLessonGroupDialog(() => {
          findTableCell(0, 1)
            .find('button')
            .first()
            .click({
              force: true
            })
        })
        closeLessonGroupDialog()
      }
    })
  })
  /* it('009-导出CSV表', () => {
    clearInputs()
    clickButton('搜索')
    cy.wait(2000)
    cy.get('.el-table__header-wrapper thead tr .el-checkbox').click({
      force: true
    })
    clickButton('导出CSV')
  }) */
})