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
exports.getAllRents = exports.deleteRent = exports.updateRent = exports.getRent = exports.createRent = void 0;
const authorized_failed_exception_1 = __importDefault(require("../exceptions/authorized-failed.exception"));
const not_found_exception_1 = __importDefault(require("../exceptions/not-found.exception"));
const rent_model_1 = __importDefault(require("../models/rent.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const rent_transformer_1 = __importDefault(require("../transformers/rent.transformer"));
// Create a rent in the database convert the result to the rent type and send it back to the controller
const createRent = (rentInput) => __awaiter(void 0, void 0, void 0, function* () {
    const isAuthorExists = yield user_model_1.default.exists({ _id: rentInput.author });
    if (!isAuthorExists) {
        throw new not_found_exception_1.default(`User with id ${rentInput.author} not found`);
    }
    let interest = (rentInput.req_amount * (2 * 0.01)) / rentInput.monthly_plan_pay;
    let calc = rentInput.req_amount / rentInput.monthly_plan_pay;
    let payment = (calc + interest).toFixed(2);
    let final = {
        acc_status: rentInput.acc_status,
        monthly_plan_pay: rentInput.monthly_plan_pay,
        req_amount: rentInput.req_amount,
        salary: rentInput.salary,
        payment: payment,
    };
    let rent = yield rent_model_1.default.create(final);
    rent = yield rent.populate('author').execPopulate();
    return (0, rent_transformer_1.default)(rent);
});
exports.createRent = createRent;
// Fetch a rent from database convert it to the rent type and send it back to the controller
const getRent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rent = yield rent_model_1.default.findById(id).populate('author');
    if (!rent) {
        return null;
    }
    return (0, rent_transformer_1.default)(rent);
});
exports.getRent = getRent;
// Update a rent from database convert it to the rent type and send it back to the controller
const updateRent = (id, rentUpdate, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const rent = yield (0, exports.getRent)(id);
    if (!rent) {
        throw new not_found_exception_1.default(`Rent with an id ${id} not found`);
    }
    if (rent.author.id !== userId) {
        throw new authorized_failed_exception_1.default([
            `User is not authorized to perform update on the requested rent`,
        ]);
    }
    let interest = (rentUpdate.req_amount * (2 * 0.01)) / rentUpdate.monthly_plan_pay;
    let calc = rentUpdate.req_amount / rentUpdate.monthly_plan_pay;
    let payment = (calc + interest).toFixed(2);
    let finalUpdate = {
        req_amount: rentUpdate.req_amount,
        monthly_plan_pay: rentUpdate.monthly_plan_pay,
        is_approved: rentUpdate.is_approved,
        payment: payment,
    };
    const updatedRent = yield rent_model_1.default.findByIdAndUpdate(id, finalUpdate, {
        new: true,
    }).populate('author');
    if (!updatedRent) {
        throw new not_found_exception_1.default(`Rent with an id ${id} not found`);
    }
    return (0, rent_transformer_1.default)(updatedRent);
});
exports.updateRent = updateRent;
// Delete a rent from database convert
const deleteRent = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const rent = yield (0, exports.getRent)(id);
    if (!rent) {
        throw new not_found_exception_1.default(`Rent with an id ${id} not found`);
    }
    if (rent.author.id !== userId) {
        throw new authorized_failed_exception_1.default([
            `User is not authorized to perform delete on the requested rent`,
        ]);
    }
    yield rent_model_1.default.findByIdAndDelete(id);
    return true;
});
exports.deleteRent = deleteRent;
// Fetch all the rents from database convert it to the rent type and send it back to the controller
const getAllRents = (pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const rents = yield rent_model_1.default.find()
        .limit(pagination.size)
        .skip((pagination.page - 1) * pagination.size)
        .populate('author');
    return rents.map((rent) => (0, rent_transformer_1.default)(rent));
});
exports.getAllRents = getAllRents;
