"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorized_failed_exception_1 = __importDefault(require("../exceptions/authorized-failed.exception"));
const authorize = (authorizedRoles) => {
    return (req, res, next) => {
        if (authorizedRoles.find((role) => { var _a; return role === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role); })) {
            next();
        }
        else {
            next(new authorized_failed_exception_1.default([
                `User is not authorized to perform ${req.baseUrl}`,
            ]));
        }
    };
};
exports.authorize = authorize;
