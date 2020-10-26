let ws = new WebSocket('ws://localhost:3000')

ws.onopen = () => {
    console.log('client open connection!')
}

ws.onmessage = (event) => {
    console.log(event)
}

ws.onclose = () => {
    console.log('client close connection!')
}