const fs = require('fs')

const express =  require('express')
const formidableMiddleware =  require('express-formidable')
const unzip = require('unzip-stream')

const app = express()
app.use(formidableMiddleware())

app.post('/', async (req, res) => {
  try {
    fs.createReadStream(req.files.file.path)
      .pipe(unzip.Extract({ path: 'hongyaDir' }))
  } catch (err) {
    console.error(err)
  }
  
  res.send('')
})

const server = app.listen(3000, () => {
  console.log('run server')
})
