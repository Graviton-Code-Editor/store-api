const axios = require("axios");
const fs = require("fs")
const zip = require("extract-zip")
const path = require("path")

const releaseUrl = 'https://github.com/Graviton-Code-Editor/flutter-plugin/releases/download/v0.1.01/v0.1.01.zip'

axios({
	method: 'get',
	url: releaseUrl,
	responseType: 'stream'
}).then(async function (response) {
	response.data.pipe(fs.createWriteStream('sc.zip'))
	await zip(path.join(__dirname,"sc.zip"), { dir: path.join(__dirname,"a") })
    console.log('Downloaded and extracted the plugin')
});