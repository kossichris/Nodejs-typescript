"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_role_1 = require("../constants/user-role");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authorize_middleware_1 = require("../middlewares/authorize.middleware");
const middlewares_1 = require("../middlewares");
const rent_schema_1 = require("../schemas/rent.schema");
const rent_controller_1 = require("../controllers/rent.controller");
const rentRouter = (0, express_1.Router)();
// Route to create a rent
rentRouter.post('/', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)([user_role_1.ROLE.AUTHOR]), (0, middlewares_1.validate)(rent_schema_1.createRentSchema), rent_controller_1.createRentHandler);
//Route to fetch a rent
rentRouter.get('/:id', auth_middleware_1.authenticate, (0, middlewares_1.validate)(rent_schema_1.getRentSchema), rent_controller_1.getRentHandler);
//Route to update a rent
rentRouter.patch('/:id', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)([user_role_1.ROLE.AUTHOR]), (0, middlewares_1.validate)(rent_schema_1.updateRentSchema), rent_controller_1.updateRentHandler);
//Route to delete a rent
rentRouter.delete('/:id', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)([user_role_1.ROLE.AUTHOR]), (0, middlewares_1.validate)(rent_schema_1.deleteRentSchema), rent_controller_1.deleteRentHandler);
//Route to get all the rents
rentRouter.get('/', auth_middleware_1.authenticate, rent_controller_1.getAllRentsHandler);
exports.default = rentRouter;
