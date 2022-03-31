/**
 *在线教育人员管理报表
 */
import {
  activeArea,
  setLabNameOrCode,
  setYear,
  searchDataAfterOption,
  interceptQueryPlan,
  interceptQueryPlanData,
} from './user-report'
import {
  clickListener
} from '../common/event'
import {
  clickButton
} from '../common/button'
import {
  findTableCell
} from '../common/table'
context('在线教育人员管理报表', () => {
  before(() => {
      cy.visitPage('user-report')
  })
  it('001-在线教育人员管理报表-筛选条件-类型地区', () => {
    cy.get('.el-radio-group .el-radio').first().click({
      force: true
    })
    activeArea()
    setLabNameOrCode('青浦区白鹤社区卫生服务中心')
    searchDataAfterOption(interceptQueryPlan, 2020, () => {
      clickButton('搜索')
    })
  })
  it('002-在线教育人员管理报表-筛选条件-类型管理机构', () => {
    cy.get('.el-radio-group .el-radio').eq(1).click({
      force: true
    })
    cy.get('[placeholder="请选择管理机构"]').click({
      force: true
    })
    cy.get('.el-tree-node .el-tree-node__content .tree-dept-node .tree-dept-node-txt').contains('青浦医联体').click({
      force: true
    })
    setLabNameOrCode('青浦区白鹤社区卫生服务中心')
    searchDataAfterOption(interceptQueryPlan, 2020, () => {
      clickButton('搜索')
    })
  })
  it('003-在线教育人员管理报表-筛选条件-类型实验室标签', () => {
    cy.get('.el-radio-group .el-radio').eq(2).click({
      force: true
    })
    cy.get('[placeholder="请选择实验室标签"]').click({
      force: true
    })
    cy.get('.el-select-dropdown__list .el-select-group__wrap .el-select-group .el-select-dropdown__item').contains('公立').click({
      force: true
    })
    setLabNameOrCode('青浦区白鹤社区卫生服务中心')
    searchDataAfterOption(interceptQueryPlan, 2020, () => {
      clickButton('搜索')
    })
  })
  it('004-在线教育人员管理报表-导出excel', () => {
    cy.wait(1000)
    clickListener(() => clickButton('导出Excel'))
  })
  it('005-在线教育人员管理报表-查看申请计划', () => {
    cy.wait(1000)
    setYear(2020)
    searchDataAfterOption(interceptQueryPlanData, 2020, () => {
      findTableCell(0, 1).click({
        force: true
      })
    }, false)
  })
})