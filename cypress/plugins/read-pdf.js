const fs = require('fs')
const pdf = require('pdf-parse')

const getPdfContent = (dataBuffer) => {
  return pdf(dataBuffer).then(function (data) {
    return {
      numpages: data.numpages,
      text: data.text,
    }
  })
}

const readPdf = (filename) => {
  console.log('reading PDF file %s', filename)

  const dataBuffer = fs.readFileSync(filename)

  return getPdfContent(dataBuffer)
}

module.exports = { readPdf, getPdfContent }
