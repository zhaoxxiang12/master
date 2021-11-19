const path = require('path')

function getDownloadFolder () {
  return Cypress.config('downloadsFolder')
}

function getFixtureFile (name) {
  return path.join('cypress/fixtures', name)
}

/**
 * 获取下载的文件路径
 * @param {string} filename
 * @returns
 */
export const getDownloadFile = (filename) => {
  const downloadsFolder = getDownloadFolder()
  const downloadedFilename = path.join(downloadsFolder, filename)
  console.log('reading file %s', downloadedFilename)
  return downloadedFilename
}

/**
 * 验证下载的 pdf 文件
 * @param {string} filename 文件名
 * @param {function({numpages:number, text: string})} cb
 * @param {number} timeout
 */
export const validatePdfFile = (filename, cb, timeout = 6000) => {
  const downloadedFilename = getDownloadFile(filename)

  cy.readFile(downloadedFilename, { timeout }).then(() => {
    cy.readPdf(downloadedFilename).then(data => {
      cb(data)
      cy.deleteFolder(getDownloadFolder())
    })
  })
}

/**
 * 验证下载的 excel 文件
 * @param {string} filename 文件名
 * @param {number} timeout 超时时间
 * @param {function(any[])} cb
 */
export const validExcelFile = (filename, cb, timeout = 6000) => {
  const downloadedFilename = getDownloadFile(filename)

  cy.readFile(downloadedFilename, { timeout }).then(() => {
    cy.readExcel(getDownloadFile(filename)).then(data => {
      expect(data).to.be.an('array')
      cb(data)
      cy.deleteFolder(getDownloadFolder())
    })
  })
}
/**
 * 复制 fixture 文件
 * @param {string} srcFile 
 * @param {string} destFile 
 * @returns void
 */
export const copyFixtureFile = (srcFile, destFile) => {
  const src = getFixtureFile(srcFile)
  const dest = getFixtureFile(destFile)
  cy.readFile(src, null).then(obj => {
    cy.writeFile(dest, obj, null)
  })
}