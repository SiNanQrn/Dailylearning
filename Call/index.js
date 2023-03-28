// 原生写法
// function fn(a, b, c) {
//   console.log("this:", this);
//   console.log("a...:", a, b, c);
//   return "I want try";
// }

// const res = fn.call({ person: "SiNan" }, 1, 2, 3);
// console.log("res:", res);

// 手写 call 函数
Function.prototype.myCall = function (context, ...args) {
  context.fn = this || window;
  const res = context.fn(...args);
  delete context.fn;
  return res;
};

function fn(a, b, c) {
  console.log("a...:", a, b, c);
  console.log("this:", this);
  return "I want try";
}
const res = fn.myCall({ person: "SiNan" }, 1, 2, 3);
console.log("res:", res);
