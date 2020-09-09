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
  return typeReal;
}

function getTypedefStrLine(name, refInfo, leadStr) {
  const typeStr = refInfo.type;
  const type = typeStr ? typeStr.trim().toLowerCase() : "$ref";
  let result = '';
  switch (type) {
    case "object":
      const objStrList = name ? [` * @property {Object} ${leadStr+name}`] : [];
      const {
        properties
      } = refInfo;
      for (const prop in properties) {
        if (properties.hasOwnProperty(prop)) {
          const element = properties[prop];
          const addLeadStr = leadStr + name ? leadStr + name + '.' : '';
          const propStr = getTypedefStrLine(prop, element, addLeadStr);
          objStrList.push(propStr);
        }
      }
      result = objStrList.join('\n');
      break;
    case "array":
      const arrType = refInfo.items.type;
      result = ` * @property {${translateType(arrType)}[]} ${leadStr+name}`;
      break;
    case "$ref":
      const refStrSpliteList = refInfo.$ref.split('/');
      result = ` * @property {${refStrSpliteList[refStrSpliteList.length-1]}} ${leadStr+name}`;
    default:
      result = ` * @property {${translateType(type)}} ${leadStr+name}`;
  }
  return result;
}

/**
 * 获取引用的jsdoc字符串
 * @param {string} ref 引用的列表
 * @param {any} definitions
 */
function getTypedefStr(ref, definitions) {
  const refInfo = definitions[ref];
  const refLead = getTypedefStrLine('', refInfo, '');
  return `
/**
 * @typedef ${ref.replace(/[«|»]/g, "_")}
${refLead}
 */
`
}

function getParamsReturnLead(funDesc = "", parameters = [], responses, definitions) {

  const parameDocList = [];
  const refs = [];

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
        refs.push(refStr);
        type = refStr.replace(/[«|»]/g, "_");
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
      refs.push(returnRefStr);
      returnType = returnRefStr.replace(/[«|»]/g, "_");
    }
  }

  // 被引用的typedef

  const typedefStrList = refs.map((ref) => getTypedefStr(ref, definitions));

  const paramsReturnLead = `
${typedefStrList.join('\n')}
/**
 * ${funDesc}
${parameDocList.join('\n')}
 * @returns {Promise<${returnType}>}
 */`

  return paramsReturnLead;
}

/**
 * 名字
 * @param {*} funDesc
 * @param {*} parameters
 * @param {*} responses
 * @param {*} definitions
 */
function jsdocParse(funDesc, parameters, responses, definitions) {
  // TODO {yzy} 解析方法得换成另一种 递归解析的方式 否则无法完全解析出来
  const paramsReturnLead = getParamsReturnLead(funDesc, parameters, responses, definitions);
  return paramsReturnLead
}

module.exports = {
  jsdocParse
}