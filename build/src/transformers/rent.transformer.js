"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_transformer_1 = require("./user.transformer");
const transform = (rent) => {
    return {
        id: rent._id.toString(),
        acc_status: rent.acc_status,
        req_amount: rent.req_amount,
        salary: rent.salary,
        monthly_plan_pay: rent.monthly_plan_pay,
        payment: rent.payment,
        author: (0, user_transformer_1.transform)(rent.author),
        is_approved: rent.is_approved,
    };
};
exports.default = transform;
