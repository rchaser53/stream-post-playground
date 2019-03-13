const path = require('path')
const express =  require('express')
const formidableMiddleware =  require('express-formidable')

const app = express()
app.use(formidableMiddleware())