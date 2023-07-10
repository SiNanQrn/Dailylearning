/* 
  观察者模式是基于发布订阅模式的，二者最大的区别就是：发布订阅模式中的发布者和订阅者没有必须得关联，可以发布不订阅，也可以订阅不发布，观察者模式中，发布一定有订阅，订阅一定有发布
  观察者模式有两个角色：1）发布者 2）订阅者
*/

/* 
  发布者
  发布者里有一个容器，存放所有的订阅者，一个发布者包含 N个 订阅者，订阅者也称作‘观察者’
  发布者中两个方法：
    addSub 将每个订阅者存入 subs 中
    notify 用来通知每个订阅者执行 update 方法
*/
class Publisher {
  constructor() {
    this.subBus = [];
  }
  addSub(sub) {
    // 检验是否是个合格的 watcher(是否存在 update 方法)
    if (sub && sub.update) {
      this.subBus.push(sub);
    }
  }
  notify() {
    this.subBus.forEach((fn) => fn.update());
  }
}

// 订阅者
class Watcher {
  update() {
    console.log("视图更新");
  }
}
const dep = new Publisher();
const watcher1 = new Watcher();
dep.addSub(watcher1);
dep.notify();// 通知订阅者