const router = require('express').Router()
const plugins = require('../models/plugins')

router.get('/', function (req, res) {
  res.json(plugins.getAll())
})

router.get('/:pluginID', function (req, res) {
  const plugin = plugins.get(req.params.pluginID)

  if (plugin === undefined) {
    res.sendStatus(404)
  } else {
    res.json(plugin)
  }
})

module.exports = router
