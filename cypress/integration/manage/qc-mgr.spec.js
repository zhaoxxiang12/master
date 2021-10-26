import {
  visitPage
} from '../../shared/route'
import {
  closeTips
} from '../common/dialog'
import {
  interceptAll,
  waitRequest
} from '../common/http'

/**
 * 
 * @param {string} prop 
 * @returns 
 */
const findElement = (prop) => {   
  return cy.get(`[for="${prop}"]`).next('.el-form-item__content').find('.el-tree-node__children').contains('IQC管理')
    .parents('.el-tree-node').first()
}

/**
 * 
 * @param {string} prop 弹窗名
 * @param {string} text 按键文本
 */
const clickSave = (prop,text) => {
  cy.get(`[aria-label="${prop}"]`).find('.el-dialog__footer').last().findByText(text).click({
    force: true
  })
}

const checkPermissions = (prop) => {
  return findElement(prop).find('.tree-resource-node').contains('质控品管理').parents('.el-tree-node__content')
}

const openEditPage = () => {
  visitPage('manage-dept')
  cy.wait(3000)
  cy.get('.el-aside.manage-dept-aside').within(() => {
    cy.get('.el-tree-node__children').find('[title="佛山市临床检验质量控制中心"]').parent().find('[title="编辑管理单位"]').click({
      force: true
    })
    cy.wait(3000)
  })
}

const editUser = ()=>{
  cy.get('.el-aside.manage-dept-aside').within(() => {
    cy.get('.el-tree-node__children').find('[title="佛山市临床检验质量控制中心"]').click({
      force: true
    })
    cy.wait(3000)
  })
  cy.get('.el-table__body').first().find('.el-table__row').eq(1)
    .findByText('编辑').click({
      force:true
    })
  cy.wait(3000)
}

const interceptEditManage = () => {
  return interceptAll('service/mgr/ccl', interceptEditManage.name)
}

const interceptEditUser = () =>{
  return interceptAll('service/system/user/update',interceptEditUser.name)
}

const loginOut = () => {
  let queryIndex = 1
  // 点击右上角的管理员
  cy.get('span[aria-haspopup="list"]').eq(queryIndex).click({
    force: true
  })
  //点击注销，切换用户登录
  cy.get('.cqbicon.icon-logout').click({
    force: true
  })
  cy.wait(5000)
  //关闭登录弹窗
  closeTips('提示','关闭')
}

