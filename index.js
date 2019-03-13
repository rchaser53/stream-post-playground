const glob = require("glob")

const pattern = "./*"

glob(pattern, {
  ignore: './node_modules'
}, (er, files) => {
  console.log(files)
})