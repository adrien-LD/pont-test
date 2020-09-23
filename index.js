const parse = require("./src/parse");
const definitionsParse = require("./src/parse/tpdoc/definitions");

const data = {
  "artifact": {
    "id": "com.fangdd.ap:ap-realtor-live-server",
    "docVersion": 1600345351050,
    "artifactId": "ap-realtor-live-server",
    "version": "1.0-SNAPSHOT",
    "groupId": "com.fangdd.ap",
    "name": "ap-realtor-live-server",
    "md5": "2f3f4d5ad52236c5199ba2a5844b707e"
  },
  "chapters": [
    {
      "id": "5f6355074d611f41854f6103",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "多多卖房直播",
      "sections": [
        {
          "name": "im相关接口",
          "code": "com.fangdd.ap.live.server.web.controller.ImController",
          "comment": "",
          "apis": [
            {
              "code": "com.fangdd.ap.live.server.web.controller.ImController.sign",
              "key": "c1ca52b1d9e7f6e768e4b58477ad17cc",
              "type": 0,
              "name": "获取im签名",
              "methods": [
                "GET"
              ],
              "paths": [
                "/live/im/sign"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.web.response.ImSignResponse>",
                "comment": "im签名信息",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "com.fangdd.ap.live.server.web.request.ImSignRequest",
                  "name": "request",
                  "comment": "请求",
                  "required": true,
                  "annotation": "@RequestParam"
                }
              ],
              "order": 100
            }
          ],
          "order": 100
        },
        {
          "name": "直播接口",
          "code": "com.fangdd.ap.live.server.web.controller.LiveController",
          "comment": "",
          "apis": [
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveController.queryLiveRooms",
              "key": "d873ad66a8b14b1d68cd855cdf31c35e",
              "type": 0,
              "name": "通过城市ID和楼盘名称查询直播间列表",
              "methods": [
                "GET"
              ],
              "paths": [
                "/live/room/list"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<com.fangdd.common.basic.page.PagedResult<com.fangdd.ap.live.server.web.response.QueryLiveRoomListResponse>>",
                "comment": "分页结果",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "com.fangdd.ap.live.server.web.request.QueryLiveRoomRequest",
                  "name": "req",
                  "comment": "直播间列表",
                  "required": true,
                  "annotation": "@RequestParam"
                }
              ],
              "order": 100
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveController.queryLiveRoomInfo",
              "key": "519b86490d35c94ca82e0fd1a5ab1b6c",
              "type": 0,
              "name": "查询直播间详情",
              "methods": [
                "GET"
              ],
              "paths": [
                "/live/room/detail"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.web.response.QueryLiveRoomDetailResponse>",
                "comment": "直播间信息",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "com.fangdd.ap.live.server.web.request.QueryLiveRoomInfoRequest",
                  "name": "req",
                  "comment": "查询直播间信息",
                  "required": true,
                  "annotation": "@RequestParam"
                }
              ],
              "order": 101
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveController.queryRoomOnLiving",
              "key": "4f64526a75d383bf372fc61f1997227b",
              "type": 0,
              "name": "查询全国是否存在直播中的直播间，true代表存在，false代表不存在",
              "methods": [
                "GET"
              ],
              "paths": [
                "/live/living/exist"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.web.response.LiveStatusResponse>",
                "comment": "是否存在",
                "required": false
              },
              "order": 102
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveController.addPlayCount",
              "key": "735e6739b32e9ecd5925a9a5e0770888",
              "type": 0,
              "name": "添加播放次数",
              "methods": [
                "POST"
              ],
              "paths": [
                "/live/play_count/add"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<java.lang.Boolean>",
                "comment": "是否添加成功",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "com.fangdd.ap.live.server.web.request.LivePlayCountAddRequest",
                  "name": "request",
                  "comment": "添加播放次数",
                  "required": true,
                  "annotation": "@RequestBody"
                }
              ],
              "order": 103
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveController.getLiveStatusAndPlayCount",
              "key": "96593ac1e15b43ef17d5635bf9906821",
              "type": 0,
              "name": "获取直播间状态和播放次数",
              "methods": [
                "GET"
              ],
              "paths": [
                "/live/room/{roomId}/status_and_count"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.entity.live.LiveStatusAndPlayCount>",
                "comment": "直播间状态和播放次数",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "java.lang.Long",
                  "name": "roomId",
                  "comment": "直播间id",
                  "required": true,
                  "annotation": "@PathVariable"
                }
              ],
              "order": 104
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveController.getRecommendLives",
              "key": "e6cde3da566cf380c595d735d186ff01",
              "type": 0,
              "name": "获取直播推荐列表",
              "methods": [
                "GET"
              ],
              "paths": [
                "/live/room/recommend"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<java.util.List<com.fangdd.ap.live.server.entity.live.LiveRecommend>>",
                "comment": "推荐列表",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "java.lang.Long",
                  "name": "excludeRoomId",
                  "comment": "排除的直播房间id",
                  "required": false,
                  "annotation": "@RequestParam"
                },
                {
                  "entityName": "java.lang.Integer",
                  "name": "limit",
                  "comment": "数量限制，默认5",
                  "required": false,
                  "demo": "5",
                  "defaultValue": "5",
                  "annotation": "@RequestParam"
                }
              ],
              "order": 105
            }
          ],
          "order": 101
        }
      ],
      "order": 100
    },
    {
      "id": "5f6355074d611f41854f6104",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "服务接口",
      "sections": [
        {
          "name": "直播互动服务",
          "code": "com.fangdd.ap.live.server.web.controller.LiveInteractController",
          "apis": [
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveInteractController.queryLiveSignUpInfo",
              "key": "8b5db0287fd5f22af3ac46b635f52e93",
              "type": 0,
              "name": "查询直播间报名活动信息",
              "methods": [
                "GET"
              ],
              "paths": [
                "/live/interact/signUp/query"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.entity.live.interact.LiveSignUpInfo>",
                "comment": "",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "java.lang.Long",
                  "name": "roomId",
                  "comment": "直播间ID",
                  "required": true,
                  "annotation": "@RequestParam"
                }
              ],
              "order": 100
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveInteractController.enterLiveSignUpActivity",
              "key": "562eae4b022fa8859a8238563dd878b5",
              "type": 0,
              "name": "参加直播间报名活动",
              "methods": [
                "POST"
              ],
              "paths": [
                "/live/interact/signUp/enter"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<java.lang.Boolean>",
                "comment": "",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "com.fangdd.ap.live.server.web.request.LiveSignUpEnterReq",
                  "name": "req",
                  "comment": "",
                  "required": true,
                  "annotation": "@RequestBody"
                }
              ],
              "order": 101
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveInteractController.queryLiveInteractMsgInfoList",
              "key": "d33ebc2cbe413194a28c36f55a085de0",
              "type": 0,
              "name": "分页查询直播互动信息",
              "methods": [
                "GET"
              ],
              "paths": [
                "/live/interact/messages/query"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<com.fangdd.common.basic.page.PagedResult<com.fangdd.ap.live.server.entity.live.interact.LiveInteractMsgInfo>>",
                "comment": "",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "com.fangdd.ap.live.server.web.request.LiveInteractMsgQueryRequest",
                  "name": "request",
                  "comment": "",
                  "required": true,
                  "annotation": "@RequestParam"
                }
              ],
              "order": 102
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveInteractController.queryLiveGiftList",
              "key": "c1771dfb6bb73b87812eaabd3021cdbb",
              "type": 0,
              "name": "查询直播礼物列表",
              "methods": [
                "GET"
              ],
              "paths": [
                "/live/interact/gift/list"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<java.util.List<com.fangdd.ap.live.server.web.response.LiveGiftResp>>",
                "comment": "",
                "required": false
              },
              "order": 103
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveInteractController.sendGift",
              "key": "1ee35b95b8f0fe6bac857ffdf227b7a2",
              "type": 0,
              "name": "发送直播礼物",
              "methods": [
                "POST"
              ],
              "paths": [
                "/live/interact/gift/send"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<java.lang.Void>",
                "comment": "",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "com.fangdd.ap.live.server.web.request.LiveGiftSendReq",
                  "name": "req",
                  "comment": "",
                  "required": true,
                  "annotation": "@RequestBody"
                }
              ],
              "order": 104
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveInteractController.queryUserBoxProgress",
              "key": "e35b6007ea5ce95e6ccc07f635b11cbc",
              "type": 0,
              "name": "查询用户宝箱进度信息",
              "methods": [
                "GET"
              ],
              "paths": [
                "/live/interact/box/progress/query"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.entity.live.interact.UserBoxProgressInfo>",
                "comment": "",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "com.fangdd.ap.live.server.web.request.UserBoxProgressQueryReq",
                  "name": "req",
                  "comment": "",
                  "required": true,
                  "annotation": "@RequestParam"
                }
              ],
              "order": 105
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveInteractController.addBox",
              "key": "91c18e751ca39d1dc7a1560b09dc4d14",
              "type": 0,
              "name": "添加用户宝箱",
              "methods": [
                "POST"
              ],
              "paths": [
                "/live/interact/box/add"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<java.lang.Void>",
                "comment": "",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "com.fangdd.ap.live.server.web.request.UserBoxAddReq",
                  "name": "req",
                  "comment": "",
                  "required": true,
                  "annotation": "@RequestBody"
                }
              ],
              "order": 106
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveInteractController.openBox",
              "key": "7077ef953e05b0214b80614deec49543",
              "type": 0,
              "name": "开启宝箱",
              "methods": [
                "POST"
              ],
              "paths": [
                "/live/interact/box/open"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.web.response.BoxOpenResp>",
                "comment": "",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "com.fangdd.ap.live.server.web.request.UserBoxOpenReq",
                  "name": "req",
                  "comment": "",
                  "required": true,
                  "annotation": "@RequestBody"
                }
              ],
              "order": 107
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveInteractController.like",
              "key": "ea11e03573847533375c4e2ddcd828aa",
              "type": 0,
              "name": "点赞",
              "methods": [
                "POST"
              ],
              "paths": [
                "/live/interact/like"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<java.lang.Void>",
                "comment": "",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "com.fangdd.ap.live.server.web.request.LikeReq",
                  "name": "req",
                  "required": true,
                  "annotation": "@RequestBody"
                }
              ],
              "order": 108
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveInteractController.increaseWatchDuration",
              "key": "9ee021112c2d7d5673e64cd4371e12d3",
              "type": 0,
              "name": "增加用户观看时长",
              "methods": [
                "POST"
              ],
              "paths": [
                "/live/interact/duration/increase"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<java.lang.Void>",
                "comment": "",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "com.fangdd.ap.live.server.web.request.UserWatchDurationIncreaseReq",
                  "name": "req",
                  "comment": "",
                  "required": true,
                  "annotation": "@RequestBody"
                }
              ],
              "order": 109
            },
            {
              "code": "com.fangdd.ap.live.server.web.controller.LiveInteractController.grabRedEnvelope",
              "key": "c49aff1bb444c677bc35b43a23fa34d7",
              "type": 0,
              "name": "经纪人抢红包",
              "methods": [
                "POST"
              ],
              "paths": [
                "/live/interact/red-envelope/grab"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<java.lang.Long>",
                "comment": "红包金额",
                "required": false
              },
              "requestParams": [
                {
                  "entityName": "com.fangdd.ap.live.server.web.request.UserGrabRedEnvelopeReq",
                  "name": "req",
                  "comment": "请红包参数",
                  "required": true,
                  "annotation": "@RequestBody"
                }
              ],
              "order": 110
            }
          ],
          "order": 100
        },
        {
          "name": "经纪人积分controller",
          "code": "com.fangdd.ap.live.server.web.controller.ScoreController",
          "apis": [
            {
              "code": "com.fangdd.ap.live.server.web.controller.ScoreController.queryAgentScore",
              "key": "ad9267d672432387b1cc2cd53a25355c",
              "type": 0,
              "name": "查询经纪人积分",
              "methods": [
                "GET"
              ],
              "paths": [
                "/score/query"
              ],
              "response": {
                "entityName": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.web.response.AgentScoreResp>",
                "comment": "",
                "required": false
              },
              "order": 100
            }
          ],
          "order": 101
        }
      ],
      "order": 101
    }
  ],
  "entities": [
    {
      "id": "5f6355074d611f41854f60b9",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.UserInfo",
      "since": "2020/3/20",
      "comment": "用户信息",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "userId",
          "comment": "用户ID",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "userRole",
          "comment": "用户角色  1=项目经理  2=经纪人",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "userName",
          "comment": "用户名称",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60ba",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.entity.live.interact.LiveSignUpInfo>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.entity.live.interact.LiveSignUpInfo",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.entity.live.interact.LiveSignUpInfo",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60bb",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.util.List<java.lang.String>",
      "comment": "",
      "defaultValue": "",
      "parameteredEntityRefs": [
        {
          "entityName": "java.lang.String",
          "required": false
        }
      ],
      "collection": true,
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60bc",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.lang.Integer",
      "comment": "",
      "defaultValue": "",
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60bd",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.live.LiveGuestInfo",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间ID",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "guestName",
          "comment": "嘉宾名称",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "wechat",
          "comment": "嘉宾微信",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "profilePhoto",
          "comment": "嘉宾头像",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "guestIntroduction",
          "comment": "嘉宾介绍",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60be",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.request.UserBoxOpenReq",
      "since": "2020/4/9",
      "comment": "用户宝箱开启请求",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "progressId",
          "comment": "用户宝箱进度ID",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60bf",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.util.List<com.fangdd.ap.live.server.entity.live.interact.LiveRedEnvelopeInfo>",
      "comment": "",
      "defaultValue": "",
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.entity.live.interact.LiveRedEnvelopeInfo",
          "required": false
        }
      ],
      "collection": true,
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60c0",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.util.List<com.fangdd.ap.live.server.entity.project.GuideCoupon>",
      "comment": "",
      "defaultValue": "",
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.entity.project.GuideCoupon",
          "required": false
        }
      ],
      "collection": true,
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60c1",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.lang.Long",
      "comment": "",
      "defaultValue": "",
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60c2",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<com.fangdd.common.basic.page.PagedResult<com.fangdd.ap.live.server.entity.live.interact.LiveInteractMsgInfo>>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "com.fangdd.common.basic.page.PagedResult<com.fangdd.ap.live.server.entity.live.interact.LiveInteractMsgInfo>",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.common.basic.page.PagedResult<com.fangdd.ap.live.server.entity.live.interact.LiveInteractMsgInfo>",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60c3",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.request.QueryLiveRoomInfoRequest",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间ID",
          "required": true
        },
        {
          "entityName": "java.lang.Long",
          "name": "ucUserId",
          "comment": "用户id，已header（User-Id为准）",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "cityId",
          "comment": "经纪人城市ID，已header为准",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "status",
          "comment": "判断直播间是否已经被删除 (当传status时表示获取直播间结束状态)",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60c4",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.request.QueryLiveRoomRequest",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "cityId",
          "comment": "城市ID",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "estateName",
          "comment": "楼盘名称",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "estateId",
          "comment": "楼盘ID",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "pageNo",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "pageSize",
          "comment": "",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60c5",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.live.interact.LiveSignUpInfo",
      "since": "2020/3/19",
      "comment": "直播报名活动信息",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "id",
          "comment": "报名活动ID",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间ID",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "signUpStatus",
          "comment": "报名状态 0=未报名  1=已报名",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.entity.UserInfo",
          "name": "publisherInfo",
          "comment": "发布人信息",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "description",
          "comment": "报名活动信息",
          "required": false
        },
        {
          "entityName": "Date",
          "name": "expireTime",
          "comment": "过期时间",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60c6",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.web.response.QueryLiveRoomDetailResponse>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.web.response.QueryLiveRoomDetailResponse",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.web.response.QueryLiveRoomDetailResponse",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60c7",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.project.ReferralRule",
      "since": "2018年09月19日 11:56",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Boolean",
          "name": "needAppointGuideTime",
          "comment": "是否需要预约带看时间",
          "required": false
        },
        {
          "entityName": "java.lang.Boolean",
          "name": "allowHiddenMobile",
          "comment": "是否支持隐号报备",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "hiddenNumberFormat",
          "comment": "引号格式",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "validityPeriodDays",
          "comment": "报备有效期 (天数)：0=不限制；1=当天有效；其他=有效期天数",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "ruleSummary",
          "comment": "规则描述",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60c8",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.request.UserWatchDurationIncreaseReq",
      "since": "2020/4/15",
      "comment": "用户时长增加请求",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间ID",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60c9",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.lang.Byte",
      "comment": "",
      "defaultValue": "",
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60ca",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.response.BoxOpenResp",
      "since": "2020/4/14",
      "comment": "宝箱开启结果",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "progressId",
          "comment": "宝箱进度ID",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "prizeType",
          "comment": "奖品类型  1=虚拟礼物，2=经纪人积分",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "giftId",
          "comment": "礼物ID，只有prize_type为1时才有值",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "giftName",
          "comment": "礼物名称，只有prize_type为1时才有值",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "giftValue",
          "comment": "礼物价值，只有prize_type为1时才有值",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "giftIconUrl",
          "comment": "礼物图标url，只有prize_type为1时才有值",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "num",
          "comment": "礼物/积分数量",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60cb",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.request.LiveInteractMsgQueryRequest",
      "since": "2020/3/26",
      "comment": "This is description",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间ID",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "pageNo",
          "comment": "起始页码，从1开始",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "pageSize",
          "comment": "分页大小",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60cc",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.common.UrlBaseInfo",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.String",
          "name": "url",
          "comment": "直播url",
          "required": false
        },
        {
          "entityName": "byte",
          "name": "urlType",
          "comment": "播放类型：1-RTMP；2-HDL；3-HLS；4-Snapshot",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60cd",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.live.interact.LiveRedEnvelopeInfo",
      "comment": "直播红包信息",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "id",
          "comment": "主键ID,红包ID",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "关联的直播间ID",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "type",
          "comment": "红包类型 1=拼手气红包;2=等额红包",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "displayMaxAmount",
          "comment": "展示单个红包最大金额。单位：分",
          "required": false
        },
        {
          "entityName": "Date",
          "name": "openTime",
          "comment": "红包发放时间",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60ce",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.lang.Void",
      "comment": "",
      "defaultValue": "",
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60cf",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.project.ProjectCard",
      "comment": "项目卡片",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "estateId",
          "comment": "楼盘id",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "distributionProjectId",
          "comment": "项目id",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "estateName",
          "comment": "楼盘名称",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "cityId",
          "comment": "城市ID：楼盘地理上所在城市",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "cityName",
          "comment": "城市名称",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "districtId",
          "comment": "区域ID：楼盘地理上所在行政区",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "districtName",
          "comment": "楼盘地理上所在行政区名称",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "sectionId",
          "comment": "片区ID：楼盘所在的城市内的片区，例如：白石洲、松山湖等",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "sectionName",
          "comment": "楼盘所在的城市内的片区名称",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "unitAvgPrice",
          "comment": "单价均价：单位元",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "commission",
          "comment": "楼盘佣金信息\n 例如：3%+600元/套(3个方案)",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "distance",
          "comment": "经纪人跟楼盘的距离",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "coverPhotoUrl",
          "comment": "楼盘封面",
          "required": false
        },
        {
          "entityName": "java.lang.Boolean",
          "name": "hasVirtualReality",
          "comment": "是否有楼盘vr",
          "required": false
        },
        {
          "entityName": "java.lang.Boolean",
          "name": "hasVideo",
          "comment": "是否有楼盘视频",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "videoDesc",
          "comment": "视频描述",
          "required": false
        },
        {
          "entityName": "java.util.List<com.fangdd.ap.live.server.entity.project.ProjectLabel>",
          "name": "labels",
          "comment": "普通楼盘标签\n 最高佣、推广红包...",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.entity.project.ProjectLabel",
          "name": "specialLabel",
          "comment": "楼盘特色标签\n 例如：特价、直播中、已驻守",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60d0",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "byte",
      "defaultValue": "",
      "primitive": true
    },
    {
      "id": "5f6355074d611f41854f60d1",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.response.LiveGiftResp",
      "since": "2020/4/9",
      "comment": "直播礼物",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "giftId",
          "comment": "主键ID,礼物ID",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "giftName",
          "comment": "礼物名称",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "giftIconUrl",
          "comment": "礼物图标的url",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "giftValue",
          "comment": "礼物价值（积分）",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "userGiftNum",
          "comment": "用户礼物数量",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60d2",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.util.List<com.fangdd.ap.live.server.entity.project.ProjectLabel>",
      "comment": "",
      "defaultValue": "",
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.entity.project.ProjectLabel",
          "required": false
        }
      ],
      "collection": true,
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60d3",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.project.ProjectLabel",
      "comment": "项目标签",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.String",
          "name": "text",
          "comment": "标签文案",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "backgroundColor",
          "comment": "背景色",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "textColor",
          "comment": "文本颜色值",
          "required": false
        },
        {
          "entityName": "int",
          "name": "sequence",
          "comment": "显示顺序",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60d4",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<java.lang.Long>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "java.lang.Long",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60d5",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.project.GuideCoupon",
      "since": "2018年09月19日 14:08",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "marketId",
          "comment": "推广方案Id",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "couponName",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.Byte",
          "name": "couponType",
          "comment": "奖券类型。1=带看现金券。目前只有带看券  默认: 1",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "couponBaseAmount",
          "comment": "带看现金券基准金额。单位：分  默认: 50",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "couponRiseGradientPercent",
          "comment": "带看现金券增长梯度百分比。默认1，即1%  默认: 1",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "couponRiseLimitPercent",
          "comment": "代现金券膨胀上限百分比。默认100，即100%  默认: 100",
          "required": false
        },
        {
          "entityName": "java.lang.Byte",
          "name": "couponStatus",
          "comment": "代金券配置状态。1=已领取。2=增值中；3=待兑换；4=已兑换; 5=已过期",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "expireTime",
          "comment": "过期时间  eg:2018-10-10",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "couponId",
          "comment": "券ID",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "couponCodeId",
          "comment": "现金券编号",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "couponCode",
          "comment": "券编码。一段hash码，（位数待定）",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "couponRiseAmount",
          "comment": "增值金额。单位：元",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "couponRiseTimes",
          "comment": "增值次数。",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "couponDescription",
          "comment": "现金券描述，如 “确认带看后，带看申请页个人中心兑换”",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60d6",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.project.GuideRule",
      "since": "2018年09月19日 12:00",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Boolean",
          "name": "allowHiddenMobile",
          "comment": "是否允许隐号带看",
          "required": false
        },
        {
          "entityName": "java.lang.Boolean",
          "name": "supportSMSGuide",
          "comment": "是否支持短信验证码",
          "required": false
        },
        {
          "entityName": "java.lang.Boolean",
          "name": "supportScanGuide",
          "comment": "是否支持二维码",
          "required": false
        },
        {
          "entityName": "java.lang.Boolean",
          "name": "supportCertificateGuide",
          "comment": "是否支持证明材料",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "referralGuideMinutes",
          "comment": "报备带看间隔时间 单位：分钟",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "protectivePeriod",
          "comment": "经纪人带看保护期（单位：天)",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "confirmMaterialsDemand",
          "comment": "带看材料要求",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "addedBonus",
          "comment": "带看奖励",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "ruleSummary",
          "comment": "规则描述",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60d7",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.request.LivePlayCountAddRequest",
      "since": "2020/2/27",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60d8",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.web.response.BoxOpenResp>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.web.response.BoxOpenResp",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.web.response.BoxOpenResp",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60d9",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.util.List<com.fangdd.ap.live.server.entity.live.interact.LiveInteractMsgInfo>",
      "comment": "",
      "defaultValue": "",
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.entity.live.interact.LiveInteractMsgInfo",
          "required": false
        }
      ],
      "collection": true,
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60da",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.response.QueryLiveRoomDetailResponse",
      "comment": "直播间详情",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "com.fangdd.ap.live.server.entity.common.AnchorBaseInfo",
          "name": "anchor",
          "comment": "主播信息",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.entity.common.EstateBaseInfo",
          "name": "estate",
          "comment": "楼盘信息",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.entity.project.ProjectCard",
          "name": "projectCard",
          "comment": "项目卡片",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "currentNumbersOnline",
          "comment": "当前在线人数",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "commission",
          "comment": "佣金",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "channelId",
          "comment": "频道Id 1-新房踩盘 2-新房运营 3-产品运营 4-线上掘金",
          "required": false
        },
        {
          "entityName": "java.lang.Boolean",
          "name": "subscribed",
          "comment": "是否预约",
          "required": false
        },
        {
          "entityName": "java.lang.Boolean",
          "name": "forbiddenSpeak",
          "comment": "是否禁言",
          "required": false
        },
        {
          "entityName": "java.util.List<com.fangdd.ap.live.server.entity.live.interact.LiveRedEnvelopeInfo>",
          "name": "redEnvelopeInfos",
          "comment": "红包信息列表，按发放时间升序",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间Id",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "title",
          "comment": "直播间标题",
          "required": false
        },
        {
          "entityName": "byte",
          "name": "liveStatus",
          "comment": "直播间状态，0-待直播，1-直播中，2-直播结束，3-禁播",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "coverUrl",
          "comment": "直播间封面",
          "required": false
        },
        {
          "entityName": "Date",
          "name": "subscribeTime",
          "comment": "预计开播时间",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "playCount",
          "comment": "播放次数",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "onlineCount",
          "comment": "在线人数",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "imConversationId",
          "comment": "直播间对应的IM会话",
          "required": false
        },
        {
          "entityName": "java.util.List<com.fangdd.ap.live.server.entity.common.UrlBaseInfo>",
          "name": "playUrls",
          "comment": "直播间urls",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "playBackUrl",
          "comment": "回放url",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "publishUrl",
          "comment": "推流url",
          "required": false
        },
        {
          "entityName": "Date",
          "name": "beginTime",
          "comment": "直播实际开始时间",
          "required": false
        },
        {
          "entityName": "Date",
          "name": "overTime",
          "comment": "直播实际结束时间",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "duration",
          "comment": "回放视频时长, 单位：秒",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "desc",
          "comment": "直播间简介",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "roomCode",
          "comment": "房间号",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.entity.live.LiveGuestInfo",
          "name": "liveGuestInfo",
          "comment": "分享嘉宾信息",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "isOpen",
          "comment": "是否公开 0=未公开  1=公开",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "type",
          "comment": "直播类型 1=竖屏视频直播 2=投屏直播  3=横屏视频直播",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60db",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.util.List<com.fangdd.ap.live.server.entity.common.UrlBaseInfo>",
      "comment": "",
      "defaultValue": "",
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.entity.common.UrlBaseInfo",
          "required": false
        }
      ],
      "collection": true,
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60dc",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.page.PagedResult<com.fangdd.ap.live.server.web.response.QueryLiveRoomListResponse>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "com.fangdd.common.basic.page.PageInfo",
          "name": "pageInfo",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.util.List<com.fangdd.ap.live.server.web.response.QueryLiveRoomListResponse>",
          "name": "pageData",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.web.response.QueryLiveRoomListResponse",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60dd",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.response.LiveStatusResponse",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Boolean",
          "name": "hasLive",
          "comment": "是否有直播",
          "required": false
        },
        {
          "entityName": "java.lang.Boolean",
          "name": "hasLiving",
          "comment": "是否正在直播的",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60de",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.page.PagedResult<com.fangdd.ap.live.server.entity.live.interact.LiveInteractMsgInfo>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "com.fangdd.common.basic.page.PageInfo",
          "name": "pageInfo",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.util.List<com.fangdd.ap.live.server.entity.live.interact.LiveInteractMsgInfo>",
          "name": "pageData",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.entity.live.interact.LiveInteractMsgInfo",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60df",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.request.LiveSignUpEnterReq",
      "since": "2020/3/20",
      "comment": "直播报名活动参加请求",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "signUpId",
          "comment": "直播报名活动ID",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间ID",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60e0",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<com.fangdd.common.basic.page.PagedResult<com.fangdd.ap.live.server.web.response.QueryLiveRoomListResponse>>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "com.fangdd.common.basic.page.PagedResult<com.fangdd.ap.live.server.web.response.QueryLiveRoomListResponse>",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.common.basic.page.PagedResult<com.fangdd.ap.live.server.web.response.QueryLiveRoomListResponse>",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60e1",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<java.util.List<com.fangdd.ap.live.server.entity.live.LiveRecommend>>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.util.List<com.fangdd.ap.live.server.entity.live.LiveRecommend>",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "java.util.List<com.fangdd.ap.live.server.entity.live.LiveRecommend>",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60e2",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<java.lang.Void>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.Void",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "java.lang.Void",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60e3",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.util.List<com.fangdd.ap.live.server.web.response.QueryLiveRoomListResponse>",
      "comment": "",
      "defaultValue": "",
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.web.response.QueryLiveRoomListResponse",
          "required": false
        }
      ],
      "collection": true,
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60e4",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.entity.live.interact.UserBoxProgressInfo>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.entity.live.interact.UserBoxProgressInfo",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.entity.live.interact.UserBoxProgressInfo",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60e5",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.live.interact.UserBoxProgressInfo",
      "since": "2020/4/10",
      "comment": "用户宝箱进度信息",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "progressId",
          "comment": "用户宝箱进度ID",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "currentDuration",
          "comment": "当前时长",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "targetDuration",
          "comment": "目标时长",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "leftDuration",
          "comment": "剩余时长",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60e6",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.response.QueryLiveRoomListResponse",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "com.fangdd.ap.live.server.entity.common.EstateBaseInfo",
          "name": "estate",
          "comment": "楼盘基本信息",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "currentNumbersOnline",
          "comment": "当前在线人数",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "detailH5Url",
          "comment": "直播详情的h5地址",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间Id",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "title",
          "comment": "直播间标题",
          "required": false
        },
        {
          "entityName": "byte",
          "name": "liveStatus",
          "comment": "直播间状态，0-待直播，1-直播中，2-直播结束，3-禁播",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "coverUrl",
          "comment": "直播间封面",
          "required": false
        },
        {
          "entityName": "Date",
          "name": "subscribeTime",
          "comment": "预计开播时间",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "playCount",
          "comment": "播放次数",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "onlineCount",
          "comment": "在线人数",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "imConversationId",
          "comment": "直播间对应的IM会话",
          "required": false
        },
        {
          "entityName": "java.util.List<com.fangdd.ap.live.server.entity.common.UrlBaseInfo>",
          "name": "playUrls",
          "comment": "直播间urls",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "playBackUrl",
          "comment": "回放url",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "publishUrl",
          "comment": "推流url",
          "required": false
        },
        {
          "entityName": "Date",
          "name": "beginTime",
          "comment": "直播实际开始时间",
          "required": false
        },
        {
          "entityName": "Date",
          "name": "overTime",
          "comment": "直播实际结束时间",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "duration",
          "comment": "回放视频时长, 单位：秒",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "desc",
          "comment": "直播间简介",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "roomCode",
          "comment": "房间号",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.entity.live.LiveGuestInfo",
          "name": "liveGuestInfo",
          "comment": "分享嘉宾信息",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "isOpen",
          "comment": "是否公开 0=未公开  1=公开",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "type",
          "comment": "直播类型 1=竖屏视频直播 2=投屏直播  3=横屏视频直播",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60e7",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.request.UserBoxProgressQueryReq",
      "since": "2020/4/10",
      "comment": "用户宝箱进度查询请求",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间ID",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60e8",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.response.ImSignResponse",
      "since": "2018年09月17日 14:24",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.String",
          "name": "identifier",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "fddRole",
          "comment": "agent=经纪人，project_manager=楼盘项目经理, sf=商服",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "fddId",
          "comment": "房多多系统中的用户id",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "userSig",
          "comment": "用户签名",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60e9",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.request.UserGrabRedEnvelopeReq",
      "comment": "用户抢红包请求类",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "redEnvelopeId",
          "comment": "红包id",
          "required": true
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60ea",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<java.util.List<com.fangdd.ap.live.server.web.response.LiveGiftResp>>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.util.List<com.fangdd.ap.live.server.web.response.LiveGiftResp>",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "java.util.List<com.fangdd.ap.live.server.web.response.LiveGiftResp>",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60eb",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.web.response.AgentScoreResp>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.web.response.AgentScoreResp",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.web.response.AgentScoreResp",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60ec",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.lang.Boolean",
      "comment": "",
      "defaultValue": "",
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60ed",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.lang.String",
      "comment": "",
      "defaultValue": "",
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60ee",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.page.PageInfo",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Integer",
          "name": "pageNo",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "pageSize",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "total",
          "comment": "",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60ef",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.project.SettlementRule",
      "since": "2018年09月19日 13:56",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.String",
          "name": "commissionRule",
          "comment": "佣金规则描述",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "settlementFlow",
          "comment": "结算方式",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "addedBonus",
          "comment": "成交奖励",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60f0",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.common.EstateBaseInfo",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "estateId",
          "comment": "楼盘ID",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "projectId",
          "comment": "项目ID",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "estateName",
          "comment": "楼盘名称",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "estateCityId",
          "comment": "楼盘城市ID",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "estateCityName",
          "comment": "楼盘城市名称",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "estateRegionId",
          "comment": "楼盘区域ID",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "estateRegionName",
          "comment": "楼盘区域名称",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "estateImage",
          "comment": "楼盘封面",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.entity.common.ProjectManagerInfo",
          "name": "projectManager",
          "comment": "项目经理信息",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.entity.project.ReferralRule",
          "name": "referralRule",
          "comment": "报备规则",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.entity.project.GuideRule",
          "name": "guideRule",
          "comment": "带看规则",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.entity.project.SettlementRule",
          "name": "settlementRule",
          "comment": "结佣规则",
          "required": false
        },
        {
          "entityName": "java.util.List<com.fangdd.ap.live.server.entity.project.GuideCoupon>",
          "name": "guideCoupons",
          "comment": "现金券",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60f1",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.common.ProjectManagerInfo",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.String",
          "name": "userId",
          "comment": "用户id",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "name",
          "comment": "项目经理姓名",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "mobile",
          "comment": "项目经理电话",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60f2",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.util.List<com.fangdd.ap.live.server.entity.live.LiveRecommend>",
      "comment": "",
      "defaultValue": "",
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.entity.live.LiveRecommend",
          "required": false
        }
      ],
      "collection": true,
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60f3",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "java.util.List<com.fangdd.ap.live.server.web.response.LiveGiftResp>",
      "comment": "",
      "defaultValue": "",
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.web.response.LiveGiftResp",
          "required": false
        }
      ],
      "collection": true,
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60f4",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.live.interact.LiveInteractMsgInfo",
      "since": "2020/3/26",
      "comment": "直播互动消息信息",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间ID",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "imConversationId",
          "comment": "IM会话/聊天室ID",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "fromAccountId",
          "comment": "消息发送者的fdd_id",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "fromAccountRole",
          "comment": "消息发送者的fdd_role",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "fromAccountName",
          "comment": "消息发送人姓名",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "msgType",
          "comment": "消息类型 默认为1，1=普通消息",
          "required": false
        },
        {
          "entityName": "Date",
          "name": "msgTime",
          "comment": "消息发送的时间",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msgContent",
          "comment": "消息内容",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60f5",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.response.AgentScoreResp",
      "since": "2020/4/15",
      "comment": "经纪人积分",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Integer",
          "name": "agentId",
          "comment": "经纪人ID",
          "required": false,
          "demo": "3011743"
        },
        {
          "entityName": "java.lang.Integer",
          "name": "score",
          "comment": "经纪人当前积分",
          "required": false,
          "demo": "12345"
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60f6",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "int",
      "defaultValue": "",
      "primitive": true
    },
    {
      "id": "5f6355074d611f41854f60f7",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "Date",
      "defaultValue": "",
      "primitive": true
    },
    {
      "id": "5f6355074d611f41854f60f8",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.live.LiveStatusAndPlayCount",
      "since": "2020/2/27",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间ID",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "status",
          "comment": "直播间状态 0=未开始  1=直播中  2=直播结束  3=禁播  4=直播中断",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "playCount",
          "comment": "播放次数",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60f9",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.live.LiveRecommend",
      "comment": "直播推荐",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间Id",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "title",
          "comment": "直播标题",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "desc",
          "comment": "直播简介",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "url",
          "comment": "直播地址",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "coverUrl",
          "comment": "直播封面图",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "playCount",
          "comment": "播放次数",
          "required": false
        },
        {
          "entityName": "java.util.List<java.lang.String>",
          "name": "avatarUrls",
          "comment": "经纪人头像列表",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60fa",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.web.response.ImSignResponse>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.web.response.ImSignResponse",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.web.response.ImSignResponse",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60fb",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.entity.live.LiveStatusAndPlayCount>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.entity.live.LiveStatusAndPlayCount",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.entity.live.LiveStatusAndPlayCount",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60fc",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<com.fangdd.ap.live.server.web.response.LiveStatusResponse>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "com.fangdd.ap.live.server.web.response.LiveStatusResponse",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "com.fangdd.ap.live.server.web.response.LiveStatusResponse",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60fd",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.entity.common.AnchorBaseInfo",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "anchorId",
          "comment": "主播ID",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "anchorName",
          "comment": "主播姓名",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "anchorTel",
          "comment": "主播电话",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "anchorRoleName",
          "comment": "主播角色名",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60fe",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.request.LiveGiftSendReq",
      "since": "2020/4/9",
      "comment": "直播礼物发送请求",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间ID",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "giftId",
          "comment": "礼物ID",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "giftValue",
          "comment": "礼物价值",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "sendNum",
          "comment": "发送数量",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f60ff",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.common.basic.CommonResponse<java.lang.Boolean>",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "int",
          "name": "code",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.String",
          "name": "msg",
          "comment": "",
          "required": false
        },
        {
          "entityName": "java.lang.Boolean",
          "name": "data",
          "comment": "",
          "required": false
        }
      ],
      "parameteredEntityRefs": [
        {
          "entityName": "java.lang.Boolean",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f6100",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.request.ImSignRequest",
      "since": "2018年09月17日 14:26",
      "comment": "",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.String",
          "name": "fddRole",
          "comment": "agent=经纪人，project_manager=楼盘项目经理, sf=商服",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "fddId",
          "comment": "房多多系统中的用户id",
          "required": false
        },
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间Id",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f6101",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.request.UserBoxAddReq",
      "since": "2020/4/16",
      "comment": "用户宝箱添加请求",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间ID",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    },
    {
      "id": "5f6355074d611f41854f6102",
      "docId": "com.fangdd.ap:ap-realtor-live-server",
      "docVersion": 1600345351050,
      "name": "com.fangdd.ap.live.server.web.request.LikeReq",
      "since": "2020/4/10",
      "comment": "点赞请求",
      "defaultValue": "",
      "fields": [
        {
          "entityName": "java.lang.Long",
          "name": "roomId",
          "comment": "直播间ID",
          "required": false
        },
        {
          "entityName": "java.lang.Integer",
          "name": "likeTimes",
          "comment": "点赞次数",
          "required": false
        }
      ],
      "primitive": false,
      "enumerate": false
    }
  ]
}

const result = parse(data,'tp-doc');

console.log(result.interfaceList);