class watcher {
  constructor(vm, key, fn) {
    this.vm = vm;
    this.key = key;
    this.fn = fn;

    Dept.target = this;
    this.oldVal = vm[key];
    Dept.target = null;
  }
  update() {
    this.newVal = this.vm[this.key]; 
    if (this.newVal === this.oldVal) {
      return;
    }
    this.fn(this.newVal);
  }
}
