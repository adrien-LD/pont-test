/**
 * 名字
 * @param {*} funDesc 方法描述
 * @param {*} parameters 方法参数信息
 * @param {*} responses 方法返回结果
 * @param {*} defObject typedef的固定结构内容
 */
function jsdocParse(funDesc, parameters, responses, defObject) {
  // TODO {yzy} 解决map list等类型的问题 解决根据当前已有的typedef再来生成typedef的问题
  return {paramsReturnLead:'',typedefNameList:[]}
}

module.exports = {
  jsdocParse
}