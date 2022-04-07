import AuthorizationFailedException from '../exceptions/authorized-failed.exception';
import NotFoundException from '../exceptions/not-found.exception';
import RentModel, { IRentDB } from '../models/rent.model';
import UserModel from '../models/user.model';
import transform from '../transformers/rent.transformer';
import {
  Pagination,
  Rent,
  RentCreateInput,
  RentUpdateInput,
} from '../types/rent.type';

// Create a rent in the database convert the result to the rent type and send it back to the controller
export const createRent = async (rentInput: RentCreateInput): Promise<Rent> => {
  const isAuthorExists = await UserModel.exists({ _id: rentInput.author });
  if (!isAuthorExists) {
    throw new NotFoundException(`User with id ${rentInput.author} not found`);
  }

  let interest =
    (rentInput.req_amount * (2 * 0.01)) / rentInput.monthly_plan_pay;
  let calc = rentInput.req_amount / rentInput.monthly_plan_pay;
  let payment = (calc + interest).toFixed(2);

  let final = {
    acc_status: rentInput.acc_status,
    monthly_plan_pay: rentInput.monthly_plan_pay,
    req_amount: rentInput.req_amount,
    salary: rentInput.salary,
    payment: payment,
  };
  let rent: IRentDB = await RentModel.create(final);
  rent = await rent.populate('author').execPopulate();
  return transform(rent);
};

// Fetch a rent from database convert it to the rent type and send it back to the controller
export const getRent = async (id: string): Promise<Rent | null> => {
  let rent: IRentDB | null = await RentModel.findById(id);
  rent = await rent!.populate('author').execPopulate();
  if (!rent) {
    return null;
  }
  return transform(rent);
};

// Update a rent from database convert it to the rent type and send it back to the controller
export const updateRent = async (
  id: string,
  rentUpdate: RentUpdateInput,
  userId: string | undefined
): Promise<Rent> => {
  const rent: Rent | null = await getRent(id);
  if (!rent) {
    throw new NotFoundException(`Rent with an id ${id} not found`);
  }
  /*
  if (rent.author.id !== userId) {
    throw new AuthorizationFailedException([
      `User is not authorized to perform update on the requested rent`,
    ]);
  }*/

  let interest =
    (rentUpdate.req_amount * (2 * 0.01)) / rentUpdate.monthly_plan_pay;
  let calc = rentUpdate.req_amount / rentUpdate.monthly_plan_pay;
  let payment = (calc + interest).toFixed(2);

  let finalUpdate = {
    req_amount: rentUpdate.req_amount,
    monthly_plan_pay: rentUpdate.monthly_plan_pay,
    is_approved: rentUpdate.is_approved,
    payment: payment,
  };
  const updatedRent: IRentDB | null = await RentModel.findByIdAndUpdate(
    id,
    finalUpdate,
    {
      new: true,
    }
  ).populate('author');
  if (!updatedRent) {
    throw new NotFoundException(`Rent with an id ${id} not found`);
  }
  return transform(updatedRent);
};

// Delete a rent from database convert
export const deleteRent = async (
  id: string,
  userId: string | undefined
): Promise<boolean> => {
  const rent: Rent | null = await getRent(id);
  if (!rent) {
    throw new NotFoundException(`Rent with an id ${id} not found`);
  }
  if (rent.author.id !== userId) {
    throw new AuthorizationFailedException([
      `User is not authorized to perform delete on the requested rent`,
    ]);
  }

  await RentModel.findByIdAndDelete(id);
  return true;
};

// Fetch all the rents from database convert it to the rent type and send it back to the controller
export const getAllRents = async (
  pagination: Pagination
): Promise<Array<Rent>> => {
  const rents: Array<IRentDB> = await RentModel.find()
    .limit(pagination.size)
    .skip((pagination.page - 1) * pagination.size)
    .populate('author');
  return rents.map((rent) => transform(rent));
};
