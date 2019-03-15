const fs = require('fs')

const express =  require('express')
const formidableMiddleware =  require('express-formidable')
const unzip = require('unzip-stream')

const app = express()
app.use(formidableMiddleware())

app.post('/', async (req, res) => {
  try {
    console.log(1)
    await (() => {
      return new Promise((resolve, reject) => {
        let extract = unzip.createExtract(resolve, reject)
        fs.createReadStream(req.files.file.path)
          .pipe(extract({ path: 'mesopotamiaDir' }))
      })
    })();
    console.log(333)

  } catch (err) {
    console.error(err)
  }
  
  res.send('')
})

const server = app.listen(3000, () => {
  console.log('run server')
})
