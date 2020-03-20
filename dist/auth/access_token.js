"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var querystring_1 = __importDefault(require("querystring"));
var redisCache_1 = require("../cache/redisCache");
require('dotenv').config();
var AccessTokenController = /** @class */ (function () {
    function AccessTokenController() {
    }
    AccessTokenController.prototype.displayAuthWindow = function (_req, res, _next) {
        var url = 'https://api.instagram.com/oauth/authorize';
        var appId = process.env.APPID;
        var redirectUrl = process.env.REDIRECTURL;
        var scope = 'user_profile,user_media';
        res.redirect(url + "?client_id=" + appId + "&redirect_uri=" + redirectUrl + "&scope=" + scope + "&response_type=code");
    };
    AccessTokenController.getLongLivedCode = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var appSecret, url, type, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appSecret = process.env.APPSECRET;
                        url = 'https://graph.instagram.com/access_token';
                        type = 'ig_exchange_token';
                        return [4 /*yield*/, axios_1.default.get(url + "?grant_type=" + type + "&client_secret=" + appSecret + "&access_token=" + code)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    AccessTokenController.prototype.getShortAccesToken = function (req, res, _next) {
        return __awaiter(this, void 0, void 0, function () {
            var appId, redirectUrl, appSecret, code, url, config, params, response, data, access_token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appId = process.env.APPID;
                        redirectUrl = process.env.REDIRECTURL;
                        appSecret = process.env.APPSECRET;
                        code = req.query.code;
                        if (!code) {
                            res.send({ error: 'Error authenticating' });
                        }
                        url = 'https://api.instagram.com/oauth/access_token';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        config = {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        };
                        params = {
                            client_id: appId,
                            client_secret: appSecret,
                            grant_type: 'authorization_code',
                            redirect_uri: redirectUrl,
                            code: code
                        };
                        return [4 /*yield*/, axios_1.default.post(url, querystring_1.default.stringify(params), config)];
                    case 2:
                        response = _a.sent();
                        data = response.data;
                        return [4 /*yield*/, redisCache_1.setAsync('user_id', data.user_id)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, redisCache_1.setAsync('short_token', data.access_token)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, AccessTokenController.getLongLivedCode(data.access_token)];
                    case 5:
                        access_token = (_a.sent()).access_token;
                        return [4 /*yield*/, redisCache_1.setAsync('access_token', access_token)];
                    case 6:
                        _a.sent();
                        res.status(200).send({ access_token: access_token });
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        console.log(error_1);
                        res.send(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return AccessTokenController;
}());
exports.default = AccessTokenController;
