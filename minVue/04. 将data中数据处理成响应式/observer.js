class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    // 若是简单数据类型，不进行递归处理
    if (!data || typeof data !== "object") {
      return;
    }

      Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }
  //处理响应式
  defineReactive(obj, key, val) {
    let that = this;
    this.walk(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log("get...");
        return val;
      },
      set(newVal) {
        console.log("set...");
        if (newVal === val) {
          return;
        }
        val = newVal;
        that.walk(newVal);
      },
    });
  }
}
