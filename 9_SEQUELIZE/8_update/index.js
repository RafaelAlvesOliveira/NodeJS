const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.post('/users/delete/:id', async (req, res) => {
  const id = req.params.id

  await User.destroy({ where: { id: id }})

  res.redirect('/')
})

app.get('/users/edit/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findOne({ raw: true, where: { id: id } })
    
  res.render('useredit', { user })
    
})

app.post('/users/update', async (req, res) => {

  const id = req.body.id
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if(newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }

  const userData = {
    id,
    name,
    occupation,
    newsletter
  }

  await User.update(userData, { where: {id: id}})

  res.redirect('/')
})

app.get('/', async (req, res) => {

  const user = await User.findAll({raw: true})

  console.log(user)

  res.render('home', {users: user})
})

app.get('/users/create', function (req, res) {
  res.render('adduser')
})

app.post('/users/create', async function (req, res) {
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if (newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }

  console.log(req.body)

  await User.create({ name, occupation, newsletter })

  res.redirect('/')
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findOne({ raw: true, where: { id }})

  res.render('userview', { user })
})

conn
  .sync()
  // .sync({ force: true})
  .then(() => {
  app.listen(3000)
})
.catch((err) => console.log(err))