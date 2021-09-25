const fse = require('fs-extra')
const { readPdf, getPdfContent } = require('./read-pdf')
const { readExcel } = require('./read-excel')
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('before:browser:launch', (browser = {}, launchOptions) => {
    // const downloadDirectory = path.join(__dirname, '..', 'tmp')
    if (browser.family === 'chromium') {
      // launchOptions.preferences.default['download'] = { default_directory: downloadDirectory }
    }
    return launchOptions;
  })

  on('task', {
    // async clearTmp () {
    //   await fse.remove(path.join(__dirname, '..', 'tmp'))
    //   return null
    // }
    readPdf,

    readExcel,

    getPdfContent,

    async deleteFolder (folderName) {
      console.log('deleting folder %s', folderName)
      await fse.remove(folderName)
      return null
    }
  })
}
