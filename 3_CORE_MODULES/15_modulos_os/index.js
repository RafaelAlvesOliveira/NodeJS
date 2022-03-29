const os = require('os')

console.log(os.cpus())  // retorna a quantidade de CPUs do sistema

console.log(os.freemem()) // retorna quanto tem de memória livre na máquina

console.log(os.homedir()) // retorna o diretorio home do usuario

console.log(os.type()) // retorna o tipo do sistema operacional