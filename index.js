const express = require('express')
const createRateLimit = require('express-rate-limit')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const config = require('./config.json')

const app = express()

const appLimit = createRateLimit({
  windowMs: 50000, // 3 requests / 25 seconds / IP
  max: 7,
  message: {
    message: 'Too many requests.',
  },
})

app.use(appLimit)

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('./routes'))

app.listen(config.port, () => console.log(`App listening on port ${config.port}!`))

module.exports = app
