/**
 * 课程组合管理
 */
context('课程组合管理', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/manage/education/lesson-group')
  })
  it('001-系统管理员推送课程组合', () => {
    cy.wait(1000)
    cy.get('.el-table__header').find('th').eq(0).find('.el-checkbox__inner').click()
    cy.get('button').contains('批量推送').click()
    cy.get('.push-mgr-tree .el-input__inner').click()
    cy.get('.tree-dept-node-txt').each(element => {
      element.click()
    })
    cy.get('.el-dialog__title').contains('推送课程组合').click()
    cy.get('button').contains('确定').click()
  })
})