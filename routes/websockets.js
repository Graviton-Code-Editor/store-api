const router = require('express').Router()

const activeRooms = {}

router.ws('/', ws => {
	ws.on('message', msg => {
		const { room, type, usercolor:authorColor, data, username: authorName, userid: authorId } = JSON.parse(msg)
		switch(type){
			case 'userJoin':
				if(!activeRooms[room]) activeRooms[room] = {
					users: []
				}
				activeRooms[room].users.push({
					username: authorName,
					userid: authorId,
					usercolor: authorColor,
					socket: ws
				})
				ws.send(JSON.stringify({
					room,
					type:'welcome',
					username: authorName,
					usercolor: authorColor,
					userid: authorId,
					encrypted: false,
					data: JSON.stringify({
						room,
						users: activeRooms[room].users.map( u => {
							return {
								username: u.username,
								userid: u.userid,
								usercolor: u.usercolor
							}
						})
					})
				}))
				break;
		}
		activeRooms[room].users.map(({ socket }) => {
			if(socket !== ws){
				socket.send(JSON.stringify({
					... JSON.parse(msg),
					encrypted: true
				}))
			}
		})
	})
	ws.on('close', () => {
		console.log('WebSocket was closed')
	})
})

module.exports = router

