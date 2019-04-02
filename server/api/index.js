const express = require('express')
const app = express()
const volleyball = require('volleyball')
const path = require('path')
const User = require('../DataAccess/models/index')

module.exports = app

app.use(volleyball)
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, '..', '..', 'public')))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'))
})

app.get('/api/users', (req, res, next) => {
  User.findAll({ order: ['id'] })
    .then(users => res.json(users))
    .catch(next)
})

app.post('/api/users', (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next)
})

app.delete('/api/users/:id', (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(204))
    .catch(next)
})

app.put('/api/users/:id', (req, res, next) => {
  const { name, bio, rank } = req.body
  User.findByPk(req.params.id)
    .then(user => user.update({ name, bio, rank }))
    .then(newUser => res.json(newUser))
    .catch(next)
})

app.use((req, res, next) => {
  const error = new Error('Resource Not Found')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  let errorToSend
  if (err.errors) {
    errorToSend = err.errors.map(error => error.message)
  } else {
    errorToSend = 'An internal server or network error has occured'
  }
  res.status(err.status || 500).send(errorToSend)
})
