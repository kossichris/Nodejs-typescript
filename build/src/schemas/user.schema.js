"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpUserSchema = exports.loginUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const user_role_1 = require("../constants/user-role");
exports.loginUserSchema = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
};
exports.signUpUserSchema = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        name: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        role: joi_1.default.string().valid(user_role_1.ROLE.READER, user_role_1.ROLE.AUTHOR),
    }),
};
