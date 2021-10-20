import { interceptGet, interceptPost, waitIntercept, waitRequest } from '../common/http'
import { okOnPopConfirm, withinDialog, closeTips } from '../common/dialog'
import { setInput, focusInput, setTextarea } from '../common/input'
import { activeSelect } from '../common/select'
import { validErrorMsg } from '../common/message'
import { customizeLessonGroup, setLessonGroupName, selectCheckbox, clickCreateGroupBtn, searchGroupName, delLessonGroup } from '../education/lesson-group'
import { findTableCell } from '../common/table'
import { expandChildTree, findTreeNode } from '../common/tree'
import { clickButton, uploadImage } from '../common/button'
import { setRangeDate, exportLessonReport, importLessonReport, authManage, exportLessonInfo, importCSV, batchDelete, exportLessonSum, importLessonSum } from './auth-manager'
import { logout } from '../common/logout'
import { loginMgrWithGdccl } from '../common/login'
const syncLessonReq = () => {
  return interceptPost('service/edu/lesson/sync', syncLessonReq.name)
}
const queryLabReq = () => {
  return interceptGet('service/mgr/lab/page?*', queryLabReq.name)
}
const waitOptions = {
  timeout: 90000
}

describe('权限管理', () => {
  context('管理员权限', () => {
    before(() => {
      cy.loginCQB()
      cy.visitPage('lesson')
      cy.wait(1000)
    })
    it('001-同步课程', () => {
      waitRequest({
        waitOptions,
        intercept: syncLessonReq,
        onBefore: () => {
          clickButton('数据同步')
          okOnPopConfirm()
        },
        onSuccess: () => {
          cy.get('.el-popup-parent--hidden button')
            .last()
            .click({
              force: true
            })
        }
      })
    })
    it('002-添加课程', () => {
      clickButton('添加课程')
      withinDialog(() => {
        setInput('课程名', '测试权限管理')
        cy.get('.el-upload').click({
          force: true
        })
        uploadImage('.el-form', 'logo.png')
        setInput('授课者', '测试权限管理员')
        focusInput('课程类型')
        activeSelect('测试课程类型字典11111')
        setInput('学分', 7)
        setTextarea('课程简介', '测试11111')
        clickButton('保存')
      }, '添加课程')
    })
    it('003-绑定课程', () => {
      cy.get('.el-table__body-wrapper tbody tr .el-checkbox').eq(0).click({
        force: true
      })
      cy.get('.el-table__body-wrapper tbody tr .el-checkbox').eq(1).click({
        force: true
      })
      clickButton('课程绑定')
      cy.get('.el-popover button').contains('确认').click({
        force: true
      })
    })
    it('004-组合课程', () => {
      cy.visitPage('lesson-group')
      cy.wait(300)
      customizeLessonGroup()
      cy.wait(50)
      setLessonGroupName('gfj')
      cy.wait(50)
      selectCheckbox('0000')
      selectCheckbox('[0101001]从BCG检测白蛋白开始')
      clickCreateGroupBtn('添加')
      clickCreateGroupBtn('确定')
      // 删除
      cy.wait(3000)
      searchGroupName('gfj')
      cy.wait(300)
      delLessonGroup()
    })
    it('005-创建计划', () => {
      cy.visitPage('lesson-plan')
      cy.wait(1000)
      clickButton('自定义课程计划')
      withinDialog(() => {
        setInput('课程计划名称', 'B计划')
        cy.get('.el-range-editor').click({
          force: true
        })
        cy.wait(100)
        setRangeDate(1, 1, '1')
        setRangeDate(1, 1, '1')
        cy.get('.el-transfer-panel__body .el-checkbox__input').eq(2).click({
          force: true
        })
        clickButton('添加')
        clickButton('课程组合设置')
        withinDialog(() => {
          cy.get('.el-range-editor').click({
            force: true
          })
          cy.wait(100)
          setRangeDate(1, 3, '1')
          setRangeDate(1, 3, '1')
          focusInput('开课模式')
          activeSelect('闯关模式')
          clickButton('确定')
        }, '课程组合设置')
        clickButton('确定')
      }, '创建课程计划')
    })
    it('006-学员授权管理', () => {
      cy.visitPage('lesson-approve')
      authManage()
    })
    it('007-学员学习信息维护-每月用户学习统计表-导出Excel表', () => {
      cy.visitPage('lesson-report')
      exportLessonReport()
    })
    it('008-学员学习信息维护-每月用户学习统计表-导入Excel表', () => {
      cy.visitPage('lesson-report')
      importLessonReport()
    })
    it('009-学员学习信息维护-每月课程信息反馈表-导出Excel表', () => {
      cy.visitPage('lesson-report')
      exportLessonInfo()
    })
    it('010-学员学习信息维护-每月课程信息反馈表-导入Excel表', () => {
      cy.visitPage('lesson-report')
      importCSV()
    })
    it('011-学员学习信息维护-每月课程信息反馈表-批量删除', () => {
      cy.visitPage('lesson-report')
      batchDelete()
    })
    it('012-学员学习信息维护-课程信息反馈汇总表-导出Excel表', () => {
      cy.visitPage('lesson-report')
      exportLessonSum()
    })
    it('013-学员学习信息维护-课程信息反馈汇总表-导入Excel表', () => {
      cy.visitPage('lesson-report')
      importLessonSum()
    })
    it('014-字典维护-新增字典', () => {
      cy.visitPage('lesson-dict')
      cy.wait(1000)
      clickButton('添加字典')
      withinDialog(() => {
        setInput('字典名称', '权限管理新增')
        clickButton('保存')
      }, ' 添加/编辑字典')
    })
    it('015-字典维护-启用/停用字典', () => {
      cy.visitPage('lesson-dict')
      cy.wait(1000)
      cy.get('.el-table__body-wrapper  tbody tr').each($el => {
        const name = $el.find('td').first().text()
        if (name === '权限管理新增') {
          $el.find('.el-switch').click()
        }
      })
    })
    it('016-字典维护-编辑字典', () => {
      cy.visitPage('lesson-dict')
      cy.wait(1000)
      cy.get('.el-table__body-wrapper  tbody tr').each($el => {
        const name = $el.find('td').first().text()
        if (name === '权限管理新增') {
          $el.find('button').click()
          withinDialog(() => {
            focusInput('状态')
            activeSelect('停用')
            clickButton('保存')
          }, ' 添加/编辑字典')
        }
      })
    })

    function switchTabs(text) {
      cy.get('.el-tabs__item.is-top')
        .contains(text)
        .should('exist')
        .click({
          force: true
        })
    }
    it('017-字典维护-切换字典类型（不同类型的字典操作流程一样）', () => {
      cy.visitPage('lesson-dict')
      cy.wait(1000)
      switchTabs('专业组字典')
      cy.wait(1000)
      switchTabs('职称字典')
      cy.wait(1000)
      switchTabs('课程类型字典')
    })
  })
  context('中心账号权限', () => {
    it('001-创建组合', () => {
      loginMgrWithGdccl('lesson-group')
      cy.wait(300)
      customizeLessonGroup()
      cy.wait(50)
      setLessonGroupName('gdfslj')
      cy.wait(50)
      selectCheckbox('0000')
      selectCheckbox('[0101001]从BCG检测白蛋白开始')
      clickCreateGroupBtn('添加')
      clickCreateGroupBtn('确定')
      // 删除
      cy.wait(3000)
      searchGroupName('gdfslj')
      cy.wait(300)
      delLessonGroup()
    })
    it('002-创建计划', () => {
      loginMgrWithGdccl('lesson-plan')
      cy.wait(3000)
      clickButton('自定义课程计划')
      withinDialog(() => {
        setInput('课程计划名称', 'C计划')
        cy.get('.el-range-editor').click({
          force: true
        })
        cy.wait(100)
        setRangeDate(1, 1, '1')
        setRangeDate(1, 1, '1')
        cy.get('.el-transfer-panel__body .el-checkbox__input').eq(2).click({
          force: true
        })
        clickButton('添加')
        clickButton('课程组合设置')
        withinDialog(() => {
          cy.get('.el-range-editor').click({
            force: true
          })
          cy.wait(100)
          setRangeDate(1, 3, '1')
          setRangeDate(1, 3, '1')
          focusInput('开课模式')
          activeSelect('闯关模式')
          clickButton('确定')
        }, '课程组合设置')
        clickButton('确定')
      }, '创建课程计划')
    })
    it('003-应用计划', () => {
      loginMgrWithGdccl('lesson-plan')
      cy.wait(3000)
      cy.get('.el-input__inner')
        .first()
        .clear({
          force: true
        }).type('C计划', {
          force: true
        })
      clickButton('搜索')
      cy.wait(3000)
      findTableCell(0, 6)
        .find('button')
        .contains('应用')
        .should('exist')
        .click({
          force: true
        })
      withinDialog(() => {
        setInput('关键字', '广东人民医院11')
        waitRequest({
          intercept: queryLabReq,
          onBefore: () => {
            clickButton('搜索')
          },
          onSuccess: () => {
            clickButton('添加所有符合条件的实验室')
            clickButton('保存')
          }
        })
      }, '选择实验室')
    })
    it('004-学员学习信息维护-每月用户学习统计表-导出Excel表', () => {
      cy.visitPage('lesson-report')
      exportLessonReport()
    })
    it('005-学员学习信息维护-每月用户学习统计表-导入Excel表', () => {
      cy.visitPage('lesson-report')
      importLessonReport()
    })
    it('006-学员学习信息维护-每月课程信息反馈表-导出Excel表', () => {
      cy.visitPage('lesson-report')
      exportLessonInfo()
    })
    it('07-学员学习信息维护-每月课程信息反馈表-导入CSV表', () => {
      cy.visitPage('lesson-report')
      importCSV()
    })
    it('008-学员学习信息维护-每月课程信息反馈表-批量删除', () => {
      cy.visitPage('lesson-report')
      batchDelete()
    })
    it('009-学员学习信息维护-课程信息反馈汇总表-导出Excel表', () => {
      cy.visitPage('lesson-report')
      exportLessonSum()
    })
    it('010-学员学习信息维护-课程信息反馈汇总表-导入Excel表', () => {
      cy.visitPage('lesson-report')
      importLessonSum()
    })
    it('011-不可以修改和删除管理员推送的信息', () => {
      cy.visitPage('lesson-group')
      cy.wait(1000)
      cy.get('.el-input__inner')
        .first()
        .clear({
          force: true
        }).type('abc', {
          force: true
        })
      clickButton('搜索')
      cy.wait(1000)
      findTableCell(0, 3)
        .find('button')
        .contains('修改')
        .click({
          force: true
        })
      cy.wait(1000)
      withinDialog(() => {
        setInput('课程组合名称', 'abcd')
        clickButton('确定')
      }, '修改课程组合')
      cy.wait(1000)
      findTableCell(0, 3)
        .find('button')
        .contains('删除')
        .click({
          force: true
        })
      closeTips('删除提示', '删除')
      cy.wait(100)
      validErrorMsg('该课程组合已经被推送给管理单位，不允许删除')
    })
  })
  context('特殊账号权限', () => {
    it('001-用超管新建一个教育账号', () => {
      loginMgrWithGdccl('manage-dept', 'admin')
      cy.wait(1000)-
      clickButton('添加用户')
      withinDialog(() => {
        setInput('用户名', 'edu')
        setInput('姓名', 'edu')
        setInput('密码', 'edu')
        expandChildTree('permissions', '管理')
        cy.wait(1000)
        findTreeNode('permissions', '人员培训管理').click({
          force: true
        })
        clickButton('确定')
      }, '添加用户信息')
    })
    it('002-教育账号登录', () => {
      loginMgrWithGdccl('404', 'edu')
      cy.wait(3000)
      cy.get('.ql-layout__aside .ql-layout__aside-menu .el-submenu .el-submenu__title').contains('管理').click({
        force: true
      })
      cy.get('.ql-layout__aside .ql-layout__aside-menu .el-submenu .el-submenu__title').contains('人员培训管理').click({
        force: true
      })
      cy.wait(3000)
      logout()
    })
  })
})