import * as vsHelp from 'vscode-helpers';
/**
 * 转换请求结果
 * @param {Promise<import('vscode-helpers').HTTPRequestResult>} serves
 * @returns {Promise<Object>}
 */

function responseTranslate(serves) {
  return new Promise(function (resolve) {
    serves.then(function (result) {
      result.readBody().then(function (buff) {
        var response = buff.toString('utf-8');
        resolve(JSON.parse(response));
      });
    });
  });
}

export default function getHttpRequest(url) {
  return responseTranslate(vsHelp.GET(url));
}
//# sourceMappingURL=index.js.map