const router = require('express').Router()
const version = require('../models/version')

router.use('/plugins', require('./plugins'))

router.get('/', function (req, res) {
  res.json(version.apiVersion())
})

module.exports = router
