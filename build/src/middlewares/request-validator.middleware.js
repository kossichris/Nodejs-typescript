"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const validation_failed_exception_1 = __importDefault(require("../exceptions/validation-failed.exception"));
const validate = (schema) => {
    return (req, res, next) => {
        // validate request body
        if (schema.body) {
            const { error } = schema.body.validate(req.body);
            if (error) {
                const errors = error.details.map((detail) => detail.message);
                logger_1.default.error(`Request body validation failed : ${errors}`);
                next(new validation_failed_exception_1.default(errors));
            }
        }
        // validate request url params
        if (schema.params) {
            const { error } = schema.params.validate(req.params);
            if (error) {
                const errors = error.details.map((detail) => detail.message);
                logger_1.default.error(`Request url parameters validation failed : ${errors}`);
                next(new validation_failed_exception_1.default(errors));
            }
        }
        // validate request query params
        if (schema.query) {
            const { error } = schema.query.validate(req.query);
            if (error) {
                const errors = error.details.map((detail) => detail.message);
                logger_1.default.error(`Request query parameters validation failed : ${errors}`);
                next(new validation_failed_exception_1.default(errors));
            }
        }
        next();
    };
};
exports.validate = validate;
