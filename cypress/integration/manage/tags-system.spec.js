import { visitPage } from "../../shared/route"
import { clickCancelInDialog, clickOkInDialog, confirmDelete, withinDialog } from "../common/dialog"
import { interceptAll, waitIntercept } from "../common/http"
import { validSuccessMessage } from "../common/message"
import { elform, findLabel } from "../mutual-result/mutual-item"

/**
 * 系统标签
 */

const interceptUpdateTag = () => {
  return interceptAll('service/mgr/tags/system/check?*', interceptUpdateTag.name)
}

context('标签管理-系统标签', () => {
  before(() => {
    cy.loginCQB()
    visitPage('tags-system')
    cy.wait(500)
  })
  beforeEach(() => {
    cy.wait(3000)
  })
  it('001-系统标签-添加标签分类', () => {
    cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').then((getData) => {
      let length = getData.length
      //----------未填写标签名称不能保存----------   
      cy.get('button').contains('添加标签分类').click()
      withinDialog(clickOkInDialog, '添加标签分类')
      cy.get('body').should('contain', '请输入分类名称')
      cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length)
      //----------分类名称已存在不能保存---------
      elform('type').type('UI测试')
      withinDialog(clickOkInDialog, '添加标签分类')
      cy.get('body').should('contain', '分类已存在，请重新输入')
      cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length)
    //   //----------正常保存----------------------
     elform('type').clear().type('自动添加')
      cy.intercept('**/cqb-base-mgr/service/mgr/tag/types/system*').as('tag')
      withinDialog(clickOkInDialog, '添加标签分类')
      cy.wait('@tag').then((xhr) => {
        let ExpectStatus = 200
        let ResponseStatus = xhr.response.statusCode
        expect(ResponseStatus).to.equal(ExpectStatus)
      })
      cy.get('.el-message.el-message--success').should('have.text', '标签分类已添加')
      cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length + 1)
    })
  })
  it('002-系统标签-修改标签分类名', () => {
    cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').then((getData) => {
      let length = getData.length
      //---------修改为已存在的名称------------
      cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').last()
        .find('.el-button.el-button--primary.el-button--mini').click()
      elform('type').clear().type('UI测试')
      withinDialog(clickOkInDialog, '编辑标签分类')
      cy.get('body').should('contain', '分类已存在，请重新输入')
      cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length)
      cy.wait(2000)
      //---------成功修改---------------- 
      elform('type').clear().type('自动修改')
      cy.intercept('**/cqb-base-mgr/service/mgr/tag/types/system/*').as('update')
      withinDialog(clickOkInDialog, '编辑标签分类')
      cy.wait('@update').then((xhr) => {
        let ExpectStatus = 200
        let ResponseStatus = xhr.response.statusCode
        expect(ResponseStatus).to.equal(ExpectStatus)
        cy.get('.el-message.el-message--success').should('have.text', '标签分类已更新')
        cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length)
      })
    })
  })
  it('003-系统标签-添加标签', () => {
    cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').last().click()
    //-------标签名为空不能保存-----------
    cy.get('.el-icon-plus').last().click()
    withinDialog(clickOkInDialog, '添加标签')
    cy.get('body').should('contain', '请输入标签名称')
    //-------添加成功-----------
   elform('tag').clear().type('自动添加标签1')
    cy.intercept('**/cqb-base-mgr/service/mgr/tags/system*').as('add')
    withinDialog(clickOkInDialog, '添加标签')
    cy.wait('@add').then((xhr) => {
      let ExpectStatus = 200
      let ResponseStatus = xhr.response.statusCode
      expect(ResponseStatus).to.equal(ExpectStatus)
      cy.get('.el-message__content').should('have.text', '标签已添加')
      //--------添加重复的标签-------------
      cy.get('.el-icon-plus').last().click()
     elform('tag').clear().type('自动添加标签1')
      withinDialog(clickOkInDialog, '添加标签')
      cy.get('body').should('contain', '标签已存在，请重新输入')
      withinDialog(clickCancelInDialog, '添加标签')
    })
  })
  it('004-系统标签-修改标签名', () => {
    //-----标签名已存在,保存失败-------------
    cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').last().click()
    cy.get('.el-collapse-item__content').last().find('.ql-tag.el-tag.el-tag--medium').then((getData) => {
      let length = getData.length
      cy.get('.el-collapse-item__content').last().find('.ql-tag.el-tag.el-tag--medium').first().click()
     elform('tag').clear().type('未完成')
      withinDialog(clickOkInDialog, '编辑标签')
      cy.get('.el-collapse-item__content').last().find('.ql-tag.el-tag.el-tag--medium').should('have.length', length)
      //-----标签修改成功----------
      cy.get('.el-collapse-item__content').last().find('.ql-tag.el-tag.el-tag--medium').first().click()
     elform('tag').clear().type('自动修改')
     waitIntercept(interceptUpdateTag, () => {
       withinDialog(clickOkInDialog, '编辑标签')
     }, () => {
       validSuccessMessage()
       cy.get('.el-collapse-item__content').last().find('.ql-tag.el-tag.el-tag--medium').should('have.length', length)
     })
    })
  })
  it('005-系统标签-删除标签', () => {
    //---------已关联的标签不允许删除---------------     
    cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').first().click()
    cy.get('.el-tag__close.el-icon-close').first().click()
    cy.intercept('**/cqb-base-mgr/service/mgr/tags/system/*').as('delete')
    cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
    cy.wait('@delete').then((xhr) => {
      let ExpectStatus = 400
      let ResponseStatus = xhr.response.statusCode
      expect(ResponseStatus).to.equal(ExpectStatus)
      cy.get('.el-message__content').should('have.text', '删除标签失败,该标签分类有被实验室关联')
      cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').first().click()
    })
    //---------成功删除--------------- 
    cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').last().click()
    cy.get('.el-tag__close.el-icon-close').last().click()
    cy.intercept('**/cqb-base-mgr/service/mgr/tags/system/*').as('delete')
    cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
    cy.wait('@delete').then((xhr) => {
      let ExpectStatus = 200
      let ResponseStatus = xhr.response.statusCode
      expect(ResponseStatus).to.equal(ExpectStatus)
    })
  })
  it('006-系统标签-删除标签分类', () => {
    cy.wait(3000)
    cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').then((getData) => {
      let length = getData.length
      //-------分类下存在标签，不允许删除--------    
      cy.get('.el-button.el-button--danger.el-button--mini').first().click()
      cy.intercept('**/cqb-base-mgr/service/mgr/tag/types/system/*').as('delete')
      confirmDelete()
      cy.wait('@delete').then((xhr) => {
        let ExpectStatus = 400
        let ResponseStatus = xhr.response.statusCode
        expect(ResponseStatus).to.equal(ExpectStatus)
        cy.get('.el-message__content').should('have.text', '该标签类型有子标签，请删除后再进行此操作。')
        cy.wait(2000)
        cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length)
      })

      //-----成功删除-----------
      cy.get('.el-button.el-button--danger.el-button--mini').last().click()
      cy.wait(3000)
      cy.intercept('**/cqb-base-mgr/service/mgr/tag/types/system/*').as('delete')
      confirmDelete()
      cy.wait('@delete').then((xhr) => {
        let ExpectStatus = 200
        let ResponseStatus = xhr.response.statusCode
        expect(ResponseStatus).to.equal(ExpectStatus)
        cy.get('.el-collapse.ql-category.cqb-collapse').find('.el-collapse-item.ql-category__item').should('have.length', length - 1)
      })
    })
  })
})