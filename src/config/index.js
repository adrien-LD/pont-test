const PROJECT_CONFIG =
`{
  "origins": [{
    "name": "上海",
    "type": "swagger2.0",
    "originUrl": "http://swagger.fangdd.net/",
    "services": [{
      "name": "商服",
      "appId": "a.esf.fdd",
      "serve": "fdd-app-esf-service"
    }]
  }, {
    "name": "TP-DOC",
    "type": "tp-doc",
    "originUrl": "http://tp-doc.fangdd.net/",
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

const PROJECT_FUNCTION =
`module.exports = function({
  headers=[],
  body=[],
  params=[],
  funParams = [],
  leadDoc,
  funName,
  funDesc,
  consumes,
  method,
  path
}){

  const paramsStrList = funParams.map((item)=>item.name.replace(/-/g,''));
  return \`
\${leadDoc}
export async function \${funName}(\${paramsStrList.join(', ')}){
  return new Promise((resolve,reject)=>{
    axios({
      path: "\${path}",
      method: "\${method}",
      data: "\${body.map((item)=>(item))}"
    })
  })
}
  \`
}`;


module.exports = {
  PROJECT_CONFIG,
  PROJECT_FUNCTION,
}