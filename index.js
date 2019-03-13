const fs = require('fs')
const glob = require("glob")

const pattern = "./*"

const result = glob.sync(pattern, {
  ignore: './node_modules'
})

console.log(result)

result.forEach((target) => {
  const hoge = fs.statSync(target)
  console.log(hoge.isDirectory())
})