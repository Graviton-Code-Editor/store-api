const db = require('../dist/data.json')

// Get all plugins
exports.getAll = () => {
  return db.list.map(({ name, id, version, description }) => {
    return {
      name,
      id,
      version,
      description,
    }
  })
}

// Get a plugin by it's ID
exports.get = (pluginID) => {
  return db.list.find((plugin) => pluginID === plugin.id)
}
