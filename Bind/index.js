// 原生写法
// function fn(a, b, c) {
//   console.log("this:", this);
//   console.log("a...:", a, b, c);
//   return "I want try";
// }

// let Fn = fn.bind({ person: "SiNan" }, 1, 2, 3);
// let res = Fn();
// console.log("res:", res);

// 手写bind
Function.prototype.myBind = function () {
  let fn = this;

  const arg = Array.prototype.slice.call(arguments);
  const _this = arg.shift();
  // console.log("arg:", arg, _this);

  return function () {
    return fn.apply(_this, arg);
  };
};

function fn(a, b, c) {
  console.log("this:", this);
  console.log("a...:", a, b, c);
  return "I want try";
}

let Fn = fn.myBind({ person: "SiNan" }, 1, 2, 3);
let res = Fn();
console.log("res:", res);
