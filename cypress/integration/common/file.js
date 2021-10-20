const path = require('path')

function getDownloadFolder () {
  return Cypress.config('downloadsFolder')
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
 * @param {function(any[])} cb
 */
export const validExcelFile = (filename, cb) => {
  cy.readExcel(getDownloadFile(filename)).then(data => {
    expect(data).to.be.an('array')
    cb(data)
    cy.deleteFolder(getDownloadFolder())
  })
}