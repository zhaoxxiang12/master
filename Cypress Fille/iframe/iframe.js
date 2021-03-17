describe('iframe login',function(){

    // 定义getIframeBody方法
    const getIframeBody = () => {
              // 尝试获取 iframe > document > body 
              // 直到 body element 不为空
              return cy
                  .get('iframe')
                  .its('0.contentDocument.body').should('not.be.empty')
                  // 包装body DOM元素以允许链接更多Cypress 命令, 如 ".find(...)"
                  // warp命令使用文档地址 https://on.cypress.io/wrap
                  .then(cy.wrap)
             }

    before( function() {
        cy.visit("https://www.126.com/")
    })

    it("iframe type", function() {
        // 定位输入框，输入账号
        getIframeBody().find('[name="email"]').type("123@qq.com")
        // 输入密码
        getIframeBody().find('[name="password"]').type("123456")
        // 点登陆按钮
        getIframeBody().find('#dologin').click()

   })
})