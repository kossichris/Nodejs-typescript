"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Blog database schema
const RentSchema = new mongoose_1.Schema({
    acc_status: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    req_amount: {
        type: Number,
        required: true,
    },
    monthly_plan_pay: {
        type: Number,
        required: true,
    },
    is_approved: {
        type: Boolean,
        default: false,
    },
    payment: {
        type: Number,
        default: 0,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
}, {
    timestamps: true,
    versionKey: false,
});
const RentModel = (0, mongoose_1.model)('rent', RentSchema);
exports.default = RentModel;
