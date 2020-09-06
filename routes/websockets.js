const router = require('express').Router()

const activeRooms = {}

router.ws('/', ws => {
	ws.on('message', msg => {
		const { room, data, type, username: authorName } = JSON.parse(msg)
		
		switch(type){
			case 'userJoin':
				if(!activeRooms[room]) activeRooms[room] = {
					users: []
				}
				activeRooms[room].users.push({
					username: authorName,
					socket: ws
				})
				break;
		}
		activeRooms[room].users.map(({ socket }) => {
			if(socket !== ws){
				socket.send(msg)
			}
		})
	})
	ws.on('close', () => {
		console.log('WebSocket was closed')
	})
})

module.exports = router

