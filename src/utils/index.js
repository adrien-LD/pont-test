const vscode = require('vscode');
const FSExtra = require('fs-extra');
const Path = require('path')
const vsHelper = require('vscode-helpers')


function getProjectRoot(){
  const root = vscode.workspace.workspaceFolders[0].uri.fsPath;
  return root;
}

function sendErrorMessage(msg){
  vscode.window.showErrorMessage(msg);
}

function sendMessage(msg){
  vscode.window.showInformationMessage(msg);
}

/**
 * 打开快速选项
 * @param {Array<import('vscode').QuickPickItem>} chooseList
 */
function openSelect(chooseList) {
  return vscode.window.showQuickPick(chooseList);
}

/**
 * 读取JSON文件
 * @param {string} path 目录
 */
async function readJSONFile(path){
  return new Promise((resolve,reject)=>{
    FSExtra.readFile(path,(err,data)=>{
      if(err) {
        reject('读取文件失败')
      };
      try {
        const dataStr = data.toString();
        resolve(JSON.parse(dataStr));
      } catch (error) {
        reject('文件格式有误');
      }

    })
  })
}

async function writeFile(path,data){
  return new Promise((resolve,reject)=>{
    FSExtra.writeFile(path,data,(err)=>{
      if(err) reject(err);
      resolve(true);
    })
  })
}

module.exports = {
  getProjectRoot,sendErrorMessage,sendMessage,readJSONFile,openSelect,writeFile
}
