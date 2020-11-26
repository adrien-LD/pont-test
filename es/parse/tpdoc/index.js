import { definitionsParse, translateType } from './definitions';
import jsdocParse from './jsdocParse';

function parameter2requestInfo(parameters) {
  var headers = [];
  var body = [];
  var params = [];
  parameters.forEach(function (item) {
    var type = item.entityName,
        name = item.name,
        comment = item.comment,
        annotation = item.annotation,
        required = item.required;
    var info = {
      name: name,
      description: comment,
      required: required,
      type: translateType(type).type
    };

    switch (annotation) {
      case '@RequestHeader':
        headers.push(info);
        break;

      case '@RequestBody':
        body.push(info);
        break;

      case '@RequestParam':
        params.push(info);
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

function parseInterfaceReal() {
  var api = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defObject = arguments.length > 1 ? arguments[1] : undefined;
  var code = api.code,
      funDesc = api.name,
      _api$methods = api.methods,
      methods = _api$methods === void 0 ? [] : _api$methods,
      _api$paths = api.paths,
      paths = _api$paths === void 0 ? [] : _api$paths,
      response = api.response,
      _api$requestParams = api.requestParams,
      requestParams = _api$requestParams === void 0 ? [] : _api$requestParams;
  var method = methods.length ? methods[0] : 'GET';
  var codeList = code.split('\.');
  var funName = codeList[codeList.length - 1];
  var path = paths.length ? paths[0] : '';
  var funParams = requestParams.map(function (paramItem) {
    return {
      name: paramItem.name,
      required: paramItem.required
    };
  });

  var _jsdocParse = jsdocParse(funDesc, requestParams, response, defObject),
      leadDoc = _jsdocParse.paramsReturnLead,
      depadences = _jsdocParse.typedefNameList; // 获取headers,body,params


  var _parameter2requestInf = parameter2requestInfo(requestParams),
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
    method: method,
    path: path,
    depadences: depadences
  };
}

function parseInterface() {
  var interfaceInfos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var defObject = arguments.length > 1 ? arguments[1] : undefined;
  var result = [];
  interfaceInfos.forEach(function (api) {
    result.push(parseInterfaceReal(api, defObject));
  });
  return result;
}

function getAllInterfaceInfoList() {
  var chapters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var result = [];
  chapters.forEach(function (section) {
    var sections = section.sections,
        apis = section.apis;

    if (sections) {
      result = result.concat(getAllInterfaceInfoList(sections));
    }

    if (apis) {
      result = result.concat(apis);
    }
  });
  return result;
}
/**
 * tp-doc接口解析
 * @param {object} data 请求接口后的参数
 * @returns {import("..").ParseInfo}
 */


export default function tpdocParse() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var artifact = data.artifact,
      chapters = data.chapters,
      entities = data.entities;
  var defObject = definitionsParse(entities);
  var interfaceInfos = getAllInterfaceInfoList(chapters);
  var interfaceList = parseInterface(interfaceInfos, defObject);
  return {
    basePath: '/',
    interfaceList: interfaceList,
    defObject: defObject
  };
}
//# sourceMappingURL=index.js.map