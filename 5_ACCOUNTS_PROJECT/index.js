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
      } else if (action === 'Depositar') {
        deposit()
      } else if (action === 'Consultar Saldo') {
        getAccountBalance();
      } else if (action === 'Sacar') {
        withdraw();
      } else if (action === 'Sair'); {
        console.log(chalk.bgBlue.white('Obrigado por usar o Accounts!'))
        process.exit()
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

// depositar dinheiro na conta

function deposit() {
    inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?'
    }
  ])
  .then((answer) => {
    const accountName = answer['accountName']
    // Verificar se a conta existe
    if(!checkAccount(accountName)) 
    {
      return deposit()
    }
    inquirer.prompt([
      {
        name: 'amount',
        message:'Qual o valor que você deseja depositar?'
      }
    ])
    .then((answer) => {
      const amount = answer['amount']
      // Adicionar dinheiro na conta
      addAmount(accountName, amount)
      operation()

    })
  })
  .catch(err => console.log(err))
}

function checkAccount(accountName) {
  if(!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed('Esta conta não existe, escolha outro nome!'))
    return false
  }

  return true
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName)
  if(!amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'))
    return deposit()
  }
  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

  fs.writeFileSync(
    `accounts/${accountName}.json`, 
    JSON.stringify(accountData),
    function(err){
      console.log(err)
    },
  )
  console.log(
    chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`)
  )
    
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r'
  })
  return JSON.parse(accountJSON)
}

// Show account balance
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
      }
    ])
    .then((answer) => {
      const accountName = answer['accountName']

      // verificar se a conta existe
      if(!checkAccount(accountName)) {
        return getAccountBalance()
      }
      // mostrar saldo da conta
      const accountData = getAccount(accountName)
      console.log(
          chalk.bgBlue.black(
          `O saldo da sua conta é R$${accountData.balance}`
        ),
      )
      operation()
    })
    .catch(
      err => console.log(err)
    )
}

// Sacar o valor da conta do usuário
function withdraw() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?'
    }
  ]).then((answer) => {
    const accountName = answer['accountName']
    // verificar se a conta existe
    if(!checkAccount(accountName)) {
      return withdraw()
    }
    inquirer.prompt([
      {
        name: 'amount',
        message: 'Quanto você deseja sacar?'
      }
    ]).then((answer) => {
      const amount = answer['amount']
      removeAmount(accountName, amount)
    })
    .catch(err => console.log(err))  
  })
  .catch(err => console.log(err))
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName)

  if(!amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'),
    )
    return withdraw()
  }

  if(accountData.balance < amount) {
    console.log(chalk.bgRed.black('Saldo insuficiente!'))
    return withdraw()
  }
  
  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function(err) {
      console.log(err)
    },
  )

  console.log(
    chalk.green(`Foi realizado um saque de R$${amount} na sua conta!`),
  )
  operation()
}