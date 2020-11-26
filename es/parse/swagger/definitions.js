import { uniqueArr } from '../utils';

function translateType(type) {
  if (!type) return 'any';
  var typeReal = type.trim().toLowerCase();

  switch (typeReal) {
    case 'integer':
    case 'float':
    case 'double':
      return 'number';

    default:
      break;
  }

  return type;
}

function getTypedefStrLine(name, refInfo, leadStr) {
  if (!refInfo) return {};
  var typeStr = refInfo.type;
  var type = typeStr ? typeStr.trim().toLowerCase() : '$ref';
  var refLead = '';
  var dependenceList = [];

  switch (type) {
    case 'object':
      var objStrList = name ? [" * @property {Object} ".concat(leadStr + name)] : [];
      var properties = refInfo.properties,
          additionalProperties = refInfo.additionalProperties;

      for (var prop in properties) {
        if (properties.hasOwnProperty(prop)) {
          var element = properties[prop];
          var addLeadStr = leadStr + name ? "".concat(leadStr + name, ".") : '';

          var _getTypedefStrLine = getTypedefStrLine(prop, element, addLeadStr),
              propStr = _getTypedefStrLine.refLead,
              depe = _getTypedefStrLine.dependenceList;

          dependenceList = dependenceList.concat(depe);
          objStrList.push(propStr);
        }
      }

      if (additionalProperties) {
        if (additionalProperties.type) {
          objStrList = [" * @property {Map<string, ".concat(additionalProperties.type, ">} ").concat(leadStr + name)];
          dependenceList.push(additionalProperties.type.replace(/[«|»|,]/g, '_'));
        }

        if (additionalProperties.$ref) {
          var list = additionalProperties.$ref.split('/');
          var splitRefStr = list[list.length - 1].replace(/[«|»|,]/g, '_');
          objStrList = [" * @property {".concat(splitRefStr, "} ").concat(leadStr + name)];
          dependenceList.push(splitRefStr);
        }
      }

      refLead = objStrList.join('\n');
      break;

    case 'array':
      var arrType = refInfo.items.type;

      if (!arrType) {
        var _refStrSpliteList = refInfo.items.$ref.split('/');

        arrType = _refStrSpliteList[_refStrSpliteList.length - 1].replace(/[«|»|,]/g, '_');
        dependenceList.push(arrType);
      }

      refLead = " * @property {".concat(translateType(arrType), "[]} ").concat(leadStr + name);
      break;

    case '$ref':
      var refStrSpliteList = refInfo.$ref.split('/');
      var refRealStr = refStrSpliteList[refStrSpliteList.length - 1].replace(/[«|»|,]/g, '_');
      dependenceList.push(refRealStr);
      refLead = " * @property {".concat(refRealStr, "} ").concat(leadStr + name);
      break;

    case 'string':
    case 'boolean':
    case 'integer':
      refLead = " * @property {".concat(translateType(type), "} ").concat(leadStr + name);
      break;

    default:
      dependenceList.push(type);
      refLead = " * @property {".concat(translateType(type), "} ").concat(leadStr + name);
  }

  return {
    refLead: refLead,
    dependenceList: dependenceList
  };
}
/**
 * 获取引用的jsdoc字符串和依赖
 * @param {string} ref 引用的名称
 * @param {any} refInfo
 */


function getTypedefObj(ref, refInfo) {
  var _getTypedefStrLine2 = getTypedefStrLine('', refInfo, ''),
      refLead = _getTypedefStrLine2.refLead,
      dependenceList = _getTypedefStrLine2.dependenceList;

  if (!refLead) {
    return null;
  }

  var defStr = "\n/**\n * @typedef ".concat(ref.replace(/[«|»|,]/g, '_'), "\n").concat(refLead, "\n */");
  return {
    defStr: defStr,
    dependenceList: uniqueArr(dependenceList)
  };
}

function definitionsParse(definitions) {
  var result = {};

  for (var defKey in definitions) {
    if (definitions.hasOwnProperty(defKey)) {
      var defInfo = definitions[defKey];
      var typedefObj = getTypedefObj(defKey, defInfo);

      if (typedefObj) {
        result[defKey.replace(/[«|»|,]/g, '_')] = typedefObj;
      }
    }
  }

  return result;
}

module.exports = definitionsParse;
//# sourceMappingURL=definitions.js.map