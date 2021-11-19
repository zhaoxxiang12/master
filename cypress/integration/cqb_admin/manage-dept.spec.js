import {
  clickCancelInDialog,
  clickOkInDialog,
  confirmDelete,
  withinDialog
} from '../common/dialog'
import {
  validFormItemError
} from '../common/form'
import {
  interceptAll,
  waitIntercept,
  waitRequest
} from '../common/http'
import {
  loginMgrWithGdccl
} from '../common/login'
import {
  validErrorMsg,
  validSuccessMessage
} from '../common/message'
import {
  elform
} from '../mutual-result/mutual-item'
import { getLabForm } from '../user-info/lab-info'




const createCCl = (cclName, relaLabIds, relaRightCodes) => {
  if (cclName) {
    elform('cclName').clear().type(cclName)
    cy.wait(2000)
  }
  if (relaLabIds === 'some') {
    elform('relaLabIds', 'radio').check(relaLabIds, {
      force: true
    })
  }
  if (relaRightCodes) {
    cy.get(`[for=${relaRightCodes}]`).next('.el-form-item__content')
      .find('.tree-resource.tree-resource__border').find('span').contains('所有权限').click({
        force: true
      })
  }
}

const interceptUpdateUser = () => {
  return interceptAll('service/system/user/update',interceptUpdateUser.name)
}

const getUserLength = (text) => {
  return cy.get('.el-table__body:visible').last().contains(text).parents('.el-table__row')
}

const getDataLength = () => {
  return cy.get('.el-tree-node__children').first().find('[role="treeitem"]')
}

const interceptCreateCcl = () => {
  return interceptAll('service/mgr/ccl', interceptCreateCcl.name)
}

const interceptUpdateCcl = () => {
  return interceptAll('service/mgr/ccl',interceptUpdateCcl.name)
}

const interceptDeleteCcl = () => {
  return interceptAll('service/mgr/ccl/*',interceptDeleteCcl.name)
}

const interceptDeleteUser = () => {
  return  interceptAll('service/system/user/*',interceptDeleteUser .name) 
}

const interceptCreateUser = () => {
  return interceptAll('service/system/user/add', interceptCreateUser.name)
}

const interceptCheckUser = () => {
  return interceptAll('service/system/user/checkUserCode?*',interceptCheckUser.name)
}

const clickCreate = (param = '添加下一级管理单位') => {
  if (param === '添加用户') {
    cy.get('.el-header').contains('添加用户').click()
  } else {
    cy.get('.el-header').contains('添加下一级管理单位').click()
  }
  cy.wait(2000)
}

const createUser = (userCode, userName, userPwd, permissions) => {
  if (userCode) {
    elform('userCode').clear().type(userCode)
  }
  if (userName) {
    elform('userName').clear().type(userName)
  }
  if (userPwd) {
    elform('userPwd').clear().type(userPwd)
  }
  if (permissions) {
    cy.get(`[for=${permissions}]`).next('.el-form-item__content')
      .find('.tree-resource.tree-resource__border').find('span').contains('所有权限').click({
        force: true
      })
    cy.wait(3000)
  }
}

const waitPage = (alias) => {
  return interceptAll('service/mgr/ccl/users/admin', waitPage.name)
}

const loginMgrWithNewUser = (path) => {
  loginMgrWithGdccl('lab-manager', 'addCQB')
  cy.wait(3000)
  loginMgrWithGdccl('lab-manager', 'admin')
  cy.visit(path)
  cy.wait(waitPage('waitPage')).its('response.statusCode').should('eq', 200)
}

