describe('执行python文件，连接数据库',function() {
    beforeEach(()=>{
        cy.exec('python E:\\Cypress\\cypress\\fixtures\\connect_database.py')
        .then(result=>{
            var a=result.stdout;
            //打印结果
            cy.log(a)

        })
    })
    it.only('1231',()=>{
        console.log()
    })
})