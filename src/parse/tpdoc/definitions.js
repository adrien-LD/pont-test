const {
  uniqueArr
} = require("../utils");


function translateType(type) {
  if (!type) return {type:'any',dependence:[]};
  let result = type;
  let dependence=[];
  const typeReal = type.trim().toLowerCase();
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
  if(/^java.util.List<(?<generic>.+)>/g.test(type)){
    const reg = /^java.util.List<(?<generic>.+)>/g.exec(type);
    if(reg.groups){
      const insideType = reg.groups.generic;
      const mResult = translateType(insideType);
      if(mResult.type===insideType){
        dependence.push(insideType);
      }
      dependence = dependence.concat(mResult.dependence);
      result = `${mResult.type}[]`;
    }
  }

  if(/^java.util.Map<(?<generic1>.+), (?<generic2>.+)>/g.test(type)){
    const reg = /^java.util.List<(?<generic>.+)>/g.exec(type);
    if(reg.groups){
      const insideType2 = reg.groups.generic2;
      const mResult = translateType(insideType2);
      if(mResult.type===insideType2){
        dependence.push(insideType2);
      }
      dependence = dependence.concat(mResult.dependence);
      result = `Map<string, ${mResult.type}>`;
    }
  }
  return {type:result,dependence};
}

function getTypedefStrLine(refInfo) {
  if (!refInfo) return {};
  const {
    fields = [], parameteredEntityRefs = []
  } = refInfo;
  const refLeadList = [];
  let dependenceList = [];

  fields.forEach((field) => {
    const {
      entityName,
      name,
      comment
    } = field;
    const typeResult = translateType(entityName);
    const _comment = comment ? ' '+comment.trim() : '';
    refLeadList.push(` * @property {${typeResult.type}} ${name}${_comment}`);
    if(entityName===typeResult.type){
      dependenceList.push(typeResult.type);
    }
    dependenceList = dependenceList.concat(typeResult.dependence)
  });

  parameteredEntityRefs.forEach((depend) => {
    const {
      entityName
    } = depend;
    const name = entityName;
    if (name === translateType(name).type) {
      dependenceList.push(name);
    }
  })

  return {
    refLead: refLeadList.join('\n'),
    dependenceList
  };
}

/**
 * 获取引用的jsdoc字符串和依赖
 * @param {string} ref 引用的名称
 * @param {any} refInfo
 */
function getTypedefObj(ref, refInfo) {

  const {
    refLead,
    dependenceList
  } = getTypedefStrLine(refInfo);

  if (!refLead) {
    return null;
  }

  const comment = refInfo.comment ? ' '+refInfo.comment : '';

  const defStr = `
/**
 * @typedef ${ref.replace(/[<|>]/g, "_")}${comment}
${refLead}
 */`;

  return {
    defStr,
    dependenceList: uniqueArr(dependenceList),
  }
}

function definitionsParse(definitions = []) {

  const result = {};

  definitions.forEach((def) => {
    result[def.name.replace(/[<|>]/g, "_")] = getTypedefObj(def.name, def)
  })
  return result;
}

module.exports = {definitionsParse,translateType};