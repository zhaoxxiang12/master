export const selectArea = (cls, text) => {
  cy.get(cls)
    .should('exist')
    .click({
      force: true
    })
  cy.get('body>.el-select-dropdown .el-select-dropdown__item')
    .contains(text)
    .should('exist')
    .click({
      force: true
    })
}

export const activeArea = () => {
  selectArea('[placeholder="请选择省"]', '上海市')
  selectArea('[placeholder="所有市"]', '市辖区')
  selectArea('[placeholder="所有区"]', '青浦区')
}

export const setLabNameOrCode = (code) => {
  cy.get('[placeholder="请输入实验室名称或编码"]')
    .should('exist')
    .clear({
      force: true
    })
    .type(code, {
      force: true
    })
}

export const setYear = (year) => {
  cy.get('[placeholder="起始年份"]')
    .should('exist')
    .click({
      force: true
    })
  cy.get('.el-picker-panel__content .el-year-table tbody tr')
    .first()
    .find('td')
    .contains(year)
    .should('exist')
    .click({
      force: true
    })
}

export const setPlanName = (planName) => {
  cy.get('.el-form-item__label')
    .contains('课程计划')
    .next()
    .find('.el-input__inner')
    .click({
      force: true
    })
  cy.get('body>.el-select-dropdown .el-select-dropdown__item')
    .should('exist')
    .contains(planName)
    .click({
      force: true
    })
}