const path = require('path')
const fs = require('fs')

const glob = require("glob")
const archiver = require("archiver");
// const axios = require('axios')
const request = require('request')
const FormData = require('form-data')

const DefaultMaxContentLength = 10000000000
const pattern = "./*"

const archive = archiver('zip', {
  zlib: { level: 9 }
});
const result = glob.sync(pattern, {
  dot: true,
  ignore: './node_modules'
})

result.forEach((targetPath) => {
  const actualPath = path.resolve(targetPath)
  if (fs.statSync(targetPath).isDirectory()) {
    archive.directory(targetPath)
  } else {
    archive.file(actualPath, {
      name: path.basename(targetPath)
    })
  }
})

archive.on('finish', () => { // request is made on 'finish'
  const formData = {
    file: {
      value: archive,
      options: {
        filename: 'test.zip',
        contentType: 'application/zip',
        knownLength: archive.pointer(), // pass the pointer at the end to form-data
      },
    },
  };

  request.post({
    url: 'http://localhost:3000',
    formData,
    headers: {
      'content-type': 'multipart/form-data',
    },
  }, (err, resp) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(resp.body)
  });
})

archive.finalize();