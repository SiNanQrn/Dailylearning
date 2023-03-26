const PENDDING = "PENDDING";
const FULFILLED = "FULFILLED";
const REJECT = "REJECT";

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError(" Chaining cycle detected for promise #<Promise>")
    );
  }

  let called = false;
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let then = x.then;
    try {
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolve(y);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

class MyPromise {
  constructor(executor) {
    this.status = PENDDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

    const resolve = (value) => {
      if (this.status === PENDDING) {
        this.status = FULFILLED;
        this.value = value;
        // 发布
        this.onFulfilledCallback.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status == PENDDING) {
        this.status = REJECT;
        this.reason = reason;
        // 发布
        this.onRejectedCallback.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      // FULFILLED状态
      setTimeout(() => {
        if (this.status === FULFILLED) {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }
      }, 0);
      // REJECT状态
      setTimeout(() => {
        if (this.status === REJECT) {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }
      }, 0);
      // PENDDING状态
      if (this.status === PENDDING) {
        // 订阅
        this.onFulfilledCallback.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallback.push(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    return promise2;
  }
}

module.exports = MyPromise;
