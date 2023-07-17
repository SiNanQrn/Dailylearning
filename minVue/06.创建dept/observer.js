/* 
  Observer 作用是将 $data 数据处理成响应式
 */
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

    // 收集依赖，派发更新
    let dept = new Dept();

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log("get...");
        // target 是静态属性，静态属性是通过类名访问的
        // 收集依赖，也就是说把 watcher 添加到 subs 中
        // 稍后我们会创建一个 watcher 赋值给 Dept.target
        Dept.target && dept.addSub(Dept.target);
        return val;
      },
      set(newVal) {
        console.log("set...");
        if (newVal === val) {
          return;
        }
        val = newVal;
        that.walk(newVal);

        // 通知 watcher，派发更新
        dept.notify()
      },
    });
  }
}
