"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const folderPath = process.env.LOG_FOLDER || 'logs';
const level = process.env.LOG_LEVEL || 'debug';
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'blue',
    debug: 'gray',
};
winston_1.default.addColors(colors);
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.default.format.printf((info) => `${info.timestamp} [${info.level === 'http' ? 'api' : info.level}] ${info.message}`));
const transports = [
    new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize({ all: true })),
    }),
    new winston_1.default.transports.File({
        filename: `${folderPath}/error.log`,
        level: 'error',
    }),
    new winston_1.default.transports.File({ filename: `${folderPath}/app.log` }),
];
const Logger = winston_1.default.createLogger({
    level: level,
    levels,
    format,
    transports,
});
exports.default = Logger;
