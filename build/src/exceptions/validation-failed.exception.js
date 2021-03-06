"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = __importDefault(require("./http.exception"));
class ValidationFailedException extends http_exception_1.default {
    constructor(errors) {
        super(400, 'Validation failed', errors);
    }
}
exports.default = ValidationFailedException;
