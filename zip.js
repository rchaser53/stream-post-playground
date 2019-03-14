const AdmZip = require('adm-zip')



const hoge = new AdmZip()

const path = require('path')

// console.log(path.resolve(__dirname, 'package.json'))

// hoge.addLocalFile(path.resolve(__dirname, 'index.js'))
// hoge.addLocalFolder(path.resolve(__dirname, 'src'), 'src')
hoge.addLocalFile('./index.js')
hoge.addLocalFolder('./src', './src')

hoge.writeZip('./.belchero/test.zip')
