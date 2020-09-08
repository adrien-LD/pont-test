const vsHelp = require('vscode-helpers');

/**
 * 转换请求结果
 * @param {Promise<import('vscode-helpers').HTTPRequestResult>} serves
 * @returns {Promise<Object>}
 */
function responseTranslate(serves){
  return new Promise((resolve)=>{
    serves.then((result)=>{
      result.readBody().then((buff)=>{
        const response = buff.toString('utf-8');
        resolve(JSON.parse(response));
      })
    })
  })
}

function getHttpRequest(url){
  return responseTranslate(vsHelp.GET(url));
}

module.exports = {
  getHttpRequest
}