const express = require('express')
const createRateLimit = require("express-rate-limit")
const app = express()
const pluginsList = require("./store.json")
const packageJSON = require("./package.json")

const appLimit = createRateLimit({
	windowMs: 15 * 60 * 100, // 3 requests / 25 seconds / IP
	max: 3,
	message:{
		message:'Too many requests.'
	}
})

app.listen(process.env.PORT  || 3000)
app.use(appLimit)

app.get('/', function (req, res) {
	res.send({
		"v":packageJSON.version
	})
})

app.get('/search/:pluginName', function (req, res) {
	res.send(
		getPluginByName(req.params.pluginName)
	)
})

function getPluginByName(pluginName){
	//Default values in case there is no plugin found.
	let result = {
		status:404,
		plugin:null
	}
	Object.keys(pluginsList.list).filter(pg=>{
		if( pg === pluginName ){
			return result = {
				status:200,
				plugin:pluginsList.list[pg]
			}
		}
	})
	return result
}
