import {
  clickCancelInDialog,
  clickOkInDialog,
  closeTips,
  confirmDelete,
  withinDialog
} from '../common/dialog'
import {
  waitIntercept,
  waitRequest
} from '../common/http'
import {
  validErrorMsg,
  validSuccessMessage
} from '../common/message'
import {
  activeSelect
} from '../common/select'
import {
  addItem,
  addItemType,
  assertError,
  editItem,
  elform,
  getItemLength,
  getItemOption,
  interceptAddItem,
  interceptAddItemSpec,
  interceptDeleteItem,
  interceptDeleteItemSpec,
  interceptQueryItem,
  interceptSaveData
} from './mutual-item'

/**
 * 开展项目设置
 */
context('结果互认设置-开展项目设置', () => {
  const newItem = '铁(测试)'
  const addedItem = '钾'
  before(() => {
    cy.loginCQB()
    cy.intercept('GET', '**/specList*').as('getData')
    cy.visit('/cqb-base-mgr-fe/app.html#/setting/mutual-result/mutual-item')
    cy.wait('@getData')
  })
  context('项目分类操作', () => {
    before(() => {
      cy.wait(1000)
    })
    it('添加相同的项目分类', () => {
      addItemType('自定义分类', '尿干化学')
      withinDialog(clickOkInDialog, '添加项目分类')
      assertError('分类名称已存在, 请重输')
      withinDialog(clickCancelInDialog, '添加项目分类')
    })
    it('添加不存在的项目分类', () => {
      addItemType('自定义分类', '自动化测试')
      waitRequest({
        intercept: interceptAddItemSpec,
        onBefore: () => {
          withinDialog(clickOkInDialog, '添加项目分类')
        },
        onSuccess: () => {
          cy.get('.item-configNew__aside-body').should('contain', '自动化测试')
        }
      })
    })
    it('编辑项目分类', () => {
      cy.get('.item-configNew__aside-body').contains('自动化测试').parent('.el-menu-item').find('.el-icon-edit').click({
        force: true
      })
      //编辑已存在的名称不允许保存
      elform('tagName').clear().type('常规化学')
      withinDialog(clickOkInDialog, '编辑项目分类')
      assertError('分类名称已存在, 请重输')
      //编辑新的名称可以保存
      elform('tagName').clear().type('自定义名称AAA')
      withinDialog(clickOkInDialog, '编辑项目分类')
      // waitIntercept(interceptAddItemSpec, () => {
      withinDialog(clickOkInDialog, '编辑项目分类')
      // }, () => {
      cy.get('.item-configNew__aside-body').should('contain', '自定义名称AAA')
      // })
    })
    it('删除项目分类', () => {
      cy.get('.item-configNew__aside-body').contains('自定义名称AAA').parent('.el-menu-item').find('.el-icon-delete').click({
        force: true
      })
      waitIntercept(interceptDeleteItemSpec, () => {
        confirmDelete()
      }, () => {
        cy.get('.item-configNew__aside-body').should('not.contain', '自定义名称AAA')
      })
    })
  })
  context('项目操作', () => {
    let EditIndex = 0
    let EditButton = 1
    before(() => {
      cy.wait(1000)
      cy.get('.el-menu').last().find('li').contains('常规化学').click({
        force: true
      })
      cy.wait(3000)
    })
    it('添加已存在的项目', () => {
      cy.wait(500)
      addItem(addedItem, '不限', 'mmol/L')
      waitRequest({
        intercept: interceptAddItem,
        onBefore: () => {
          withinDialog(clickOkInDialog, '添加项目')
        },
        onError: () => {
          validErrorMsg('项目已存在')
          withinDialog(clickCancelInDialog, '添加项目')
        }
      })
    })
    it('添加新的项目', () => {
      let itemData
      cy.get('.el-menu').last().find('li').contains('常规化学').click({
        force: true
      })
      getItemLength().then((getLength) => {
        itemData = getLength.length
        addItem(newItem, '不限', 'mmol/L')
        waitIntercept(interceptAddItem, () => {
          withinDialog(clickOkInDialog, '添加项目')
        }, () => {
          getItemLength().should('have.length', itemData + 1)
        })
      })
    })
    it('编辑项目', () => {
      cy.get('.el-menu').last().find('li').contains('常规化学').click({
        force: true
      })
      getItemLength().then((getLength) => {
        let itemLength = getLength.length
       getItemOption(newItem,'edit')
        cy.wait(5000)
        editItem('全血细胞计数')
        waitIntercept(interceptAddItem, () => {
          withinDialog(clickOkInDialog, '编辑项目')
        }, () => {
          getItemLength().should('have.length', itemLength - 1)
        })
        cy.get('.el-menu').last().find('li').contains('全血细胞计数').click({
          force: true
        })
        cy.wait(5000)
      getItemOption(newItem,'edit')
        cy.wait(5000)
        editItem('常规化学')
        waitIntercept(interceptAddItem, () => {
          withinDialog(clickOkInDialog, '编辑项目')
        }, () => {
          cy.wait(5000)
          cy.get('.el-menu').last().find('li').contains('常规化学').click({
            force: true
          })
          cy.wait(5000)
          getItemLength().should('have.length', itemLength)
        })
      })
    })
    it('开展定性项目', () => {
      getItemOption(newItem,'edit')
      cy.wait(5000)
      editItem(null, null, '定性')
      waitIntercept(interceptAddItem, () => {
        withinDialog(clickOkInDialog, '编辑项目')
      }, () => {
        cy.wait(5000)
        getItemOption(newItem,'edit')
        cy.wait(5000)
        elform('itemType').should('have.value', '定性')
        withinDialog(clickCancelInDialog, '编辑项目')
      })
    })
    it('开展定量项目', () => {
      getItemOption(newItem,'edit')
      cy.wait(5000)
      editItem(null, null, '定量')
      waitIntercept(interceptAddItem, () => {
        withinDialog(clickOkInDialog, '编辑项目')
      }, () => {
        cy.wait(5000)
        getItemOption(newItem,'edit')
        cy.wait(5000)
        elform('itemType').should('have.value', '定量')
        withinDialog(clickCancelInDialog, '编辑项目')
      })
    })
    it('开展不限项目', () => {
      getItemOption(newItem,'edit')
      cy.wait(5000)
      editItem(null, null, '不限')
      waitIntercept(interceptAddItem, () => {
        withinDialog(clickOkInDialog, '编辑项目')
      }, () => {
        cy.wait(5000)
        getItemOption(newItem,'edit')
        cy.wait(5000)
        elform('itemType').should('have.value', '不限')
        withinDialog(clickCancelInDialog, '编辑项目')
      })
    })
    it('删除项目', () => {
      getItemLength().then((getLength) => {
        let itemLength = getLength.length
        getItemOption(addedItem, 'delete')
        waitRequest({
          intercept: interceptDeleteItem,
          onBefore: () => {
            confirmDelete()
          },
          onError: (data) => {
            validErrorMsg(data)
            getItemLength().should('have.length', itemLength)
          }
        })
        cy.wait(5000)
        getItemOption(newItem, 'delete')
        waitRequest({
          intercept: interceptDeleteItem,
          onBefore: () => {
            confirmDelete()
          },
          onSuccess: () => {
            getItemLength().should('have.length', itemLength - 1)
          }
        })
      })
    })
  })
  context('自定义项目', () => {
    const selfItem = '自定义项目' + parseInt(Math.random() * 100000)
    before(() => {
      cy.wait(1000)
      cy.get('.el-menu').last().find('li').contains('常规化学').click({
        force: true
      })
      cy.wait(1000)
    })
    it('添加已存在的项目', () => {
      addItem('自定义', null, 'mmol/L', null, 'ad', '钾')
      withinDialog(clickOkInDialog, '添加项目')
      assertError('该项目已存在')
      withinDialog(clickCancelInDialog, '添加项目')
    })
    it('自定义项目中文名称未填写', () => {
      addItem('自定义', null, 'mmol/L', null, 'ad')
      withinDialog(clickOkInDialog, '添加项目')
      assertError('项目简称和项目中文名称必需填写')
      withinDialog(clickCancelInDialog, '添加项目')
    })
    it('自定义项目的简称未填写', () => {
      addItem('自定义', null, 'mmol/L', null, null, '自定义项目')
      withinDialog(clickOkInDialog, '添加项目')
      assertError('项目简称和项目中文名称必需填写')
      withinDialog(clickCancelInDialog, '添加项目')
    })
    it('数据正常填写', () => {
      getItemLength().then((getData) => {
        let itemLength = getData.length
        addItem('自定义', null, 'mmol/L', null, 'AD', selfItem)
        waitRequest({
          intercept: interceptAddItem,
          onBefore: () => {
            withinDialog(clickOkInDialog, '添加项目')
          },
          onSuccess: (data) => {
            expect(data.status).to.eq(false)
            getItemLength().should('have.length', itemLength + 1)
            getItemOption(selfItem, 'open').should('not.have.class', 'is-checked')
          }
        })
      })
    })
    it('自定义项目未审核不能开启', () => {
      getItemOption(selfItem, 'open').click({
        force:true
      })
      cy.get('.el-message-box').find('.el-message-box__message').should('have.text', '该项目未审核通过，请等待该项目审核通过后再启用!')
      closeTips('提示', '确定')
    })
    it('删除自定义项目', () => {
      getItemLength().then((getData) => {
        let itemLength = getData.length
        getItemOption(selfItem, 'delete')
        waitIntercept(interceptDeleteItem, () => {
          confirmDelete()
        }, () => {
          getItemLength().should('have.length', itemLength - 1)
        })
      })
    })
  })
  context('其他操作', () => {
    let result
    before(() => {
      cy.wait(1000)
      waitRequest({
        intercept: interceptQueryItem,
        onBefore: () => {
          cy.get('.el-form.panel-dept__header.el-form--inline').findAllByPlaceholderText('请选择').click()
          activeSelect('青浦医联体')
          cy.wait(5000)
        },
        onSuccess: (data) => {
          result = data
        }
      })
    })
    it('停用所有项目', () => {
      const getStatus = result.findIndex(item => item.status === true)
      if (getStatus === -1) {
        cy.get('.el-switch__core').first().click({
          force: true
        })
        cy.get('.item-configNew__footer').findByText('保存').click({
          force: true
        })
        waitIntercept(interceptSaveData, () => {
          closeTips('提示', '确定')
        }, () => {
          validSuccessMessage()
        })
        waitRequest({
          intercept: interceptSaveData,
          onBefore: () => {
            cy.get('.el-footer').contains('停用所有项目').click({
              force: true
            })
            cy.get('.item-configNew__footer').findByText('保存').click({
              force: true
            })
            closeTips('提示', '确定')
          },
          onSuccess: () => {
            validSuccessMessage()
          }
        })
      } else {
        waitRequest({
          intercept: interceptSaveData,
          onBefore: () => {
            cy.get('.el-footer').contains('停用所有项目').click({
              force: true
            })
            cy.get('.item-configNew__footer').findByText('保存').click({
              force: true
            })
            closeTips('提示', '确定')
          },
          onSuccess: () => {
            validSuccessMessage()
          }
        })
      }
    })
    it('启用所有项目', () => {
      cy.wait(5000)
      waitRequest({
        intercept: interceptSaveData,
        onBefore: () => {
          cy.get('.el-footer').contains('启用所有项目').click({
            force: true
          })
          cy.get('.item-configNew__footer').findByText('保存').click({
            force: true
          })
          closeTips('提示', '确定')
        },
        onSuccess: () => {
          validSuccessMessage()
        }
      })
    })
    it('项目搜索', () => {
      cy.get('.item-configNew').within(() => {
        cy.get('.el-input.el-input--medium.el-input--suffix').last().findByPlaceholderText('项目快速检索').type('白细胞计数')
      })
      cy.wait(1000)
      getItemLength().should('have.length', 1)
    })
    it('配置项目TEa', () => {
      cy.get('.item-configNew__list').contains('白细胞计数').parents('.ql-itemCard__body')
        .find('.el-icon-edit').click({
          force: true
        })
      cy.wait(2000)
      elform('sourceId').first().click()
      cy.get('.el-scrollbar:visible').then(element => {
        if (element.css('display') === 'block') {
          if (element.find('.el-select-dropdown__item').hasClass('selected')) {
            cy.get('.el-select__caret.el-input__icon.el-icon-circle-close').click()
            waitIntercept(interceptAddItem, () => {
              withinDialog(clickOkInDialog, '编辑项目')
            }, () => {
              cy.wait(5000)
              cy.get('.item-configNew__list').contains('白细胞计数').parents('.ql-itemCard__body')
                .find('.el-icon-edit').click({
                  force: true
                })
              cy.wait(2000)
              elform('sourceId').first().click()
              activeSelect('(中国)卫健委临检中心室间质评标准')
              withinDialog(clickOkInDialog, '编辑项目')
            })
          } else {
            activeSelect('(中国)卫健委临检中心室间质评标准')
            withinDialog(clickOkInDialog, '编辑项目')
          }
        } else {
          withinDialog(clickOkInDialog, '编辑项目')
        }
      })
    })
  })
  context('删除测试数据', () => {
    it('删除测试数据', () => {
      const selfItemName = '自定义项目'
      cy.task('executeDictSql', `delete from spec_item_audit where itemCName like "%${selfItemName}%"`)
    })
  })
})