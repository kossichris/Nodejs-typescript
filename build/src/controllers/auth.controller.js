"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpHandler = exports.loginHandler = void 0;
const user_service_1 = require("../services/user.service");
// Method to handle the user login
const loginHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.login)(req.body);
        return res.status(200).send(user);
    }
    catch (error) {
        next(error);
    }
});
exports.loginHandler = loginHandler;
// Method to handle user sign up
const signUpHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.signUp)(req.body);
        return res.status(201).send(user);
    }
    catch (error) {
        next(error);
    }
});
exports.signUpHandler = signUpHandler;
