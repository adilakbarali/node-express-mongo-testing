const express = require('express')
const app = express()
const parser = require('body-parser')
app.use(parser.json())
const routes = require('./routes')
app.use('/movie', routes)
const port = 4494

const server = app.listen(port, () => {
  console.log('Server started successfully on port', server.address().port)
})

app.use('*', (req, res, next) => {
  return next({ status: 404, message: 'Invalid URL' })
})

app.use((err, req, res, next) => {
  res.status(err.status).send(err.message)
})

module.exports = server
