const fse = require('fs-extra')
const { readPdf, getPdfContent } = require('./read-pdf')
const { readExcel } = require('./read-excel')
const { compressDir, uncompress } = require('./compress')
const { executeCqbSql, executeEqaSql,executeDictSql } = require('./mysql')
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');  

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('before:run', async (details) => {  
    console.log('override before:run');  
    await beforeRunHook(details);  
    // await clear();
  });

  on('after:run', async () => {  
    console.log('override after:run');  
    //if you are using other than Windows remove below line starts with await exec  
    // await exec("npx jrm ./cypress/results/junitreport.xml ./cypress/results/junit/*.xml");
    await afterRunHook();  
  });  
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
    readPdf,

    readExcel,

    getPdfContent,

    compressDir,

    uncompress,

    executeCqbSql,

    executeEqaSql,

    executeDictSql,

    async deleteFolder (folderName) {
      console.log('deleting folder %s', folderName)
      await fse.remove(folderName)
      return null
    }
  })
}
