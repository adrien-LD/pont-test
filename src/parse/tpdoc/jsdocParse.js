const {
  translateType
} = require("./definitions");

function deepStringify(refs, defObject, exist = {}) {
  let result = [];
  refs.forEach((ref) => {
    if (!exist[ref]) {
      const def = defObject[ref];
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
  const refs = [];

  // 参数jsdoc解析
  parameters.forEach((item) => {
    let type = 'any';
    const {
      entityName
    } = item;
    type = translateType(entityName);
    refs.push(type);
    const paramStr = ` * @param {${type}} ${item.name.replace(/-/g,'')} ${item.comment}`
    parameDocList.push(paramStr);
  });

  const returnType = translateType(responses.entityName);
  refs.push(returnType);

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