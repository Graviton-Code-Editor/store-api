const express = require('express')
const createRateLimit = require('express-rate-limit')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const enableWs = require('express-ws')
const app = express()

const appLimit = createRateLimit({
  windowMs: 50000,
  max: 7,
  message: {
    message: 'Too many requests.',
  },
})


enableWs(app)
app.use(cors())
app.use(appLimit)
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('./routes'))

app.listen(process.env.PORT || 2035, () => console.log(`App listening on port ${process.env.PORT || 2035}`))

module.exports = app
