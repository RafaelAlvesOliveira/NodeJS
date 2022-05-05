const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})

try {

} catch (error) {
  console.log('Não foi possível conectar: ${error}')
}

exports.default = sequelize