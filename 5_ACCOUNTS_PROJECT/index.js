// Módulo externo
const inquirer = require('inquirer')
const chalk = require('chalk')

// Módulo interno
const fs = require('fs')

operation()

function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'Criar conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Sair',
        ],
      },
    ])
    .then((answer) => {
      const action = answer['action']

      if (action === 'Criar conta') {
        createAccount()
      }

    })
    .catch((err) => console.log(err))
}

// create an account

function createAccount() {
  console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
  console.log(chalk.green('Defina as opções da sua conta a seguir'))

  buildAccount()
}

function buildAccount() {
    inquirer.prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para sua conta'
      }
    ]).then(answer => {
      const accountName = answer['accountName']
      console.info(accountName)

      if(!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts')
      }

      if(fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed('Esta conta já existe, escolha outro nome!'),
        )
        buildAccount()
        return
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance":0}',
        function (err) {
          console.log(err)
        },
      )

      console.log(chalk.green('Parabéns, sua conta foi criada!'))
      operation()
    
  }).catch(err => console.log(err)) 
}