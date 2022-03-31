import { visitPage } from '../../shared/route'
import { confirmPushReport } from '../common/button'
import { clickCancelInDialog, clickOkInDialog, confirmDelete, withinDialog } from '../common/dialog'
import { elFormInput } from '../common/form'
import { interceptAll, waitIntercept } from '../common/http'
import { validSuccessMessage } from '../common/message'
import { activeSelect } from '../common/select'
import { getDialog } from '../message/message'
import { elform } from '../mutual-result/mutual-item'
import { addTag, clearTag, validAccount } from './lab-manager'

//声明这是一个测试用例
describe('账户管理-实验室账户', function () {
  const select = (prop, area) => {
    cy.get('.el-form')
      .last()
      .find(`[for="${prop}"]`)
      .next('.el-form-item__content')
      .findAllByPlaceholderText(`${area}`).click()
  }

  const interceptEditMany = () => {
    return interceptAll('service/mgr/lab/updateBatch',interceptEditMany.name)
  }

  const labInformation = (labName, labCode, regionCode, GPS, labAdminName, labAdminPhone, password) => {
    cy.get('button').contains('添加实验室').click({
      force: true
    })
    cy.wait(2000)
    //实验室名称
    if (labName) {
      elFormInput('labName', labName)
    }
    if (labCode) {
      // 输入实验室编码
      elFormInput('labCode', labCode)
    }
    if (regionCode) {
      //选择所在地（选择省）
      select(regionCode, '请选择省')
      dropList('广东省')
      //选择所在地（选择市）
      select(regionCode, '所有市')
      dropList('佛山市')
      select(regionCode, '所有区')
      dropList('南海区')
    }
    if (GPS) {
      //获取GPS坐标
      elFormInput('gps', GPS)
    }
    if (labAdminName) {
      //输入联系人
      elFormInput('labAdminName', labAdminName)
    }
    if (labAdminPhone) {
      //输入联系人电话
      elFormInput('labAdminPhone', labAdminPhone)
    }
    if (password) {
      // 输入实验密码
      elFormInput('password', password)
    }
    if (labName && labCode && regionCode && GPS && labAdminName && labAdminPhone && password) {
      if (labCode === 'gd18001' || labCode === 'gd18002') {
        elFormInput('labCode', labCode)
      } else {
        cy.intercept({
          url: '/cqb-base-mgr/service/mgr/lab/add',
          method: 'POST'
        }).as('addLab')
        cy.get('.el-dialog__footer').last().findByText('保存').click()
        cy.wait('@addLab').then((xhr) => {
          cy.compare(xhr)
          cy.get('body').should('contain', '实验室已添加')
          cy.get('input[placeholder="实验室名称或编码"').type(labCode)
          cy.get('button[type=submit]').findByText('搜索').click()
          cy.wait(1000)
          cy.get('body').should('contain', '共 1 条')
        })
      }
    }
  }

  const saveLabInformation = () => {
    //点击保存
    cy.get('.el-dialog__footer').last().findByText('保存').click()
  }

  const saveLab = () => {
    return interceptAll('service/mgr/lab/checkLabId?*', saveLab.name)
  }

  const dropList = (alias) => {
    cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains(`${alias}`).click()
  }
  const submitLabInformation = (alias) => {
    saveLabInformation()
    //断言
    cy.get('.el-form-item__error').should('contain', `${alias}`)
    // 关闭窗口
    cy.get('.el-dialog__footer').last().findByText('关闭').click()
  }

  const searchData = (keyWord) => {
    cy.get('input[placeholder="实验室名称或编码"').clear().type(keyWord)
    cy.get('button[type = "submit"]').findByText('搜索').click()
    cy.wait(1000)
  }

  const alertInputBox = (prop, word) => {
    cy.get('.el-table__body').find('.el-table__row').first().findByText('编辑').click({
      force: true
    })
    cy.wait(2000)
    cy.get('.el-form')
      .last()
      .find(`[for = "${prop}"]`)
      .next('.el-form-item__content')
      .find('.el-input__inner').should('have.value', word)
    // 关闭窗口
    cy.get('.el-dialog__footer').last().findByText('关闭').click()
  }

  const editLab = (labName, labCode, labAdminName, labAdminPhone) => {

    if (labName) {
      cy.get('.el-table__body').find('.el-table__row').first().findByText('编辑').click({
        force: true
      })
      cy.wait(2000)
      elFormInput('labName', labName, 'function')
      //修改实验室名称
      waitIntercept(saveLab, saveLabInformation, data => {
        validSuccessMessage()
        searchData(labName)
        alertInputBox('labName', labName)
      })
    }
    if (labCode === 'gd18001' || labCode === 'gd18002') {
      console.log(labCode)
      //修改实验室编码
      cy.get('.el-table__body').find('.el-table__row').first().findByText('编辑').click({
        force: true
      })
      cy.wait(2000)
      elFormInput('labCode', labCode, 'function')
      submitLabInformation('编码已存在，请重新输入')
    } else if (labCode) {
      cy.get('.el-table__body').find('.el-table__row').first().findByText('编辑').click({
        force: true
      })
      cy.wait(2000)
      elFormInput('labCode', labCode, 'function')
      waitIntercept(saveLab, saveLabInformation, data => {
        validSuccessMessage()
        alertInputBox('labCode', labCode)
      })
    }
    if (labAdminName) {
      //修改联系人
      cy.get('.el-table__body').find('.el-table__row').first().findByText('编辑').click({
        force: true
      })
      cy.wait(2000)
      elFormInput('labAdminName', labAdminName, 'function')
      waitIntercept(saveLab, saveLabInformation, data => {
        validSuccessMessage()
        alertInputBox('labAdminName', labAdminName)
      })
    }
    if (labAdminPhone) {
      //修改联系人电话
      cy.get('.el-table__body').find('.el-table__row').first().findByText('编辑').click({
        force: true
      })
      cy.wait(2000)
      elFormInput('labAdminPhone', labAdminPhone, 'function')
      waitIntercept(saveLab, saveLabInformation, data => {
        validSuccessMessage()
        alertInputBox('labAdminPhone', labAdminPhone)
      })
    }
  }
  let result
  const queryLab = () => {
    return interceptAll('service/mgr/lab/page?*', queryLab.name + new Date().getTime())

  }

  const waitQueryLab = (cb) => {
    waitIntercept(queryLab, data => {
      result = data.data
    })
  }

  const disableLab = (rowIndex) => { //锁定实验室
    waitIntercept(queryLab, () => {
      cy.get('.el-table__body').last().find('.el-table__row').eq(rowIndex).findByText('锁定').click({
        force: true
      })
      confirmDelete()
    }, data => {
      result = data.data
      console.log(result)
      cy.wait(5000)
      expect(result[rowIndex].labStatus).to.be.equal('2')
      cy.get('.el-table__body').last().find('.el-table__row').eq(rowIndex).findByText('启用').should('exist')
    })
  }

  const enableLab = (rowIndex) => {
    waitIntercept(queryLab, () => {
      cy.get('.el-table__body').last().find('.el-table__row').eq(rowIndex).findByText('启用').click({
        force: true
      })
      confirmPushReport()
    }, data => {
      result = data.data
      cy.wait(5000)
      expect(result[rowIndex].labStatus).to.be.equal('1')
      cy.get('.el-table__body').last().find('.el-table__row').eq(rowIndex).findByText('锁定').should('exist')
    })
  }

  const filterLab = (tagName, areaName, keyWord) => {
    if (tagName) {
      cy.get('input[placeholder="选择标签"]').click({
        force: true
      })
      cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains(tagName).click()
    }

    if (areaName) {
      cy.get('.el-form.el-form--inline').findAllByPlaceholderText('请选择省').click()
      cy.get('.el-scrollbar__view.el-select-dropdown__list').last().contains(areaName).click()
    }

    if (keyWord) {
      cy.get('.el-form.el-form--inline').findAllByPlaceholderText('实验室名称或编码')
        .clear()
        .type(keyWord)
    }
    waitIntercept(queryLab, () => {
      cy.get('button[type="submit"]').findByText('搜索').click()
    }, data => {
      result = data.data
      const length = result.length
      if (length === 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (length <= 20) {
        cy.get('.el-table__body').last().find('.el-table__row').should('have.length', length)
        if (areaName) {
          result.forEach(lab => {
            expect(lab.province).contain(areaName)
          })
        }
        if (keyWord) {
          result.forEach(lab => {
            expect(lab.labName).contain(keyWord)
          })
        }
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + length + ' 条')
      }
    })
  }

  const resetPassword = (newPassword, confirmPassword) => {
    cy.get('.el-table__body').find('.el-table__row').first().findByText('重置密码').click({
      force: true
    })
    cy.get('[aria-label="重置密码"]').find('[for="newPwd"]').first().next('.el-form-item__content')
      .find('.el-input__inner').clear().type(newPassword)
    //确认密码
    cy.get('[aria-label="重置密码"]').find('[for="confirmPwd"]').first().next('.el-form-item__content')
      .find('.el-input__inner').clear().type(confirmPassword)
    if (newPassword != confirmPassword) {
      cy.get('.el-form-item__error').should('contain', '两次输入密码不一致!')
      cy.get('.reset-pwd-footer').findByText('取消').click()
    }
    if (newPassword === confirmPassword) {
      cy.intercept('**/service/mgr/lab/changePwd*').as('changePwd')
      cy.get('.reset-pwd-footer').findByText('确定').click()
      cy.wait('@changePwd').then((xhr) => {
        cy.compare(xhr)
        cy.get('.el-message__content').should('have.text', '密码修改成功！')
      })
    }
  }

  before(() => {
    cy.visitPage('lab-manager')
  })
  context('添加实验室', () => {
    const labName = '佛山市医院'
    var randomCode = parseInt(Math.random() * 100000) //生成随机数
    const labCode = 'gd' + randomCode
    const regionCode = 'regionCode'
    const GPS = '123,23'
    const labAdminName = 'AA'
    const labAdminPhone = '18'
    const password = 'gd' + randomCode
    before(() => {
      visitPage('lab-manager')
      cy.wait(3000)
    })
    // --------------------------------------------添加实验室------------------------------------------------
    it('001-添加实验室-实验室名称为空不能保存', () => {
      cy.wait(1000)
      labInformation(null, labCode, regionCode, GPS, labAdminName, labAdminPhone, password)
      submitLabInformation('请输入实验室名称')
    })
    it('002-添加实验室-实验室编码为空不能保存', () => {
      cy.wait(1000)
      labInformation(labName, null, regionCode, GPS, labAdminName, labAdminPhone, password)
      submitLabInformation('请输入编码')
    })
    it('003-添加实验室-实验室编码重复不能保存', () => {
      cy.wait(1000)
      const repeatLabCode = 'gd18001'
      labInformation(labName, repeatLabCode, regionCode, GPS, labAdminName, labAdminPhone, password)
      submitLabInformation('编码已存在，请重新输入')
    })
    it('004-添加实验室-所在地为空不能保存', () => {
      cy.wait(1000)
      labInformation(labName, labCode, null, GPS, labAdminName, labAdminPhone, password)
      submitLabInformation('请选择所在地')
    })
    it('005-添加实验室-GPS坐标为空不能保存', () => {
      cy.wait(1000)
      labInformation(labName, labCode, regionCode, null, labAdminName, labAdminPhone, password)
      submitLabInformation('请输入GPS坐标')
    })
    it('006-添加实验室-联系人为空不能保存', () => {
      cy.wait(1000)
      labInformation(labName, labCode, regionCode, GPS, null, labAdminPhone, password)
      submitLabInformation('请输入联系人名称')
    })
    it('007-添加实验室-联系人电话为空不能保存', () => {
      cy.wait(1000)
      labInformation(labName, labCode, regionCode, GPS, labAdminName, null, password)
      submitLabInformation('请输入联系电话')
    })
    it('008-添加实验室-必填项按照正确格式填写保存成功', () => {
      cy.wait(1000)
      labInformation(labName, labCode, regionCode, GPS, labAdminName, labAdminPhone, password)
    })
  })
  // --------------------------------------------编辑实验室------------------------------------------------
  context('编辑实验室', () => {
    const labName = '测试实验室1'
    before(() => {
      cy.wait(1000)
      searchData(labName)
    })
    it('009-编辑实验室-修改实验室名称', () => {
      const editName = '修改实验室名称' + parseInt(Math.random() * 100000)
      editLab(editName)
      //将修改名称后的名字改回来
      searchData(editName)
      editLab(labName)
    })
    it('010-编辑实验室-修改实验室编码(相同)', () => {
      const repeatLabCode = 'gd18002'
      editLab(null, repeatLabCode)
    })
    it('011-编辑实验室-修改实验室编码', () => {
      const labCode = 'gd' + parseInt(Math.random() * 100000)
      editLab(null, labCode)
    })
    it('012-编辑实验室-修改联系人', () => {
      const labAdminName = '修改联系人' + parseInt(Math.random() * 100000)
      editLab(null, null, labAdminName)
    })
    it('013-编辑实验室-修改联系电话', () => {
      const newPhoneNumber = '188456' + parseInt(Math.random() * 100000)
      editLab(null, null, null, newPhoneNumber)
    })
  })

  context('启用/停用实验室', () => {
    const labName = '测试实验室1'
    before(() => {
      cy.wait(1000)
    })
    it('014-启用实验室', () => {
      waitIntercept(queryLab, () => {
        cy.get('input[placeholder="实验室名称或编码"').clear().type(labName)
        filterLab(null,'广东省')
        cy.get('button[type="submit"]').findByText('搜索').click()
        cy.wait(2000)
      }, data => {
        result = data.data
        const rowIndex = result.findIndex(lab => lab.labStatus == 1)
        if (rowIndex == -1) {
          const changeIndex = 0
          enableLab(changeIndex)
        } else {
          cy.get('.el-table__body').last().find('.el-table__row').eq(rowIndex).findByText('锁定').should('exist')
          disableLab(rowIndex)
          enableLab(rowIndex)
        }
      })
    })
    it('015-停用实验室', () => {
      cy.wait(3000)
      waitIntercept(queryLab, () => {
        cy.get('input[placeholder="实验室名称或编码"').clear().type(labName)
        filterLab(null,'广东省')
        cy.get('button[type="submit"]').findByText('搜索').click()
        cy.wait(2000)
      }, data => {
        result = data.data
        const rowIndex = result.findIndex(lab => lab.labStatus == 2)
        if (rowIndex == -1) {
          const changeIndex = 0
          disableLab(changeIndex)
        } else {
          cy.get('.el-table__body').last().find('.el-table__row').eq(rowIndex).findByText('锁定').should('exist')
          enableLab(rowIndex)
          disableLab(rowIndex)
        }
      })
    })
  })

  context('关联标签', () => {
    const labName = 'UI测试实验室'
    before(() => {
      searchData(labName)
    })
    it('015-关联业务标签', () => {
      cy.get('.el-table__row').first().find('button').contains('编辑').click({
        force: true
      })
      cy.get('.ql-select-tag__selected').first().find('.el-tag.el-tag--success').then(element => {
        addTag(true, '佛山', element.length)
      })
    })
    it('016-关联系统标签', () => {
      cy.get('.el-table__row').first().find('button').contains('编辑').click({
        force: true
      })
      cy.wait(2000)
      cy.get('.ql-select-tag__selected').last().find('.el-tag.el-tag--success').then(element => {
        addTag(false, 'UI测试', element.length)
      }) 
    })
  })
  context('筛选条件', () => {
    before(() => {
      cy.wait(1000)
    })
    it('017-实验室账户-标签筛选', () => {
      const tagName = '佛山'
      const tagName2 = '广西'
      //-----------标签选择佛山Ⅱ--------------
      filterLab(tagName)
      cy.get('.el-tag__close.el-icon-close').click()
      //-----------标签选择广西Ⅱ--------------
      filterLab(tagName2)
      cy.get('.el-tag__close.el-icon-close').click()
    })
    it('018-所在地搜索', () => {
      const beijing = '北京市'
      const Guangdong = '广东省'
      //-----------地区选择北京市------------------
      filterLab(null, beijing)
      //-----------地区选择广东省-----------------
      filterLab(null, Guangdong)
      cy.get('.el-form.el-form--inline').findAllByPlaceholderText('请选择省').click()
      cy.get('.el-select__caret.el-input__icon.el-icon-circle-close').click()
    })
    it('019-关键字搜索', () => {
      const labName = '佛山市第一人民医院'
      filterLab(null, null, labName)
    })
  })
  context('额外操作', () => {
    const labName = 'UI测试实验室'
    before(() => {
      cy.wait(1000)
      searchData(labName)
    })
    it('020-实验室账户-已关联新冠质管账户不允许删除和编辑', () => {
      const accountName = 'COVID19_QC_WEIYI'
      cy.get('.el-table__row').first().find('td').eq(5).find('span').invoke('text').then(text => {
       let textArray = text.replace(/\n/g,"").split(" ").filter(i => i && i.trim())
        for (let i = 0; i <= textArray.length; i++) {
          if (textArray[i] === accountName) {
            validAccount(accountName)
            break;
          }
          if (i == textArray.length) {
            cy.get('.el-icon-plus').click({
              force:true
            })
            cy.wait(3000)
            cy.get('[aria-label="设置关联帐号"]').within(() => {
              cy.findAllByPlaceholderText('请选择').click()
              activeSelect(accountName)
              elform('systemAccount').type(123456)
              withinDialog(clickOkInDialog,'设置关联帐号')
            })
            cy.wait(3000)
            validAccount(accountName)
          }
        }
      })
    })
    it('021-重置密码', () => {
      const newPassWord1 = '12345'
      const newPassWord2 = '1234578'
      //--------------新密码与确认密码输入不同不能进行保存-------------------
      resetPassword(newPassWord1, newPassWord2)
      //--------------新密码与确认密码输入相同可以保存-------------
      resetPassword(newPassWord1, newPassWord1)
    })
    it('022-实验室账户-批量编辑', () => {
      let typeWord = '测试'
      let userName = '明' + parseInt(Math.random() * 100000)
      let phoneNumber = parseInt(Math.random() * 100000)
      cy.get('input[placeholder="实验室名称或编码"]').clear().type(typeWord)
      cy.intercept({
        url: '**/cqb-base-mgr/service/mgr/lab/page?*',
        method: 'GET'
      }).as('searchLab')
      cy.get('button').contains('搜索').click()
      cy.wait('@searchLab').then((xhr) => {
        cy.compare(xhr)
      })
      cy.wait(2000)
      cy.get('.el-checkbox__inner:visible').eq(1).click({
        force: true
      })
      cy.get('.el-checkbox__inner:visible').eq(2).click({
        force: true
      })
      cy.get('button').contains('批量编辑').click()
      cy.wait(2000)
      getDialog('批量编辑实验室').within(() => {
        cy.get('.el-form').last().find('[type="checkbox"]').check('labAdminName', {
          force: true
        })
        cy.get('.el-form').last().find('[type="checkbox"]').check('labAdminPhone', {
          force: true
        })
        // 修改数据
        elform('labAdminName').type(userName)
        elform('labAdminPhone').type(phoneNumber)
      })
      waitIntercept(interceptEditMany, () => {
        withinDialog(clickOkInDialog, '批量编辑实验室')
      }, () => {
        validSuccessMessage()
      })
      cy.wait(2000)
      for (let i = 0; i < 2; i++) {
        cy.get('.el-table__body:visible')
        .last().find('tr').eq(i).findByText('编辑').click({
          force: true
        })
        cy.wait(5000)
        //联系人
        elform('labAdminName').should('have.value', userName)
        //联系电话
        elform('labAdminPhone').should('have.value', phoneNumber)
       //关闭窗口
       withinDialog(clickCancelInDialog, '编辑实验室')
       cy.wait(2000)
      }
    })
  })
  context('流程验证', () => {
    const labCode = 'test12379'
    it('023-实验室账户-锁定实验室', () => {
      cy.get('input[placeholder="实验室名称或编码"').clear().type(labCode)
      waitIntercept(queryLab, () => {
        cy.get('button[type=submit]').findByText('搜索').click()
        cy.wait(3000)
      }, data => {
        result = data.data
        const rowIndex = result.findIndex(lab => lab.labStatus == 2)
        if (rowIndex != -1) { //当前实验室状态为停用
          cy.get('.el-table__body').last().find('.el-table__row').eq(rowIndex).findByText('启用').should('exist')
          cy.loginLockLabCQB()
          //----------------返回管理端再次启用实验室---------------------
          visitPage('lab-manager')
          searchData(labCode)
          enableLab(rowIndex)
        } else {
          let changeIndex = 0
          disableLab(changeIndex)
          cy.loginLockLabCQB()
          visitPage('lab-manager')
          searchData(labCode)
          enableLab(changeIndex)
        }
      })
    })
  })
  context.only('删除测试数据',() => {
    it('删除测试数据', () => {
      cy.task('executeCqbSql', 'delete from base_lab_info where labName = "佛山市医院" ')
      })
    })
})