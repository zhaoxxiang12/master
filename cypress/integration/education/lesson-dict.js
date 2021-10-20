export const openAddDict = () => {
  cy.get('.table-lesson-dict .el-button span')
    .contains('添加字典')
    .should('exist')
    .click({
      force: true
    })
}

export const tabsItem = (text) => {
  cy.get('.el-tabs__header .el-tabs__nav .el-tabs__item')
    .contains(text)
    .should('exist')
    .click({
      force: true
    })
}

export const saveBtn = () => {
  cy.get('button')
    .contains('保存')
    .should('exist')
    .click({
      force: true
    })
}

export const setDictName = (name) => {
  cy.get('.demo-ruleForm')
    .find('.el-form-item')
    .eq(0)
    .find('.el-input__inner')
    .should('exist')
    .clear({
      force: true
    }).type(name, {
      force: true
    })
}

export const searchTrs = (text, cb) => {
  const trs = cy.get('.el-table__body')
    .last()
    .find('tr')
  trs.each(e => {
    const cell = e.find('td .cell')
    if (cell.first().text() === text) {
      cell
        .last()
        .find('button')
        .click()
    }
  }).then(() => {
    cb && cb()
  })
}

export const setLessonDict = (text) => {
  cy.get('[aria-label="添加课程"] input')
    .eq(0)
    .should('exist')
    .clear({
      force: true
    })
    .type(text, {
      force: true
    })
}

export const setTeacher = (name) => {
  cy.get('[aria-label="添加课程"] input')
    .eq(2)
    .should('exist')
    .clear({
      force: true
    })
    .type(name, {
      force: true
    })
}

export const setLessonType = (type) => {
  cy.get('[aria-label="添加课程"] input')
    .eq(3)
    .should('exist')
    .click({
      force: true
    })
  cy.get('body>.el-select-dropdown .el-select-dropdown__item')
    .contains(type)
    .should('exist')
    .click({
      force: true
    })
}

export const setScore = (score) => {
  cy.get('[aria-label="添加课程"] input')
    .eq(4)
    .should('exist')
    .clear({
      force: true
    })
    .type(score)
}
export const setIntro = (intro) => {
  cy.get('[aria-label="添加课程"] textarea')
    .eq(0)
    .should('exist')
    .clear({
      force: true
    })
    .type(intro, {
      force: true
    })
}

export const openEditDialog = () => {
  cy.get('.el-table .el-table__fixed-right .el-table__fixed-body-wrapper tbody tr button')
    .contains('编辑')
    .should('exist')
    .click({
      force: true
    })
}

export const selectLessonType = (text) => {
  cy.get('[aria-label="编辑课程"] input').eq(3).clear({
    force: true
  }).click({
    force: true
  })
  cy.get('body>.el-select-dropdown.el-popper .el-select-dropdown__list .el-select-dropdown__item')
    .each(element => {
      const type = element.find('span')
      if (type.text() === text) {
        type.click({
          force: true
        })
      }
    })
}
export const changeDictState = (text) => {
  cy.get('.el-table__body')
    .last()
    .find('tbody .el-table__row')
    .should('exist')
    .each(tr => {
      const firstCell = tr
        .find('td')
        .first()
        .find('.cell')
      if (firstCell.text() === text) {
        const span = tr
          .find('td')
          .eq(1)
          .find('span')
          .eq(1)
        span.click({
          force: true
        })
      }
    })
}