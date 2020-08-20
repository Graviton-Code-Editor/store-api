const storeData = require('../dist/data.json')
const packageJSON = require('../package.json')

exports.apiVersion = () => {
  return {
    apiVersion: packageJSON.version,
    graviton: storeData.graviton,
  }
}
