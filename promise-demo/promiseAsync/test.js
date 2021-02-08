let PromiseAsync = require('./PromiseAsync')

let promise = new PromiseAsync((resolve, _) => {
    setTimeout(() => {
        resolve('Promise Async')
    }, 1000)
})
promise.then(data => console.log(data))
