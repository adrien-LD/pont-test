const vscode = require('vscode');
const Path = require('path')
const FSExtra = require('fs-extra');
const {
  getProjectRoot,
  readJSONFile,
  sendErrorMessage,
  openSelect,
  writeFile
} = require('../utils');
const {
  getHttpRequest
} = require('../request');
const parse = require('../parse');
const {
  PROJECT_FUNCTION,
  PROJECT_CONFIG
} = require('../config');

const CONFIG_PATH = './duoduo/duoduo.request.json';
const DEFAULT_PARSE_PATH = './duoduo/duoduo.request.js';
const CATCH_PATH = './.vscode/duoduo';

async function getOriginPick(config) {
  const originPickItems = config.origins.map((ori) => {
    return {
      label: ori.name,
      description: ori.originUrl,
      services: ori.services,
      type: ori.type
    }
  })
  const origin = await openSelect(originPickItems);
  return origin;
}

async function getServicePick(services) {
  const servicePickItems = services.map((serv) => {
    return {
      label: serv.name,
      description: serv.appId,
      detail: serv.serve
    }
  });
  const service = await openSelect(servicePickItems);
  return service;
}

async function getInterfacePick(interfaceList) {
  const interfacePickItems = interfaceList.map((inter) => {
    return {
      label: inter.path,
      description: inter.funDesc,
      detail: inter.funName,
      inter
    }
  });
  const interfaceInfo = await openSelect(interfacePickItems);
  return interfaceInfo;
}

async function getServiceInfo(origin, service) {
  const {
    label: originName,
    description: originUrl,
    type,
  } = origin;

  const {
    label: serviceName,
    description: serviceAppId,
    detail: serviceServe,
  } = service;
  // 获取信息
  let httpPath;
  if (type.trim().toLowerCase() === 'swagger2.0') {
    httpPath = originUrl + 'docs' + '/' + serviceAppId;
  }
  switch (type.trim().toLowerCase()) {
    case 'swagger2.0':
      httpPath = originUrl + 'docs' + '/' + serviceAppId;
      break;
    case 'tp-doc':
      httpPath = originUrl + 'api/doc/' + serviceServe+':'+serviceAppId+'/';
      break;

    default:
      throw new Error('配置文件有误，请重新初始化！');
  }
  const data = await getHttpRequest(httpPath);
  return data;
}

async function getTempPick(config) {
  const {
    temps = []
  } = config;

  const tempPickItems = temps.map((item) => ({
    label: item.name,
    path: item.path
  }));
  const temp = await openSelect(tempPickItems);
  const root = getProjectRoot();
  const path = Path.resolve(root, temp.path);
  // 去除缓存
  delete require.cache[require.resolve(path)];
  const func = require(path);
  return func;
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
  lines.forEach((line) => {
    const lineInfo = (/\*\s+\@typedef\s+(?<type>\S*).*$/g).exec(line);
    if (lineInfo) {
      existList.push(lineInfo.groups.type);
    }
  });

  dependences.forEach((dep) => {
    if (!existList.includes(dep)) {
      results.push(defObject[dep].defStr);
    }
  })

  return results.join('\n');
}

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

  // 插入单个接口
  let contextDisposable = vscode.commands.registerTextEditorCommand('duoduorequest.insertModuleRequest', async (textEditor, edit) => {
    try {
      const rootPath = getProjectRoot();
      const config = await readJSONFile(Path.resolve(rootPath, CONFIG_PATH));
      // 确定本次获取的组织
      const origin = await getOriginPick(config);
      const {
        type,
        services
      } = origin;
      // 确定本次生成的服务
      const service = await getServicePick(services);

      // 获取接口信息
      /**
       * @type {import('../parse').ParseInfo}
       */
      let interfaceInfo;
      const catchFilePath = Path.resolve(rootPath, CATCH_PATH, service.description + '.json');
      if (FSExtra.existsSync(catchFilePath)) {
        interfaceInfo = await readJSONFile(catchFilePath);
      } else {
        // 获取接口信息
        const serviceInfo = await getServiceInfo(origin, service);
        // 解析对应接口信息
        interfaceInfo = parse(serviceInfo, type);
        // 存储接口信息
        writeFile(catchFilePath, JSON.stringify(interfaceInfo));
      }

      // 选择对应接口
      const {
        interfaceList
      } = interfaceInfo;
      const interfacePick = await getInterfacePick(interfaceList);
      const {
        inter
      } = interfacePick;
      // 选择对应的模板
      const tempFunc = await getTempPick(config);
      // 根据当前文件情况处理接口信息
      inter.leadDoc = getInterfaceUnExistDepandenceDocStr(inter.depadences, textEditor.document.getText(), interfaceInfo.defObject) + inter.leadDoc;
      // 根据选择的模板生成字符串
      const insertStr = tempFunc(inter);
      // 将字符串插入当前位置
      textEditor.insertSnippet(new vscode.SnippetString(insertStr))
    } catch (err) {
      sendErrorMessage(err);
    }

  });

  // 初始化配置
  const initDisposable = vscode.commands.registerCommand('duoduorequest.insertConfig', async () => {
    const rootPath = getProjectRoot();
    const configPath = Path.resolve(rootPath, CONFIG_PATH);
    const defaultParePath = Path.resolve(rootPath, DEFAULT_PARSE_PATH);
    if (FSExtra.existsSync(configPath)) {
      sendErrorMessage('配置文件已存在');
      return;
    }

    writeFile(configPath, PROJECT_CONFIG);

    writeFile(defaultParePath, PROJECT_FUNCTION);
  })
  context.subscriptions.push(contextDisposable);
  context.subscriptions.push(initDisposable);
}

module.exports = activate;