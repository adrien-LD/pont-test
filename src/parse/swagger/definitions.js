import { uniqueArr } from '../utils';

function translateType(type) {
  if (!type) return 'any';
  const typeReal = type.trim().toLowerCase();
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
  const typeStr = refInfo.type;
  const type = typeStr ? typeStr.trim().toLowerCase() : '$ref';
  let refLead = '';
  let dependenceList = [];

  switch (type) {
    case 'object':
      let objStrList = name ? [` * @property {Object} ${leadStr + name}`] : [];
      const {
        properties, additionalProperties,
      } = refInfo;
      for (const prop in properties) {
        if (properties.hasOwnProperty(prop)) {
          const element = properties[prop];
          const addLeadStr = leadStr + name ? `${leadStr + name}.` : '';
          const {
            refLead: propStr,
            dependenceList: depe,
          } = getTypedefStrLine(prop, element, addLeadStr);
          dependenceList = dependenceList.concat(depe);
          objStrList.push(propStr);
        }
      }

      if (additionalProperties) {
        if (additionalProperties.type) {
          objStrList = [` * @property {Map<string, ${additionalProperties.type}>} ${leadStr + name}`];
          dependenceList.push(additionalProperties.type.replace(/[«|»|,]/g, '_'));
        }
        if (additionalProperties.$ref) {
          const list = additionalProperties.$ref.split('/');
          const splitRefStr = list[list.length - 1].replace(/[«|»|,]/g, '_');
          objStrList = [` * @property {${splitRefStr}} ${leadStr + name}`];
          dependenceList.push(splitRefStr);
        }
      }
      refLead = objStrList.join('\n');
      break;
    case 'array':
      let arrType = refInfo.items.type;
      if (!arrType) {
        const refStrSpliteList = refInfo.items.$ref.split('/');
        arrType = refStrSpliteList[refStrSpliteList.length - 1].replace(/[«|»|,]/g, '_');
        dependenceList.push(arrType);
      }
      refLead = ` * @property {${translateType(arrType)}[]} ${leadStr + name}`;
      break;
    case '$ref':
      const refStrSpliteList = refInfo.$ref.split('/');
      const refRealStr = refStrSpliteList[refStrSpliteList.length - 1].replace(/[«|»|,]/g, '_');
      dependenceList.push(refRealStr);
      refLead = ` * @property {${refRealStr}} ${leadStr + name}`;
      break;
    case 'string':
    case 'boolean':
    case 'integer':
      refLead = ` * @property {${translateType(type)}} ${leadStr + name}`;
      break;
    default:
      dependenceList.push(type);
      refLead = ` * @property {${translateType(type)}} ${leadStr + name}`;
  }
  return {
    refLead,
    dependenceList,
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
    dependenceList,
  } = getTypedefStrLine('', refInfo, '');

  if (!refLead) {
    return null;
  }

  const defStr = `
/**
 * @typedef ${ref.replace(/[«|»|,]/g, '_')}
${refLead}
 */`;

  return {
    defStr,
    dependenceList: uniqueArr(dependenceList),
  };
}

function definitionsParse(definitions) {
  const result = {};

  for (const defKey in definitions) {
    if (definitions.hasOwnProperty(defKey)) {
      const defInfo = definitions[defKey];
      const typedefObj = getTypedefObj(defKey, defInfo);
      if (typedefObj) {
        result[defKey.replace(/[«|»|,]/g, '_')] = typedefObj;
      }
    }
  }

  return result;
}

module.exports = definitionsParse;
