"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = __importDefault(require("redis"));
var util_1 = require("util");
var url = process.env.REDIS_URL || 'redis://localhost:6379';
var client = redis_1.default.createClient(url);
client.on("error", function (error) {
    console.error(error);
});
exports.setAsync = util_1.promisify(client.set).bind(client);
exports.getAsync = util_1.promisify(client.get).bind(client);
