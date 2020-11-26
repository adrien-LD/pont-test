"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniqueArr = uniqueArr;
exports.default = void 0;

function uniqueArr(arr) {
  const obj = {};
  const newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = 1;
      newArr.push(arr[i]);
    }
  }

  return newArr;
}

var _default = uniqueArr;
exports.default = _default;
//# sourceMappingURL=utils.js.map