import jsdocParse from './jsdocParse';
import definitionsParse from './definitions';
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
      in: place,
    } = item;
    switch (place) {
      case 'header':
        headers.push(item);
        break;
      case 'body':
        body.push(item);
        break;
      case 'query':
        params.push(item);
        break;

      default:
        break;
    }
  });

  return {
    headers,
    body,
    params,
  };
}

/**
 * 解析方法(真)
 * @param {string} method 方法类型
 * @param {string} path 路径
 * @param {Object} item 接口信息
 * @param {Object} defObject 类型定义
 */
function funParseReal(method, path, item, defObject) {
  const {
    summary: funDesc,
    operationId: funName,
    consumes,
    parameters = [],
    responses,
  } = item;

  // 解析出jsdoc
  const { paramsReturnLead: leadDoc, typedefNameList: depadences } = jsdocParse(funDesc, parameters, responses, defObject);

  // 转换params
  const funParams = parameters.map((paramItem) => ({
    name: paramItem.name,
    type: paramItem.type,
    required: paramItem.required,
  }));

  // 获取headers,body,params
  const {
    headers,
    body,
    params,
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
    path,
    depadences,
  };
}

function funParse(path, pathItem, defObject) {
  const result = [];
  if (pathItem.get) {
    result.push(funParseReal('GET', path, pathItem.get, defObject));
  }
  if (pathItem.post) {
    result.push(funParseReal('POST', path, pathItem.post, defObject));
  }
  if (pathItem.delete) {
    result.push(funParseReal('DELETE', path, pathItem.delete, defObject));
  }
  if (pathItem.update) {
    result.push(funParseReal('UPDATE', path, pathItem.update, defObject));
  }

  return result;
}

/**
 * swagger2.0版本接口解析
 * @param {object} data 请求接口后的参数
 * @returns {import("..").ParseInfo}
 */
export default function swagger2Parse(data) {
  if (!data) return;

  const {
    basePath,
    paths = {},
    definitions,
  } = data;

  let interfaceList = [];

  // 解析typedef
  const defObject = definitionsParse(definitions);

  for (const path in paths) {
    if (paths.hasOwnProperty(path)) {
      const pathItem = paths[path];
      interfaceList = interfaceList.concat(funParse(path, pathItem, defObject));
    }
  }

  return {
    basePath,
    interfaceList,
    defObject,
  };
}
