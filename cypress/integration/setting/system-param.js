context('系统参数', () => {
  before(() => {
    cy.loginCQB()
    cy.visit('/cqb-base-mgr-fe/app.html#/setting/system/system-param')
    cy.wait(500)
  })
  it('001-系统参数-使用关键字进行搜索', () => {
    let keyWord1 = '用户最大允许在线数'
    let keyWord2 = 'IQC快照索引名'
    let keyWord3 = 'IQC快照索引名3'
    cy.get('[placeholder="参数关键字"]').type(keyWord3)
    cy.intercept('**/cqb-base-mgr/service/system/paraminfo/page?paramName*').as('getData')
    cy.get('button').contains('搜索').click()
    cy.wait('@getData').then((xhr) => {
      let responseStatus = xhr.response.statusCode
      let expectStatus = 200
      let total = xhr.response.body.data.total
      expect(responseStatus).to.eq(expectStatus)
      if (total == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (total <= 20) {
        cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
      }
    })
    cy.get('[placeholder="参数关键字"]').clear().type(keyWord2)
    cy.intercept('**/cqb-base-mgr/service/system/paraminfo/page?paramName*').as('getData')
    cy.get('button').contains('搜索').click()
    cy.wait('@getData').then((xhr) => {
      let responseStatus = xhr.response.statusCode
      let expectStatus = 200
      let total = xhr.response.body.data.total
      expect(responseStatus).to.eq(expectStatus)
      if (total == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (total <= 20) {
        cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
      }
    })
    cy.get('[placeholder="参数关键字"]').clear().type(keyWord1)
    cy.intercept('**/cqb-base-mgr/service/system/paraminfo/page?paramName*').as('getData')
    cy.get('button').contains('搜索').click()
    cy.wait('@getData').then((xhr) => {
      let responseStatus = xhr.response.statusCode
      let expectStatus = 200
      let total = xhr.response.body.data.total
      expect(responseStatus).to.eq(expectStatus)
      if (total == 0) {
        cy.get('body').should('contain', '暂无数据')
      } else if (total <= 20) {
        cy.get('.el-table__body').find('.el-table__row').should('have.length', total)
      } else {
        cy.get('.el-pagination__total').should('have.text', '共 ' + total + ' 条')
      }
    })
  })
  it('002-系统参数-编辑系统参数', () => {
    let type = 3
    cy.get('button').contains('编辑').click()
    cy.get('.el-input__inner').eq(type).clear().type(100)
    cy.intercept('**/cqb-base-mgr/service/system/paraminfo/update*').as('getData')
    cy.get('button').contains('保存').click()
    cy.wait('@getData').then((xhr) => {
      let responseStatus = xhr.response.statusCode
      let expectStatus = 200
      expect(responseStatus).to.eq(expectStatus)
      cy.get('body').should('contain', '系统参数已更新')
    })
    cy.get('button').contains('编辑').click()
    cy.get('.el-input__inner').eq(type).clear().type(50)
    cy.get('button').contains('保存').click()
  })
})