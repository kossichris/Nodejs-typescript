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
exports.getAllRentsHandler = exports.deleteRentHandler = exports.updateRentHandler = exports.getRentHandler = exports.createRentHandler = void 0;
const rent_service_1 = require("../services/rent.service");
const DEFAULT_PAGINATION_PAGE = 1;
const DEFAULT_PAGINATION_SIZE = 10;
// Method to handle the rent creation
const createRentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const rent = yield (0, rent_service_1.createRent)(Object.assign(Object.assign({}, req.body), { author: userId }));
        return res.status(201).send(rent);
    }
    catch (error) {
        next(error);
    }
});
exports.createRentHandler = createRentHandler;
// Method to handle rent fetching
const getRentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rent = yield (0, rent_service_1.getRent)(req.params.id);
        if (rent) {
            return res.status(200).send(rent);
        }
        return res.status(404).send();
    }
    catch (error) {
        next(error);
    }
});
exports.getRentHandler = getRentHandler;
// Method to handle rent update
const updateRentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const rent = yield (0, rent_service_1.updateRent)(req.params.id, req.body, userId);
        return res.status(200).send(rent);
    }
    catch (error) {
        next(error);
    }
});
exports.updateRentHandler = updateRentHandler;
// Method to handle rent deletion
const deleteRentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        yield (0, rent_service_1.deleteRent)(req.params.id, userId);
        return res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRentHandler = deleteRentHandler;
// Method to fetch all the rents
const getAllRentsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = (req.query.page && parseInt(req.query.page.toString())) ||
            DEFAULT_PAGINATION_PAGE;
        const size = (req.query.size && parseInt(req.query.size.toString())) ||
            DEFAULT_PAGINATION_SIZE;
        const rents = yield (0, rent_service_1.getAllRents)({ page, size });
        return res.status(200).send(rents);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllRentsHandler = getAllRentsHandler;
