import { translateType } from './definitions';

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
/**
 * 名字
 * @param {*} funDesc 方法描述
 * @param {*} parameters 方法参数信息
 * @param {*} responses 方法返回结果
 * @param {*} defObject typedef的固定结构内容
 */


export default function jsdocParse(funDesc, parameters, responses, defObject) {
  var parameDocList = [];
  var refs = []; // 参数jsdoc解析

  parameters.forEach(function (item) {
    var type = 'any';
    var entityName = item.entityName;
    var typeResult = translateType(entityName);
    type = typeResult.type;
    refs.push(type.replace(/[<|>]/g, '_'));
    refs = refs.concat(typeResult.dependence);
    var paramStr = " * @param {".concat(type.replace(/[<|>]/g, '_'), "} ").concat(item.name.replace(/-/g, ''), " ").concat(item.comment);
    parameDocList.push(paramStr);
  });
  var returnTypeResult = translateType(responses.entityName);
  var returnType = returnTypeResult.type.replace(/[<|>]/g, '_');
  refs.push(returnType);
  refs = refs.concat(returnTypeResult.dependence); // 被引用的typedef

  var typedefNameList = deepStringify(refs, defObject);
  var paramsReturnLead = "\n/**\n * ".concat(funDesc, "\n").concat(parameDocList.join('\n'), "\n * @returns {Promise<").concat(returnType, ">}\n */");
  return {
    paramsReturnLead: paramsReturnLead,
    typedefNameList: typedefNameList
  };
}
//# sourceMappingURL=jsdocParse.js.map