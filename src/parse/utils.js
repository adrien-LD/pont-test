export function uniqueArr(arr) {
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

export default uniqueArr;
