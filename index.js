const path = require('path')
const fs = require('fs')

const glob = require("glob")
const archiver = require("archiver");
const axios = require('axios')
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

archive.on('finish', async () => {
  const form = new FormData()
  form.append('file', archive, {
    filename: 'test.zip',
    contentType: 'application/zip',
    knownLength: archive.pointer(), // pass the pointer at the end to form-data
  })

  try {
    await axios.post(
      'http://localhost:3000',
      form,
      {
        headers: form.getHeaders(),
        maxContentLength: DefaultMaxContentLength
      }
    )
  } catch (err) {
    console.error(err)
  }
})

archive.finalize();