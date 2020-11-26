"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = activate;

var _vscode = _interopRequireDefault(require("vscode"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _utils = require("../utils");

var _request = _interopRequireDefault(require("../request"));

var _parse = _interopRequireDefault(require("../parse"));

var _config = require("../config");

var _package = _interopRequireDefault(require("../../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CONFIG_PATH = './duoduo/duoduo.request.json';
const DEFAULT_PARSE_PATH = './duoduo/duoduo.request.js';
const BASE_CATCH_PATH = './.vscode/duoduo';
const CATCH_PATH = `${BASE_CATCH_PATH}/v${_package.default.version}`;

async function getOriginPick(config) {
  const originPickItems = config.origins.map(ori => ({
    label: ori.name,
    description: ori.originUrl,
    services: ori.services,
    type: ori.type
  }));
  const origin = await (0, _utils.openSelect)(originPickItems);

  if (!origin) {
    throw new Error('组织选择被取消');
  }

  return origin;
}

async function getServicePick(services) {
  const servicePickItems = services.map(serv => ({
    label: serv.name,
    description: serv.appId,
    detail: serv.serve,
    old: { ...serv
    }
  }));
  const service = await (0, _utils.openSelect)(servicePickItems);

  if (!service) {
    throw new Error('服务选择被取消');
  }

  return service;
}

async function getInterfacePick(interfaceList) {
  const interfacePickItems = interfaceList.map(inter => ({
    label: inter.path,
    description: inter.funDesc,
    detail: inter.funName,
    inter
  }));
  const interfaceInfo = await (0, _utils.openSelect)(interfacePickItems);

  if (!interfaceInfo) {
    throw new Error('接口选择被取消');
  }

  return interfaceInfo;
}

async function getServiceInfo(origin, service) {
  const {
    label: originName,
    description: originUrl,
    type
  } = origin;
  const {
    label: serviceName,
    description: serviceAppId,
    detail: serviceServe
  } = service; // 获取信息

  let httpPath;

  if (type.trim().toLowerCase() === 'swagger2.0') {
    httpPath = `${originUrl}docs` + `/${serviceAppId}`;
  }

  switch (type.trim().toLowerCase()) {
    case 'swagger2.0':
      httpPath = `${originUrl}docs` + `/${serviceAppId}`;
      break;

    case 'tp-doc':
      httpPath = `${originUrl}api/doc/${serviceServe}:${serviceAppId}/`;
      break;

    default:
      throw new Error('配置文件有误，请重新初始化！');
  }

  const data = await (0, _request.default)(httpPath);
  return data;
}

async function getTempPick(config) {
  const {
    temps = []
  } = config;
  const tempPickItems = temps.map(item => ({
    label: item.name,
    path: item.path
  }));
  const temp = await (0, _utils.openSelect)(tempPickItems);

  if (!temp) {
    throw new Error('模板选择被取消');
  }

  const root = (0, _utils.getProjectRoot)();

  const path = _path.default.resolve(root, temp.path); // 去除缓存


  delete require.cache[require.resolve(path)];

  const func = require(path);

  return func;
}
/**
 * 执行模板方法
 * @param {Function} fun 模板方法
 * @param {any} param 方法参数
 */


function execTempFun(fun, param) {
  try {
    const result = fun(param);
    return result;
  } catch (error) {
    throw new Error(`模板文件错误:${error.toString()}`);
  }
}
/**
 * 获取当前文件不存在的依赖的doc字符串
 * @param {object[]} dependences 依赖列表
 * @param {String} fileText 当前文件的内容
 * @param {object} defObject 类型定义对象
 */


function getInterfaceUnExistDepandenceDocStr(dependences, fileText, defObject) {
  const lines = fileText.split('\n');
  const existList = [];
  const results = [];
  lines.forEach(line => {
    const lineInfo = /\*\s+\@typedef\s+(?<type>\S*).*$/g.exec(line);

    if (lineInfo) {
      existList.push(lineInfo.groups.type);
    }
  });
  dependences.forEach(dep => {
    if (!existList.includes(dep)) {
      results.push(defObject[dep].defStr);
    }
  });
  return results.join('\n');
}
/**
 * 获取所有的typedef
 * @param {Object} defObject 类型定义对象
 */


function getAllTypeDefStr(defObject) {
  const resultList = [];

  for (const key in defObject) {
    if (defObject.hasOwnProperty(key)) {
      if (defObject[key]) {
        const element = defObject[key].defStr;
        resultList.push(element);
      }
    }
  }

  return resultList.join('\n');
}
/**
 * @param {vscode.ExtensionContext} context
 */


async function activate(context) {
  // 插入单个接口
  const contextDisposable = _vscode.default.commands.registerTextEditorCommand('duoduorequest.insertModuleRequest', async (textEditor, edit) => {
    try {
      const rootPath = (0, _utils.getProjectRoot)();
      const config = await (0, _utils.readJSONFile)(_path.default.resolve(rootPath, CONFIG_PATH)); // 确定本次获取的组织

      const origin = await getOriginPick(config);
      const {
        type,
        services
      } = origin; // 确定本次生成的服务

      const service = await getServicePick(services); // 获取接口信息

      /**
       * @type {import('../parse').ParseInfo}
       */

      let interfaceInfo;

      const catchFilePath = _path.default.resolve(rootPath, CATCH_PATH, `${service.description}.json`);

      if (_fsExtra.default.existsSync(catchFilePath)) {
        interfaceInfo = await (0, _utils.readJSONFile)(catchFilePath);
      } else {
        // 获取接口信息
        const serviceInfo = await getServiceInfo(origin, service); // 解析对应接口信息

        interfaceInfo = (0, _parse.default)(serviceInfo, type); // 存储接口信息

        (0, _utils.writeFile)(catchFilePath, JSON.stringify(interfaceInfo));
      } // 选择对应接口


      const {
        interfaceList
      } = interfaceInfo;
      const interfacePick = await getInterfacePick(interfaceList);
      const {
        inter
      } = interfacePick; // 选择对应的模板

      const tempFunc = await getTempPick(config); // 将所选服务配置添加进去

      inter.serviceConfig = service.old; // 根据当前文件情况处理接口信息

      inter.typeRefStr = getInterfaceUnExistDepandenceDocStr(inter.depadences, textEditor.document.getText(), interfaceInfo.defObject); // 根据选择的模板生成字符串

      const insertStr = execTempFun(tempFunc, inter); // 将字符串插入当前位置

      textEditor.insertSnippet(new _vscode.default.SnippetString(insertStr));
    } catch (err) {
      (0, _utils.sendErrorMessage)(err.toString());
    }
  }); // 初始化配置


  const initDisposable = _vscode.default.commands.registerCommand('duoduorequest.insertConfig', async () => {
    const rootPath = (0, _utils.getProjectRoot)();

    const configPath = _path.default.resolve(rootPath, CONFIG_PATH);

    const defaultParePath = _path.default.resolve(rootPath, DEFAULT_PARSE_PATH);

    if (_fsExtra.default.existsSync(configPath)) {
      (0, _utils.sendErrorMessage)('配置文件已存在');
      return;
    }

    (0, _utils.writeFile)(configPath, _config.PROJECT_CONFIG);
    (0, _utils.writeFile)(defaultParePath, _config.PROJECT_FUNCTION);
  }); // 清除缓存


  const cleanDisposable = _vscode.default.commands.registerCommand('duoduorequest.cleanCatch', async () => {
    const rootPath = (0, _utils.getProjectRoot)();

    const cleanPath = _path.default.resolve(rootPath, BASE_CATCH_PATH);

    _fsExtra.default.removeSync(cleanPath);

    (0, _utils.sendMessage)('缓存清除成功！');
  }); // 插入所有typedef


  const allTypedefDisposable = _vscode.default.commands.registerCommand('duoduorequest.insertAllTypedef', async () => {
    try {
      const textEditor = _vscode.default.window.activeTextEditor;
      const rootPath = (0, _utils.getProjectRoot)();
      const config = await (0, _utils.readJSONFile)(_path.default.resolve(rootPath, CONFIG_PATH)); // 确定本次获取的组织

      const origin = await getOriginPick(config);
      const {
        type,
        services
      } = origin; // 确定本次生成的服务

      const service = await getServicePick(services); // 获取接口信息

      /**
       * @type {import('../parse').ParseInfo}
       */

      let interfaceInfo;

      const catchFilePath = _path.default.resolve(rootPath, CATCH_PATH, `${service.description}.json`);

      if (_fsExtra.default.existsSync(catchFilePath)) {
        interfaceInfo = await (0, _utils.readJSONFile)(catchFilePath);
      } else {
        // 获取接口信息
        const serviceInfo = await getServiceInfo(origin, service); // 解析对应接口信息

        interfaceInfo = (0, _parse.default)(serviceInfo, type); // 存储接口信息

        (0, _utils.writeFile)(catchFilePath, JSON.stringify(interfaceInfo));
      }

      const {
        defObject
      } = interfaceInfo; // 所有typedef

      const allTypedefStr = getAllTypeDefStr(defObject); // 插入到当前位置

      textEditor.insertSnippet(new _vscode.default.SnippetString(allTypedefStr));
    } catch (err) {
      (0, _utils.sendErrorMessage)(err.toString());
    }
  });

  context.subscriptions.push(contextDisposable);
  context.subscriptions.push(initDisposable);
  context.subscriptions.push(cleanDisposable);
  context.subscriptions.push(allTypedefDisposable);
}
//# sourceMappingURL=activate.js.map