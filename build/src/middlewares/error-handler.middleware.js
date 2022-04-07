"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const errorHandlerMiddleware = (exception, request, response, next) => {
    const status = exception.statusCode || exception.status || 500;
    const message = exception.message || 'Something went wrong';
    let errorResponse = {
        status,
        message,
    };
    if (exception.errors) {
        errorResponse = Object.assign(Object.assign({}, errorResponse), { errors: exception.errors });
    }
    logger_1.default.error(`${exception.message} : ${exception.errors}`);
    response.status(status).send(errorResponse);
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
