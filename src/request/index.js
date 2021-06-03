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
return responseTranslate(vsHelp.GET(url, {  headers: {
  'cookie': 'csrftoken=NOxyzvaSWI6HQUyzDA08ziPqa8uZ1ULW0I3AFzbQeDVgxaNHq9wlW4mm9gOIgQHI; sessionid=e9gyr4mcp9vwpuss1v94y798ng8lehhp; km_u=f7a1a01530a1a1efdaaba8f783fb1c5ff7d9651bf6c560ff89b4d77398ea45dab95df8217e621ea5; t_uid=adrienlei; km_uid=adrienlei; ERP_USERNAME=adrienlei; x-host-key-ngn=179c0248f7d-45b13ece7fa2820e5a7335047e80eaa7fda87996; x-tofapi-host-key=179c0344c38-b11cd010f5ceda93608036c8fd51a6cdd257eb4a; tabstyle=html-tab; x-host-key-idcback=179c131b083-5d799a812a2b3824e87b3dd95a3cc68becb6b133; x-host-key-front=179c131b07a-d598870a67a9e8da86bb08d14ad479bdfa44cd6a; x-host-key-oaback=179c67ce965-f18ccd835513bef048a1e8bee04a74b268a7073c; RIO_TCOA_TICKET=tof:TOF4TeyJ2IjoiNCIsInRpZCI6InBndGdKYUtNdkZ6QmVxeHllUGtOMkJuN0dzTkczOW9lIiwiaXNzIjoiMTAuMjguODMuMTUwIiwiaGsiOiIiLCJpYXQiOiIyMDIxLTA2LTAyVDExOjQ5OjUxLjU2MzcyMDA5NiswODowMCIsImF1ZCI6IjAuMC4wLjAiLCJoYXNoIjoiQ0E2MTVBQThENjdBNzVEODUyNzU0QTM2QzM4NDgyNDAzMDI0RkMwREZEMTkxODJDREIwQzE2NTdGN0JGODc5RSJ9'
}}));
}

module.exports = {
  getHttpRequest
}