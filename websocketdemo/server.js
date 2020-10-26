const express = require('express')
const SocketServer = require('ws').Server;

const PORT = 3000;

const server = express().listen(PORT, () => console.log('listening on ' + PORT))
const wss = new SocketServer({server})

wss.on('connection', (ws) => {
    console.log(ws)
    ws.send('hello!')

    ws.on('message', (data) => {
        console.log('receive message!')
        console.log(data)

        ws.send(data);
    })

    ws.on('close', () => {
        console.log('connection closed!')
    })
})