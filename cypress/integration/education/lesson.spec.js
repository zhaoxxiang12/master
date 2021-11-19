/**
 * 课程管理
 */
import {
  clickButton
} from '../common/button'
import {
  clickListener
} from '../common/event'
import {
  setInput,
  focusInput,
  setTextarea,
  getInput,
  getTextarea,
  clearInput,
  setInputRange,
  clearInputRange
} from '../common/input'
import {
  activeSelect
} from '../common/select'
import {
  findTableCell
} from '../common/table'
import {
  withinDialog,
  clickCancelInDialog,
  okOnPopConfirm,
  closeTips
} from '../common/dialog'
import {
  validErrorMsg
} from '../common/message'
import { interceptAll, waitIntercept, waitRequest } from '../common/http'
const verifyForm = (classname, text) => {
  cy.get(classname).next().find('.el-form-item__error').should('have.text', text)
}
const jumpLast = () => {
  cy.get('.el-pagination .el-pager .number').last().click({
    force: true
  })
}
const pushUnit = (text) => {
  cy.document()
    .its('body')
    .find('.el-select-popover:visible', {
      timeout: 6000
    })
    .find('.el-scrollbar')
    .not('.selected')
    .contains(text)
    .should('exist')
    .click({
      force: true
    })
}
const checkTableAll = () => {
  cy.get('.el-table__header').find('th').eq(0).find('.el-checkbox__inner').click({
    force: true
  })
}
const getDocument = () => {
  return cy.document()
    .its('body')
}
const leasonList = () => { // service/edu/lesson/page?
  return interceptAll('service/edu/lesson/page?*', leasonList.name)
}
const addLeason = () => {
  return interceptAll('service/edu/lesson', addLeason.name)
}
const bindLeason = () => {
  return interceptAll('service/edu/lesson/bind', bindLeason.name)
}
const deleteCheckLeason = () => {
  return interceptAll('service/edu/lesson/*/delete-check', deleteCheckLeason.name)
}
context('课程管理', () => {
  before(() => {
    // cy.loginCQB()
    cy.visitPage('lesson')
  })
  it('001-将勾选的课程推送给所有勾选的管理单位', () => {
    cy.wait(5000)
    checkTableAll()
    cy.get('button').contains('批量推送').click({
      force: true
    })
    cy.get('.el-dialog__body').find('.el-input__inner').click({
      force: true
    })
    cy.wait(500)
    cy.get('.tree-dept-node-txt').each(element => {
      element.click()
    })
    cy.get('.el-dialog__title').contains('推送课程组合').click({
      force: true
    })
    cy.document().its('body').find('[aria-label="推送课程组合"] .el-dialog__footer')
      .last()
      .find('button:visible')
      .contains('确定')
      .click({
        force: true
      })
  })
  it('002.数据同步', () => {
    cy.wait(3000)
    clickButton('数据同步')
    cy.wait(1000)
    cy.get('.el-popover button:visible').contains('确认').click({
      force: true
    })
  })
  it('003.列表页左上角增加‘一共XX个课程’', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    waitIntercept(leasonList, () => {
      setInput('授课者', '删除已绑定过的课程')
      clickButton('搜索')
    }, data => {
      cy.get('.ql-search__body .el-alert.el-alert--warning .el-alert__title').should('contain.text', `一共有${data.total}个课程`)
    })
  })
  it('004.添加课程', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    clickButton('添加课程')
    withinDialog(() => {
      setInput('课程名', '122222')
      cy.get('.el-upload [type="file"]').last().attachFile('logo.png')
      setInput('授课者', '测试')
      focusInput('课程类型')
      activeSelect('图文')
      setInput('学分', 1)
      setTextarea('课程简介', '测试')
      clickButton('保存')
    }, '添加课程')
    cy.wait(3000)
    setInput('课程名', '122222')
    clickButton('搜索')
    cy.wait(1000)
    findTableCell(0, 1).contains('122222').should('exist')
    findTableCell(0, 8).find('button').contains('删除').click({
      force: true
    })
    cy.get('.el-popconfirm button').last().contains('确认').click({
      force: true
    })
  })
  it('005.添加课程的校验课程名必填唯一，长度60', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    clickButton('添加课程')
    withinDialog(() => {
      // setInput('课程名', '')
      cy.get('.el-upload [type="file"]').last().attachFile('logo.png')
      setInput('授课者', '测试')
      focusInput('课程类型')
      activeSelect('图文')
      setInput('学分', 1)
      setTextarea('课程简介', '测试')
      clickButton('保存')
      verifyForm('[for="lessonName"]', '\n          请输入课程名\n        ')
      cy.wait(3000)
      setInput('课程名', '[0101001]从BCG检测白蛋白开始')
      waitRequest({
        intercept: addLeason,
        onBefore: () => {
          clickButton('保存')
        },
        // onSuccess: () => {},
        onError: (msg) => {
          getDocument()
            .find('.el-message--error .el-message__content')
            .should('have.text', msg)
        }
      })
    }, '添加课程')
  })
  it('006.添加课程校验缩略图的增删改-必填，只能一张，可以删除', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    clickButton('添加课程')
    withinDialog(() => {
      setInput('课程名', '12222')
      // cy.get('.el-upload [type="file"]').last().attachFile('logo.png')
      setInput('授课者', '测试')
      focusInput('课程类型')
      activeSelect('图文')
      setInput('学分', 1)
      setTextarea('课程简介', '测试')
      clickButton('保存')
      cy.wait(1000)
      verifyForm('[for="lessonImage"]', '\n          请上传缩略图\n        ')
      cy.wait(3000)
      cy.get('.el-upload [type="file"]').last().attachFile('logo.png')
      cy.wait(1000)
      cy.get('.el-upload [type="file"]').last().attachFile('logo2.png')
      cy.wait(3000)
      cy.get('.el-upload-list .el-icon-delete').first().click({
        force: true
      })
      clickCancelInDialog()
    }, '添加课程')
  })
  it('007.添加课程校验授课者必填', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    clickButton('添加课程')
    withinDialog(() => {
      setInput('课程名', '12222')
      cy.get('.el-upload [type="file"]').last().attachFile('logo.png')
      // setInput('授课者', '测试')
      focusInput('课程类型')
      activeSelect('图文')
      setInput('学分', 1)
      setTextarea('课程简介', '测试')
      clickButton('保存')
      cy.wait(1000)
      verifyForm('[for="teacher"]', '\n          请输入授课者\n        ')
      cy.wait(3000)
      setInput('授课者', '冯仁丰')
      clickButton('保存')
    }, '添加课程')
    /* cy.wait(3000)
    setInput('课程名', '12222')
    clickButton('搜索')
    cy.wait(1000)
    findTableCell(0, 1).contains('12222').should('exist')
    findTableCell(0, 8).find('button').contains('删除').click({
      force: true
    })
    cy.get('.el-popconfirm button').last().contains('确认').click({
      force: true
    }) */
  })
  it('008.添加课程-校验学分', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    clickButton('添加课程')
    withinDialog(() => {
      setInput('学分', -1)
      setTextarea('课程简介', '测试')
      getInput('学分').should('have.value', '0')
      cy.wait(3000)
      setInput('学分', 10000)
      setTextarea('课程简介', '测试')
      getInput('学分').should('have.value', '9999')
      setInput('课程名', '12222')
      cy.get('.el-upload [type="file"]').last().attachFile('logo.png')
      setInput('授课者', '测试')
      focusInput('课程类型')
      activeSelect('图文')
      getInput('学分').clear({
        force: true
      })
      clickButton('保存')
      cy.wait(1000)
      verifyForm('[for="credit"]', '\n          请输入学分\n        ')
    }, '添加课程')
  })
  it('009.添加课程-校验课程简介', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    clickButton('添加课程')
    withinDialog(() => {
      setInput('课程名', '12222')
      cy.get('.el-upload [type="file"]').last().attachFile('logo.png')
      setInput('授课者', '测试')
      focusInput('课程类型')
      activeSelect('图文')
      setInput('学分', 1)
      clickButton('保存')
      cy.wait(1000)
      verifyForm('[for="intro"]', '\n          请输入课程简介\n        ')
      // let str = ''
      // for (let i = 0; i < 47; i++) {
      //   str += i
      // }
      // cy.wait(1000)
      // setTextarea('课程简介', str)
      // clickButton('保存')
      cy.wait(1000)
      clickCancelInDialog()
    }, '添加课程')
  })
  it('010.添加课程-编辑单个课程', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    setInput('课程名', '12222')
    clickButton('搜索')
    cy.wait(1000)
    findTableCell(0, 1).contains('12222').should('exist')
    findTableCell(0, 8).find('button').contains('编辑').click({
      force: true
    })
    withinDialog(() => {
      setInput('学分', 8)
      clickButton('保存')
      cy.wait(1000)
      clickCancelInDialog()
    }, '编辑课程')
  })
  it('011.添加课程-批量编辑课程', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    setInput('课程名', '12222')
    clickButton('搜索')
    cy.wait(1000)
    checkTableAll()
    clickButton('批量编辑')
    withinDialog(() => {
      setInput('授课者', '测试')
      focusInput('课程类型')
      activeSelect('图文')
      setInput('学分', '9')
      setTextarea('课程简介', '9')
      clickButton('确定')
    }, '批量编辑课程')
  })
  it('012.添加课程-批量编辑课程，允许部分字段为空', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    setInput('课程名', '12222')
    clickButton('搜索')
    cy.wait(1000)
    checkTableAll()
    clickButton('批量编辑')
    withinDialog(() => {
      focusInput('课程类型')
      activeSelect('图文')
      setInput('学分', '8')
      setTextarea('课程简介', '8')
      clickButton('确定')
    }, '批量编辑课程')
  })
  it('013.添加课程-绑定课程以及取消绑定', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    jumpLast()
    cy.wait(1000)
    findTableCell(6, 0).find('.el-checkbox').click({
      force: true
    })
    clickButton('取消绑定')
    okOnPopConfirm()
    cy.wait(3000)
    findTableCell(6, 0).find('.el-checkbox').click({
      force: true
    })
    findTableCell(7, 0).find('.el-checkbox').click({
      force: true
    })
    clickButton('课程绑定')
    okOnPopConfirm()
    cy.wait(1000)
    jumpLast()
    cy.wait(3000)
    findTableCell(6, 0).find('.el-checkbox').click({
      force: true
    })
    clickButton('取消绑定')
    okOnPopConfirm()
  })
  it('014.添加课程-绑定已推送过的课程', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    jumpLast()
    cy.wait(1000)
    findTableCell(6, 0).find('.el-checkbox').click({
      force: true
    })
    findTableCell(7, 0).find('.el-checkbox').click({
      force: true
    })
    clickButton('批量推送')
    withinDialog(() => {
      focusInput('推送所选课程给以下管理单位')
      getDocument()
        .find('.el-select-popover:visible', {
          timeout: 6000
        })
        .find('.el-scrollbar')
        .not('.selected')
        .contains('佛山市临床检验质量控制中心')
        .should('exist')
        .click({
          force: true
        })
      cy.get('.el-dialog__title').click({
        force: true
      })
      clickButton('确定')
    }, '推送课程组合')
    cy.wait(3000)
    findTableCell(5, 0).find('.el-checkbox').click({
      force: true
    })
    findTableCell(6, 0).find('.el-checkbox').click({
      force: true
    })
    findTableCell(7, 0).find('.el-checkbox').click({
      force: true
    })
    waitRequest({
      intercept: bindLeason,
      onBefore: () => {
        clickButton('课程绑定')
        okOnPopConfirm()
      },
      onError: (msg) => {
        console.log(msg)
        validErrorMsg(msg)
      }
    })
  })
  it('015.添加课程-取消已推送的绑定课程，再次进行绑定', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    jumpLast()
    cy.wait(1000)
    findTableCell(6, 0).find('.el-checkbox').click({
      force: true
    })
    findTableCell(7, 0).find('.el-checkbox').click({
      force: true
    })
    clickButton('取消推送')
    okOnPopConfirm()
    cy.wait(3000)
    jumpLast()
    cy.wait(1000)
    findTableCell(6, 0).find('.el-checkbox').click({
      force: true
    })
    findTableCell(7, 0).find('.el-checkbox').click({
      force: true
    })
    clickButton('课程绑定')
    okOnPopConfirm()
  })
  it('016.添加课程-没有批量删除按钮', () => {
    cy.wait(5000)
    cy.get('button')
      .contains('批量删除')
      .should('not.exist')
    setInput('课程名', '英英')
    clickButton('搜索')
    cy.wait(1000)
    findTableCell(0, 8)
      .find('button')
      .contains('删除')
      .should('exist')
  })
  it('017.添加课程-"取消推送"按钮高亮', () => {
    cy.wait(3000)
    cy.get('button').contains('取消推送').parent().should('have.class', 'is-disabled')
    checkTableAll()
    cy.get('button').contains('取消推送').parent().should('not.have.class', 'is-disabled')
  })

  it('018.添加课程-"已推送单位"字段验证', () => {
    cy.wait(3000)
    setInput('课程名', '0000')
    clickButton('搜索')
    cy.wait(1000)
    checkTableAll()
    clickButton('批量推送')
    withinDialog(() => {
      focusInput('推送所选课程给以下管理单位')
      pushUnit('佛山市临床检验质量控制中心')
      pushUnit('青浦医联体')
      cy.get('.el-dialog__title').click({
        force: true
      })
      clickButton('确定')
    }, '推送课程组合')
    cy.wait(1000)
    findTableCell(0, 7).should('contain.text', ' 佛山市临床检验质量控制中心、青浦医联体')
  })
  it('019.删除已推送的课程', () => {
    cy.wait(3000)
    setInput('课程名', '0000')
    clickButton('搜索')
    cy.wait(1000)
    findTableCell(0, 8)
      .find('button')
      .contains('删除')
      .should('not.exist')
  })
  it('020.删除已推送的课程', () => {
    cy.wait(3000)
    setInput('课程名', '测试权限管理')
    clickButton('搜索')
    cy.wait(1000)
    findTableCell(0, 8)
      .find('button')
      .contains('编辑')
      .should('exist')
    findTableCell(0, 8)
      .find('button')
      .contains('删除')
      .should('exist')
  })
  it('021.删除已绑定过的课程', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    jumpLast()
    cy.wait(1000)
    findTableCell(6, 0).find('.el-checkbox').click({
      force: true
    })
    clickButton('取消绑定')
    okOnPopConfirm()
    cy.wait(3000)
    findTableCell(6, 0).find('.el-checkbox').click({
      force: true
    })
    findTableCell(7, 0).find('.el-checkbox').click({
      force: true
    })
    findTableCell(8, 0).find('.el-checkbox').click({
      force: true
    })
    clickButton('课程绑定')
    okOnPopConfirm()
    cy.wait(3000)
    jumpLast()
    cy.wait(1000)
    findTableCell(6, 8)
      .find('button')
      .contains('删除')
      .click({
        force: true
      })
  })
  it('022.删除已绑定过的课程', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    clickButton('添加课程')
    withinDialog(() => {
      setInput('课程名', 'A1')
      cy.get('.el-upload [type="file"]').last().attachFile('logo.png')
      setInput('授课者', '删除已绑定过的课程1')
      focusInput('课程类型')
      activeSelect('图文')
      setInput('学分', 2)
      setTextarea('课程简介', 2)
      cy.get('.el-checkbox__label').contains('继续添加下一课程').click({
        force: true
      })
      clickButton('保存')
      cy.wait(2000)
      setInput('课程名', 'B1')
      cy.get('.el-upload [type="file"]').last().attachFile('logo.png')
      setInput('授课者', '删除已绑定过的课程1')
      focusInput('课程类型')
      activeSelect('图文')
      setInput('学分', 2)
      setTextarea('课程简介', 2)
      cy.get('.el-checkbox__label').contains('继续添加下一课程').click({
        force: true
      })
      clickButton('保存')
      cy.wait(2000)
      setInput('课程名', 'C1')
      cy.get('.el-upload [type="file"]').last().attachFile('logo.png')
      setInput('授课者', '删除已绑定过的课程1')
      focusInput('课程类型')
      activeSelect('图文')
      setInput('学分', 2)
      setTextarea('课程简介', 2)
      clickButton('保存')
    }, '添加课程')
    cy.wait(3000)
    setInput('授课者', '删除已绑定过的课程1')
    clickButton('搜索')
    cy.wait(3000)
    checkTableAll()
    clickButton('课程绑定')
    okOnPopConfirm()
    cy.wait(1000)
    findTableCell(0, 8)
      .find('button')
      .contains('删除')
      .click({
        force: true
      })
    okOnPopConfirm()
    cy.wait(1000)
    cy.get('[aria-label="删除提示"] .el-message-box__message')
      .should('contain.text', 'A1已经与B1、C1绑定，是否同步删除B1、C1课程？')
    cy.wait(1000)
    closeTips('删除提示', '取消')
    cy.wait(3000)
    checkTableAll()
    clickButton('取消绑定')
    okOnPopConfirm()
    cy.wait(5000)
    findTableCell(0, 8)
      .find('button')
      .contains('删除')
      .click({
        force: true
      })
    okOnPopConfirm()
    cy.wait(3000)
    findTableCell(0, 8)
      .find('button')
      .contains('删除')
      .click({
        force: true
      })
    okOnPopConfirm()
    cy.wait(3000)
    findTableCell(0, 8)
      .find('button')
      .contains('删除')
      .click({
        force: true
      })
    okOnPopConfirm()
  })
  it('023.删除已组合的课程', () => {
    cy.wait(3000)
    setInput('课程名', '[0503006]网页版-分组设置')
    clearInput('授课者')
    clickButton('搜索')
    cy.wait(2000)
    waitRequest({
      intercept: deleteCheckLeason,
      onBefore: () => {
        findTableCell(0, 8)
          .find('button')
          .contains('删除')
          .click({
            force: true
          })
        okOnPopConfirm()
      },
      onSuccess: (data) => {
        console.log(data)
        cy.get('[aria-label="删除提示"] .el-message-box__message')
          .should('contain.text', data.msg)
      }
    })
  })
  it('024.单个条件搜索', () => {
    cy.wait(3000)
    setInput('课程名', '[0101001]从BCG检测白蛋白开始')
    clickButton('搜索')
    cy.wait(2000)
    clearInput('课程名')
    setInput('授课者', '删除已绑定过的课程')
    clickButton('搜索')
    cy.wait(2000)
    clearInput('授课者')
    // setInput('学分', '0')
    setInputRange('学分', 0, 2)
    clickButton('搜索')
    cy.wait(2000)
    clearInputRange('学分')
    focusInput('课程类型')
    activeSelect('专栏')
    activeSelect('图文')
    clickButton('搜索')
    cy.wait(2000)
    // clearInputRange('课程类型')
    cy.get('.el-tag__close').eq(1).click({
      force: true
    })
    cy.get('.el-tag__close').first().click({
      force: true
    })
    focusInput('管理单位')
    cy.get('.el-select-popover .tree-dept-node')
      .contains('佛山市临床检验质量控制中心')
      .click({
        force: true
      })
    clickButton('搜索')
    cy.wait(2000)
  })
  it('025.组合条件搜索', () => {
    cy.wait(3000)
    setInput('课程名', '[0101001]从BCG检测白蛋白开始')
    setInput('授课者', '冯仁丰')
    setInputRange('学分', 0, 2)
    focusInput('课程类型')
    activeSelect('专栏')
    activeSelect('图文')
    clickButton('搜索')
    focusInput('管理单位')
    cy.get('.el-select-popover .tree-dept-node')
      .contains('佛山市临床检验质量控制中心')
      .click({
        force: true
      })
    cy.wait(2000)
  })
  it('026.批量"取消推送"', () => {
    cy.visitPage('lesson')
    cy.wait(3000)
    setInput('课程名', '测试权限管理')
    clickButton('搜索')
    cy.wait(3000)
    checkTableAll()
    clickButton('批量推送')
    cy.wait(1000)
    withinDialog(() => {
      focusInput('推送所选课程给以下管理单位')
      getDocument()
        .find('.el-select-popover:visible', {
          timeout: 6000
        })
        .find('.el-scrollbar')
        .not('.selected')
        .contains('佛山市临床检验质量控制中心')
        .should('exist')
        .click({
          force: true
        })
      cy.get('.el-dialog__title').click({
        force: true
      })
      clickButton('确定')
    }, '推送课程组合')
    cy.wait(3000)
    checkTableAll()
    clickButton('取消推送')
    okOnPopConfirm()
  })
  it('027.管理员可以取消推送已组合过的课程', () => {
    cy.wait(3000)
    setInput('课程名', '0000')
    clickButton('搜索')
    cy.wait(3000)
    checkTableAll()
    clickButton('批量推送')
    cy.wait(3000)
    withinDialog(() => {
      focusInput('推送所选课程给以下管理单位')
      getDocument()
        .find('.el-select-popover:visible', {
          timeout: 6000
        })
        .find('.el-scrollbar')
        .not('.selected')
        .contains('佛山市临床检验质量控制中心')
        .should('exist')
        .click({
          force: true
        })
      cy.get('.el-dialog__title').click({
        force: true
      })
      clickButton('确定')
    }, '推送课程组合')
    cy.wait(3000)
    checkTableAll()
    clickButton('取消推送')
    okOnPopConfirm()
  })
  it('028.批量推送后编辑课程数据', () => {
    cy.wait(3000)
    setInput('课程名', '0000')
    clickButton('搜索')
    cy.wait(3000)
    findTableCell(0, 8)
      .find('button')
      .contains('编辑')
      .click({
        force: true
      })
    cy.wait(1000)
    withinDialog(() => {
      setInput('授课者', '77')
      clickButton('保存')
    }, '编辑课程')
  })
})