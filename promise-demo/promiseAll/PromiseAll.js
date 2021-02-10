const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function PromiseAll(executor) {
    const that = this
    this.status = PENDING
    this.value = null
    this.reason = null
    this.onSuccessCallback = []
    this.onRejectCallback = []

    function resolve(value) {
        if (value instanceof PromiseAll) {
            return value.then(resolve, reject)
        }
        if (that.status === PENDING) {
            that.status = FULFILLED
            that.value = value
            that.onSuccessCallback.forEach(function (callback) {
                callback(value)
            })
        }
    }

    function reject(reason) {
        if (that.status === PENDING) {
            that.status = REJECTED
            that.reason = reason
            that.onRejectCallback.forEach(function (callback) {
                callback(reason)
            })
        }
    }

    executor(resolve, reject)
}

PromiseAll.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
    onRejected = typeof onRejected === 'function' ? onRejected : error => {throw error}

    let promiseNext
    if (this.status === FULFILLED) {
        return promiseNext = new PromiseAll((resolve, reject) => {
            setTimeout(() => {
                try {
                    let result = onFulfilled(this.value)
                    getResolveValue(promiseNext, result, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    if (this.status === REJECTED) {
        return promiseNext = new PromiseAll((resolve, reject) => {
            setTimeout(() => {
                try {
                    let result = onRejected(this.reason)
                    getResolveValue(promiseNext, result, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    if (this.status === PENDING) {
        return promiseNext = new PromiseAll((resolve, reject) => {
            this.onSuccessCallback.push(value => {
                try {
                    let result = onFulfilled(value)
                    getResolveValue(promiseNext, result, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })

            this.onRejectCallback.push(reason => {
                try {
                    let result = onRejected(reason)
                    getResolveValue(promiseNext, result, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }
}

function getResolveValue(promiseNext, raw, resolve, reject) {
    if (raw === promiseNext) {
        return reject(new TypeError('cant return the same promise object'))
    }

    let mark; //resolve和reject的锁，保证只会调用一个
    if ((typeof raw === 'object' && raw != null) || (typeof raw === 'function')) {
        try {
            let then = raw.then
            if (typeof then === 'function') {
                then.call(raw, function (next) {
                    if (mark) return
                    mark = true
                    getResolveValue(promiseNext, next, resolve, reject)
                }, function (err) {
                    if (mark) return
                    mark = true
                    reject(err)
                })
            } else {
                resolve(raw)
            }
        } catch (error) {
            if (mark) return
            reject(error)
        }
    } else {
        resolve(raw)
    }
}

module.exports = PromiseAll