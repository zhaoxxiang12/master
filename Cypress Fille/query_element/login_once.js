context('质控品管理', () => {
    before(() => {
      cy.loginCQB()
      cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/qc-mgr')
      cy.wait(1000)
    })
    it('实验室账户',()=>{
        // cy.loginCQB()
        cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/account/lab-manage')
        cy.get('input[placeholder="实验室名称或编码"').type('test123')
        cy.get('i[class="el-icon-search"]').click()
        cy.wait(10000)
        console.log(2)
    })
    it('77',()=>{
        cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/account/manage-dept')
        console.log(3)
    })
})
