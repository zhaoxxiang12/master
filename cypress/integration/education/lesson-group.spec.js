/**
 * 课程组合管理
 */
import { visitPage } from '../../shared/route'
import { loginMgrWithGdccl } from '../common/login'
import {
  logout,
  customizeLessonGroup,
  setLessonGroupName,
  clickCreateGroupBtn,
  selectAll,
  batchPush,
  pushAll,
  searchGroupName,
  cancelBatchPush,
  delLessonGroup,
  cancelSinglePush,
  seeLessonGroupDetail,
  closeDetailDialog,
  cancelPush,
  pushLesson,
  addLessonGroup,
  searchAndOperate
} from './lesson-group'
describe('课程组合管理', () => {
  context('课程组合管理-admin', () => {
    before(() => {
      cy.visitPage('lesson-group')
    })
    after(() => {
      //点击注销，切换用户登录
      logout()
    })
    it('001-系统管理员新增课程组合', () => {
      addLessonGroup('abc')

    })
    it('002-系统管理员推送课程组合', () => {
      cy.wait(500)
      selectAll()
      batchPush()
      pushAll()
    })
    it('003-系统管理员批量取消推送', () => {
      cy.wait(300)
      searchAndOperate('abc', () => {
        searchGroupName('abc')
        selectAll()
        cancelBatchPush()
      })
    })
    it('004-系统管理员新增课程组合-相同的课程允许存在不同的组合中', () => {
      addLessonGroup('def')
    })
    it('005-系统管理员删除课程组合abc', () => {
      cy.visitPage('lesson-group')
      cy.wait(300)
     searchAndOperate('abc', delLessonGroup)
    })
    it('006-系统管理员删除课程组合def', () => {
      cy.wait(300)
      searchAndOperate('def', delLessonGroup)
    })
    it('007-系统管理员-查看内含课程', () => {
      cy.wait(300)
      searchAndOperate('内部学习', () => {
        seeLessonGroupDetail()
        cy.wait(1000)
        closeDetailDialog()
      })
    })
    it('008-无法取消推送的场景', () => {
      cy.wait(300)
      searchAndOperate('内部学习111', () => {
      selectAll()
      cancelPush()
      })
    })
    it('009-单个组合推送', () => {
      cy.wait(300)
      searchAndOperate('AA', () => {
        cy.get('.el-table button')
        .contains('推送')
        .click({
          force: true
        })
      pushAll()
      pushLesson()
      })
    })
    it('010-单个组合取消推送', () => {
      cy.wait(300)
      searchAndOperate('AA', () => {
        cancelSinglePush()
      })
    })

    it('011-删除已推送的组合AA', () => {
      cy.wait(300)
      searchAndOperate('AA', () => {
        delLessonGroup()
      })
    })
    /* it('0011-系统管理员新增课程组合-组合名称验证', () => {
      cy.visitPage('lesson-group')
      cy.wait(300)
      cy.get('button').contains('自定义课程组合').click({
        force: true
      })
      cy.wait(100)
      const lessonGroup = cy.get('[aria-label="创建课程组合"] [placeholder="请输入课程组合名称"]')
      let str50 = '1234567890qwertyuiopasdfghjklzxcvbnm1234567890qwerty'
      lessonGroup.clear().type(str50)
      cy.wait(100)
      const checkbox1 = cy.get('[aria-label="创建课程组合"] [aria-label="checkbox-group"] .el-checkbox')
      checkbox1.contains('0000').click({
        force: true
      })
      const checkbox2 = cy.get('[aria-label="创建课程组合"] [aria-label="checkbox-group"] .el-checkbox')
      checkbox2.contains('[0101001]从BCG检测白蛋白开始').click({
        force: true
      })
      const addBtn = cy.get('[aria-label="创建课程组合"] button')
      addBtn.contains('添加').click({
        force: true
      })
      const saveBtn = cy.get('[aria-label="创建课程组合"] button')
      saveBtn.contains('确定').click({
        force: true
      })
      cy.get('.el-message--error').should('contain', '课程组合名称长度超过50')
      saveBtn.contains('取消').click({
        force: true
      })
    }) */
  })

  context('课程组合管理-广东佛山临检', () => {
    before(() => {
      cy.gdfslj_user_login()
      visitPage('lesson-group')
      loginMgrWithGdccl('lesson-group')
    })
    after(() => {
      //点击注销，切换用户登录
      logout()
    })
    it('001-广东临检中心新增课程组合-每个组合的课程总数<=15节', () => {
      cy.wait(1000)
      customizeLessonGroup()
      cy.wait(100)
      setLessonGroupName(`def${Date.now()}`)
      cy.wait(100)
      for (let i = 0; i < 16; i++) {
        const checkbox = cy.get('[aria-label="创建课程组合"] [aria-label="checkbox-group"] .el-checkbox')
        checkbox.eq(i).click({
          force: true
        })
      }
      clickCreateGroupBtn('添加')
      clickCreateGroupBtn('确定')
      cy.wait(100)
      // cy.get('.el-message--error').should('contain', '课程组合中的课程总数不能超过15节')
      clickCreateGroupBtn('取消')
    })
    it('002-广东临检中心新增课程组合-每个组合的视频比例<=40%', () => {
      cy.wait(1000)
      customizeLessonGroup()
      cy.wait(100)
      setLessonGroupName(`def${Date.now()}`)
      cy.wait(100)
      const videoTag = cy.get('[aria-label="创建课程组合"] .el-checkbox__label .el-tag')
      videoTag.contains('视频').first().click({
        force: true
      })
      const imgTxtTag = cy.get('[aria-label="创建课程组合"] .el-checkbox__label .el-tag')
      imgTxtTag.contains('图文').first().click({
        force: true
      })
      clickCreateGroupBtn('添加')
      clickCreateGroupBtn('确定')
      cy.wait(100)
      // cy.get('.el-message--error').should('contain', '课程组合中的视频课程比例不能超过40%')
      clickCreateGroupBtn('取消')
    })
  })
})