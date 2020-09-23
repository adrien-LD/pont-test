const { swagger2Parse } = require("./swagger");
const { tpdocParse } = require("./tpdoc");

const parseMap = {
  "swagger2.0":swagger2Parse,
  "tp-doc": tpdocParse,
}

/**
 * @typedef Type 类型
 * @property {string} name 类型名
 * @property {string} description 类型描述
 * @property {string} required 是否必须
 * @property {string} type 类型
 * @property {string} schema 结构信息
 */

/**
 * @typedef InterfaceInfo 接口对象
 * @property {Type[]} headers 请求头列表
 * @property {Type[]} body 请求体列表
 * @property {Type[]} params 请求参数列表
 * @property {Type[]} funParams 所有参数集合
 * @property {string} leadDoc 头部注释
 * @property {string} funName 接口方法名
 * @property {string} funDesc 借口描述
 * @property {string} method 接口类型
 * @property {string} path 接口路径
 * @property {string[]} depadences 接口依赖的类型定义集合
 */

/**
 * @typedef ParseInfo 解析中间类型
 * @property {string} basePath 基本路径
 * @property {InterfaceInfo[]} interfaceList 接口列表
 * @property {object} defObject 类型定义对象
 */

/**
 * 解析
 * @param {Object} data 对应接口返回的数据
 * @param {string} type 文档类型
 * @returns {ParseInfo} 解析中间类型
 */
function parse(data,type){
  const parseFn = parseMap[type];
  return parseFn(data);
}

module.exports = parse;