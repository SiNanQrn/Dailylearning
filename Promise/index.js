const MyPromise = require("./Promise v2");

let promise1 = new MyPromise((resolve, reject) => {
  resolve("promise1");
});

promise1
  .then((val) => {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          new MyPromise((resolve, reject) => {
            resolve(
              new MyPromise((resolve, reject) => {
                resolve("eeee", val);
              })
            );
          })
        );
      }, 2000);
    });
  })
  .then((val) => {
    console.log(val);
  });

// let promise = promise1
//   .then((val) => {
//     return val + "->promise2";
//   })
//   .then((val) => {
//     console.log(val);
//   });
// 1.通过 return 传递结果
// promise
//   .then((value) => {
//     return value; //普通值
//   })
//   .then((value) => {
//     console.log("fulfilled:" + value);
//   });

// 2.通过新的 promise resolve 结果
// promise
//   .then((value) => {
//     return value; //普通值
//   })
//   .then((value) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(value);
//       },2000)
//     });
//   })
//   .then((value) => {
//     console.log("fulfilled:" + value);
//   });

// 3.通过新的 promise reject 结果
// promise
//   .then((value) => {
//     return value; //普通值
//   })
//   .then((value) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         reject('Error');
//       }, 2000);
//     });
//   })
//   .then(
//     (value) => {
//       console.log("fulfilled:" + value);
//     },
//     (reason) => {
//       console.log("rejected:" + reason);
//     }
//   );

// 4.then 走了失败回调函数后，再走 then
// promise
//   .then((value) => {
//     return value; //普通值
//   })
//   .then((value) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         reject("Error");
//       }, 2000);
//     });
//   })
//   .then(
//     (value) => {
//       console.log("fulfilled:" + value);
//     },
//     (reason) => {
//       console.log("rejected:" + reason);
//     }
//   )
//   .then(
//     (value) => {
//       console.log("fulfilled1:" + value);
//     },
//     () => {
//       console.log("rejected2:" + reason);
//     }
//   );

// 5.then 中使用了 throw new Error
// promise
//   .then((value) => {
//     return value; //普通值
//   })
//   .then((value) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         reject("Error");
//       }, 2000);
//     });
//   })
//   .then(
//     (value) => {
//       console.log("fulfilled:" + value);
//     },
//     (reason) => {
//       console.log("rejected:" + reason);
//     }
//   )
//   .then((value) => {
//     throw new Error("error");
//   })
//   .then(
//     (value) => {
//       console.log("fulfilled:" + value);
//     },
//     (reason) => {
//       console.log("Except:" + reason);
//     }
//   );

// 5.用 catch 捕获异常
// promise
//   .then((value) => {
//     return value; //普通值
//   })
//   .then((value) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         reject("Error");
//       }, 2000);
//     });
//   })
//   .then(
//     (value) => {
//       console.log("fulfilled:" + value);
//     },
//     (reason) => {
//       console.log("rejected:" + reason);
//     }
//   )
//   .then((value) => {
//     throw new Error("error");
//   })
//   .then(
//     (value) => {
//       console.log("fulfilled:" + value);
//     }
//     // (reason) => {
//     //   console.log("Except:" + reason);
//     // }
//   )
//   .catch((reason) => {
//     console.log("Catch:" + reason);
//   })
//   .then(
//     (value) => {
//       console.log("Then/fulfilled:" + value);
//     },
//     (reason) => {
//       console.log("Then/reject:" + reason);
//     }
//   );

// 成功条件：
// resolve()
// return 普通的js value

// 失败条件：
// reject()
// throw new Error('err);
