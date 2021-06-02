import * as vsHelp from 'vscode-helpers';

/**
 * 转换请求结果
 * @param {Promise<import('vscode-helpers').HTTPRequestResult>} serves
 * @returns {Promise<Object>}
 */
function responseTranslate(serves) {
  return new Promise((resolve) => {
    serves.then((result) => {
      result.readBody().then((buff) => {
        const response = buff.toString('utf-8');
        resolve(JSON.parse(response));
      });
    });
  });
}

export default async function getHttpRequest(url) {
  const result = await vsHelp.GET('http://test.webplatform.pstn.woa.com/schema/');
  console.log(result)
  return {};
  // return responseTranslate(vsHelp.GET(url));
}
