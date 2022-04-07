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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.login = exports.getUser = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exceptions_1 = require("../exceptions");
const authentication_failed_exception_1 = __importDefault(require("../exceptions/authentication-failed.exception"));
const user_model_1 = __importDefault(require("../models/user.model"));
const user_transformer_1 = require("../transformers/user.transformer");
const ttl = process.env.JWT_TTL || 10000;
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY || 'privateKey';
// Create a user in the database convert the result to the User type and send it back to the controller
const createUser = (userInput) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.default.exists({ email: userInput.email });
    if (isUserExists) {
        throw new exceptions_1.UserExistsException(userInput.email);
    }
    const user = yield user_model_1.default.create(userInput);
    return (0, user_transformer_1.transform)(user);
});
exports.createUser = createUser;
// Fetch a user from database convert it to the User type and send it back to the controller
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        return null;
    }
    return (0, user_transformer_1.transform)(user);
});
exports.getUser = getUser;
// Check the user login
// If the username and password matched then return a JWT token
const login = (loginInput) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginInput;
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new authentication_failed_exception_1.default(['Incorrect username or password']);
    }
    const isPasswordMatching = yield user.comparePassword(password);
    if (!isPasswordMatching) {
        throw new authentication_failed_exception_1.default(['Incorrect username or password']);
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, jwtPrivateKey, {
        expiresIn: ttl,
    });
    return (0, user_transformer_1.transformAuthUser)(user, token);
});
exports.login = login;
// Check the user sign up
// If the user creation is successful then return a JWT token
const signUp = (signUpInput) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.default.exists({ email: signUpInput.email });
    if (isUserExists) {
        throw new exceptions_1.UserExistsException(signUpInput.email);
    }
    const user = yield user_model_1.default.create(signUpInput);
    const token = jsonwebtoken_1.default.sign({ id: user._id }, jwtPrivateKey, {
        expiresIn: ttl,
    });
    return (0, user_transformer_1.transformAuthUser)(user, token);
});
exports.signUp = signUp;
