function uniqueArr(arr) {
  var obj={}
  var newArr=[]
  for (let i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
          obj[arr[i]] = 1
          newArr.push(arr[i])
      }
  }
  return newArr
}

module.exports = {
  uniqueArr
}