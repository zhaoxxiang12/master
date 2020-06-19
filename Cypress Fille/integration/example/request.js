// 接口测试示例
context('接口测试', () => {
  it('登录接口测试', ()=> {
    cy.fixture('admin').then((adminJSON) => {
      cy.request({
        method: 'POST',
        url: 'http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr/service/system/mgr/login',
        body: {
          userName: adminJSON.username,
          password: adminJSON.password_md5,
          kaptcha: adminJSON.captcha,
        }
      }).then((response) => {
        // 正常返回登录信息可以解析到用户信息
        expect(response.body.data).to.have.property('userName', '管理员')
      })
    })
  })
})