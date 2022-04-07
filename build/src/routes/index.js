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
const express_1 = require("express");
const rent_route_1 = __importDefault(require("./rent.route"));
const user_route_1 = __importDefault(require("./user.route"));
const router = (0, express_1.Router)();
// Endpoint co check server status
router.get('/health-check', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const healthCheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
    };
    try {
        res.send(healthCheck);
    }
    catch (e) {
        healthCheck.message = e;
        res.status(503).send();
    }
}));
// Import all user routes
router.use('/users', user_route_1.default);
// Import all rent routes
router.use('/rents', rent_route_1.default);
exports.default = router;
