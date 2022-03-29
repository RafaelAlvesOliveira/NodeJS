const path = require('path')

const customPath = "/relatorios/rafael/relatorio1.pdf"

console.log(path.dirname(customPath)) // /relatorios/rafael
console.log(path.basename(customPath)) // relatorio1.pdf
console.log(path.extname(customPath)) // .pdf