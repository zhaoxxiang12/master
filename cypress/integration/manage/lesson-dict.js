/**
 * 字典维护
 */
context('字典维护', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/manage/education/lesson-dict')
  })
  it('001-添加课程类型的字典', () => {
    cy.get('.table-lesson-dict .el-button').find('span').contains('添加字典').click({
      force: true
    })
    cy.get('.demo-ruleForm').find('.el-form-item').eq(0).find('.el-input__inner').type('测试课程类型字典', {
      force:true
    })
    cy.get('button').contains('保存').click({
      force: true
    })
  })
  it('002-添加专业组的字典', () => {
    cy.get('.el-tabs__header .el-tabs__nav .el-tabs__item').contains('专业组字典').click({
      force: true
    })
    cy.get('.table-lesson-dict .el-button').find('span').contains('添加字典').click({
      force: true
    })
    cy.get('.demo-ruleForm').find('.el-form-item').eq(0).find('.el-input__inner').type('测试专业组字典', {
      force: true
    })
    cy.get('button').contains('保存').click({
      force: true
    })
  })
  it('003-添加职称的字典', () => {
    cy.get('.el-tabs__header .el-tabs__nav .el-tabs__item').contains('职称字典').click({
      force: true
    })
    cy.get('.table-lesson-dict .el-button').find('span').contains('添加字典').click({
      force: true
    })
    cy.get('.demo-ruleForm').find('.el-form-item').eq(0).find('.el-input__inner').type('测试职称字典', {
      force: true
    })
    cy.get('button').contains('保存').click({
      force: true
    })
  })
  it('004-编辑课程类型的字典', () => {
    cy.get('.el-table__body').last().find('tr').each(e => {
      if (e.find('td .cell').first()[0].innerText === '测试课程类型字典') {
        e.find('td .cell').last().find('button').click({
          force: true
        })
      }
    }).then(() => {
      cy.get('.demo-ruleForm').find('.el-form-item').eq(0).find('.el-input__inner').clear().type('测试课程类型字典11111', {
        force: true
      })
      cy.get('button').contains('保存').click({
        force: true
      })
    })
  })
  it('005-编辑专业组的字典', () => {
    cy.get('.el-tabs__header .el-tabs__nav .el-tabs__item').contains('专业组字典').click({
      force: true
    })
    cy.get('.el-table__body').last().find('tr').each(e => {
      if (e.find('td .cell').first()[0].innerText === '测试专业组字典') {
        e.find('td .cell').last().find('button').click({
          force: true
        })
      }
    }).then(() => {
      cy.get('.demo-ruleForm').find('.el-form-item').eq(0).find('.el-input__inner').clear().type('测试专业组字典11111', {
        force:true
      })
      cy.get('button').contains('保存').click({
        force: true
      })
    })
  })
  it('006-编辑职称的字典', () => {
    cy.wait(1000)
    cy.get('.el-tabs__header .el-tabs__nav .el-tabs__item').contains('职称字典').click({
      force: true
    })
    cy.wait(1000)
    cy.get('.el-table__body').last().find('tr').each(e => {
      if (e.find('td .cell').first()[0].innerText === '测试职称字典11111') {
        e.find('td .cell').last().find('button').click({
          force: true
        })
      }
    }).then(() => {
      cy.get('.demo-ruleForm').find('.el-form-item').eq(0).find('.el-input__inner').clear().type('测试职称字典11111', {
        force: true
      })
      cy.get('button').contains('保存').click({
        force: true
      })
    })
  })
  it('007-编辑职称的字典-添加课程管理-选择新添加的字典', () => {
    cy.wait(1000)
    cy.get('.el-tabs__header .el-tabs__nav .el-tabs__item').contains('职称字典').click({
      force: true
    })
    cy.wait(1000)
    cy.get('.el-table__body').last().find('tr').each(e => {
      if (e.find('td .cell').first()[0].innerText === '测试职称字典11111') {
        e.find('td .cell').last().find('button').click({
          force: true
        })
      }
    }).then(() => {
      cy.get('.demo-ruleForm').find('.el-form-item').eq(0).find('.el-input__inner').clear().type('测试职称字典11111', {
        force: true
      })
      cy.get('button').contains('保存').click({
        force: true
      })
      cy.wait(1000)
      cy.loginCQB()
      cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/education/lesson')
      cy.wait(1000)
      cy.get('button').contains('添加课程').click({
        force: true
      })
      cy.get('[aria-label="添加课程"] input').eq(0).type('test 新添加的字典', {
        force: true
      })
      cy.get('[aria-label="添加课程"] .el-upload.el-upload--picture-card').click({
        force: true
      })
      cy.get('input[type=\'file\']').attachFile('logo.png')
      cy.wait(1000)
      cy.get('[aria-label="添加课程"] input').eq(2).type('test 新添加的授课者', {
        force: true
      })
      cy.get('[aria-label="添加课程"] input').eq(3).click()
      cy.get('body>.el-select-dropdown .el-select-dropdown__item').contains('测试课程类型字典11111').click()
      cy.get('[aria-label="添加课程"] input').eq(4).type(10)
      cy.get('[aria-label="添加课程"] textarea').eq(0).type('课程简介', {
        force: true
      })
      cy.get('button').contains('保存').click({
        force: true
      })
    })
  })
  it('008-编辑职称的字典-编辑课程管理-选择新添加的字典', () => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/manage/education/lesson-dict')
    cy.wait(1000)
    cy.get('.el-tabs__header .el-tabs__nav .el-tabs__item').contains('职称字典').click({
      force: true
    })
    cy.wait(1000)
    cy.get('.el-table__body').last().find('tr').each(e => {
      if (e.find('td .cell').first()[0].innerText === '测试职称字典11111') {
        e.find('td .cell').last().find('button').click()
      }
    }).then(() => {
      cy.get('.demo-ruleForm').find('.el-form-item').eq(0).find('.el-input__inner').clear().type('测试职称字典11111', {
        force: true
      })
      cy.get('button').contains('保存').click({
        force: true
      })
      cy.wait(1000)
      cy.loginCQB()
      cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/education/lesson')
      cy.wait(1000)
      cy.get('input').first().clear().type('test新添加的字典', {
        force: true
      })
      cy.get('button').contains('搜索').click({
        force: true
      })
      cy.get('.el-table .el-table__fixed-right .el-table__fixed-body-wrapper tbody tr button').contains('编辑').click()
      cy.get('[aria-label="编辑课程"] input').eq(3).clear().click({
        force: true
      })
      cy.get('body>.el-select-dropdown.el-popper .el-select-dropdown__list .el-select-dropdown__item').each(element => {
        if (element.find('span')[0].innerText === '测试课程类型字典222') {
          element.find('span')[0].click({
            force: true
          })
        }
      })
      cy.get('button').contains('保存').click({
        force: true
      })
      cy.wait(2000)
      // 删除‘007-编辑职称的字典-添加课程管理-选择新添加的字典’
      cy.get('.el-table .el-table__fixed-right .el-table__fixed-body-wrapper tbody tr button').contains('删除').click({
        force: true
      })
      // cy.get('.el-popconfirm__action').find('button').eq(1).click()
      cy.get('.el-popover .el-popconfirm__action').find('button').last().click({
        force: true
      })
    })
  })
  it('009-启用停用的字典', () => {
    cy.loginCQB()
    cy.visit('http://mgr-cqb.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/education/lesson-dict')
    cy.wait(1000)
    cy.get('.el-table__body').last().find('tbody .el-table__row').each(tr => {
      if (tr.find('td').first().find('.cell')[0].innerText === '电子书') {
        tr.find('td').eq(1).find('span').eq(1).click({
          force: true
        })
      }
    })
  })
  it('010-停用启用的字典', () => {
    cy.wait(1000)
    cy.get('.el-table__body').last().find('tbody .el-table__row').each(tr => {
      if (tr.find('td').first().find('.cell')[0].innerText === '电子书') {
        tr.find('td').eq(1).find('span').eq(1).click({
          force: true
        })
      }
    })
  })
})