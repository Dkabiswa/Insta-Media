"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var media_1 = __importDefault(require("./media"));
var mediaRouter = express_1.default.Router();
var mediaController = new media_1.default();
mediaRouter.get('/media', mediaController.getMedia);
exports.default = mediaRouter;
