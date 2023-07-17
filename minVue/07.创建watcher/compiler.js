class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compiler(this.el);
  }
  compiler(el) {
    // console.log("打印", Array.from(el.childNodes));
    Array.from(el.childNodes).forEach((node) => {
      if (this.isTextNode(node)) {
        // 文本节点处理
        this.compilerText(node);
      } else if (this.isElementNode(node)) {
        // 元素节点处理
        this.compilerElement(node);
      }
      if (node.childNodes && node.childNodes.length > 0) {
        // console.log("打印node", node);
        this.compiler(node);
      }
    });
  }
  // 编译元素节点
  compilerElement(node) {
    Array.from(node.attributes).forEach((attr) => {
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        attrName = attrName.substr(2);
        // console.log("打印", attrName);
        let key = attr.value;
        // console.log("打印", key);
        this.update(node, key, attrName);
      }
      // console.log("打印", attrName);
    });
  }
  update(node, key, attrName) {
    // console.log("打印", node, key, attrName);

    const updataFn = this[attrName + "Updater"];
    updataFn && updataFn.call(this, node, this.vm[key], key);
  }
  textUpdater(node, val, key) {
    node.textContent = val;

    // 创建 watcher
    new Watcher(this.vm, key, (newVal) => {
      node.textContent = newVal;
    })
  }
  modelUpdater(node, val) {
    node.value = val;
  }
  // 是否是指令属性
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  // 编译文本节点
  compilerText(node) {
    let reg = /\{\{(.+)\}\}/;
    let value = node.textContent;
    if (reg.test(value)) {
      let key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key]);

      // 创建 watcher
      new Watcher(this.vm, key, (newVal) => {
        node.textContent = newVal;
      })
    }
  }
  // 判断是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }
  // 判断是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
