"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const middlewares_1 = require("../middlewares");
const user_schema_1 = require("../schemas/user.schema");
const authRouter = (0, express_1.Router)();
// Route to login a user
authRouter.post('/login', (0, middlewares_1.validate)(user_schema_1.loginUserSchema), auth_controller_1.loginHandler);
//Route to create a user
authRouter.post('/signup', (0, middlewares_1.validate)(user_schema_1.signUpUserSchema), auth_controller_1.signUpHandler);
exports.default = authRouter;
