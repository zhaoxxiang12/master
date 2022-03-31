import { clickOkInDialog, withinDialog } from "../common/dialog"
import { interceptAll, waitIntercept, waitRequest } from "../common/http"
import { interceptQueryLessonGroup } from "../cqb_admin/auth-manager"
import { getDialog } from "../message/message"
import { mathRomdomNumber } from "../single-import/single-import"

export const logout = () => {
  cy.get('.el-dropdown-menu__item').contains(' 退 出')
    .click({
      force: true
    })
}

export const customizeLessonGroup = () => {
  cy.get('button')
    .contains('自定义课程组合')
    .should('exist')
    .click({
      force: true
    })
}

export const setLessonGroupName = (name) => {
  const lessonGroup = cy.get('[aria-label="创建课程组合"] [placeholder="请输入课程组合名称"]')
  lessonGroup.clear({
    force: true
  })
  if (name) {
    lessonGroup.type(name, {
      force: true
    })
  }
}

export const selectCheckbox = (text) => {
  cy.get('[aria-label="创建课程组合"] [aria-label="checkbox-group"] .el-checkbox')
    .contains(text)
    .should('exist')
    .click({
      force: true
    })
}

export const interceptLessonName = () => {
  return interceptAll('service/edu/group/page?*', interceptLessonName.name)
 }

export const clickCreateGroupBtn = (text) => {
  cy.get('[aria-label="创建课程组合"] button')
    .contains(text)
    .should('exist')
    .click({
      force: true
    })
}

export const selectAll = () => {
  cy.wait(500)
  cy.get('.el-table__header')
    .find('th')
    .eq(0)
    .find('.el-checkbox__inner')
    .click({
      force: true
    })
}
export const batchPush = () => {
  cy.get('button')
    .contains('批量推送')
    .should('exist')
    .click({
      force: true
    })
}


export const pushAll = () => {
  cy.wait(300)
  cy.get('.push-mgr-tree .el-input__inner').click({
    force: true
  })
  cy.wait(300)
  cy.get('.tree-dept-node-txt').each(element => {
    cy.get(element).click({
      force: true
    })
  })
  pushLesson()
}

export const pushLesson = () => {
  cy.get('.el-dialog__title')
    .contains('推送课程组合')
    .should('exist')
    .click({
      force: true
    })
  getDialog('推送课程组合').within(() => {
    cy.get('button')
    .contains('确定')
    .should('exist')
    .click({
      force: true
    })
  })
}

export const searchGroupName = (name) => {
  cy.get('input')
    .first()
    .clear({
      force: true
    })
    .type(name, {
      force: true
    })
  cy.get('input')
    .eq(1)
    .clear({
      force: true
    })
  cy.wait(1000)
  cy.get('button')
    .contains('搜索')
    .should('exist')
    .click({
      force: true
    })
}

export const cancelBatchPush = () => {
  cy.get('button')
    .contains('批量取消推送')
    .should('exist')
    .click({
      force: true
    })
  cy.get('[aria-label="提示"] button')
    .contains('确定')
    .should('exist')
    .click({
      force: true
    })
}

export const cancelSinglePush = () => {
  cy.wait(300)
  cy.get('.el-table button')
    .contains('取消推送')
    .should('exist')
    .click({
      force: true
    })
  cy.get('[aria-label="提示"] button')
    .contains('确定')
    .should('exist')
    .click({
      force: true
    })
}
export const delLessonGroup = () => {
  cy.wait(1000)
  cy.get('.el-table button')
    .contains('删除')
    .should('exist')
    .click({
      force: true
    })
  cy.wait(300)
  cy.get('[aria-label="删除提示"] button')
    .contains('删除')
    .should('exist')
    .click({
      force: true
    })
}

export const seeLessonGroupDetail = () => {
  cy.get('.group-detail__title').first().click({
    force: true
  })
}

export const closeDetailDialog = () => {
  withinDialog(clickOkInDialog, '课程信息')
}

const interceptPush = () => {
  return interceptAll('service/edu/group/cancelPush', interceptPush.name)
}

export const cancelPush = () => {
  cy.get('button')
    .contains('批量取消推送')
    .should('exist')
    .click({
      force: true
    })
  waitRequest({
    intercept: interceptPush,
    onBefore: () => {
      cy.get('[aria-label="提示"] button')
        .contains('确定')
        .should('exist')
        .click({
          force: true
        })  
    },
    onError: (message) => {
      cy.get('.el-message--error').should('contain', message)
    }
  })
}

export const addLessonGroup = (lessonGroupName) => {
 waitIntercept(interceptLessonName, () => {
  cy.findAllByPlaceholderText('请输入课程组合名称').clear({
    force:true
  })
  cy.wait(1000)
  cy.get('button')
  .contains('搜索')
  .should('exist')
  .click({
    force: true
  })
  }, data => {
    console.log(data);
    const lesson1 = data.records[0].lessonList[0].lessonName
    const lesson2 = data.records[0].lessonList[1].lessonName
    cy.wait(300)
    customizeLessonGroup()
    cy.wait(3000)
    setLessonGroupName(lessonGroupName)
    cy.wait(2000)
    selectCheckbox(lesson1)
    selectCheckbox(lesson2)
    cy.wait(5000)
    clickCreateGroupBtn('添加')
    clickCreateGroupBtn('确定')
  })
}

export const searchAndOperate = (groupName, option) => {
  waitIntercept(interceptQueryLessonGroup, () => {
    searchGroupName(groupName)
  }, data => {
    console.log(data);
    if (data.total) {
      cy.wait(300)
      option() && option()
    }
  })
}