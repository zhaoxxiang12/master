
export function logout() {
  cy.wait(1000)
  cy.get('.top-tools-name.el-dropdown-selfdefine').trigger('mouseover')
  cy.get('.el-dropdown-menu__item').contains(' 退 出').click({
    force: true
  })
}