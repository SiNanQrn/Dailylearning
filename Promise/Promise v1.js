const PENDDING = "PENDDING";
const FULFILLED = "FULFILLED";
const REJECT = "REJECT";

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
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECT) {
      onRejected(this.reason);
    }
    if (this.status === PENDDING) {
      // 订阅
      this.onFulfilledCallback.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallback.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

module.exports = MyPromise;
