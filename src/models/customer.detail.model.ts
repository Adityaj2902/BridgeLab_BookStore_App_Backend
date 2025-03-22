import { Schema, model } from 'mongoose';
import { ICustomer } from './../interfaces/customer.detail.interface';

const AddressSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
});

const CustomerSchema = new Schema<ICustomer>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  addresses: [AddressSchema],
});

const Customer = model<ICustomer>('Customer', CustomerSchema);

export { Customer };