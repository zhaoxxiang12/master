const mysql = require('mysql2')
const HOST = '120.76.137.188'
const PORT = 23306
const DEFAULT_CONFIG = {
  host: '120.76.137.188',
  user: 'cqb_test',
  port: 23306,
  password : 'test_vS1oHpYKIC',
  database : 'cqb_base_sh_test'
}

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

function executeCqbSql (sql) {
  return new Promise((resolve, reject) => {
    cqbPool.query(sql, function (error, results, fields) {
      if (error) {
        console.log('mysql error:', error)
        reject(error)
        return false
      }
      console.log('The solution is: ', results)
      resolve(results)
    })
  })
}

function executeEqaSql (sql) {
  return new Promise((resolve, reject) => {
    eqaPool.query(sql, function (error, results, fields) {
      if (error) {
        console.log('mysql error:', error)
        reject(error)
        return false
      }
      console.log('The solution is: ', results)
      resolve(results)
    })
  })
}

function executeDictSql (sql) {
  return new Promise((resolve, reject) => {
    dictPool.query(sql, function (error, results, fields) {
      if (error) {
        console.log("mysql error:", error);
        reject (error)
        return false
      }
      console.log("The solution is:",results);
      resolve (results)
    })
  })
}

module.exports = {
  executeCqbSql,
  executeEqaSql,
  executeDictSql
}
