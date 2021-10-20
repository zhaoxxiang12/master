export const logout = () => {
  cy.get('.cqbicon.icon-logout')
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

export const clickCreateGroupBtn = (text) => {
  cy.get('[aria-label="创建课程组合"] button')
    .contains(text)
    .should('exist')
    .click({
      force: true
    })
}

export const selectAll = () => {
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
  cy.get('button')
    .contains('确定')
    .should('exist')
    .click({
      force: true
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
  cy.get('[aria-label="课程信息"] button')
    .contains('关闭')
    .should('exist')
    .click({
      force: true
    })
}

export const cancelPush = () => {
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
  cy.get('.el-message--error').should('contain', 'AA课程组合已经应用到相同名称计划、异步处理验证课程计划中')
}