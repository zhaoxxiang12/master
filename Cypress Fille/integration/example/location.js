// URL相关操作示例
context('URL地址信息获取', () => {
  before(() => {
    cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/login')
  })

  it('获取URL的Hash', () => {
    // https://on.cypress.io/hash
    cy.hash().should('not.be.empty')
      .should('eq', '#/login')
  })

  it('获取URL的location信息', () => {
    // https://on.cypress.io/location
    cy.location().should((location) => {
      expect(location.hash).not.to.be.empty
      expect(location.href).to.eq('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/login')
      expect(location.host).to.eq('cqb-mgr.test.sh-weiyi.com')
      expect(location.hostname).to.eq('cqb-mgr.test.sh-weiyi.com')
      expect(location.origin).to.eq('http://cqb-mgr.test.sh-weiyi.com')
      expect(location.pathname).to.eq('/cqb-base-mgr-fe/app.html')
      expect(location.port).to.eq('')
      expect(location.protocol).to.eq('http:')
      expect(location.search).to.be.empty
    })
  })

  it('获取当前URL地址', () => {
    // https://on.cypress.io/url
    cy.url().should('eq', 'http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/login')
  })
})
