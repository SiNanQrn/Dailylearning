class EevenBus {
  constructor() {
    this.subBus = {};
  }
  $on(type, fn) {
    if (!this.subBus[type]) {
      this.subBus[type] = [];
    }
    this.subBus[type].push(fn);
  }

  $emit(type) {
    if (this.subBus[type]) {
      this.subBus[type].forEach((fn) => fn());
    }
  }
}
const p1 = new EevenBus();
// 发布
p1.$on("薛之谦", () => {
  console.log("天外来物");
});
p1.$on("薛之谦", () => {
  console.log("变废为宝");
});
// 订阅
p1.$emit("薛之谦");

// 发布
p1.$on("林俊杰", () => {
  console.log("她说");
});
p1.$on("林俊杰", () => {
  console.log("修炼爱情");
});
// 订阅
p1.$emit("林俊杰");
// console.log('打印p1',p1);
