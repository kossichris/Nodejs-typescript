"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRentSchema = exports.updateRentSchema = exports.getRentSchema = exports.createRentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createRentSchema = {
    body: joi_1.default.object().keys({
        acc_status: joi_1.default.string().required(),
        req_amount: joi_1.default.number().required(),
        salary: joi_1.default.number().required(),
        monthly_plan_pay: joi_1.default.string().required(),
    }),
};
exports.getRentSchema = {
    params: joi_1.default.object().keys({
        id: joi_1.default.string().hex().length(24).required(),
    }),
};
exports.updateRentSchema = {
    body: joi_1.default.object().keys({
        req_amount: joi_1.default.number().required(),
        monthly_plan_pay: joi_1.default.string().required(),
        is_approved: joi_1.default.boolean().required(),
    }),
    params: joi_1.default.object().keys({
        id: joi_1.default.string().hex().length(24).required(),
    }),
};
exports.deleteRentSchema = {
    params: joi_1.default.object().keys({
        id: joi_1.default.string().hex().length(24).required(),
    }),
};
