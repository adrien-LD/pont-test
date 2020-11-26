export const PROJECT_CONFIG = `{
  "origins": [{
    "name": "上海",
    "type": "swagger2.0",
    "originUrl": "http://swagger.xxx.net/",
    "services": [{
      "name": "商服",
      "appId": "a.esf.fdd",
      "serve": "fdd-app-esf-service"
    }]
  }, {
    "name": "TP-DOC",
    "type": "tp-doc",
    "originUrl": "http://tp-doc.xxx.net/",
    "services": [{
      "name": "多多直播",
      "appId": "ap-realtor-live-server",
      "serve": "com.fangdd.ap"
    }]
  }],
  "temps": [{
    "name": "Axios请求",
    "path": "./duoduo/duoduo.request.js"
  }]
}
`;

export const PROJECT_FUNCTION = `
/**
 * @typedef Type 类型
 * @property {string} name 类型名
 * @property {string} description 类型描述
 * @property {string} required 是否必须
 * @property {string} type 类型
 * @property {string} schema 结构信息
 */

/**
 * 接口方法生成模板
 * @param {Object} param0
 * @param {Type[]} param0.headers 请求头参数列表
 * @param {Type[]} param0.body 请求体参数列表
 * @param {Type[]} param0.params 请求参数列表
 * @param {Type[]} param0.funParams 所有参数集合
 * @param {string} param0.leadDoc 头部注释
 * @param {string} param0.typeRefStr 类型定义
 * @param {string} param0.funName 接口方法名
 * @param {string} param0.funDesc 接口描述
 * @param {string} param0.method 接口类型
 * @param {string} param0.path 接口路径
 * @param {Object} param0.serviceConfig 所选服务的配置项
 */
module.exports = function({
  headers=[],
  body=[],
  params=[],
  funParams = [],
  leadDoc,
  typeRefStr,
  funName,
  funDesc,
  method,
  path,
  serviceConfig
}){

  const paramsStrList = funParams.map((item)=>item.name.replace(/-/g,''));
  return \`
\${typeRefStr}
\${leadDoc}
export async function \${funName}(\${paramsStrList.join(', ')}){
  return new Promise((resolve,reject)=>{
    axios({
      path: "\${path}",
      method: "\${method}",
    })
  })
}
\`
}`;
