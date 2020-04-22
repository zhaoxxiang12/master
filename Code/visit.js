describe('访问百度',()=>{
    beforeEach(()=>{
        cy.visit('http://www.baidu.com')
    })
    it('请输入查询cypress',()=>{
        cy.get('#kw').type('cypress')
        cy.get('#su').click()
        cy.get('body').should('contain','cypress')

    })
})