context('分级管理机构', () => {
  const cclName = '测试' + new Date().getTime()
  const path = '/cqb-base-mgr-fe/app.html#/manage/account/manage-dept'
  before(() => {
    cy.loginCQB()
    waitIntercept(waitPage, () => {
      cy.visit(path)
      cy.wait(1000)
    }, () => {

    })
  })
  context('添加管理机构', () => {
    const title = '添加管理单位'
    const repeatCclName = '青浦医联体'
    it('001-管理单位名称未填写', () => {
      clickCreate()
      createCCl(null, null, 'relaRightCodes')
      withinDialog(clickOkInDialog, title)
      validFormItemError('请输入管理单位名称')
      withinDialog(clickCancelInDialog, title)
    })
    it('002-权限未选择', () => {
      clickCreate()
      createCCl(cclName)
      withinDialog(clickOkInDialog, title)
      validFormItemError('请选择功能点')
      withinDialog(clickCancelInDialog, title)
    })
    it('003-未选择实验室', () => {
      clickCreate()
      createCCl(cclName, 'some', 'relaRightCodes')
      withinDialog(clickOkInDialog, title)
      validFormItemError('请选择所在地实验室')
      withinDialog(clickCancelInDialog, title)
    })
    it('004-管理机构名字相同', () => {
      clickCreate()
      createCCl(repeatCclName, null, 'relaRightCodes')
      waitRequest({
        intercept: interceptCreateCcl,
        onBefore: () => {
          withinDialog(clickOkInDialog, title)
        },
        onSuccess: () => {
          validSuccessMessage()
        },
        onError: (data) => {
          validErrorMsg(data)
        }
      })
      withinDialog(clickCancelInDialog, title)
    })
    it('005-添加管理机构-数据正常保存', () => {
      getDataLength().then(getData => {
        clickCreate()
        createCCl(cclName, null, 'relaRightCodes')
        waitIntercept(interceptCreateCcl, () => {
          withinDialog(clickOkInDialog, title)
        }, () => {
          validSuccessMessage()
          cy.wait(2000)
          getDataLength().should('have.length', getData.length + 1)
        })
      })
    })
  })
  context('添加用户', () => {
    const userCode = '明'
    const userName = '明'
    const password = 123456
    const permissions = 'permissions'
    const userTitle = '添加用户信息'
    it('006-用户名未填写', () => {
      clickCreate('添加用户')
      createUser(null, userName, password, permissions)
      withinDialog(clickOkInDialog, userTitle)
      validFormItemError('请输入用户名')
      withinDialog(clickCancelInDialog, userTitle)
    })
    it('007-姓名未填写', () => {
      clickCreate('添加用户')
      createUser(userCode, null, password, permissions)
      withinDialog(clickOkInDialog, userTitle)
      validFormItemError('请输入姓名')
      withinDialog(clickCancelInDialog, userTitle)
    })
    it('008-密码未填写', () => {
      clickCreate('添加用户')
      createUser(userCode, userName, null, permissions)
      withinDialog(clickOkInDialog, userTitle)
      validFormItemError('请输入密码')
      withinDialog(clickCancelInDialog, userTitle)
    })
    it('008-权限未填写', () => {
      clickCreate('添加用户')
      createUser(userCode, userName, password)
      withinDialog(clickOkInDialog, userTitle)
      validFormItemError('请选择功能点')
      withinDialog(clickCancelInDialog, userTitle)
    })
  })
  context('修改/删除验证', () => {
    const userCode = '明' + new Date().getTime()
    const userName = '明' + new Date().getTime()
    const password = 123456
    const permissions = 'permissions'
    const userTitle = '添加用户信息'
    before(() => {
      getDataLength().contains('测试').click()
      cy.wait(3000)
      clickCreate('添加用户')
      createUser(userCode, userName, password, permissions)
      waitIntercept(interceptCreateUser, () => {
        withinDialog(clickOkInDialog, userTitle)
      }, () => {
        validSuccessMessage()
        cy.wait(3000)
      })
    })
    context('修改',() => {
      it('009-修改管理机构名字', () => {
        const newCclName = '自动化测试' + new Date().getTime()
        getDataLength().contains(cclName).parent().find('[title="编辑管理单位"]').click()
        cy.wait(2000)
        elform('cclName').clear().type(newCclName)
        waitIntercept(interceptUpdateCcl, () => {
          withinDialog(clickOkInDialog,'编辑管理单位')
        }, () => {
          validSuccessMessage()
          getDataLength().last().invoke('text').then((text) => {
            let orgName = text.replace(/(^\s*)|(\s*$)/g, '')
            expect(orgName).to.eq(newCclName)
          })
        })
      })
      it('010-修改用户名', () => {
        const newName = '自动化修改' + new Date().getTime()
        getUserLength(userCode).findByText('编辑').click({
          force:true
        })
        cy.wait(3000)
        elform('userName').clear().type(newName)
        waitIntercept(interceptUpdateUser, () => {
          withinDialog(clickOkInDialog,'编辑用户信息')
        }, () => {
          validSuccessMessage()
          cy.wait(3000)
          getUserLength(userCode).find('.cell').eq(1).invoke('text').then(getData => {
            const getName = getData.replace(/(^\s*)|(\s*$)/g, '')
            expect(getName).to.eq(newName)
          })
        })
      }) 
    })
    context('删除',() => {
      it('011-有用户的管理单位不允许删除', () => {
        getDataLength().contains('测试').parent().find('[title="删除管理单位"]').click()
        waitRequest({
          intercept:interceptDeleteCcl,
          onBefore:() => {
            confirmDelete()
          },
          onError: (data) => {
            validErrorMsg(data)
          }
        }) 
      })
      it('012-删除用户名',()=> {
        getUserLength('明').findByText('删除').click({
          force:true
        })
        waitIntercept(interceptDeleteUser, () => {
          confirmDelete()
        }, () => {
          validSuccessMessage()
          cy.wait(2000)
        })
      })
      it('013-管理单位删除成功',() => {
        getDataLength().then(getData => {
          getDataLength().contains('测试').parent().find('[title="删除管理单位"]').click()
          waitRequest({
            intercept:interceptDeleteCcl,
            onBefore:() => {
              confirmDelete()
            },
            onError: (data) => {
              validErrorMsg(data)
            },
            onSuccess:() => {
              validSuccessMessage()
              cy.wait(2000)
              getDataLength().should('have.length',getData.length - 1)
            }
          })
        })
      })
    })
  })
  context('其他操作',() => {
    it('014-添加管理机构-关键字搜索', () => {
      cy.get('.el-tree-node__children').first().find('[role="treeitem"]').last().invoke('text').then((text) => {
        let data = text.replace(/(^\s*)|(\s*$)/g, '')
        cy.get('[placeholder="请输入管理单位名进行查找"]').type(data)
        cy.wait(3000)
        getDataLength().contains(data).parents('.el-tree-node').should('have.class', 'is-expanded')
      })
    })
    it('015-系统顶级管理员-添加用户', () => {
      let name = 'addCQB'
      let checkUser
      cy.get('.tree-dept .tree-dept-node .tree-dept-node-txt.tree-dept-node-l1').contains('系统顶级管理单位').click()
      cy.get('button').contains('添加用户').click({
        force: true
      })
      cy.wait(1000)
      createUser(name,name,name,'permissions')
      waitIntercept(interceptCheckUser, () => {
        checkUser = interceptCreateUser()
        withinDialog(clickOkInDialog,'添加用户信息')
      }, data => {
        if (data=== true) {
          cy.get('.el-form-item__error').should('contain', '用户名已被使用')
          cy.wait(1000)
          withinDialog(clickCancelInDialog,'添加用户信息')
          cy.wait(1000)
          getLabForm().contains(name).parents('.el-table__row').findByText('删除').click({
            force:true
          })
          //删除用户
          waitIntercept(interceptDeleteUser, () => {
            confirmDelete()
          }, () => {
            validSuccessMessage()
          })
          cy.wait(1000)
          cy.get('button').contains('添加用户').click({
            force: true
          })
          cy.wait(1000)
          createUser(name,name,name,'permissions')
          waitIntercept(interceptCreateUser, () => {
            withinDialog(clickOkInDialog,'添加用户信息')
          }, () => {
            cy.get('.el-message__content').should('contain', '用户已添加')
            cy.wait(2000)
            loginMgrWithNewUser(path)
          })
        } else {
          waitIntercept(checkUser, () => {
            cy.get('.el-message__content').should('contain', '用户已添加')
            loginMgrWithNewUser(path)
          })
        }
      })

    })
    it('016-系统顶级管理员-修改用户密码', () => {
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
        cy.wait(3000)
        cy.get('[autocomplete="new-password"]').last().clear().type(json.password)
        cy.intercept('**/cqb-base-mgr/service/system/user/update*').as('edit')
        cy.get('.el-button.el-button--primary.el-button--medium').last().click({
          force: true
        })
        cy.wait('@edit').then((xhr) => {
          cy.compare(xhr)
          // cy.get('.el-message__content').should('contain', '用户密码已修改')
          cy.wait(1000)
          loginMgrWithGdccl('lab-manager', 'editCQB')
          loginMgrWithGdccl('report-rate', 'admin')
          cy.wait(1000)
          cy.get('button').contains('推送到大屏').should('be.exist')
          cy.visit(path)
          cy.wait(waitPage('waitPage')).its('response.statusCode').should('eq', 200)
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
})