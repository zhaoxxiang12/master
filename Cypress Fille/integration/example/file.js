import 'cypress-file-upload'

// 文件操作示例
context('文件操作', () => {
  it('读取本地文件', () => {
    // https://on.cypress.io/readfile
    // 文件读写操作路径是相对项目根目录的
    cy.readFile('cypress.json').then((json) => {
      expect(json).to.be.an('object')
    })
  })

  it('写入本地文件', () => {
    // https://on.cypress.io/writefile
    // 从服务器端读取内容写到本地目录
    cy.request('https://jsonplaceholder.cypress.io/users')
      .then((response) => {
        cy.writeFile('cypress/fixtures/users.json', response.body)
      })

    cy.fixture('users').should((users) => {
      expect(users[0].name).to.exist
    })

    // JS对象会转成字符串格式化后写入文件
    cy.writeFile('cypress/fixtures/profile.json', {
      id: 8739,
      name: 'Jane',
      email: 'jane@example.com',
    })

    cy.fixture('profile').should((profile) => {
      expect(profile.name).to.eq('Jane')
    })
  })

  it('文件上传', () => {
    cy.task("clearTmp")
    cy.loginCQB()
    cy.visit('http://cqb-mgr.test.sh-weiyi.com/cqb-base-mgr-fe/app.html#/manage/account/lab-manage')
    // 上传文件
    cy.get('.el-upload__input').attachFile('实验室信息导入模板.xlsx')
    cy.get('[aria-label="导入成功"]').find('button').click()
    // cypress未支持下载文件相关的断言，文件下载是通过新窗口打开导致页面事件无法识别会报错
    // cy.get('.ql-search__tools-top button').contains('更多操作').click()
    // cy.get('.el-dropdown-menu li').contains('导出实验室模板').click()
  })
})
