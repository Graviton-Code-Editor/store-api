const router = require('express').Router()
const plugins = require('../models/plugins')

router.get('/', function (req, res) {
  res.status(200).json({ plugins: plugins.getAll() })
})

router.get('/:pluginID', function (req, res) {
  const plugin = plugins.get(req.params.pluginID)

  if (plugin === undefined) {
    res.sendStatus(404)
  } else {
    res.status(200).json({ plugin })
  }
})

module.exports = router
