// dept
/* 
  dept 
  1)  收集依赖，添加 watcher
  2)  通知所有的 watcher

  什么时候收集依赖，添加 watcher？
    当模板中使用到数据的时候（走getter），收集依赖，添加观察者
    也就是说在getter中收集依赖，添加观察者
  什么时候通知所有的 watcher？
    当 data 中数据变化了，走 setter ,也就是说在 setter 中需要通知观察者
*/
class Dept {
  constructor() {
    this.subs = [];
  }
  // 收集依赖
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  // 通知依赖更新
  notify(sub) {
    this.subs.forEach(sub => sub.update())
  }
}