context('质控品管理', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/manage/iqcSet/qc-mgr')
    cy.get('.el-button.el-button--text.el-button--medium').contains('展开').click({
      force: true
    })
  })
  it('001-质控品管理-添加质控品', () => {
    cy.wait(1000)
    // 给质控品信息添加随机数避免重复
    let num = Math.ceil(Math.random() * 10000)
    //点击添加按钮
    cy.get('.el-button.el-button--primary.el-button--medium.is-plain').click({
      force: true
    })
    //输入质控品名称
    cy.get('[aria-label="添加质控品"] input').first().type('自动化质控品名称')
    //输入质控品批号
    cy.get('[aria-label="添加质控品"] input').eq(2).type('lot' + num)
    //输入货号
    cy.get('[aria-label="添加质控品"] input').eq(3).type('prod' + num)
    // 由于组件的下拉框是模拟的，不能使用select，因此需要通过点击操作
    cy.get('[aria-label="添加质控品"] input').eq(6).click({
      force: true
    })
    // 下拉菜单是在body下生成的
    cy.get('body>.el-select-dropdown li').first().click({
      force: true
    })
    //输入厂商信息
    cy.get('[aria-label="添加质控品"] input').eq(7).type('厂商' + num)
    //保存弹窗信息
    cy.get('[aria-label="添加质控品"] .el-dialog__footer button').contains('保存').click({
      force: true
    })
    // 没有错误提示
    cy.get('.el-form-item__error').should('have.length', 0)
    // 提示成功添加
    cy.get('body').should('contain', '已添加质控品')

  })

  it('002-质控品管理-添加重复的质控品', () => {
    let num = Math.ceil(Math.random() * 10000)
    //点击添加按钮
    cy.get('.el-button.el-button--primary.el-button--medium.is-plain').click({
      force: true
    })
    //弹窗中填写质控品名称
    cy.get('[aria-label="添加质控品"] input').first().type('质控品名称' + num)
    //弹窗中添加质控品批号
    cy.get('[aria-label="添加质控品"] input').eq(2).type('HCV-20190826')
    //输入货号
    cy.get('[aria-label="添加质控品"] input').eq(3).type('prod' + num)
    // 由于组件的下拉框是模拟的，不是使用select，因此需要通过点击操作
    cy.get('[aria-label="添加质控品"] input').eq(6).click({
      force: true
    })
    // 下拉菜单是在body下生成的
    cy.get('body>.el-select-dropdown li').first().click({
      force: true
    })
    //添加厂商信息
    cy.get('[aria-label="添加质控品"] input').eq(7).type('厂商' + num)
    cy.get('[aria-label="添加质控品"] .el-dialog__footer button').contains('保存').click({
      force: true
    })
    // 对添加失败的提示进行断言
    cy.get('.el-message--error').should('contain', '校验失败，您添加的质控品批号已存在。')
    cy.get('.el-button.el-button--default.el-button--medium').eq(1).click({
      force: true
    })
  })

  it('003-质控品管理-编辑质控品', () => {
    cy.get('input[placeholder="请输入质控品名称"]').type('自动化质控品名称', {
      force: true
    })
    let num = Math.ceil(Math.random() * 10000)
    let typeName = '质控品名称' + num
    // //点击搜索按钮
    cy.get('button[type="submit"]').first().click({
      force: true
    })
    cy.intercept({
      url: '**/cqb-base-mgr/service/mgr/qc/item/*',
      method: 'GET'
    }).as('edit')
    // // 点击编辑按钮
    cy.get('.el-table__fixed-right tbody tr').first().find('button').contains('编辑').click({
      force: true
    })
    cy.wait('@edit').then((xhr) => {
      cy.compare(xhr)
    })
    cy.wait(1000)
    //在弹窗中输入质控品名称
    cy.get('[aria-label="编辑质控品"] input').first().clear().type(typeName, {
      force: true
    })
    //点击保存按钮
    cy.get('[aria-label="编辑质控品"] .el-dialog__footer button').contains('保存').click({
      force: true
    })
    cy.get('.el-form-item__error').should('have.length', 0)
    // 断言编辑成功提示框
    cy.get('.el-message--success').should('contain', '已更新质控品')
    //将数据返回之前
    cy.get('input[placeholder="请输入质控品名称"]').clear({
      force: true
    }).type(typeName, {
      force: true
    })
    cy.get('button[type="submit"]').first().click({
      force: true
    })
    cy.intercept({
      url: '**/cqb-base-mgr/service/mgr/qc/item/*',
      method: 'GET'
    }).as('edit')
    cy.get('.el-table__fixed-right tbody tr').first().find('button').contains('编辑').click({
      force: true
    })
    cy.wait('@edit').then((xhr) => {
      cy.compare(xhr)
    })
    cy.wait(1000)
    cy.get('[aria-label="编辑质控品"] input').first().clear({
      force: true
    }).type('自动化质控品名称', {
      force: true
    })
    cy.intercept({
      url: '/cqb-base-mgr/service/mgr/qc/item',
      method: 'PUT'
    }).as('editItem')
    cy.get('[aria-label="编辑质控品"] .el-dialog__footer button').contains('保存').click({
      force: true
    })
    cy.wait('@editItem').then((xhr) => {
      cy.compare(xhr)
    })
  })

  it('004-质控品管理-取消删除质控品', () => {
    //点击质控品名称输入框，输入搜索条件
    cy.get('input[placeholder="请输入质控品名称"]').clear().type('质控品名称')
    //点击搜索按钮
    cy.get('button[type="submit"]').first().contains('搜索').click({
      force: true
    })
    cy.get('.el-table__fixed-right tbody tr').first().find('button').contains('删除').click({
      force: true
    })
    //点击取消弹窗
    cy.get('button[class="el-button el-button--default el-button--small"]').click({
      force: true
    })
  })
  it('005-质控品管理-停用质控品', () => {
    let status = 7
    let body = 2
    let first = 0
    let edit = 6
    //点击输入框，输入搜索条件
    cy.get('input[placeholder="请输入质控品名称"]').clear().type('自动化质控品名称', {
      force: true
    })
    //点击搜索按钮
    cy.get('button[type="submit"]').first().click({
      force: true
    })
    cy.wait(500)
    cy.get('.el-table__body').eq(body).find('.el-table__row').eq(first).find('.cell').eq(status).invoke('text').then((data) => {
      let oldStatus = data
      cy.get('.el-button.el-button--text.el-button--medium').eq(edit).click({
        force: true
      })
      cy.wait(1000)
      //在编辑弹窗中，点击停用/启用按钮
      cy.get('.el-switch__core').first().click({
        force: true
      })
      cy.intercept({
        url: '/cqb-base-mgr/service/mgr/qc/item',
        method: 'PUT'
      }).as('stopQc-Mgr')
      //点击保存弹窗按钮
      cy.get('.el-dialog__body + div').find('button').eq(1).click({
        force: true
      })
      cy.wait(3000)
      cy.wait('@stopQc-Mgr').then((xhr) => {
        cy.compare(xhr)
        cy.get('.el-table__body').eq(body).find('.el-table__row').eq(first).find('.cell').eq(status).invoke('text').then((text2) => {
          expect(oldStatus).to.not.eq(text2)
        })
      })
    })
  })
  it('006-质控品管理-删除质控品', () => {
    //点击展开搜索条件
    cy.get('button[type="button"]').contains('展开').click({
      force: true
    })
    //点击质控品名称输入框，输入搜索条件
    cy.get('input[placeholder="请输入质控品名称"]').clear().type('自动化质控品名称', {
      force: true
    })
    //点击搜索按钮
    cy.get('.ql-search__btns').find('button[type="submit"]').click({
      force: true
    })
    cy.wait(1000)
    //点击删除按钮    
    cy.get('.el-table__fixed-right tbody tr').first().find('button').contains('删除').click({
      force: true
    })
    //点击弹窗中的确认‘删除’
    cy.get('button[class="el-button el-button--default el-button--small el-button--primary el-button--danger"]').click({
      force: true
    })
    //删除后，对页面文案的断言
    cy.get('body').should('contain', '暂无数据')

  })
  it('007-质控品管理-批号搜索', () => {
    let expand = 0
    let batchBox = 2
    let batchNumber = '9920016'
    let body = 2
    cy.get('input[placeholder="请输入质控品名称"]').clear()
    cy.get('.el-button.el-button--text.el-button--medium').eq(expand).click({
      force: true
    })
    //录入批号
    cy.get('.el-input__inner').eq(batchBox).clear().type(batchNumber, {
      force: true
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/qc/item/page?*').as('getWebData')
    cy.wait(500)
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait('@getWebData').then((getData) => {
      let total = getData.response.body.data.total
      let getStatus = getData.response.statusCode
      let expectStatus = 200
      expect(getStatus).to.eq(expectStatus)
      if (total == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (total <= 20) {
        cy.get('.el-table__body').eq(body).find('.el-table__row').should('have.length', total)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
      }
    })
  })
  it('008-质控品管理-质控品名称搜索', () => {
    let expand = 0
    let body = 2
    let batchName = '免疫质控物'
    let batchBox = 2
    cy.get('.el-input__inner').eq(batchBox).clear()
    cy.get('.el-button.el-button--text.el-button--medium').eq(expand).click({
      force: true
    })
    cy.get('input[placeholder="请输入质控品名称"]').clear().type(batchName, {
      force: true
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/qc/item/page?*').as('getWebData')
    cy.wait(500)
    cy.get('button').contains('搜索').click({
      force: true
    })
    cy.wait('@getWebData').then((getData) => {
      let total = getData.response.body.data.total
      let getStatus = getData.response.statusCode
      let expectStatus = 200
      expect(getStatus).to.eq(expectStatus)
      if (total == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (total <= 20) {
        cy.get('.el-table__body').eq(body).find('.el-table__row').should('have.length', total)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
      }
    })
  })
  it('009-质控品管理-删除质控品(已关联数据的不能被删除)', () => {
    let batchNumber = '20210305B'
    let batchBox = 2
    let expand = 0
    cy.get('input[placeholder="请输入质控品名称"]').clear()
    //点击展开搜索条件
    cy.get('.el-button.el-button--text.el-button--medium').eq(expand).click({
      force: true
    })
    //录入批号
    cy.get('.el-input__inner').eq(batchBox).clear().type(batchNumber, {
      force: true
    })
    //点击搜索按钮
    cy.get('.ql-search__btns').find('button[type="submit"]').click({
      force: true
    })
    //点击删除按钮    
    cy.get('.el-table__fixed-right tbody tr').first().find('button').contains('删除').click({
      force: true
    })
    cy.intercept('**/cqb-base-mgr/service/mgr/qc/item/*').as('delete')
    //确认删除
    cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click({
      force: true
    })
    cy.wait(1000)
    cy.wait('@delete').then((xhr) => {
      let getStatus = xhr.response.statusCode
      let expectStatus = 400
      expect(getStatus).to.eq(expectStatus)
      cy.get('body').should('contain', '该质控品已被质控批号关联，不能删除')
    })
  })
  it('010-质控品管理-切换质控主管单位(青浦医联体)', () => {
    let dropList = 1
    let QP = 1
    let organizationBox = 0
    let body = 2
    let first = 0
    let organization = 4
    let batchBox = 2
    cy.wait(500)
    cy.get('.el-input__inner').eq(batchBox).clear()
    cy.get('input[placeholder="请输入质控品名称"]').clear()
    cy.get('.el-table__body').eq(body).find('.el-table__row').eq(first).find('.cell').eq(organization).invoke('text').then((data) => {
      let oldOrganization = data
      cy.get('.el-input__inner').eq(organizationBox).click({
        force: true
      })
      cy.get('.el-scrollbar__view.el-select-dropdown__list').eq(dropList).find('li').eq(QP).click({
        force: true
      })
      cy.wait(1000)
      cy.get('.el-table__body').eq(body).find('.el-table__row').eq(first).find('.cell').eq(organization).invoke('text').then((data) => {
        let newOrganization = data
        expect(newOrganization).not.to.eq(oldOrganization)
      })
    })
  })
  context('权限验证', () => {
    it('011-取消勾选页面权限', () => {
      openEditPage()
      checkPermissions('relaRightCodes').find('.el-tree-node__expand-icon.el-icon-caret-right').click({
        force:true
      })
      checkPermissions('relaRightCodes').next('.el-tree-node__children').find('[type="checkbox"]').first()
        .uncheck('',{
          force:true
        })
      checkPermissions('relaRightCodes').next('.el-tree-node__children').find('[type="checkbox"]').last()
        .uncheck('',{
          force:true
        })
      waitRequest({
        intercept: interceptEditManage,
        onBefore: () => {
          clickSave('编辑管理单位','保存')
        },
        onSuccess: () => {
          cy.get('.el-message__content').should('have.text', '管理单位已更新')
        }
      })
      loginOut()
      cy.gdfslj_user_login()
      cy.get('.el-menu.el-menu--inline').contains('质控品管理').parents('.el-menu-item').should('have.class', 'is-disabled')
    })
    it('012-勾选查看权限', () => {
      loginOut()
      cy.loginCQB()
      visitPage('manage-dept')
      openEditPage() 
      checkPermissions('relaRightCodes').find('.el-tree-node__expand-icon.el-icon-caret-right').click({
        force:true
      })
      //勾选查看权限
      checkPermissions('relaRightCodes').next('.el-tree-node__children').find('[type="checkbox"]').first()
        .check('',{
          force:true
        })
      waitRequest({
        intercept: interceptEditManage,
        onBefore: () => {
          clickSave('编辑管理单位','保存')
        },
        onSuccess: () => {
          cy.get('.el-message__content').should('have.text', '管理单位已更新')
        }
      })
      //编辑用户权限
      editUser()
      checkPermissions('permissions').find('.el-tree-node__expand-icon.el-icon-caret-right').click({
        force:true
      })
      cy.wait(1000)
      //勾选查看权限   
      checkPermissions('permissions').next('.el-tree-node__children').find('[type="checkbox"]').first()
        .check('',{
          force:true
        })
      waitRequest({
        intercept:interceptEditUser,
        onBefore:()=>{
          clickSave('编辑用户信息','确定')
        },
        onSuccess:()=>{
          cy.get('.el-message__content').should('have.text', '用户已更新')
        }
      })
      loginOut()
      cy.gdfslj_user_login()
      cy.get('.el-menu.el-menu--inline').contains('质控品管理').parents('.el-menu-item').should('not.have.class', 'is-disabled')
      visitPage('qc-mgr')
      cy.wait(2000)
      cy.get('.el-table__body .el-table__row').first().find('.cell').last().findByText('查看').parents('.el-button').should('not.have.css','display','none')
      cy.get('.el-table__body .el-table__row').first().find('.cell').last().findByText('编辑').parents('.el-button').should('have.css','display','none')
      cy.get('.el-table__body .el-table__row').first().find('.cell').last().findByText('删除').parents('.ql-button-confirm').should('have.css','display','none')
    })
    it('013-勾选编辑权限', ()=>{
      loginOut()
      cy.loginCQB()
      visitPage('manage-dept')
      openEditPage() 
      checkPermissions('relaRightCodes').find('.el-tree-node__expand-icon.el-icon-caret-right').click({
        force:true
      })
      //勾选查看权限
      checkPermissions('relaRightCodes').next('.el-tree-node__children').find('[type="checkbox"]').first()
        .uncheck('',{
          force:true
        })
      checkPermissions('relaRightCodes').next('.el-tree-node__children').find('[type="checkbox"]').last()
        .check('',{
          force:true
        })
      waitRequest({
        intercept: interceptEditManage,
        onBefore: () => {
          clickSave('编辑管理单位','保存')
        },
        onSuccess: () => {
          cy.get('.el-message__content').should('have.text', '管理单位已更新')
        }
      })
      //编辑用户权限
      editUser()
      checkPermissions('permissions').find('.el-tree-node__expand-icon.el-icon-caret-right').click({
        force:true
      })
      cy.wait(1000)
      //
      checkPermissions('permissions').next('.el-tree-node__children').find('[type="checkbox"]').first()
        .uncheck('',{
          force:true
        })
      //勾选维护权限   
      checkPermissions('permissions').next('.el-tree-node__children').find('[type="checkbox"]').last()
        .check('',{
          force:true
        })
      waitRequest({
        intercept:interceptEditUser,
        onBefore:()=>{
          clickSave('编辑用户信息','确定')
        },
        onSuccess:()=>{
          cy.get('.el-message__content').should('have.text', '用户已更新')
        }
      })
      loginOut()
      cy.gdfslj_user_login()
      cy.get('.el-menu.el-menu--inline').contains('质控品管理').parents('.el-menu-item').should('not.have.class', 'is-disabled')
      visitPage('qc-mgr')
      cy.wait(2000)
      cy.get('.el-table__body .el-table__row').first().find('.cell').last().findByText('查看').parents('.el-button').should('not.have.css','display','none')
      cy.get('.el-table__body .el-table__row').first().find('.cell').last().findByText('编辑').parents('.el-button').should('not.have.css','display','none')
      cy.get('.el-table__body .el-table__row').first().find('.cell').last().findByText('删除').parents('.ql-button-confirm').should('not.have.css','display','none')
    })
  })  
})