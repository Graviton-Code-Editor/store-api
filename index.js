const express = require('express')
const createRateLimit = require("express-rate-limit")
const app = express()
const pluginsList = require("./build/list.json")

const appLimit = createRateLimit({
	windowMs: 15 * 60 * 100, // 3 requests / 25 seconds / IP
	max: 3,
	message:"too many requests"
})

//app.listen(3000)
app.use(appLimit)

app.get('/', function (req, res) {
	res.send("graviton api test")
})

app.get('/api/search/:pluginName', function (req, res) {
	res.send({
		plugin:getPluginByName(req.params.pluginName)
	})
})

function getPluginByName(pluginName){
	let result = {}
	Object.keys(pluginsList.list).filter(pg=>{
		if( pg === pluginName ){
			return result = pluginsList.list[pg]
		}
	})
	return result
}
