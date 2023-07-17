class Watcher {
  constructor(vm, key, fn) {
    this.vm = vm;
    this.key = key;
    this.fn = fn;

    Dept.target = this;
    this.oldVal = vm[key];
    Dept.target = null;
  }
  update() {
    let newVal = this.vm[this.key];
    if (newVal === this.oldVal) {
      return;
    }
    this.fn(newVal)
  }
}