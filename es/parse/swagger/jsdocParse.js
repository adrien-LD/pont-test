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

function deepStringify(refs, defObject) {
  var exist = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var result = [];
  refs.forEach(function (ref) {
    if (!exist[ref]) {
      var def = defObject[ref];
      exist[ref] = true;

      if (def) {
        result.push(ref);
        result = deepStringify(def.dependenceList, defObject, exist).concat(result);
      }
    }
  });
  return result;
}

function getParamsReturnLead() {
  var funDesc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var responses = arguments.length > 2 ? arguments[2] : undefined;
  var defObject = arguments.length > 3 ? arguments[3] : undefined;
  var parameDocList = [];
  var refs = []; // 参数jsdoc解析

  parameters.forEach(function (item) {
    var type = 'any';

    if (item.type) {
      type = translateType(item.type);
    } else if (item.schema) {
      if (item.schema.type) {
        type = translateType(item.schema.type);
      } else if (item.schema.$ref) {
        var refSplitList = item.schema.$ref.split('/');
        var refStr = refSplitList[refSplitList.length - 1];
        type = refStr.replace(/[«|»|,]/g, '_');
        refs.push(type);
      }
    }

    var paramStr = " * @param {".concat(type, "} ").concat(item.name.replace(/-/g, ''), " ").concat(item.description);
    parameDocList.push(paramStr);
  }); // 返回的字符串

  var returnInfo = responses['200'];
  var returnType = 'any';

  if (returnInfo.type) {
    returnType = translateType(returnInfo.type);
  } else if (returnInfo.schema) {
    if (returnInfo.schema.type) {
      returnType = translateType(returnInfo.schema.type);
    } else if (returnInfo.schema.$ref) {
      var returnRefSplitList = returnInfo.schema.$ref.split('/');
      var returnRefStr = returnRefSplitList[returnRefSplitList.length - 1];
      returnType = returnRefStr.replace(/[«|»|,]/g, '_');
      refs.push(returnType);
    }
  } // 被引用的typedef


  var typedefNameList = deepStringify(refs, defObject);
  var paramsReturnLead = "\n/**\n * ".concat(funDesc, "\n").concat(parameDocList.join('\n'), "\n * @returns {Promise<").concat(returnType, ">}\n */");
  return {
    paramsReturnLead: paramsReturnLead,
    typedefNameList: typedefNameList
  };
}
/**
 * 名字
 * @param {*} funDesc 方法描述
 * @param {*} parameters 方法参数信息
 * @param {*} responses 方法返回结果
 * @param {*} defObject typedef的固定结构内容
 */


export default function jsdocParse(funDesc, parameters, responses, defObject) {
  // TODO {yzy} 解决map list等类型的问题 解决根据当前已有的typedef再来生成typedef的问题
  var _getParamsReturnLead = getParamsReturnLead(funDesc, parameters, responses, defObject),
      paramsReturnLead = _getParamsReturnLead.paramsReturnLead,
      typedefNameList = _getParamsReturnLead.typedefNameList;

  return {
    paramsReturnLead: paramsReturnLead,
    typedefNameList: typedefNameList
  };
}
//# sourceMappingURL=jsdocParse.js.map