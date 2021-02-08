let PromiseSync = require('./PromiseSync')

new PromiseSync((resolve, reject) => {
	resolve('test')
	reject(new Error('error'))
}).then(data => console.log(data), error => console.log(error))

new PromiseSync((resolve, reject) => {
	//reject(new Error('error'))
	resolve('test')
}).then(data => console.log(data), error => console.log(error))

new Promise()