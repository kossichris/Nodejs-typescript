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
exports.authenticate = exports.authStrategy = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const authentication_failed_exception_1 = __importDefault(require("../exceptions/authentication-failed.exception"));
const not_found_exception_1 = __importDefault(require("../exceptions/not-found.exception"));
const user_service_1 = require("../services/user.service");
// Passport strategy to authentication
const authStrategy = (passport) => {
    const jwtFromRequest = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken();
    const secretOrKey = process.env.JWT_PRIVATE_KEY || 'privateKey';
    passport.use(new passport_jwt_1.Strategy({
        secretOrKey,
        jwtFromRequest,
    }, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.getUser)(token.id);
            if (!user) {
                return done(new not_found_exception_1.default(`User not found`));
            }
            return done(null, Object.assign({}, user));
        }
        catch (error) {
            return done(error);
        }
    })));
};
exports.authStrategy = authStrategy;
const authenticate = (request, response, next) => {
    passport_1.default.authenticate('jwt', { session: false }, function (err, user) {
        if (err)
            return next(err);
        if (!user)
            throw new authentication_failed_exception_1.default();
        request.user = user;
        next();
    })(request, response, next);
};
exports.authenticate = authenticate;
