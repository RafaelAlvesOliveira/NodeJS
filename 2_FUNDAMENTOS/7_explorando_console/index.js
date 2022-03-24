//mais de um valor
const w = 'Rafael'
const x = 10
const y = 'Algum texto'
const z = [1,2]

console.log(x, y, z)

//contagem e impressões
console.count(`O valor de x é: ${x}, contagem:`)
console.count(`O valor de x é: ${x}, contagem:`)
console.count(`O valor de x é: ${x}, contagem:`)
console.count(`O valor de x é: ${x}, contagem:`)

// variável entre string
console.log(`O nome é  %s, ele é programador`, w)

// limpar o console para
setTimeout(() => {
  console.clear()
}, 2000)