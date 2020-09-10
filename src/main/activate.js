const vscode = require('vscode');
const vsHelper = require('vscode-helpers')
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

const CONFIG_PATH = './duoduo/duoduo.request.json';
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

async function getInterfacePick(interfaceList){
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
    description: originUrl
  } = origin;

  const {label:serviceName,description:serviceAppId} = service;
  // 获取信息
  const httpPath = originUrl+'docs'+'/'+serviceAppId
  const data = await getHttpRequest(httpPath);
  return data;
}

async function getTempPick(config){
  const {temps=[]}=config;

  const tempPickItems = temps.map((item)=>({label:item.name,path:item.path}));
  const temp = await openSelect(tempPickItems);
  const root = getProjectRoot();
  const path = Path.resolve(root,temp.path);
  // 去除缓存
  delete require.cache[require.resolve(path)];
  const func = require(path);
  return func;
}

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

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
      let interfaceInfo;
      const catchFilePath = Path.resolve(rootPath,CATCH_PATH,service.description+'.json');
      if(FSExtra.existsSync(catchFilePath)){
        interfaceInfo = await readJSONFile(catchFilePath);
      }else{
        // 获取接口信息
      const serviceInfo = await getServiceInfo(origin,service);
      // 解析对应接口信息
      interfaceInfo = parse(serviceInfo,type);
      writeFile(catchFilePath,JSON.stringify(interfaceInfo));
      }

      // 选择对应接口
      const {interfaceList} = interfaceInfo;
      const interfacePick = await getInterfacePick(interfaceList);
      const {inter} = interfacePick;
      // 选择对应的模板
      const tempFunc = await getTempPick(config);
      // 根据选择的模板生成字符串
      const insertStr = tempFunc(inter);
      // 将字符串插入当前位置
      textEditor.insertSnippet(new vscode.SnippetString(insertStr))
    } catch (err) {
      sendErrorMessage(err);
    }

  });

  context.subscriptions.push(contextDisposable);
}

module.exports = activate;