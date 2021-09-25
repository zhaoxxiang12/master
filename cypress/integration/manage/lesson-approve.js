/**
 * 在线教育人员授权管理页面
 */
context('在线教育人员授权管理页面', () => {
  before(() => {
    cy.loginLabCQB()
    cy.intercept('**/cqb-base/service/edu/plan-apply/page?planName=*').as('getData')
    cy.visit('http://lab-cqb.test.sh-weiyi.com/cqb-base-gz-fe/app.html#/edu/lesson-plan')
    cy.wait('@getData').then((xhr) => {
      let responseStatus = xhr.response.statusCode
      let expectStatus = 200
      expect(responseStatus).to.eq(expectStatus)
      // cy.wait(1000)
    })
  })
  it('001-申请课程计划', () => {
    cy.get('.el-table .el-table__body-wrapper tbody').eq(0).find('tr').last().find('button').contains('申请').click({
      force: true
    })
  })
})
