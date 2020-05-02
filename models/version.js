const pluginsList = require('../data/store.json')
const packageJSON = require('../package.json')

exports.apiVersion = () => {
  return {
    apiVersion: packageJSON.version,
    gravitonVersion: pluginsList.graviton.version,
  }
}
