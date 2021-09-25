context('测试登录cqb实验室端', () => {
  before(() => {
    cy.loginLabCQB()
    // cy.visit('/cqb-base-mgr-fe/app.html#/manage/cert/cert-year')
  })
  it('登录cqb实验室端', () => {
    console.log('登录cqb实验室端')
    cy.wait(2000)
    // cy.loginCQB()
    // cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/cert/cert-year')
  })
})