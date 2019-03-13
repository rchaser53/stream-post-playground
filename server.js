const path = require('path')
const express =  require('express')
const formidableMiddleware =  require('express-formidable')

const fs = require('fs')

const app = express()
app.use(formidableMiddleware())

// const unzip = require('unzip')
const unzip = require('unzip-stream')
const fstream = require('fstream')

app.post('/', async (req, res) => {
  try {
    console.log(req.files.file)
    const readStream = fs.createReadStream(req.files.file.path);
    const writeStream = fs.createWriteStream('testste.zip')

    readStream
      .pipe(writeStream)
    // const writeStream = fstream.Writer({
    //   path: 'hogeDir',
    //   type: 'Directory'
    // });
     
    // readStream
    //   .pipe(unzip.Parse())
    //   .pipe(writeStream)
    //   .on('close', (err) => {
    //     if (err) {
    //       console.error(err)
    //       return
    //     } else {
          
    //       console.log('safdsa')
    //     }
    //   })
    //   .pipe(unzip.Parse())
    //   .on('entry', (entry) => {
    //     var fileName = entry.path;
    //     var type = entry.type; // 'Directory' or 'File'
    //     var size = entry.size;
    //     if (fileName === "this IS the file I'm looking for") {
    //       entry.pipe(fs.createWriteStream('output/path'));
    //     } else {
    //       entry.autodrain();
    //     }
    //   });

  } catch (err) {
    console.error(err)
  }
  
  res.send('nya-n')
})

const server = app.listen(3000, () => {
  console.log('nay-n')
})
