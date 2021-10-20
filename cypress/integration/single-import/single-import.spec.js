/**
 * 单项目数据录入
 */

context('单项目数据录入',() => {
  before(() => {
    cy.visitLabPage('single-import','labgd18020')
  })
  context('上报/修改/删除数据', () => {
    it('上报数据', () => {
      // cy.exec('python  cypress\\integration\\single-report\\hello.py')
    })
  })
})