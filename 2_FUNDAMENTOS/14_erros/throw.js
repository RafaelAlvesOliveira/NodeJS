// const x = '10'
// Se for string ele apresenta erro ao executar e mostra a mensagem abaixo.
const num = 10

//Checar ser x é um número
if(!Number.isInteger(num)) {
  throw new Error('O valor de x não é um número inteiro!')
}

console.log('Continuando o código...')