import jsdocParse from './jsdocParse';
import definitionsParse from './definitions';
/**
 * 参数列表解析出请求所需的信息
 * @param {Object[]} parameters 参数列表
 */

function parameter2requestInfo(parameters) {
  var headers = [];
  var body = [];
  var params = [];
  parameters.forEach(function (item) {
    var place = item.in;

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
    headers: headers,
    body: body,
    params: params
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
  var funDesc = item.summary,
      funName = item.operationId,
      consumes = item.consumes,
      _item$parameters = item.parameters,
      parameters = _item$parameters === void 0 ? [] : _item$parameters,
      responses = item.responses; // 解析出jsdoc

  var _jsdocParse = jsdocParse(funDesc, parameters, responses, defObject),
      leadDoc = _jsdocParse.paramsReturnLead,
      depadences = _jsdocParse.typedefNameList; // 转换params


  var funParams = parameters.map(function (paramItem) {
    return {
      name: paramItem.name,
      type: paramItem.type,
      required: paramItem.required
    };
  }); // 获取headers,body,params

  var _parameter2requestInf = parameter2requestInfo(parameters),
      headers = _parameter2requestInf.headers,
      body = _parameter2requestInf.body,
      params = _parameter2requestInf.params;

  return {
    headers: headers,
    body: body,
    params: params,
    funParams: funParams,
    leadDoc: leadDoc,
    funName: funName,
    funDesc: funDesc,
    consumes: consumes,
    method: method,
    path: path,
    depadences: depadences
  };
}

function funParse(path, pathItem, defObject) {
  var result = [];

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
  var basePath = data.basePath,
      _data$paths = data.paths,
      paths = _data$paths === void 0 ? {} : _data$paths,
      definitions = data.definitions;
  var interfaceList = []; // 解析typedef

  var defObject = definitionsParse(definitions);

  for (var path in paths) {
    if (paths.hasOwnProperty(path)) {
      var pathItem = paths[path];
      interfaceList = interfaceList.concat(funParse(path, pathItem, defObject));
    }
  }

  return {
    basePath: basePath,
    interfaceList: interfaceList,
    defObject: defObject
  };
}
//# sourceMappingURL=index.js.map