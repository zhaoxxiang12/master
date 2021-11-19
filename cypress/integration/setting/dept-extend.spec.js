import {
  clickCancelInDialog,
  clickOkInDialog,
  withinDialog
} from "../common/dialog"
import {
  getDialog
} from "../message/message"
import {
  elform
} from "../mutual-result/mutual-item"

context('管理单位扩展属性', () => {
  const getData = (alias) => {
    cy.intercept('**/cqb-base-mgr/service/mgr/ccl/ext*').as(alias)
  }

  const validRequiredFields = (org, extModule, extCode, extValue) => {
    cy.get('button').contains('添加').click()
    cy.wait(1000)
    getDialog('添加管理单位扩展属性').within(() => {
      if (org) {
        cy.findAllByPlaceholderText('请选择').click()
        cy.wait(1000)
        cy.document()
        .its('body')
        .find('.el-tree-node.is-expanded.is-focusable:visible').contains(org).click({
          force:true
        })
      }
      if (extModule) {
        elform('extModule').type('IQC')
      }
      if (extCode) {
        elform('extCode').type('IQC')
      }
      if (extValue) {
        elform('extValue').type(1)
      }
    })
  }

  const addDept_extend = () => {
    let randomCode = parseInt(Math.random() * 100000)
    cy.get('button').contains('添加').click()
    cy.get('button').contains('确定').should('be.exist')
    getDialog('添加管理单位扩展属性').within(() => {
      cy.findAllByPlaceholderText('请选择').click()
      cy.wait(1000)
      cy.document()
      .its('body')
      .find('.el-tree-node.is-expanded.is-focusable:visible').contains('佛山市临床检验质量控制中心').click({
        force:true
      })
      elform('extModule').type('IQC'+ randomCode)
      elform('extCode').type('IQC')
      elform('extValue').type(1)
    })
    withinDialog(clickOkInDialog,'添加管理单位扩展属性')
    cy.wait('@getData').then((xhr) => {
      cy.compare(xhr)
      cy.get('body').should('contain', '添加成功')
      cy.wait(2000)
    })
  }

  before(() => {
    cy.visitPage('dept-extend')
    cy.wait(500)
  })
  it('001-管理单位扩展属性-使用关键字进行搜索', () => {
    let keyWord1 = 'IQC_ADMIN'
    let keyWord2 = 'IQC_PROVINCE_CODE'
    let keyWord3 = 'EQA_SRC_CODE3'
    cy.get('[placeholder="参数关键字"]').type(keyWord3)
    getData('getData')
    cy.get('button').contains('搜索').click()
    cy.wait('@getData').then((xhr) => {
      cy.compare(xhr)
      let total = xhr.response.body.data.total
      if (total == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (total <= 20) {
        cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
      }
    })
    cy.get('[placeholder="参数关键字"]').clear().type(keyWord2)
    getData('getData')
    cy.get('button').contains('搜索').click()
    cy.wait('@getData').then((xhr) => {
      cy.compare(xhr)
      let total = xhr.response.body.data.total
      if (total == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (total <= 20) {
        cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
      }
    })
    cy.get('[placeholder="参数关键字"]').clear().type(keyWord1)
    getData('getData2')
    cy.get('button').contains('搜索').click()
    cy.wait('@getData2').then((xhr) => {
      cy.compare(xhr)
      let total = xhr.response.body.data.total
      if (total == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (total <= 20) {
        cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
      }
    })
  })
  it('002-管理单位扩展属性-使用质控主管单位进行搜索', () => {
    //--------------------选择佛山市临床检验中心------------
    cy.get('[placeholder="请选择"]').first().click()
    cy.get('.el-tree-node.is-expanded.is-focusable').contains('佛山市临床检验质量控制中心').click()
    getData('getData')
    cy.get('button').contains('搜索').click()
    cy.wait('@getData').then((xhr) => {
      cy.compare(xhr)
      let total = xhr.response.body.data.total
      if (total == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (total <= 20) {
        cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
      }
    })
  })
  it('003-管理单位扩展属性-搜索条件重置功能', () => {
    cy.get('[placeholder="参数关键字"]').should('have.value', 'IQC_ADMIN')
    cy.get('button').contains('重置').click()
    cy.get('[placeholder="参数关键字"]').should('have.value', '')
  })
  it('004-管理单位扩展属性-添加功能', () => {
    getData('getData')
    cy.get('button').contains('搜索').click()
    cy.wait('@getData').then((xhr) => {
      cy.compare(xhr)
      cy.get('.el-table__row').then((data) => {
        let getLength = data.length
        if (getLength >= 20) {
          cy.get('.el-pagination__total').invoke('text').then((data) => {
            let getData = data.split(' ')
            let total = parseInt(getData[1])
            addDept_extend()
            //断言
            cy.get('.el-pagination__total').should('have.text', '共 ' + (total + 1) + ' 条')
          })
        } else {
          addDept_extend()
          cy.get('.el-table__row').should('have.length', getLength + 1)
        }
      })
    })
  })
  it('005-管理单位扩展属性-添加功能(未选择质控主管单位不能保存)', () => {
    cy.get('.el-table__row').then((data) => {
      let getLength = data.length
      cy.get('button').contains('搜索').click()
      validRequiredFields(null,'IQC','IQC',1)
      withinDialog(clickOkInDialog, '添加管理单位扩展属性')
      cy.get('body').should('contain', '请选择管理单位')
      cy.get('.el-table__row').should('have.length', getLength)
      withinDialog(clickCancelInDialog, '添加管理单位扩展属性')
    })
  })
  it('006-管理单位扩展属性-添加功能(模块名称未填写不能保存)', () => {
    cy.get('.el-table__row').then((data) => {
      let getLength = data.length
      cy.get('button').contains('搜索').click()
      validRequiredFields('佛山市临床检验质量控制中心',null,'IQC',1)
      withinDialog(clickOkInDialog,'添加管理单位扩展属性')
      cy.get('body').should('contain', '请输入模块名称')
      cy.get('.el-table__row').should('have.length', getLength)
    })
    withinDialog(clickCancelInDialog,'添加管理单位扩展属性')
  })
  it('007-管理单位扩展属性-添加功能(参数编码未填写不能保存)', () => {
    cy.get('.el-table__row').then((data) => {
      let getLength = data.length
      cy.get('button').contains('搜索').click()
      validRequiredFields('佛山市临床检验质量控制中心','IQC',null,1)
      withinDialog(clickOkInDialog,'添加管理单位扩展属性')
      cy.get('body').should('contain', '请输入参数编码')
      cy.get('.el-table__row').should('have.length', getLength)
      withinDialog(clickCancelInDialog,'添加管理单位扩展属性')
    })
  })
  it('008-管理单位扩展属性-添加功能(参数值未填写不能保存)', () => {
    cy.get('.el-table__row').then((data) => {
      let getLength = data.length
      cy.get('button').contains('搜索').click()
      validRequiredFields('佛山市临床检验质量控制中心','IQC','IQC')
      getData('getData')
      withinDialog(clickOkInDialog,'添加管理单位扩展属性')
      cy.get('body').should('contain', '请输入参数值')
      cy.get('.el-table__row').should('have.length', getLength)
    })
    withinDialog(clickCancelInDialog,'添加管理单位扩展属性')
  })
  it('009-管理单位扩展属性-编辑功能', () => {
    let words = '自动化参数'
    let remark = 4
    cy.get('.el-table__row').then((data) => {
      let getLength = data.length
      if (getLength <= 13) {
        return
      } else {
        cy.get('.el-table__row').first().find('button').contains('编辑').click()
        cy.wait(500)
        cy.get('.el-textarea__inner').type(words, {
          force: true
        })
        getData('getData')
        cy.get('button').contains('确定').click()
        cy.wait('@getData').then((xhr) => {
          cy.compare(xhr)
          cy.get('body').should('contain', '编辑成功')
          cy.get('.el-table__row').first().find('td').eq(remark).should('have.text', words)
        })
      }
    })
  })
  it('010-管理单位扩展属性-删除功能', () => {
    cy.get('.el-table__row').then((data) => {
      let getLength = data.length
      if (getLength <= 11) {
        return
      } else {
        cy.get('.el-table__row').first().find('button').contains('删除').click()
        getData('getData')
        cy.get('.el-button.el-button--default.el-button--small.el-button--primary.el-button--danger').click()
        cy.wait('@getData').then((xhr) => {
          cy.compare(xhr)
          cy.get('.el-table__row').should('have.length', getLength - 1)
        })
      }
    })
  })
})