import { model, Schema, Model, Document, PopulatedDoc } from 'mongoose';
import { IUserDB } from './user.model';

// Interface for blog database object
export interface IRentDB extends Document {
  acc_status: string;
  req_amount: number;
  salary: number;
  monthly_plan_pay: number;
  is_approved: boolean;
  payment: string;
  author: PopulatedDoc<IUserDB & Document>;
  createdAt?: Date;
  updatedAt?: Date;
}

// Blog database schema
const RentSchema: Schema = new Schema(
  {
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
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RentModel = model<IRentDB>('rent', RentSchema);

export default RentModel;
