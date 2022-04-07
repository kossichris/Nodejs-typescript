import { User } from './user.type';

export type Rent = {
  acc_status: string;
  salary: number;
  req_amount: number;
  monthly_plan_pay: number;
  is_approved: boolean;
  payment: string;
  author: User;
  id: string;
};

export type RentCreateInput = {
  acc_status: string;
  salary: number;
  req_amount: number;
  monthly_plan_pay: number;
  author: User;
};

export type RentUpdateInput = {
  req_amount: number;
  monthly_plan_pay: number;
  is_approved: boolean;
  payment: string;
};

export type Pagination = {
  size: number;
  page: number;
};
