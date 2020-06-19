// 时间监听示例
context('事件处理', () => {
  // https://docs.cypress.io/api/events/catalog-of-events.html
  it('监听页面加载完成', () => {
    cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html')
    
    cy.on('window:load', (e) => {
      assert.equal(e.toString(), '[object Window]', 'Window对象')
    })

  })

})
