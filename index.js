const parse = require("./src/parse");
const definitionsParse = require("./src/parse/swagger/definitions");

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
  definitions:{
    "InfoStreamResponse«InfoStream»": {
      "type": "object",
      "properties": {
        "agentList": {
          "$ref": "#/definitions/AgentList"
        },
        "hasCollect": {
          "type": "integer",
          "format": "int32"
        },
        "imageUrl": {
          "type": "string"
        },
        "introduction": {
          "type": "string"
        },
        "isRecommend": {
          "type": "integer",
          "format": "int32"
        },
        "participantCount": {
          "type": "integer",
          "format": "int64"
        },
        "recommendTotal": {
          "type": "integer",
          "format": "int64"
        },
        "records": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/InfoStream"
          }
        },
        "title": {
          "type": "string"
        },
        "total": {
          "type": "integer",
          "format": "int64"
        },
        "videoCount": {
          "type": "integer",
          "format": "int64"
        }
      },
      "title": "InfoStreamResponse«InfoStream»"
    },
    "QuestionResponse«Answer»": {
      "type": "object",
      "properties": {
        "agentList": {
          "$ref": "#/definitions/AgentList"
        },
        "allQuestionH5Url": {
          "type": "string"
        },
        "answerCount": {
          "type": "integer",
          "format": "int64"
        },
        "imageUrl": {
          "type": "string"
        },
        "introduction": {
          "type": "string"
        },
        "isShow": {
          "type": "integer",
          "format": "int32"
        },
        "participantCount": {
          "type": "integer",
          "format": "int64"
        },
        "quest": {
          "$ref": "#/definitions/Quest"
        },
        "questionTemplates": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "quizUrl": {
          "type": "string"
        },
        "records": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Answer"
          }
        },
        "redirectUrl": {
          "type": "string"
        },
        "share": {
          "type": "boolean"
        },
        "title": {
          "type": "string"
        },
        "total": {
          "type": "integer",
          "format": "int64"
        }
      },
      "title": "QuestionResponse«Answer»"
    },
    "QuestionResponse«Question»": {
      "type": "object",
      "properties": {
        "agentList": {
          "$ref": "#/definitions/AgentList"
        },
        "allQuestionH5Url": {
          "type": "string"
        },
        "answerCount": {
          "type": "integer",
          "format": "int64"
        },
        "imageUrl": {
          "type": "string"
        },
        "introduction": {
          "type": "string"
        },
        "isShow": {
          "type": "integer",
          "format": "int32"
        },
        "participantCount": {
          "type": "integer",
          "format": "int64"
        },
        "quest": {
          "$ref": "#/definitions/Quest"
        },
        "questionTemplates": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "quizUrl": {
          "type": "string"
        },
        "records": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Question"
          }
        },
        "redirectUrl": {
          "type": "string"
        },
        "share": {
          "type": "boolean"
        },
        "title": {
          "type": "string"
        },
        "total": {
          "type": "integer",
          "format": "int64"
        }
      },
      "title": "QuestionResponse«Question»"
    },

  }
}

const result = definitionsParse(data.definitions);

console.log(result);