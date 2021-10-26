/**
 * 单项目数据录入
 */

import dayjs from 'dayjs'

context('单项目数据录入',() => {
  before(() => {
    cy.visitLabPage('single-import','labgd18020')
  })
  context('上报/修改/删除数据', () => {
    it('上报数据', () => {
      const localtime = dayjs().format('YYYY-MM-DD')
      cy.task('executeCqbSql',`delete from base_qc_batch_no_group where createTime LIKE '%${localtime}%'`)
      // cy.exec('python  cypress\\integration\\single-report\\hello.py')
    })
  })
})