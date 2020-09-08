const vscode = require('vscode');
const vsHelper = require('vscode-helpers')
const Path = require('path')
const FSExtra = require('fs-extra');
const {
  getProjectRoot,
  readJSONFile,
  sendErrorMessage,
  openSelect
} = require('../utils');
const {
  getHttpRequest
} = require('../request');
const parse = require('../parse');


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

async function getInterfacePick(interfaceList){
  const interfacePickItems = interfaceList.map((inter) => {
    return {
      label: inter.funName,
      description: inter.funDesc,
      detail: inter.path,
      inter
    }
  });
  const interfaceInfo = await openSelect(interfacePickItems);
  return interfaceInfo;
}

async function getServiceInfo(origin, service) {
  const {
    label: originName,
    description: originUrl
  } = origin;

  const {label:serviceName,description:serviceAppId} = service;
  const catchFilePath = Path.resolve(getProjectRoot(), originName, serviceName+'.json');
  // 判断对应文件是否存在
  const isCatch = FSExtra.existsSync(catchFilePath);
  // 获取信息
  const httpPath = originUrl+'docs'+'/'+serviceAppId
  const data = await getHttpRequest(httpPath);
  return data;
}

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

  let contextDisposable = vscode.commands.registerTextEditorCommand('duoduorequest.insertModuleRequest', async (textEditor, edit) => {
    try {
      const rootPath = getProjectRoot();
      const config = await readJSONFile(Path.resolve(rootPath, './duoduo/duoduo.request.json'));
      // 确定本次获取的组织
      const origin = await getOriginPick(config);
      const {
        type,
        services
      } = origin;
      // 确定本次生成的服务
      const service = await getServicePick(services);
      // 获取接口信息
      const serviceInfo = await getServiceInfo(origin,service);
      // 解析对应接口信息
      const interfaceInfo = parse(serviceInfo,type);
      // 选择对应接口
      const {interfaceList} = interfaceInfo;
      const interfacePick = await getInterfacePick(interfaceList);
      const {inter} = interfacePick;
      // 选择对应的模板

      // 根据选择的模板生成字符串

      // 将字符串插入当前位置

      console.log(inter.path)
    } catch (err) {
      sendErrorMessage(err);
    }

  });

  context.subscriptions.push(contextDisposable);
}

module.exports = activate;