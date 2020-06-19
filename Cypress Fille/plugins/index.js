const path = require('path')
const fse = require('fs-extra')
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('before:browser:launch', (browser = {}, launchOptions) => {
    const downloadDirectory = path.join(__dirname, '..', 'tmp')
    if (browser.family === 'chromium') {
      launchOptions.preferences.default['download'] = { default_directory: downloadDirectory }
    }
    return launchOptions;
  })

  on('task', {
    async clearTmp () {
      await fse.remove(path.join(__dirname, '..', 'tmp'))
      return null
    }
  })
}
