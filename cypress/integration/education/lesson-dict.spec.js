/**
 * 字典维护
 */
import { clickButton, uploadImage } from '../common/button'
import {
  openAddDict,
  tabsItem,
  saveBtn,
  setDictName,
  searchTrs,
  setLessonDict,
  setTeacher,
  setLessonType,
  setScore,
  setIntro,
  openEditDialog,
  selectLessonType,
  changeDictState
} from './lesson-dict'

context('字典维护', () => {
  before(() => {
    cy.visitPage('lesson-dict')
  })
  it('001-添加课程类型的字典', () => {
    cy.wait(1000)
    openAddDict()
    setDictName('测试课程类型字典')
    saveBtn()
  })
  it('002-添加专业组的字典', () => {
    cy.wait(1000)
    tabsItem('专业组字典')
    openAddDict()
    const specialGroupInp = cy.get('.demo-ruleForm .el-form-item').eq(0).find('.el-input__inner')
    specialGroupInp.clear().type('测试专业组字典', {
      force: true
    })
    saveBtn()
  })
  it('003-添加职称的字典', () => {
    cy.wait(1000)
    tabsItem('职称字典')
    openAddDict()
    setDictName('测试职称字典')
    saveBtn()
  })
  it('004-编辑课程类型的字典', () => {
    cy.wait(2000)
    searchTrs('测试课程类型字典', () => {
      setDictName('测试课程类型字典11111')
      saveBtn()
    })
  })
  it('005-编辑专业组的字典', () => {
    cy.wait(1000)
    tabsItem('专业组字典')
    searchTrs('测试专业组字典', () => {
      setDictName('测试专业组字典11111')
      saveBtn()
    })
  })
  it('006-编辑职称的字典', () => {
    cy.wait(1000)
    tabsItem('职称字典')
    cy.wait(1000)
    searchTrs('测试职称字典11111', () => {
      setDictName('测试职称字典11111')
      saveBtn()
    })
  })
  it('007-编辑职称的字典-添加课程管理-选择新添加的字典', () => {
    cy.wait(1000)
    tabsItem('职称字典')
    cy.wait(1000)
    searchTrs('测试职称字典', () => {
      cy.wait(1000)
      setDictName('测试职称字典11111')
      saveBtn()
      cy.loginCQB()
      cy.visitPage('lesson')
      cy.wait(1000)
      clickButton('添加课程')
      setLessonDict('test新添加的字典')
      uploadImage('[aria-label="添加课程"]', 'logo.png')
      cy.wait(1000)
      setTeacher('test 新添加的授课者')
      setLessonType('测试课程类型字典')
      setScore(10)
      setIntro('课程简介')
      saveBtn()
    })
  })
  it('008-编辑职称的字典-编辑课程管理-选择新添加的字典', () => {
    cy.loginCQB()
    cy.visitPage('lesson-dict')
    cy.wait(4000)
    tabsItem('职称字典')
    cy.wait(4000)
    searchTrs('测试职称字典11111', () => {
      setDictName('测试职称字典11111')
      saveBtn()
      cy.wait(4000)
      cy.loginCQB()
      cy.visitPage('lesson')
      cy.wait(4000)
      cy.get('input').first().clear({
        force: true
      }).type('test新添加的字典', {
        force: true
      })
      clickButton('搜索')
      openEditDialog()
      selectLessonType('测试课程类型字典222')
      saveBtn()
      cy.wait(4000)
      // 删除‘007-编辑职称的字典-添加课程管理-选择新添加的字典’
      const deleteBtn = cy.get('.el-table .el-table__fixed-right .el-table__fixed-body-wrapper tbody tr button').contains('删除')
      deleteBtn.click({
        force: true
      })
      // cy.get('.el-popconfirm__action').find('button').eq(1).click()
      const confirmBtn = cy.get('.el-popover .el-popconfirm__action').find('button').last()
      confirmBtn.click({
        force: true
      })
    })
  })
  it('009-启用停用的字典', () => {
    cy.loginCQB()
    cy.visitPage('lesson-dict')
    cy.wait(1000)
    changeDictState('电子书')
  })
  it('010-停用启用的字典', () => {
    cy.wait(1000)
    changeDictState('电子书')
  })
})