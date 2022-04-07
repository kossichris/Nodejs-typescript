"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../../utils/logger"));
const stream = {
    write: (message) => logger_1.default.http(message),
};
const loggerMiddleware = (0, morgan_1.default)(':method :url :status :req[body] :response-time ms', { stream });
exports.default = loggerMiddleware;
