const express = require('express')
const createRateLimit = require('express-rate-limit')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

const appLimit = createRateLimit({
  windowMs: 50000,
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

app.listen(process.env.PORT || 2035, () => console.log(`App listening on port 3000`))

module.exports = app
