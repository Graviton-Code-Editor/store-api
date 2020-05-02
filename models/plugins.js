const db = require('../data/store.json')

// Get all plugins
exports.getAll = () => {
  let result = []

  db.list.forEach((plugin) => result.push(plugin.id))

  return result
}

// Get a plugin by it's ID
exports.get = (pluginID) => {
  return db.list.find((plugin) => pluginID === plugin.id)
}
