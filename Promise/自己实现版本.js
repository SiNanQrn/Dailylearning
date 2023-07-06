const FULFILLED = "FULFILLED";
const PENDING = "PENDING";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = null;
    this.result = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn(value));
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.result = reason;
        this.onRejectedCallbacks.forEach((fn) => fn(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          let x = onRejected(this.result);
          resolvePromise(promise2, x, resolve, reject);
        });
      }
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push((val) => {
          setTimeout(() => {
            let x = onFulfilled(val);
            resolvePromise(promise2, x, resolve, reject);
          });
        });
        this.onRejectedCallbacks.push((val) => {
          setTimeout(() => {
            let x = onRejected(val);
            resolvePromise(promise2, x, resolve, reject);
          });
        });
      }
    });
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  // 1. 符合 A+ 规范 promise
  if (x instanceof Promise) {
    x.then(
      (y) => {
        resolvePromise(promise2, y, resolve, reject);
      },
      (r) => {
        reject(r);
      }
    );
    // 2. 符合其他规范 promise
  } else if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let called = false;
    try {
      let then = x.then;
      // 2.1 存在 then 函数（其他规范的 promise）
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
        // 2.2 普通的函数/对象类型
      } else {
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (err) {
      if (called) return;
      called = true;
      reject(err);
    }
    // 3. 基本数据类型
  } else {
    resolve(x);
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
module.exports = Promise;
