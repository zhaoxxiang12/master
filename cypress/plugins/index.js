const fse = require('fs-extra')
const { readPdf, getPdfContent } = require('./read-pdf')
const { readExcel } = require('./read-excel')
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');  
const compressing = require('compressing')

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
    // async clearTmp () {
    //   await fse.remove(path.join(__dirname, '..', 'tmp'))
    //   return null
    // }
    readPdf,

    readExcel,

    getPdfContent,

    async compressDir({folderName, zipName}) { // 压缩文件夹
      console.log('compressDir folder %s to %s', folderName, zipName)
      return await compressing.zip.compressDir(folderName, zipName)
    },

    async uncompress({zipName, folderName}) { // 解压压缩包
      console.log('uncompress folder %s to %s', zipName, folderName)
      return await compressing.zip.uncompress(zipName, folderName)
    },


    async deleteFolder (folderName) {
      console.log('deleting folder %s', folderName)
      await fse.remove(folderName)
      return null
    }
  })
}
