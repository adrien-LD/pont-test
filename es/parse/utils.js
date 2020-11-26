export function uniqueArr(arr) {
  var obj = {};
  var newArr = [];

  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = 1;
      newArr.push(arr[i]);
    }
  }

  return newArr;
}
export default uniqueArr;
//# sourceMappingURL=utils.js.map