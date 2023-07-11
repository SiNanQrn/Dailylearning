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