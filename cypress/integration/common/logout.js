
export function logout() {
  cy.wait(1000)
  cy.get('.ql-layout__header-right .el-dropdown:eq(1) .dropdown-link').click({
    force: true
  })
  cy.get('.cqbicon.icon-logout').click({
    force: true
  })
}