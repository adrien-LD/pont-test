"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tpdocParse;

var _definitions = require("./definitions");

var _jsdocParse = _interopRequireDefault(require("./jsdocParse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parameter2requestInfo(parameters) {
  const headers = [];
  const body = [];
  const params = [];
  parameters.forEach(item => {
    const {
      entityName: type,
      name,
      comment,
      annotation,
      required
    } = item;
    const info = {
      name,
      description: comment,
      required,
      type: (0, _definitions.translateType)(type).type
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
    headers,
    body,
    params
  };
}

function parseInterfaceReal(api = {}, defObject) {
  const {
    code,
    name: funDesc,
    methods = [],
    paths = [],
    response,
    requestParams = []
  } = api;
  const method = methods.length ? methods[0] : 'GET';
  const codeList = code.split('\.');
  const funName = codeList[codeList.length - 1];
  const path = paths.length ? paths[0] : '';
  const funParams = requestParams.map(paramItem => ({
    name: paramItem.name,
    required: paramItem.required
  }));
  const {
    paramsReturnLead: leadDoc,
    typedefNameList: depadences
  } = (0, _jsdocParse.default)(funDesc, requestParams, response, defObject); // 获取headers,body,params

  const {
    headers,
    body,
    params
  } = parameter2requestInfo(requestParams);
  return {
    headers,
    body,
    params,
    funParams,
    leadDoc,
    funName,
    funDesc,
    method,
    path,
    depadences
  };
}

function parseInterface(interfaceInfos = [], defObject) {
  const result = [];
  interfaceInfos.forEach(api => {
    result.push(parseInterfaceReal(api, defObject));
  });
  return result;
}

function getAllInterfaceInfoList(chapters = []) {
  let result = [];
  chapters.forEach(section => {
    const {
      sections,
      apis
    } = section;

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


function tpdocParse(data = {}) {
  const {
    artifact,
    chapters,
    entities
  } = data;
  const defObject = (0, _definitions.definitionsParse)(entities);
  const interfaceInfos = getAllInterfaceInfoList(chapters);
  const interfaceList = parseInterface(interfaceInfos, defObject);
  return {
    basePath: '/',
    interfaceList,
    defObject
  };
}
//# sourceMappingURL=index.js.map