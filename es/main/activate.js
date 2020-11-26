function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _RegExp = _wrapNativeSuper(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = _RegExp.call(this, re, flags); _groups.set(_this, groups || _groups.get(re)); return _this; } _inherits(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (_typeof(args[args.length - 1]) !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import vscode from 'vscode';
import Path from 'path';
import FSExtra from 'fs-extra';
import { getProjectRoot, readJSONFile, sendErrorMessage, openSelect, writeFile, sendMessage } from '../utils';
import getHttpRequest from '../request';
import parse from '../parse';
import { PROJECT_FUNCTION, PROJECT_CONFIG } from '../config';
import packageInfo from '../../package.json';
var CONFIG_PATH = './duoduo/duoduo.request.json';
var DEFAULT_PARSE_PATH = './duoduo/duoduo.request.js';
var BASE_CATCH_PATH = './.vscode/duoduo';
var CATCH_PATH = "".concat(BASE_CATCH_PATH, "/v").concat(packageInfo.version);

function getOriginPick(_x) {
  return _getOriginPick.apply(this, arguments);
}

function _getOriginPick() {
  _getOriginPick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(config) {
    var originPickItems, origin;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            originPickItems = config.origins.map(function (ori) {
              return {
                label: ori.name,
                description: ori.originUrl,
                services: ori.services,
                type: ori.type
              };
            });
            _context.next = 3;
            return openSelect(originPickItems);

          case 3:
            origin = _context.sent;

            if (origin) {
              _context.next = 6;
              break;
            }

            throw new Error('组织选择被取消');

          case 6:
            return _context.abrupt("return", origin);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getOriginPick.apply(this, arguments);
}

function getServicePick(_x2) {
  return _getServicePick.apply(this, arguments);
}

function _getServicePick() {
  _getServicePick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(services) {
    var servicePickItems, service;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            servicePickItems = services.map(function (serv) {
              return {
                label: serv.name,
                description: serv.appId,
                detail: serv.serve,
                old: _objectSpread({}, serv)
              };
            });
            _context2.next = 3;
            return openSelect(servicePickItems);

          case 3:
            service = _context2.sent;

            if (service) {
              _context2.next = 6;
              break;
            }

            throw new Error('服务选择被取消');

          case 6:
            return _context2.abrupt("return", service);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getServicePick.apply(this, arguments);
}

function getInterfacePick(_x3) {
  return _getInterfacePick.apply(this, arguments);
}

function _getInterfacePick() {
  _getInterfacePick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(interfaceList) {
    var interfacePickItems, interfaceInfo;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            interfacePickItems = interfaceList.map(function (inter) {
              return {
                label: inter.path,
                description: inter.funDesc,
                detail: inter.funName,
                inter: inter
              };
            });
            _context3.next = 3;
            return openSelect(interfacePickItems);

          case 3:
            interfaceInfo = _context3.sent;

            if (interfaceInfo) {
              _context3.next = 6;
              break;
            }

            throw new Error('接口选择被取消');

          case 6:
            return _context3.abrupt("return", interfaceInfo);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getInterfacePick.apply(this, arguments);
}

function getServiceInfo(_x4, _x5) {
  return _getServiceInfo.apply(this, arguments);
}

function _getServiceInfo() {
  _getServiceInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(origin, service) {
    var originName, originUrl, type, serviceName, serviceAppId, serviceServe, httpPath, data;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            originName = origin.label, originUrl = origin.description, type = origin.type;
            serviceName = service.label, serviceAppId = service.description, serviceServe = service.detail; // 获取信息

            if (type.trim().toLowerCase() === 'swagger2.0') {
              httpPath = "".concat(originUrl, "docs") + "/".concat(serviceAppId);
            }

            _context4.t0 = type.trim().toLowerCase();
            _context4.next = _context4.t0 === 'swagger2.0' ? 6 : _context4.t0 === 'tp-doc' ? 8 : 10;
            break;

          case 6:
            httpPath = "".concat(originUrl, "docs") + "/".concat(serviceAppId);
            return _context4.abrupt("break", 11);

          case 8:
            httpPath = "".concat(originUrl, "api/doc/").concat(serviceServe, ":").concat(serviceAppId, "/");
            return _context4.abrupt("break", 11);

          case 10:
            throw new Error('配置文件有误，请重新初始化！');

          case 11:
            _context4.next = 13;
            return getHttpRequest(httpPath);

          case 13:
            data = _context4.sent;
            return _context4.abrupt("return", data);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getServiceInfo.apply(this, arguments);
}

function getTempPick(_x6) {
  return _getTempPick.apply(this, arguments);
}
/**
 * 执行模板方法
 * @param {Function} fun 模板方法
 * @param {any} param 方法参数
 */


function _getTempPick() {
  _getTempPick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(config) {
    var _config$temps, temps, tempPickItems, temp, root, path, func;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _config$temps = config.temps, temps = _config$temps === void 0 ? [] : _config$temps;
            tempPickItems = temps.map(function (item) {
              return {
                label: item.name,
                path: item.path
              };
            });
            _context5.next = 4;
            return openSelect(tempPickItems);

          case 4:
            temp = _context5.sent;

            if (temp) {
              _context5.next = 7;
              break;
            }

            throw new Error('模板选择被取消');

          case 7:
            root = getProjectRoot();
            path = Path.resolve(root, temp.path); // 去除缓存

            delete require.cache[require.resolve(path)];
            func = require(path);
            return _context5.abrupt("return", func);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getTempPick.apply(this, arguments);
}

function execTempFun(fun, param) {
  try {
    var result = fun(param);
    return result;
  } catch (error) {
    throw new Error("\u6A21\u677F\u6587\u4EF6\u9519\u8BEF:".concat(error.toString()));
  }
}
/**
 * 获取当前文件不存在的依赖的doc字符串
 * @param {object[]} dependences 依赖列表
 * @param {String} fileText 当前文件的内容
 * @param {object} defObject 类型定义对象
 */


function getInterfaceUnExistDepandenceDocStr(dependences, fileText, defObject) {
  var lines = fileText.split('\n');
  var existList = [];
  var results = [];
  lines.forEach(function (line) {
    var lineInfo = /*#__PURE__*/_wrapRegExp(/\*[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+@typedef[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+([\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uFEFE\uFF00-\uFFFF]*).*$/g, {
      type: 1
    }).exec(line);

    if (lineInfo) {
      existList.push(lineInfo.groups.type);
    }
  });
  dependences.forEach(function (dep) {
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
  var resultList = [];

  for (var key in defObject) {
    if (defObject.hasOwnProperty(key)) {
      if (defObject[key]) {
        var element = defObject[key].defStr;
        resultList.push(element);
      }
    }
  }

  return resultList.join('\n');
}
/**
 * @param {vscode.ExtensionContext} context
 */


export default function activate(_x7) {
  return _activate.apply(this, arguments);
}

function _activate() {
  _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(context) {
    var contextDisposable, initDisposable, cleanDisposable, allTypedefDisposable;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            // 插入单个接口
            contextDisposable = vscode.commands.registerTextEditorCommand('duoduorequest.insertModuleRequest', /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(textEditor, edit) {
                var rootPath, config, origin, type, services, service, interfaceInfo, catchFilePath, serviceInfo, _interfaceInfo, interfaceList, interfacePick, inter, tempFunc, insertStr;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.prev = 0;
                        rootPath = getProjectRoot();
                        _context6.next = 4;
                        return readJSONFile(Path.resolve(rootPath, CONFIG_PATH));

                      case 4:
                        config = _context6.sent;
                        _context6.next = 7;
                        return getOriginPick(config);

                      case 7:
                        origin = _context6.sent;
                        type = origin.type, services = origin.services; // 确定本次生成的服务

                        _context6.next = 11;
                        return getServicePick(services);

                      case 11:
                        service = _context6.sent;
                        catchFilePath = Path.resolve(rootPath, CATCH_PATH, "".concat(service.description, ".json"));

                        if (!FSExtra.existsSync(catchFilePath)) {
                          _context6.next = 19;
                          break;
                        }

                        _context6.next = 16;
                        return readJSONFile(catchFilePath);

                      case 16:
                        interfaceInfo = _context6.sent;
                        _context6.next = 24;
                        break;

                      case 19:
                        _context6.next = 21;
                        return getServiceInfo(origin, service);

                      case 21:
                        serviceInfo = _context6.sent;
                        // 解析对应接口信息
                        interfaceInfo = parse(serviceInfo, type); // 存储接口信息

                        writeFile(catchFilePath, JSON.stringify(interfaceInfo));

                      case 24:
                        // 选择对应接口
                        _interfaceInfo = interfaceInfo, interfaceList = _interfaceInfo.interfaceList;
                        _context6.next = 27;
                        return getInterfacePick(interfaceList);

                      case 27:
                        interfacePick = _context6.sent;
                        inter = interfacePick.inter; // 选择对应的模板

                        _context6.next = 31;
                        return getTempPick(config);

                      case 31:
                        tempFunc = _context6.sent;
                        // 将所选服务配置添加进去
                        inter.serviceConfig = service.old; // 根据当前文件情况处理接口信息

                        inter.typeRefStr = getInterfaceUnExistDepandenceDocStr(inter.depadences, textEditor.document.getText(), interfaceInfo.defObject); // 根据选择的模板生成字符串

                        insertStr = execTempFun(tempFunc, inter); // 将字符串插入当前位置

                        textEditor.insertSnippet(new vscode.SnippetString(insertStr));
                        _context6.next = 41;
                        break;

                      case 38:
                        _context6.prev = 38;
                        _context6.t0 = _context6["catch"](0);
                        sendErrorMessage(_context6.t0.toString());

                      case 41:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, null, [[0, 38]]);
              }));

              return function (_x8, _x9) {
                return _ref.apply(this, arguments);
              };
            }()); // 初始化配置

            initDisposable = vscode.commands.registerCommand('duoduorequest.insertConfig', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              var rootPath, configPath, defaultParePath;
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      rootPath = getProjectRoot();
                      configPath = Path.resolve(rootPath, CONFIG_PATH);
                      defaultParePath = Path.resolve(rootPath, DEFAULT_PARSE_PATH);

                      if (!FSExtra.existsSync(configPath)) {
                        _context7.next = 6;
                        break;
                      }

                      sendErrorMessage('配置文件已存在');
                      return _context7.abrupt("return");

                    case 6:
                      writeFile(configPath, PROJECT_CONFIG);
                      writeFile(defaultParePath, PROJECT_FUNCTION);

                    case 8:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7);
            }))); // 清除缓存

            cleanDisposable = vscode.commands.registerCommand('duoduorequest.cleanCatch', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var rootPath, cleanPath;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      rootPath = getProjectRoot();
                      cleanPath = Path.resolve(rootPath, BASE_CATCH_PATH);
                      FSExtra.removeSync(cleanPath);
                      sendMessage('缓存清除成功！');

                    case 4:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8);
            }))); // 插入所有typedef

            allTypedefDisposable = vscode.commands.registerCommand('duoduorequest.insertAllTypedef', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              var textEditor, rootPath, config, origin, type, services, service, interfaceInfo, catchFilePath, serviceInfo, _interfaceInfo2, defObject, allTypedefStr;

              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.prev = 0;
                      textEditor = vscode.window.activeTextEditor;
                      rootPath = getProjectRoot();
                      _context9.next = 5;
                      return readJSONFile(Path.resolve(rootPath, CONFIG_PATH));

                    case 5:
                      config = _context9.sent;
                      _context9.next = 8;
                      return getOriginPick(config);

                    case 8:
                      origin = _context9.sent;
                      type = origin.type, services = origin.services; // 确定本次生成的服务

                      _context9.next = 12;
                      return getServicePick(services);

                    case 12:
                      service = _context9.sent;
                      catchFilePath = Path.resolve(rootPath, CATCH_PATH, "".concat(service.description, ".json"));

                      if (!FSExtra.existsSync(catchFilePath)) {
                        _context9.next = 20;
                        break;
                      }

                      _context9.next = 17;
                      return readJSONFile(catchFilePath);

                    case 17:
                      interfaceInfo = _context9.sent;
                      _context9.next = 25;
                      break;

                    case 20:
                      _context9.next = 22;
                      return getServiceInfo(origin, service);

                    case 22:
                      serviceInfo = _context9.sent;
                      // 解析对应接口信息
                      interfaceInfo = parse(serviceInfo, type); // 存储接口信息

                      writeFile(catchFilePath, JSON.stringify(interfaceInfo));

                    case 25:
                      _interfaceInfo2 = interfaceInfo, defObject = _interfaceInfo2.defObject; // 所有typedef

                      allTypedefStr = getAllTypeDefStr(defObject); // 插入到当前位置

                      textEditor.insertSnippet(new vscode.SnippetString(allTypedefStr));
                      _context9.next = 33;
                      break;

                    case 30:
                      _context9.prev = 30;
                      _context9.t0 = _context9["catch"](0);
                      sendErrorMessage(_context9.t0.toString());

                    case 33:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9, null, [[0, 30]]);
            })));
            context.subscriptions.push(contextDisposable);
            context.subscriptions.push(initDisposable);
            context.subscriptions.push(cleanDisposable);
            context.subscriptions.push(allTypedefDisposable);

          case 8:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _activate.apply(this, arguments);
}
//# sourceMappingURL=activate.js.map