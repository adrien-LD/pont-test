const {jsdocRefParse} = require("./jsdocRefParse");

/**
 * 参数列表解析出请求所需的信息
 * @param {Object[]} parameters 参数列表
 */
function parameter2requestInfo(parameters) {
  const headers = [];
  const body = [];
  const params = [];

  parameters.forEach((item) => {
    const {
      in: place
    } = item;
    switch (place) {
      case "header":
        headers.push(item);
        break;
      case "body":
        body.push(item);
        break;
      case "query":
        params.push(item);
        break;

      default:
        break;
    }
  });

  return {
    headers,
    body,
    params
  };
}

/**
 * 解析方法(真)
 * @param {string} method 方法类型
 * @param {string} path 路径
 * @param {Object} item 接口信息
 */
function funParseReal(method, path, item) {
  const {
    summary: funDesc,
    operationId:funName,
    consumes,
    parameters=[],
    responses
  } = item;

  // TODO {yzy} 解析出jsdoc
  const leadDoc = `
/**
 * 解析方法(真)
 * @param {string} method 方法类型
 * @param {string} path 路径
 * @param {Object} item 接口信息
 */`;

  // 转换params
  const funParams = parameters.map((paramItem) => ({
    name: paramItem.name,
    type: paramItem.type,
    required: paramItem.required
  }));

  // 获取headers,body,params
  const {
    headers,
    body,
    params
  } = parameter2requestInfo(parameters);

  return {
    headers,
    body,
    params,
    funParams,
    leadDoc,
    funName,
    funDesc,
    consumes,
    method,
    path
  }
}

function funParse(path, pathItem) {
  const result = [];
  if (pathItem.get) {
    result.push(funParseReal('GET', path, pathItem.get));
  }
  if (pathItem.post) {
    result.push(funParseReal('POST', path, pathItem.post));
  }
  if (pathItem.delete) {
    result.push(funParseReal('DELETE', path, pathItem.delete));
  }
  if (pathItem.update) {
    result.push(funParseReal('UPDATE', path, pathItem.update));
  }

  return result;
}


function swagger2Parse(data) {
  if (!data) return [];

  const {
    basePath,
    paths = {},
    definitions
  } = data;

  let interfaceList = [];

  for (const path in paths) {
    if (paths.hasOwnProperty(path)) {
      const pathItem = paths[path];
      interfaceList = interfaceList.concat(funParse(path, pathItem));
    }
  }

  // TODO {yzy} 类型定义解析
  const typedefLeadDocs = jsdocRefParse(definitions);

  return {
    basePath,
    interfaceList,
    typedefLeadDocs
  }
}

module.exports = {
  swagger2Parse
}