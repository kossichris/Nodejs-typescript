import Joi from 'joi';
import { RequestValidateSchema } from '../types/request-validate-schema.type';

export const createRentSchema: RequestValidateSchema = {
  body: Joi.object().keys({
    acc_status: Joi.string().required(),
    req_amount: Joi.number().required(),
    salary: Joi.number().required(),
    monthly_plan_pay: Joi.number().required(),
  }),
};

export const getRentSchema: RequestValidateSchema = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const updateRentSchema: RequestValidateSchema = {
  body: Joi.object().keys({
    req_amount: Joi.number().required(),
    monthly_plan_pay: Joi.number().required(),
    is_approved: Joi.boolean().required(),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};
export const deleteRentSchema: RequestValidateSchema = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};
