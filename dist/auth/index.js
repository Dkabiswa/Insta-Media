"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var access_token_1 = __importDefault(require("./access_token"));
var authRouter = express_1.default.Router();
var accessTokenController = new access_token_1.default();
authRouter.get('/auth', accessTokenController.displayAuthWindow);
authRouter.get('/authcode', accessTokenController.getShortAccesToken);
exports.default = authRouter;
