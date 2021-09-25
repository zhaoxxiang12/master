// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
// Cypress.Cookies.defaults({
//     whitelist:['cqbid','sessionid']
// })
// const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')
// module.exports = (on, config) => {
//   on('task', {downloadFile})
// }


Cypress.on('uncaught:exception', (err, runnable) => {
  //returning false here prevents Cypress from
  // failing the test
  return false
})

Cypress.Cookies.defaults({
  preserve: 'shiroCookie',
})

// 不清除 localStorage
Cypress.LocalStorage.clear = function (keys, ls, rs) {
  // do something with the keys here
  console.log('clear localStorage:', keys, ls, rs)
  if (keys) {
    // return clear.apply(this, arguments)
  }
}

// beforeEach(() => {
// 	cy.restoreLocalStorage()
// })

// afterEach(() => {
// 	cy.saveLocalStorage()
// })