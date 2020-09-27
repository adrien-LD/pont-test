const {
  translateType
} = require("./definitions");

function deepStringify(refs, defObject, exist = {}) {
  let result = [];
  refs.forEach((ref) => {
    if (!exist[ref]) {
      const def = defObject[ref];
      if(ref == 'com.fangdd.common.basic.CommonResponse_com.fangdd.ap.live.server.web.response.QueryLiveRoomDetailResponse_'){
        console.log(111)
      }
      exist[ref] = true;
      if (def) {
        result.push(ref);
        result = deepStringify(def.dependenceList, defObject, exist).concat(result);
      }
    }
  });
  return result;
}

/**
 * 名字
 * @param {*} funDesc 方法描述
 * @param {*} parameters 方法参数信息
 * @param {*} responses 方法返回结果
 * @param {*} defObject typedef的固定结构内容
 */
function jsdocParse(funDesc, parameters, responses, defObject) {

  const parameDocList = [];
  let refs = [];

  // 参数jsdoc解析
  parameters.forEach((item) => {
    let type = 'any';
    const {
      entityName
    } = item;
    const typeResult = translateType(entityName)
    type = typeResult.type;
    refs.push(type.replace(/[<|>]/g, "_"));
    refs = refs.concat(typeResult.dependence);
    const paramStr = ` * @param {${type.replace(/[<|>]/g, "_")}} ${item.name.replace(/-/g,'')} ${item.comment}`
    parameDocList.push(paramStr);
  });

  const returnTypeResult = translateType(responses.entityName);
  const returnType = returnTypeResult.type.replace(/[<|>]/g, "_");
  refs.push(returnType);
  refs = refs.concat(returnTypeResult.dependence);

  // 被引用的typedef
  const typedefNameList = deepStringify(refs, defObject);

  const paramsReturnLead =
`
/**
 * ${funDesc}
${parameDocList.join('\n')}
 * @returns {Promise<${returnType}>}
 */`;

  return {
    paramsReturnLead,
    typedefNameList
  }
}

module.exports = {
  jsdocParse
}