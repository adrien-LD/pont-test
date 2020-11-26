function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable import/no-unresolved */
import vscode from 'vscode';
import FSExtra from 'fs-extra';
import mkdirp from 'mkdirp';
import Path from 'path';
export function getProjectRoot() {
  var root = vscode.workspace.workspaceFolders[0].uri.fsPath;
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

export function readJSONFile(_x) {
  return _readJSONFile.apply(this, arguments);
}
/**
 * 写文件
 * @param {String} path 路径
 * @param {String} contents 内容
 * @param {Function} cb 回调
 */

function _readJSONFile() {
  _readJSONFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              FSExtra.readFile(path, function (err, data) {
                if (err) {
                  reject(new Error('读取文件失败'));
                }

                try {
                  var dataStr = data.toString();
                  resolve(JSON.parse(dataStr));
                } catch (error) {
                  reject(new Error('文件格式有误'));
                }
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _readJSONFile.apply(this, arguments);
}

function writeFileReal(path, contents, cb) {
  var dirList = path.split(Path.sep);
  dirList.pop();
  var dirPath = dirList.join(Path.sep);
  mkdirp(dirPath).then(function () {
    FSExtra.writeFile(path, contents, cb);
  }).catch(function (err) {
    cb(err);
  });
}

export function writeFile(_x2, _x3) {
  return _writeFile.apply(this, arguments);
} // module.exports = {
//   getProjectRoot,
//   sendErrorMessage,
//   sendMessage,
//   readJSONFile,
//   openSelect,
//   writeFile,
// };

function _writeFile() {
  _writeFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(path, data) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              writeFileReal(path, data, function (err) {
                if (err) reject(err);
                resolve(true);
              });
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _writeFile.apply(this, arguments);
}
//# sourceMappingURL=index.js.map