const mysql = require('mysql2')
const HOST = '120.76.137.188'
const PORT = 23306
const cqbPool = mysql.createPool({
  host: HOST,
  port: PORT,
  user: 'cqb_test',
  password : 'test_vS1oHpYKIC',
  database : 'cqb_base_sh_test'
})

const eqaPool = mysql.createPool({
  host: HOST,
  port: PORT,
  user: 'eqa_test',
  password: 'test_nb6VBThPXs',
  database: 'eqa_test'
})

const dictPool = mysql.createPool({
  host: HOST,
  port: PORT,
  user: 'cqb_test',
  password : 'test_vS1oHpYKIC',
  database : 'cqb_dict_test'
})

function executeSql (pool, sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, function (error, results, fields) {
      if (error) {
        console.log('mysql error:', error)
        reject(error)
        return false
      }
      resolve(results)
    })
  })
}

function executeCqbSql (sql) {
  return executeSql(cqbPool, sql)
}

function executeEqaSql (sql) {
  return executeSql(eqaPool, sql)
}

function executeDictSql (sql) {
  return executeSql(dictPool, sql)
}

module.exports = {
  executeCqbSql,
  executeEqaSql,
  executeDictSql
}
