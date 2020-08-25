const supertest = require('supertest')
const app = require('../index')
const axios = require('axios')
const AdmZip = require('adm-zip')
const { expect } = require('chai')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')

let { list: plugins } = require('../dist/data.json')

describe('Routes', () => {
  it('/plugins', async () => {
    const response = await supertest(app).get('/plugins')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('plugins')
  })
  it('/plugins/[plugin_name]', async () => {
    const response = await supertest(app).get('/plugins/flutter-plugin')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('plugin')
  })

  it('/plugins/doesnt_exist', async () => {
    const response = await supertest(app).get('/plugins/doesnt_exist')

    expect(response.status).to.equal(404)
    expect(response.text).to.be.equal('Not Found')
  })
})

describe(`Plugin's releases`, () => {
  rimraf.sync(path.join(__dirname, 'temp'))
  Object.keys(plugins).map((n) => {
    const { releases, id, name } = plugins[n]
    releases.map(({ url, version }) => {
      it(`Downloading -> ${name} [v${version}] from ${url}`, async () => {
        await downloadZip(url, `${id}_${version}`)
        const pluginPackage = getPackage(`${id}_${version}`)

        expect(version).to.be.equal(pluginPackage.version)
        expect(id).to.be.equal(pluginPackage.id)
        expect(name).to.be.equal(pluginPackage.name)
      })
    })
  })
})

function downloadZip(url, name) {
  return new Promise((resolve) => {
    axios({
      method: 'get',
      url,
      responseType: 'stream',
    }).then(async (response) => {
      const dist = path.join(__dirname, 'temp')
      const zipPath = path.join(dist, `${name}.zip`)
      const distPath = path.join(dist, name)
      createFolder(dist)
      response.data.pipe(fs.createWriteStream(zipPath)).on('close', () => {
        createFolder(distPath)
        extractZip(zipPath, distPath)
          .then(() => {
            resolve()
          })
          .catch((err) => console.log(err))
      })
    })
  })
}

function getPackage(folderName) {
  const packagePath = path.join(__dirname, 'temp', folderName)
  const pluginPackage = require(path.join(packagePath, 'package.json'))
  return pluginPackage
}

function createFolder(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

function extractZip(zipPath, dist) {
  return new Promise((resolve) => {
    const zip = new AdmZip(zipPath)
    zip.extractAllTo(dist, true)
    resolve()
  })
}
