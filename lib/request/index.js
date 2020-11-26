"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHttpRequest;

var vsHelp = _interopRequireWildcard(require("vscode-helpers"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 转换请求结果
 * @param {Promise<import('vscode-helpers').HTTPRequestResult>} serves
 * @returns {Promise<Object>}
 */
function responseTranslate(serves) {
  return new Promise(resolve => {
    serves.then(result => {
      result.readBody().then(buff => {
        const response = buff.toString('utf-8');
        resolve(JSON.parse(response));
      });
    });
  });
}

function getHttpRequest(url) {
  return responseTranslate(vsHelp.GET(url));
}
//# sourceMappingURL=index.js.map