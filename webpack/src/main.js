import count from "./js/count";
import sum from "./js/sum";
import "./css/index.css";
import "./less/index.less";
import "./sass/index.sass";
import "./sass/index.scss";
import "./stylus/index.styl";
import "./css/iconfont.css";
// import "core-js/es/promise";
// import { mul } from "./js/math";

// console.log("打印", mul(3, 1));
console.log("打印", count(3, 1));
console.log("打印", sum(1, 2, 3, 4, 5));
console.log("hello main");

document.getElementById("btn").onclick = function () {
  // 动态导入 --> 实现按需加载
  // 即使只被引用了一次，也会代码分割
  import(/* webpackChunkName: "maths" */ "./js/math.js").then(({ mul }) => {
    alert(mul(1, 2));
  });
};

// 判断是否支持HMR功能
if (module.hot) {
  module.hot.accept("./js/count.js");
  module.hot.accept("./js/sum.js");
}
// 添加promise代码
const promise = Promise.resolve();
promise.then(() => {
  console.log("hello promise");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
