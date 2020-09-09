function translateType(type) {
  return 'string';
}

/**
 * @typedef CommonResponse$VirtualEstatePriceStatus$
 * @property {string} test
 */

function getParamsReturnLead(funDesc = "", parameters = [], responses) {

  const parameDocList = [];
  const refs = [];

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
        type = refStr.replace(/[«|»]/g, "$");
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
      returnType = returnRefStr.replace(/[«|»]/g, "$");
    }
  }

  const paramsReturnLead = `
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
  const paramsReturnLead = getParamsReturnLead(funDesc, parameters, responses);
  return paramsReturnLead
}

module.exports = {
  jsdocParse
}