import { IRentDB } from '../models/rent.model';
import { Rent } from '../types/rent.type';
import { transform as transformUser } from './user.transformer';

const transform = (rent: IRentDB): Rent => {
  return {
    id: rent._id.toString(),
    acc_status: rent.acc_status,
    req_amount: rent.req_amount,
    salary: rent.salary,
    monthly_plan_pay: rent.monthly_plan_pay,
    payment: rent.payment,
    author: transformUser(rent.author),
    is_approved: rent.is_approved,
  };
};

export default transform;
