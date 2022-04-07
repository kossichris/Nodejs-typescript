"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const middlewares_1 = require("./middlewares");
const connect_1 = __importDefault(require("./db/connect"));
const routes_1 = __importDefault(require("./routes"));
const logger_1 = __importDefault(require("../utils/logger"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const app = (0, express_1.default)();
dotenv.config();
app.use(middlewares_1.loggerMiddleware);
if (!process.env.PORT) {
    process.exit(0);
}
(0, auth_middleware_1.authStrategy)(passport_1.default);
app.use(express_1.default.json());
app.use('/api/v1', routes_1.default);
app.use(middlewares_1.errorHandlerMiddleware);
app.listen(process.env.PORT, () => {
    logger_1.default.info(`Server started running on port ${process.env.PORT}`);
    (0, connect_1.default)();
});
