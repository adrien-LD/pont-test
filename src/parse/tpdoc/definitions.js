const {
  uniqueArr
} = require("../utils");


function translateType(type) {
  if (!type) return 'any'
  const typeReal = type.trim().toLowerCase();
  switch (typeReal) {
    case 'java.lang.long':
    case 'java.lang.integer':
    case 'java.lang.float':
    case 'java.lang.double':
      return 'number';
    case 'java.lang.string':
      return 'String';
    case 'java.lang.boolean':
      return 'boolean';
    case 'java.lang.void':
      return 'void';
    default:
      break;
  }
  return type;
}

function getTypedefStrLine(refInfo) {
  if (!refInfo) return {};
  const {
    fields = [], parameteredEntityRefs = []
  } = refInfo;
  const refLeadList = [];
  const dependenceList = [];

  fields.forEach((field) => {
    const {
      entityName,
      name,
      comment
    } = field;
    const type = translateType(entityName);
    const _comment = comment ? ' '+comment.trim() : '';
    refLeadList.push(` * @property {${type}} ${name}${_comment}`);
  });

  parameteredEntityRefs.forEach((depend) => {
    const {
      entityName
    } = depend;
    const name = entityName.trim().toLowerCase();
    if (name === translateType(name)) {
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
 * @typedef ${ref}${comment}
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
    result[def.name] = getTypedefObj(def.name, def)
  })
  return result;
}

module.exports = {definitionsParse,translateType};