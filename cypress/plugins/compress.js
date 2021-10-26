const compressing = require('compressing')

function compressDir({folderName, zipName}) { // 压缩文件夹
  console.log('compressDir folder %s to %s', folderName, zipName)
  return compressing.zip.compressDir(folderName, zipName)
}

function uncompress({zipName, folderName}) { // 解压压缩包
  console.log('uncompress folder %s to %s', zipName, folderName)
  return compressing.zip.uncompress(zipName, folderName)
}

module.exports = {
  compressDir,
  uncompress
}