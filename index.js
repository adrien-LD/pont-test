const parse = require("./src/parse")

const data = {
  basePath:'/',
  paths:{
    "/appraisal/indexTitle": {
      "get": {
        "tags": [
          "appraisal-controller"
        ],
        "summary": "首页文案",
        "operationId": "indexTitleUsingGET",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/CommonResponse«string»"
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Not Found"
          }
        },
        "deprecated": false
      }
    }
  },
  definitions:[]
}

const result = parse(data,'swagger2.0');

console.log(result);