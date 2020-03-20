"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./auth"));
var media_1 = __importDefault(require("./media"));
var server = express_1.default();
var apiPrefix = '/api/v1';
server.use('/_healthcheck', function (_req, res) {
    res.status(200).json({ uptime: process.uptime() });
});
// const refreshLongLivedCode = async (code: string) => {
//   const url = 'https://graph.instagram.com/refresh_access_token'
//   const type = 'ig_refresh_token'
//   const response = await axios.get(`${url}?grant_type=${type}&access_token=${code}`);
//   console.log(response)
// }
server.use(apiPrefix, auth_1.default);
server.use(apiPrefix, media_1.default);
// catch all routers
server.use('*', function (_req, res) { return res.status(404).json({
    message: 'Not found on /api/v1'
}); });
server.listen(4004, function () { console.log('Running at localhost:4004'); });
