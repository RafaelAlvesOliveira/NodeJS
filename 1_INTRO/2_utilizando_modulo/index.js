const fs = require('fs') // file system

fs.readFile('arquivo.txt','utf8', (err, data) => {
// fs.readFile é usado para ler o conteúdo de um arquivo.
  if(err) {
    console.log(err)
    return
  }

  console.log(data)
})