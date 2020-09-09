const {jsdocParse} = require("./jsdocParse");

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
 * @param {Object} definitions 类型定义
 */
function funParseReal(method, path, item, definitions) {
  const {
    summary: funDesc,
    operationId:funName,
    consumes,
    parameters=[],
    responses
  } = item;

  // 解析出jsdoc
  const leadDoc = jsdocParse(funDesc, parameters, responses, definitions )

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

function funParse(path, pathItem, definitions) {
  const result = [];
  if (pathItem.get) {
    result.push(funParseReal('GET', path, pathItem.get, definitions));
  }
  if (pathItem.post) {
    result.push(funParseReal('POST', path, pathItem.post, definitions));
  }
  if (pathItem.delete) {
    result.push(funParseReal('DELETE', path, pathItem.delete, definitions));
  }
  if (pathItem.update) {
    result.push(funParseReal('UPDATE', path, pathItem.update, definitions));
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
      interfaceList = interfaceList.concat(funParse(path, pathItem, definitions));
    }
  }

  return {
    basePath,
    interfaceList,
  }
}

module.exports = {
  swagger2Parse
}