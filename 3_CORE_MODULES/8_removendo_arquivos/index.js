const fs = require('fs')

fs.unlink('arquivo.txt', function(err) {
  if (err) {
    console.log(err);
    return
  }

  console.log('Arquivo removido com sucesso!');

  });

  // Nesse caso é necessário incluir o arquivo.txt, para que não ocorra um erro
  // no momento da execução do programa.