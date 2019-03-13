const path = require('path')
const express =  require('express')
const formidableMiddleware =  require('express-formidable')

const app = express()
app.use(formidableMiddleware())

app.post('/', (req, res) => {
  console.log(req)
  res.send('nya-n')
})

const server = app.listen(3000, () => {
  console.log('nay-n')
})
