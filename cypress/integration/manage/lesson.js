/**
 * 课程管理
 */
context('课程管理', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/manage/education/lesson')
  })
  it('001-将勾选的课程推送给所有勾选的管理单位', () => {
    cy.wait(1000)
    cy.get('.el-table__header').find('th').eq(0).find('.el-checkbox__inner').click({
      force: true
    })
    cy.get('button').contains('批量推送').click({
      force: true
    })
    cy.get('.el-dialog__body').find('.el-input__inner').click({
      force: true
    })
    cy.wait(500)
    cy.get('.tree-dept-node-txt').each(element => {
      element.click()
    })
    cy.get('.el-dialog__title').contains('推送课程组合').click({
      force: true
    })
    cy.get('button').contains('确定').click({
      force: true
    })
  })
})