class Vue {
  constructor(options) {
    this.$options = options || {};
    this.$data = options.data || {};
    this.$el = document.querySelector(options.el);
    this._proxyData(this.$data);
  }
  // 使用 _proxyData 方法让 vm 代理 data 中的数据
  _proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          console.log("get...");
          return data[key];
        },
        set(newVal) {
          console.log("set...");
          if (newVal === data[key]) {
            return;
          }
          data[key] = newVal;
        },
      });
    });
  }
}
