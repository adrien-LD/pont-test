/* eslint-disable import/no-unresolved */
import vscode from 'vscode';
import FSExtra from 'fs-extra';
import mkdirp from 'mkdirp';
import Path from 'path';

export function getProjectRoot() {
  const root = vscode.workspace.workspaceFolders[0].uri.fsPath;
  return root;
}

export function sendErrorMessage(msg) {
  vscode.window.showErrorMessage(msg);
}

export function sendMessage(msg) {
  vscode.window.showInformationMessage(msg);
}

/**
 * 打开快速选项,只有一个选项时忽略
 * @param {Array<import('vscode').QuickPickItem>} chooseList
 */
export function openSelect(chooseList) {
  if (chooseList.length === 1) {
    return chooseList[0];
  }
  return vscode.window.showQuickPick(chooseList);
}

/**
 * 读取JSON文件
 * @param {string} path 目录
 */
export async function readJSONFile(path) {
  return new Promise((resolve, reject) => {
    FSExtra.readFile(path, (err, data) => {
      if (err) {
        reject(new Error('读取文件失败'));
      }
      try {
        const dataStr = data.toString();
        resolve(JSON.parse(dataStr));
      } catch (error) {
        reject(new Error('文件格式有误'));
      }
    });
  });
}

/**
 * 写文件
 * @param {String} path 路径
 * @param {String} contents 内容
 * @param {Function} cb 回调
 */
function writeFileReal(path, contents, cb) {
  const dirList = path.split(Path.sep);
  dirList.pop();
  const dirPath = dirList.join(Path.sep);
  mkdirp(dirPath).then(() => {
    FSExtra.writeFile(path, contents, cb);
  }).catch((err) => {
    cb(err);
  });
}

export async function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    writeFileReal(path, data, (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
}
