import {
  interceptAll,
  waitIntercept
} from '../common/http'
import { loginMgrWithGdccl } from '../common/login'

context('分级管理机构', () => {
  let saveButton = 5
  let cancel = 3
  const path = '/cqb-base-mgr-fe/app.html#/manage/account/manage-dept'
  const waitPage = (alias) => {
    return interceptAll('service/mgr/ccl/users/admin', waitPage.name)
  }
  before(() => {
    cy.loginCQB()
    waitIntercept(waitPage, () => {
      cy.visit(path)
      cy.wait(1000)
    },() => {

    })
  })
  it('001-添加管理机构-管理单位名称未填写', () => {
    cy.wait(1000)
    cy.get('button').contains('添加下一级管理单位').click()
    cy.get('.tree-resource.tree-resource__border').find('span').contains('所有权限').click({
      force: true
    })
    cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
      force: true
    })
    cy.get('body').should('contain', '请输入管理单位名称')
    cy.get('.el-button.el-button--default.el-button--medium').eq(cancel).click()
  })
  it('002-添加管理机构-权限未选择', () => {
    let orgName = '测试'
    let type = 1
    cy.get('button').contains('添加下一级管理单位').click()
    cy.get('.el-input__inner').eq(type).type(orgName)
    cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
      force: true
    })
    cy.get('body').should('contain', '请选择功能点')
    cy.get('.el-button.el-button--default.el-button--medium').eq(cancel).click()
  })
  it('003-添加管理机构-未选择实验室', () => {
    let orgName = '测试'
    let type = 1
    cy.wait(1000)
    cy.get('button').contains('添加下一级管理单位').click()
    cy.get('.el-input__inner').eq(type).type(orgName)
    cy.get('.tree-resource.tree-resource__border').find('span').contains('所有权限').click({
      force: true
    })
    cy.get('.el-radio__inner').last().click()
    cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
      force: true
    })
    cy.get('body').should('contain', '请选择所在地实验室')
    cy.get('.el-button.el-button--default.el-button--medium').eq(cancel).click()
  })
  it('004-添加管理机构-管理机构名字相同', () => {
    let orgName = '青浦医联体'
    let type = 1
    cy.wait(1000)
    cy.get('.el-tree-node__children').first().find('[role="treeitem"]')
      .then((data) => {
        let getLength = data.length
        cy.get('button').contains('添加下一级管理单位').click()
        cy.get('.el-input__inner').eq(type).type(orgName)
        cy.get('.tree-resource.tree-resource__border').find('span').contains('所有权限').click({
          force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/ccl*').as('add')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
          force: true
        })
        cy.wait('@add').then((xhr) => {
          cy.compare(xhr, 400)
          cy.get('.el-message__content').should('contain', '已存在同名的管理单位，不能添加。')
        })
        cy.wait(1000)
        cy.get('.el-tree-node__children').first().find('[role="treeitem"]').should('have.length', getLength)
        cy.get('.el-button.el-button--default.el-button--medium').eq(cancel).click()
      })
  })
  it('005-添加管理机构-数据正常保存', () => {
    let orgName = '测试'
    let type = 1
    cy.wait(1000)
    cy.get('.el-tree-node__children').first().find('[role="treeitem"]')
      .then((data) => {
        let getLength = data.length
        cy.get('button').contains('添加下一级管理单位').click()
        cy.get('.el-input__inner').eq(type).type(orgName)
        cy.get('.tree-resource.tree-resource__border').find('span').contains('所有权限').click({
          force: true
        })
        cy.intercept('**/cqb-base-mgr/service/mgr/ccl*').as('add')
        cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
          force: true
        })
        cy.wait('@add').then((xhr) => {
          cy.compare(xhr)
          cy.get('.el-message.el-message--success').should('contain', '管理单位已添加')
        })
        cy.wait(1000)
        cy.get('.el-tree-node__children').first().find('[role="treeitem"]').should('have.length', getLength + 1)
      })
  })
  it('006-添加管理机构-添加用户(用户名未填写)', () => {
    let name = '明'
    cy.get('.el-tree-node__children').first().find('[role="treeitem"]').last().click()
    cy.wait(1000)
    cy.get('button').contains('添加用户').click()
    cy.get('[autocomplete="new-password"]').first().type(name)
    cy.get('[autocomplete="new-password"]').last().type(123456)
    cy.get('.tree-resource.tree-resource__border').find('span').contains('所有权限').click({
      force: true
    })
    cy.get('.el-button.el-button--primary.el-button--medium').last().click({
      force: true
    })
    cy.get('body').should('contain', '请输入用户名')
    cy.get('.el-button.el-button--default.el-button--medium').last().click()
  })
  it('007-添加管理机构-添加用户(姓名未填写)', () => {
    let name = '明'
    cy.get('.el-tree-node__children').first().find('[role="treeitem"]').last().click()
    cy.get('button').contains('添加用户').click()
    cy.wait(1000)
    cy.get('.el-input__inner').eq(2).type(name)
    cy.get('[autocomplete="new-password"]').last().type(123456)
    cy.get('.tree-resource.tree-resource__border').find('span').contains('所有权限').click({
      force: true
    })
    cy.get('.el-button.el-button--primary.el-button--medium').last().click({
      force: true
    })
    cy.get('body').should('contain', '请输入姓名')
    cy.get('.el-button.el-button--default.el-button--medium').last().click()
  })
  it('008-添加管理机构-添加用户(密码未填写)', () => {
    let name = '明'
    cy.get('.el-tree-node__children').first().find('[role="treeitem"]').last().click()
    cy.get('button').contains('添加用户').click()
    cy.wait(1000)
    cy.get('.el-input__inner').eq(2).type(name)
    cy.get('[autocomplete="new-password"]').first().type(name)
    cy.get('.tree-resource.tree-resource__border').find('span').contains('所有权限').click({
      force: true
    })
    cy.get('.el-button.el-button--primary.el-button--medium').last().click({
      force: true
    })
    cy.get('body').should('contain', '请输入密码')
    cy.get('.el-button.el-button--default.el-button--medium').last().click()
  })
  it('009-添加管理机构-添加用户(权限未选择)', () => {
    let name = '明'
    cy.get('.el-tree-node__children').first().find('[role="treeitem"]').last().click()
    cy.get('button').contains('添加用户').click()
    cy.wait(1000)
    cy.get('.el-input__inner').eq(2).type(name)
    cy.get('[autocomplete="new-password"]').first().type(name)
    cy.get('[autocomplete="new-password"]').last().type(123)
    cy.get('.el-button.el-button--primary.el-button--medium').last().click({
      force: true
    })
    cy.get('body').should('contain', '请选择功能点')
    cy.get('.el-button.el-button--default.el-button--medium').last().click()
  })
  it('010-添加管理机构-添加用户(数据填写完整)', () => {
    let name = '明'
    cy.get('.el-tree-node__children').first().find('[role="treeitem"]').last().click()
    cy.get('button').contains('添加用户').click()
    cy.wait(1000)
    cy.get('.el-input__inner').eq(2).type(name)
    cy.get('[autocomplete="new-password"]').first().type(name)
    cy.get('[autocomplete="new-password"]').last().type(123)
    cy.get('.tree-resource.tree-resource__border').find('span').contains('所有权限').click({
      force: true
    })
    cy.intercept('**/cqb-base-mgr/service/system/user/add*').as('add')
    cy.get('.el-button.el-button--primary.el-button--medium').last().click({
      force: true
    })
    cy.wait('@add').then((xhr) => {
      cy.compare(xhr)
      cy.get('.el-message__content').should('contain', '用户已添加')
    })
  })
  it('011-添加管理机构-关键字搜索', () => {
    cy.get('.el-tree-node__children').first().find('[role="treeitem"]').last().invoke('text').then((text) => {
      let data = text.replace(/(^\s*)|(\s*$)/g, '')
      cy.get('[placeholder="请输入管理单位名进行查找"]').type(data)
      cy.get('.el-tree-node__children').first().find('[role="treeitem"]').last().should('not.have.css', 'display', 'none')
    })
  })
  it('012-添加管理机构-修改管理机构名字', () => {
    let newName = '自动化测试'
    cy.get('.el-tree-node__children').first().find('[role="treeitem"]').last().find('[title="编辑管理单位"]').click()
    cy.wait(1000)
    cy.get('.el-input__inner').eq(1).clear().type(newName)
    cy.intercept('**/cqb-base-mgr/service/mgr/ccl*').as('update')
    cy.get('.el-button.el-button--primary.el-button--medium').eq(saveButton).click({
      force: true
    })
    cy.wait('@update').then((xhr) => {
      cy.compare(xhr)
      cy.get('.el-message.el-message--success').should('contain', '管理单位已更新')
      cy.get('.el-tree-node__children').first().find('[role="treeitem"]').last().invoke('text').then((text) => {
        let orgName = text.replace(/(^\s*)|(\s*$)/g, '')
        expect(orgName).to.eq(newName)
      })
    })
  })
  it('013-添加管理机构-删除管理单位(存在用户)', () => {
    cy.get('.el-tree-node__children').first().find('[role="treeitem"]').last().find('[title="删除管理单位"]').click()
    cy.intercept('**/service/mgr/ccl/*').as('delete')
    cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
      force: true
    })
    cy.wait('@delete').then((xhr) => {
      cy.compare(xhr, 400)
      cy.get('.el-message__content').should('contain', '管理单位删除失败，该管理单位有关联用户信息')
    })
  })
  it('014-添加管理机构-修改用户名', () => {
    let newUserName = 'UI修改姓名'
    let org = 1
    cy.get('.el-tree-node__children').first().find('[role="treeitem"]').last().click()
    cy.get('.el-table__body').last().find('tr').first().find('button').contains('编辑').click()
    cy.wait(2000)
    cy.get('[autocomplete="new-password"]').first().clear().type(newUserName)
    cy.intercept('**/cqb-base-mgr/service/system/user/update*').as('update')
    cy.get('.el-button.el-button--primary.el-button--medium').last().click({
      force: true
    })
    cy.wait('@update').then((xhr) => {
      cy.compare(xhr)
      cy.get('.el-message.el-message--success').should('contain', '用户已更新')
      cy.wait(1000)
      cy.get('.el-table__body').last().find('tr').first().find('.cell').eq(org).invoke('text')
        .then((data) => {
          let getName = data
          expect(getName).to.eq(newUserName)
        })
    })
  })
  it('015-添加管理机构-删除用户名', () => {
    cy.get('.el-tree-node__children').first().find('[role="treeitem"]').last().click()
    cy.get('.el-table__body').last().find('tr').then((data) => {
      let getLength = data.length
      if (getLength == 1) {
        cy.get('.el-table__body').last().find('tr').first().find('button').contains('删除').click()
        cy.intercept('**/cqb-base-mgr/service/system/user/*').as('delete')
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
          force: true
        })
        cy.wait('@delete').then((xhr) => {
          cy.compare(xhr)
          cy.get('.el-message.el-message--success').should('contain', '删除成功')
          cy.get('body').should('contain', '暂无数据')
        })
      } else {
        cy.get('.el-table__body').last().find('tr').first().find('button').contains('删除').click()
        cy.intercept('**/cqb-base-mgr/service/system/user/*').as('delete')
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
          force: true
        })
        cy.wait('@delete').then((xhr) => {
          cy.compare(xhr)
          cy.get('.el-message.el-message--success').should('contain', '删除成功')
          cy.get('.el-table__body').last().find('tr').should('have.length', getLength - 1)
        })
      }
    })
  })
  it('016-添加管理机构-删除管理单位(数据删除成功)', () => {
    cy.get('[placeholder="请输入管理单位名进行查找"]').clear()
    cy.wait(500)
    cy.get('.el-tree-node__children').first().find('[role="treeitem"]').then((data) => {
      let getLength = data.length
      cy.get('.el-tree-node__children').first().find('[role="treeitem"]')
        .last().find('[title="删除管理单位"]').click()
      cy.intercept('**/service/mgr/ccl/*').as('delete')
      cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
        force: true
      })
      cy.wait('@delete').then((xhr) => {
        cy.compare(xhr)
        cy.get('.el-message__content').should('contain', '删除成功！')
      })
      cy.get('.el-tree-node__children').first().find('[role="treeitem"]').should('have.length', getLength - 1)
    })
  })
  it('017-系统顶级管理员-添加用户', () => {
    let name = 'addCQB'
    cy.get('.tree-dept .tree-dept-node .tree-dept-node-txt.tree-dept-node-l1').contains('系统顶级管理单位').click()
    cy.get('button').contains('添加用户').click({
      force: true
    })
    cy.wait(1000)
    cy.get('.el-input__inner').eq(2).clear().type(name)
    cy.get('[autocomplete="new-password"]').first().clear().type(name)
    cy.get('[autocomplete="new-password"]').last().clear().type(name)
    cy.get('.tree-resource.tree-resource__border').find('span').contains('所有权限').click({
      force: true
    })
    cy.intercept('**/cqb-base-mgr/service/system/user/checkUserCode?*').as('checkUser')
    cy.intercept('**/cqb-base-mgr/service/system/user/add*').as('add')
    cy.get('.el-button.el-button--primary.el-button--medium').last().click({
      force: true
    })
    cy.wait('@checkUser').then((xhr) => { // 判断新增的用户是否存在
      cy.compare(xhr)
      let judge = xhr.response.body.data
      if (judge == true) {
        cy.get('.el-form-item__error').should('contain', '用户名已被使用')
        //新增用户能正常登录
        loginMgrWithGdccl('lab-manager','addCQB')
        cy.wait(3000)
        loginMgrWithGdccl('lab-manager','admin')
        cy.visit(path)
        waitPage('waitPage')
        cy.wait('@waitPage').its('response.statusCode').should('eq', 200)
      } else {
        cy.wait('@add').then((xhr) => {
          cy.compare(xhr)
          cy.get('.el-message__content').should('contain', '用户已添加')
          cy.wait(1000)
          loginMgrWithGdccl('lab-manager','addCQB')
          loginMgrWithGdccl('lab-manager','admin')
          cy.visit(path)
          waitPage('waitPage')
          cy.wait('@waitPage').its('response.statusCode').should('eq', 200)
        })
      }
    })
  })
  it('018-系统顶级管理员-修改用户密码', () => {
    cy.fixture('editCQB').then(json => {
      cy.get('.tree-dept .tree-dept-node .tree-dept-node-txt.tree-dept-node-l1').contains('系统顶级管理单位').click()
      cy.wait(2000)
      cy.get('.el-table__body')
        .last()
        .find('.cell')
        .contains(json.username)
        .closest('tr')
        .findByText('编辑')
        .click()

      cy.get('[autocomplete="new-password"]').last().clear().type(json.password)
      cy.intercept('**/cqb-base-mgr/service/system/user/update*').as('edit')
      cy.get('.el-button.el-button--primary.el-button--medium').last().click({
        force: true
      })
      cy.wait('@edit').then((xhr) => {
        cy.compare(xhr)
        // cy.get('.el-message__content').should('contain', '用户密码已修改')
        cy.wait(1000)
        loginMgrWithGdccl('lab-manager','editCQB')
        loginMgrWithGdccl('report-rate','admin')
        cy.wait(1000)
        cy.get('button').contains('推送到大屏').should('be.exist')
        cy.visit(path)
        waitPage('waitPage')
        cy.wait('@waitPage').its('response.statusCode').should('eq', 200)
        cy.wait(2000)
        cy.get('.el-table__body')
          .last()
          .find('.cell')
          .contains(json.username)
          .closest('tr')
          .findByText('删除')
          .click()

        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
      })
    })

  })
})