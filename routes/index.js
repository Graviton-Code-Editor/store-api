const router = require('express').Router()
const version = require('../models/version')

router.use('/plugins', require('./plugins'))

router.get('/', function (req, res) {
  res.status(200).json(version.apiVersion())
})

module.exports = router
