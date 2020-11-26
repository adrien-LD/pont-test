"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjectRoot = getProjectRoot;
exports.sendErrorMessage = sendErrorMessage;
exports.sendMessage = sendMessage;
exports.openSelect = openSelect;
exports.readJSONFile = readJSONFile;
exports.writeFile = writeFile;

var _vscode = _interopRequireDefault(require("vscode"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-unresolved */
function getProjectRoot() {
  const root = _vscode.default.workspace.workspaceFolders[0].uri.fsPath;
  return root;
}

function sendErrorMessage(msg) {
  _vscode.default.window.showErrorMessage(msg);
}

function sendMessage(msg) {
  _vscode.default.window.showInformationMessage(msg);
}
/**
 * 打开快速选项,只有一个选项时忽略
 * @param {Array<import('vscode').QuickPickItem>} chooseList
 */


function openSelect(chooseList) {
  if (chooseList.length === 1) {
    return chooseList[0];
  }

  return _vscode.default.window.showQuickPick(chooseList);
}
/**
 * 读取JSON文件
 * @param {string} path 目录
 */


async function readJSONFile(path) {
  return new Promise((resolve, reject) => {
    _fsExtra.default.readFile(path, (err, data) => {
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
  const dirList = path.split(_path.default.sep);
  dirList.pop();
  const dirPath = dirList.join(_path.default.sep);
  (0, _mkdirp.default)(dirPath).then(() => {
    _fsExtra.default.writeFile(path, contents, cb);
  }).catch(err => {
    cb(err);
  });
}

async function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    writeFileReal(path, data, err => {
      if (err) reject(err);
      resolve(true);
    });
  });
} // module.exports = {
//   getProjectRoot,
//   sendErrorMessage,
//   sendMessage,
//   readJSONFile,
//   openSelect,
//   writeFile,
// };
//# sourceMappingURL=index.js.map