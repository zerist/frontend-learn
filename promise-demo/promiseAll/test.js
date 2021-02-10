let PromiseAll = require('./PromiseAll')

new PromiseAll((resolve, _) => {
    setTimeout(() => {
        resolve('first')
    }, 0)
}).then((data) => {
    console.log(data)
    return new PromiseAll((resolve, _) => {
        resolve(new PromiseAll((resolve, _) => {
            resolve('second')
        }))
    })
}).then(data => {
    console.log(data)
    return new PromiseAll((resolve, _) => {
        resolve('third')
    })
}).then(data => {
    console.log(data)
})