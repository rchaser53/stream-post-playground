const path = require('path')
const fs = require('fs')
const glob = require("glob")
const archiver = require("archiver");

const pattern = "./*"
const output = fs.createWriteStream(path.join(__dirname, '../example.zip'))

const archive = archiver('zip', {
  zlib: { level: 9 }
});
const result = glob.sync(pattern, {
  dot: true,
  ignore: './node_modules'
})

output.on('close', () => {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

output.on('end', () => {
  console.log('Data has been drained');
});
archive.pipe(output);

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

archive.finalize();


glob.sync(pattern, {
  ignore: './node_modules'
})