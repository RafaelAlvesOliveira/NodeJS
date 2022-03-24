import chalk from 'chalk';
import inquirer from 'inquirer';

inquirer.prompt([
  {name:'nome', message: 'Qual é o seu nome?'},
  {name: 'sobrenome', message: 'Qual é a sua sobrenome?'},
  {name: 'idade', message: 'Qual é a sua idade?'},
  {name: 'cidade', message: 'Qual é a sua cidade?'}
])
.then((answers) => {
  if (!answers.nome || !answers.sobrenome || !answers.cidade || !answers.idade) {
    throw new Error('O nome, sobrenome, idade e a cidade são obrigatórios!')
  }
  const response = `O nome do usuário é ${answers.nome}, o sobrenome dele é ${answers.sobrenome} 
  a idade dele é ${answers.idade} anos, e mora na cidade ${answers.cidade}!`
  console.log(chalk.bgYellow.black(response))
})
.catch(err => console.log(err))