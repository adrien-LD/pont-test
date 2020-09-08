const { swagger2Parse } = require("./swagger");

const parseMap = {
  "swagger2.0":swagger2Parse
}

function parse(data,type){
  const parseFn = parseMap[type];
  return parseFn(data);
}

module.exports = parse;