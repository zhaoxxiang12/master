import {
  visitPage
} from '../../shared/route'
import { clickButton } from '../common/button'
import {
  clickCancelInDialog,
  clickOkInDialog,
  closeTips, confirmDelete, withinDialog
} from '../common/dialog'
import {
  interceptAll,
  waitIntercept,
  waitRequest
} from '../common/http'
import { loginMgrWithGdccl } from '../common/login'
import { validErrorMsg, validSuccessMessage } from '../common/message'
import { activeSelect } from '../common/select'
import { expandSearchConditions } from '../eqa/eqa-order/eqa-order'
import { getDialog } from '../message/message'
import { elform, elformSwitch, findLabel } from '../mutual-result/mutual-item'
import { clickSearch } from '../setting/report-monitor/report-monitor'
import { mathRomdomNumber } from '../single-import/single-import'
import { validData } from './cert-year'

/**
 * 
 * @param {string} prop 
 * @returns 
 */
const findElement = (prop,treeText) => {   
  return cy.get(`[for="${prop}"]`).next('.el-form-item__content').find('.el-tree-node__children').contains(treeText)
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

const checkPermissions = (prop, treeText, childTreeText) => {
  return findElement(prop,treeText).find('.tree-resource-node').contains(childTreeText).parents('.el-tree-node__content')
}

const cancelPermissions = (prop, treeText, childTreeText) => {
  checkPermissions(prop, treeText, childTreeText).next('.el-tree-node__children').find('[type="checkbox"]').first()
  .uncheck('',{
      force:true
    })
  checkPermissions(prop, treeText, childTreeText).next('.el-tree-node__children').find('[type="checkbox"]').last()
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
  cy.get('.el-table__body').first().find('.el-table__row').contains('gdfslj').parents('.el-table__row')
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

const interceptAddQcMgr = () => {
  return interceptAll('service/mgr/qc/item', interceptAddQcMgr.name)
}

const interceptQueryQcMgr = () => {
  return interceptAll('service/mgr/qc/item/page?*', interceptQueryQcMgr.name)
}

const interceptDeleteQcMgr = () => {
  return interceptAll('service/mgr/qc/item/*', interceptDeleteQcMgr.name)
}

const deleteQcMgr = (batchNo) => {
  waitIntercept(interceptQueryQcMgr, () => {
    elform('batchNo').clear().type(batchNo)
    clickSearch()
  }, data => {
    if (data.total) {
      cy.get('.el-table__body .el-table__row').first().findByText('删除').click({
        force:true
      })
      waitRequest({
        intercept: interceptDeleteQcMgr,
        onBefore: () => {
          confirmDelete()
        },
        onSuccess: () => {
          if (data.total === 1) {
            cy.get('body').should('contain', '暂无数据')
          } else if (data.total > 20){
            cy.get('.el-pagination__total').should('have.text', '共 ' + (data.total - 1) +' 条')
          } else {
            cy.get('.el-table__body .el-table__row').first().should('have.length', data.total - 1)
          }
        },
        onError: (msg) => {
          validErrorMsg(msg)
        }
      })
    }
  })
}

const addQcMgr = (itemName, batchNo, commodityNo, matrix, factory) => {
  getDialog('添加质控品').within(() => {
    elform('itemName').type(itemName)
    elform('batchNo').type(batchNo)
    elform('commodityNo').type(commodityNo)
    elform('matrix').click({
      force:true
    })
    activeSelect(matrix)
    elform('factory').type(factory)
  })
  waitRequest({
    intercept: interceptAddQcMgr,
    onBefore: () => {
      withinDialog(clickOkInDialog, '添加质控品')
    },
    onSuccess: () => {
      validSuccessMessage()
    },
    onError: (msg) => {
      validErrorMsg(msg)
      withinDialog(clickCancelInDialog, '添加质控品')
    }
  })
}

const searchQcMgr = (batchNo, itemName, factory, cclName) => {
  if (batchNo) {
    elform('batchNo').type(batchNo)
    waitIntercept(interceptQueryQcMgr, () => {
      clickSearch()
    }, data => {
      validData(data)
      if (data.total) {
        data.data.map(item => expect(item.batchNo).to.contain(batchNo))
      }
    })
  }
  if (itemName) {
    elform('itemName').clear().type(itemName)
    waitIntercept(interceptQueryQcMgr, () => {
      clickSearch()
    }, data => {
      validData(data)
      if (data.total) {
        data.data.map(item => expect(item.itemName).to.contain(itemName))
      }
    })
  }
  if (factory) {
    elform('factory').clear().type(factory)
    waitIntercept(interceptQueryQcMgr, () => {
      clickSearch()
    }, data => {
      validData(data)
      if (data.total) {
        data.data.map(item => expect(item.factory).to.contain(factory))
      }
    })
  }
  if (cclName) {
      findLabel('质控主管单位').click({
        force:true
      })
      waitIntercept(interceptQueryQcMgr, () => {
        activeSelect(cclName)
      }, data => {
        validData(data)
        if (data.total) {
          data.data.map(item => expect(item.cclName).to.eq(cclName))
        }
      }) 
  }
}

const editQcMgr = (batchNo, option) => {
  waitIntercept(interceptQueryQcMgr, () => {
    elform('batchNo').clear().type(batchNo)
    clickSearch()
  }, data => {
    if (data.total) {
      cy.get('.el-table__body .el-table__row').first().findByText('编辑').click({
        force:true
      })
      cy.wait(3000)
      option() && option()
    }
  })
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
    cy.visitPage('qc-mgr')
    expandSearchConditions('高级搜索')
  })
  context('添加/删除质控品', () => {
    const itemName = '自动化质控品名称'
    const batchNo ='lot' + mathRomdomNumber(1,1000)
    const commodityNo = 'prod' + mathRomdomNumber(1,1000)
    const matrix = '全血'
    const factory = 'MINDRAY'
    let  repeatBatchNo
    before(() => {
      waitIntercept(interceptQueryQcMgr, () => {
        clickSearch()
      }, data => {
        if (data.total) {
          repeatBatchNo = data.data[0].batchNo
        }
      })
    })
    context('添加质控品', () => {
      it('质控品管理-添加质控品', () => {
        clickButton('添加')
        addQcMgr(itemName, batchNo, commodityNo, matrix, factory)
      })
      it('添加重复的质控品', () => {
        clickButton('添加')
        addQcMgr(itemName, repeatBatchNo, commodityNo, matrix, factory)
      })
    })
    context('删除质控品', () => {
      before(() => {
        cy.wait(8000)
      })
      it('已关联数据不允许删除', () => {
        const batchNo = 'HBeAb2020120100'
        deleteQcMgr(batchNo)
      })
      it('删除成功', () => {
        deleteQcMgr(batchNo)
      })
    })
  })
  context('操作质控品', () => {
    const batchNo ='lot' + mathRomdomNumber(1,1000)
    const editQcName = '自动化修改质控品名称'
    it('编辑质控品', () => {
      const itemName = '自动化质控品名称'
      const commodityNo = 'prod' + mathRomdomNumber(1,1000)
      const matrix = '全血'
      const factory = 'MINDRAY'
      clickButton('添加')
      cy.wait(3000)
      addQcMgr(itemName, batchNo, commodityNo, matrix, factory)
      cy.wait(2000)
      editQcMgr(batchNo, () => {
        elform('itemName').clear().type(editQcName)
        waitIntercept(interceptAddQcMgr, () => {
          withinDialog(clickOkInDialog, '编辑质控品')
        }, () => {
          validSuccessMessage()
        })    
      })
    })
    it('停用/启用', () => {
      editQcMgr(batchNo, () => {
        elformSwitch('status', '停用').click({
          force:true
        })
        let queryData
        waitIntercept(interceptAddQcMgr, () => {
          queryData = interceptQueryQcMgr()
          withinDialog(clickOkInDialog, '编辑质控品')  
        }, () => {
          validSuccessMessage()
          waitIntercept(queryData, data => {
            console.log(data);
            if (data.data[0].status) {
              cy.get('.el-table__body .el-table__row').first().find('.cell').eq(7)
                .invoke('text')
                .then((text) => {
                  expect(text).to.eq('在用')
                  deleteQcMgr(batchNo)
                })
            } else {
              cy.get('.el-table__body .el-table__row').first().find('.cell').eq(7)
                .invoke('text')
                .then((text) => {
                  expect(text).to.eq('停用')
                  deleteQcMgr(batchNo)
                })
            }
          })
        })
      })
    })
  })
  context('筛选条件', () => {
    it('批号搜索', () => {
      searchQcMgr('2019052501')
      clickButton('重置')
    })
    it('质控品名称搜索', () => {
      searchQcMgr(null, '免疫质控物')
      clickButton('重置')
    })
    it('厂商搜索', () => {
      searchQcMgr(null, null, '安图')
      clickButton('重置')
    })
    it('质控主管单位', () => {
      searchQcMgr(null, null, null, '青浦医联体')
    })
  })
  context('权限验证', () => {
    it('011-取消勾选页面权限', () => {
      openEditPage()
      findElement('relaRightCodes', '物料管理').find('.el-checkbox__input').first().then((el) => {
        if ((el.hasClass('is-checked') || (el.hasClass('is-indeterminate')))) {
          cancelPermissions('relaRightCodes', '物料管理', '质控品管理')
        } else {
          findElement('relaRightCodes', '物料管理').find('.el-checkbox__input').click({
            force:true
          })
          cancelPermissions('relaRightCodes', '物料管理', '质控品管理')
        }
      })
      waitRequest({
        intercept:interceptQueryQcMgr, 
        onBefore: () => {
          loginMgrWithGdccl('qc-mgr')
        },
        onError: (msg) => {
          validErrorMsg(msg)
        }
      })
    })
    it('012-勾选查看权限', () => {
      loginMgrWithGdccl('manage-dept', 'admin')
      openEditPage() 
      findElement('relaRightCodes', '物料管理').find('[type="checkbox"]').first().check({
        force:true
      })
      //勾选查看权限
      findElement('relaRightCodes', '质控品管理').find('[type="checkbox"]').first().check({
        force:true
      })
      findElement('relaRightCodes', '质控品管理').find('[type="checkbox"]').last().uncheck({
        force:true
      })
      cy.wait(2000)
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
      findElement('permissions', '物料管理').find('[type="checkbox"]').first().check({
        force:true
      })
      findElement('permissions', '质控品管理').find('[type="checkbox"]').first().check({
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
      loginMgrWithGdccl('qc-mgr')
      cy.wait(2000)
      cy.get('.el-table__body .el-table__row').first().find('.cell').last().findByText('查看').parents('.el-button').should('not.have.css','display','none')
      cy.get('.el-table__body .el-table__row').first().find('.cell').last().findByText('编辑').parents('.el-button').should('have.css','display','none')
      cy.get('.el-table__body .el-table__row').first().find('.cell').last().findByText('删除').parents('.ql-button-confirm').should('have.css','display','none')
    })
    it('013-勾选编辑权限', ()=>{
     loginMgrWithGdccl('manage-dept', 'admin')
      openEditPage() 
      findElement('relaRightCodes', '物料管理').find('[type="checkbox"]').first().check({
        force:true
      })
      //勾选查看权限
      findElement('relaRightCodes', '质控品管理').find('[type="checkbox"]').first().check({
        force:true
      })
      findElement('relaRightCodes', '质控品管理').find('[type="checkbox"]').last().check({
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
      findElement('permissions', '物料管理').find('[type="checkbox"]').first().check({
        force:true
      })
      findElement('permissions', '质控品管理').find('[type="checkbox"]').first().check({
        force:true
      })
      findElement('permissions', '质控品管理').find('[type="checkbox"]').last().check({
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
      loginMgrWithGdccl('qc-mgr')
      cy.wait(2000)
      cy.get('.el-table__body .el-table__row').first().find('.cell').last().findByText('查看').parents('.el-button').should('not.have.css','display','none')
      cy.get('.el-table__body .el-table__row').first().find('.cell').last().findByText('编辑').parents('.el-button').should('not.have.css','display','none')
      cy.get('.el-table__body .el-table__row').first().find('.cell').last().findByText('删除').parents('.ql-button-confirm').should('not.have.css','display','none')
    })
  })  
})