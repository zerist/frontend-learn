function PromiseAsync(executor) {
    let that = this
    this.status = 'pending'
    this.value = null
    this.reason = null
    this.onSuccessCallback = []
    this.onRejectCallback = []

    function resolve(value) {
        if (that.status === 'pending') {
            that.status = 'success'
            that.value = value
            that.onSuccessCallback.forEach(function (callback) {
                callback(value)
            })
        }
    }

    function reject(value) {
        if (that.status === 'pending') {
            that.status = 'reject'
            that.reason = value
            that.onRejectCallback.forEach(function (callback) {
                callback(value)
            })
        }
    }

    executor(resolve, reject)
}

PromiseAsync.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data;
    onRejected = typeof onRejected === 'function' ? onRejected : error => {throw error}

    if (this.status === 'success') {
        onFulfilled(this.value)
    } else if (this.status === 'reject') {
        onRejected(this.reason)
    } else if (this.status === 'pending') {
        this.onSuccessCallback.push(onFulfilled)
        this.onRejectCallback.push(onRejected)
    }
}

module.exports = PromiseAsync