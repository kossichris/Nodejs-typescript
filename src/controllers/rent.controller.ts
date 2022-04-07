import { NextFunction, Request, Response } from 'express';
import {
  createRent,
  deleteRent,
  getAllRents,
  getRent,
  updateRent,
} from '../services/rent.service';
import { Rent } from '../types/rent.type';

const DEFAULT_PAGINATION_PAGE = 1;
const DEFAULT_PAGINATION_SIZE = 10;

// Method to handle the rent creation
export const createRentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const userId = req.user?.id;
    const rent: Rent = await createRent({ ...req.body, author: userId });
    return res.status(201).send(rent);
  } catch (error) {
    console.log(error);
    // next(error);
  }
};

// Method to handle rent fetching
export const getRentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const rent: Rent | null = await getRent(req.params.id);

    if (rent) {
      return res.status(200).send(rent);
    }
    return res.status(404).send();
  } catch (error) {
    next(error);
  }
};

// Method to handle rent update
export const updateRentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const userId = req.user?.id;
    const rent: Rent = await updateRent(req.params.id, req.body, userId);
    return res.status(200).send(rent);
  } catch (error) {
    next(error);
  }
};

// Method to handle rent deletion
export const deleteRentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const userId = req.user?.id;
    await deleteRent(req.params.id, userId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Method to fetch all the rents
export const getAllRentsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const page =
      (req.query.page && parseInt(req.query.page.toString())) ||
      DEFAULT_PAGINATION_PAGE;
    const size =
      (req.query.size && parseInt(req.query.size.toString())) ||
      DEFAULT_PAGINATION_SIZE;

    const rents: Array<Rent> = await getAllRents({ page, size });
    return res.status(200).send(rents);
  } catch (error) {
    next(error);
  }
};
