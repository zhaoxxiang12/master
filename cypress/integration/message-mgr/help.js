/**
 * 告警消息求助，该测试模块设计发送短信，暂时先注释
 * */
context('消息互通-告警消息求助', () => {
  /* before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/message-mgr/help')
    cy.wait(1000)
  })
  it('001-使用质控主管单位账号登录-添加联系人', () => {
    let linker = '张铭'
    let phone = '18518609271'
    cy.get('#tab-contact').click()
    cy.wait(1000)
    cy.get('#pane-contact form .el-form-item').first().find('input').clear().type(linker)
    cy.get('#pane-contact form .el-form-item').first().next().find('input').clear().type(phone)
    cy.get('button').contains('保存').click()
  })

  it('002-使用质控主管单位账号登录-修改联系人', () => {
    let linker = '张铭111'
    let phone = '18518609271'
    cy.get('#tab-contact').click()
    cy.wait(1000)
    cy.get('button').contains('添加联系人').click()
    cy.get('#pane-contact form .el-form-item').first().find('input').clear().type(linker)
    cy.get('#pane-contact form .el-form-item').first().next().find('input').clear().type(phone)
    cy.get('button').contains('保存').click()
  })

  it('003-使用质控主管单位账号登录-删除联系人', () => {
    let linker = '张铭111'
    let phone = '18518609271'
    cy.get('#tab-contact').click()
    cy.wait(1000)
    cy.get('#pane-contact form [style="margin-top: 15px;"]').each(ele => {
      if (ele.find('.el-form-item').first().find('input').val() === linker) {
        // ele.find('.el-form-item').last().find('button').contains('删除').click()
        ele.find('.el-form-item').last().find('button').eq(1).click()
        cy.get('[aria-label="提示"] button').contains('删除').click()
      }
    })
  }) */
})