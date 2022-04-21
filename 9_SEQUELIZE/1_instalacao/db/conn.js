const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

try {

  sequelize.authenticate()
  console.log('Conectamos o Sequelize com sucesso!')

} catch {
  console.log('Não foi possível conectar: ', Error)
}

module.exports = sequelize