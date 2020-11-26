function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import { uniqueArr } from '../utils';
export function translateType(type) {
  if (!type) return {
    type: 'any',
    dependence: []
  };
  var result = type;
  var dependence = [];
  var typeReal = type.trim().toLowerCase();

  switch (typeReal) {
    case 'int':
    case 'float':
    case 'double':
    case 'long':
    case 'java.lang.long':
    case 'java.lang.integer':
    case 'java.lang.float':
    case 'java.lang.double':
      result = 'number';
      break;

    case 'java.lang.string':
      result = 'String';
      break;

    case 'java.lang.boolean':
      result = 'boolean';
      break;

    case 'java.lang.void':
      result = 'void';
      break;

    default:
      break;
  }

  if (/^java.util.List<(.+)>/g.test(type)) {
    var reg = /*#__PURE__*/_wrapRegExp(/^java.util.List<(.+)>/g, {
      generic: 1
    }).exec(type) || {};

    if (reg.groups) {
      var insideType = reg.groups.generic;
      var mResult = translateType(insideType);

      if (mResult.type === insideType) {
        dependence.push(insideType);
      }

      dependence = dependence.concat(mResult.dependence);
      result = "".concat(mResult.type, "[]");
    }
  }

  if (/^java.util.Map<(.+), (.+)>/g.test(type)) {
    var _reg = /*#__PURE__*/_wrapRegExp(/^java.util.List<(.+)>/g, {
      generic: 1
    }).exec(type) || {};

    if (_reg.groups) {
      var insideType2 = _reg.groups.generic2;

      var _mResult = translateType(insideType2);

      if (_mResult.type === insideType2) {
        dependence.push(insideType2);
      }

      dependence = dependence.concat(_mResult.dependence);
      result = "Map<string, ".concat(_mResult.type, ">");
    }
  }

  return {
    type: result,
    dependence: dependence
  };
}

function getTypedefStrLine(refInfo) {
  if (!refInfo) return {};
  var _refInfo$fields = refInfo.fields,
      fields = _refInfo$fields === void 0 ? [] : _refInfo$fields,
      _refInfo$parameteredE = refInfo.parameteredEntityRefs,
      parameteredEntityRefs = _refInfo$parameteredE === void 0 ? [] : _refInfo$parameteredE;
  var refLeadList = [];
  var dependenceList = [];
  fields.forEach(function (field) {
    var entityName = field.entityName,
        name = field.name,
        comment = field.comment;
    var typeResult = translateType(entityName);

    var _comment = comment ? " ".concat(comment.trim()) : '';

    refLeadList.push(" * @property {".concat(typeResult.type, "} ").concat(name).concat(_comment));

    if (entityName === typeResult.type) {
      dependenceList.push(typeResult.type);
    }

    dependenceList = dependenceList.concat(typeResult.dependence);
  });
  parameteredEntityRefs.forEach(function (depend) {
    var entityName = depend.entityName;
    var name = entityName;

    if (name === translateType(name).type) {
      dependenceList.push(name);
    }
  });
  return {
    refLead: refLeadList.join('\n'),
    dependenceList: dependenceList
  };
}
/**
 * 获取引用的jsdoc字符串和依赖
 * @param {string} ref 引用的名称
 * @param {any} refInfo
 */


function getTypedefObj(ref, refInfo) {
  var _getTypedefStrLine = getTypedefStrLine(refInfo),
      refLead = _getTypedefStrLine.refLead,
      dependenceList = _getTypedefStrLine.dependenceList;

  if (!refLead) {
    return null;
  }

  var comment = refInfo.comment ? " ".concat(refInfo.comment) : '';
  var defStr = "\n/**\n * @typedef ".concat(ref.replace(/[<|>]/g, '_')).concat(comment, "\n").concat(refLead, "\n */");
  return {
    defStr: defStr,
    dependenceList: uniqueArr(dependenceList)
  };
}

export function definitionsParse() {
  var definitions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var result = {};
  definitions.forEach(function (def) {
    result[def.name.replace(/[<|>]/g, '_')] = getTypedefObj(def.name, def);
  });
  return result;
}
//# sourceMappingURL=definitions.js.map