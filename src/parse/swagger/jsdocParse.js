function translateType(type) {
  if (!type) return 'any'
  const typeReal = type.trim().toLowerCase();
  switch (typeReal) {
    case 'integer':
    case 'float':
    case 'double':
      return 'number';
    default:
      break;
  }
  return type;
}

function deepStringify(refs,defObject,exist={}){
  let result = [];
  refs.forEach((ref) => {
    if(!exist[ref]){
      const def = defObject[ref];
      exist[ref] = true;
      if(def){
        result.push(ref);
        result = deepStringify(def.dependenceList,defObject,exist).concat(result);
      }
    }
  });
  return result;
}

function getParamsReturnLead(funDesc = "", parameters = [], responses, defObject) {

  const parameDocList = [];
  let refs = [];

  // 参数jsdoc解析
  parameters.forEach((item) => {
    let type = 'any';
    if (item.type) {
      type = translateType(item.type);
    } else if (item.schema) {
      if (item.schema.type) {
        type = translateType(item.schema.type);
      } else if (item.schema.$ref) {
        const refSplitList = item.schema.$ref.split('/');
        const refStr = refSplitList[refSplitList.length - 1];
        type = refStr.replace(/[«|»]/g, "_");
        refs.push(type);
      }
    }
    const paramStr = ` * @param {${type}} ${item.name.replace(/-/g,'')} ${item.description}`
    parameDocList.push(paramStr);
  });

  // 返回的字符串
  const returnInfo = responses["200"];
  let returnType = 'any';
  if (returnInfo.type) {
    returnType = translateType(returnInfo.type);
  } else if (returnInfo.schema) {
    if (returnInfo.schema.type) {
      returnType = translateType(returnInfo.schema.type);
    } else if (returnInfo.schema.$ref) {
      const returnRefSplitList = returnInfo.schema.$ref.split('/');
      const returnRefStr = returnRefSplitList[returnRefSplitList.length - 1];
      returnType = returnRefStr.replace(/[«|»]/g, "_");
      refs.push(returnType);
    }
  }

  // 被引用的typedef
  const typedefNameList = deepStringify(refs,defObject);

  const paramsReturnLead = `
/**
 * ${funDesc}
${parameDocList.join('\n')}
 * @returns {Promise<${returnType}>}
 */`

  return {paramsReturnLead,typedefNameList};
}

/**
 * 名字
 * @param {*} funDesc 方法描述
 * @param {*} parameters 方法参数信息
 * @param {*} responses 方法返回结果
 * @param {*} defObject typedef的固定结构内容
 */
function jsdocParse(funDesc, parameters, responses, defObject) {
  // TODO {yzy} 解决map list等类型的问题 解决根据当前已有的typedef再来生成typedef的问题
  const {paramsReturnLead,typedefNameList} = getParamsReturnLead(funDesc, parameters, responses, defObject);
  return {paramsReturnLead,typedefNameList}
}

module.exports = {
  jsdocParse
}