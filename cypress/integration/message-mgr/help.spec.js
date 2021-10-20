/**
 * 告警消息求助，该测试模块设计发送短信，暂时先注释
 * */
import {
  clickButton
} from '../common/button'
import {
  withinDialog,
  closeTips
} from '../common/dialog'
context('消息互通-告警消息求助', () => {
  before(() => {
    cy.visitPage('help')
    cy.wait(1000)
  })
  const contactForm = () => {
    return cy.get('#pane-contact form .el-form-item').first()
  }
  it('001-使用质控主管单位账号登录-添加联系人', () => {
    let linker = '张铭'
    let phone = '18518609271'
    cy.get('#tab-contact').click()
    cy.wait(1000)
    contactForm().find('input').clear().type(linker)
    contactForm().next().find('input').clear().type(phone)
    clickButton('保存')
  })

  it('002-使用质控主管单位账号登录-修改联系人', () => {
    let linker = '张铭111'
    let phone = '18518609271'
    cy.get('#tab-contact').click()
    cy.wait(1000)
    clickButton('添加联系人')
    contactForm().find('input').clear().type(linker)
    contactForm().next().find('input').clear().type(phone)
    clickButton('保存')
  })

  it('003-使用质控主管单位账号登录-删除联系人', () => {
    let linker = '张铭111'
    cy.get('#tab-contact').click()
    cy.wait(1000)
    cy.get('#pane-contact form .el-form-item input').each(ele => {
      if (ele.val() === linker) {
        ele.parent().parent().parent().next().next().find('button').eq(1).click()
        // cy.get('[aria-label="提示"] button').contains('删除').click()
        closeTips('提示', '删除')
      }
    })
  })
})