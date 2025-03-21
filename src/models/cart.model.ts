import { Schema, model } from 'mongoose';
import { ICart } from '../interfaces/cart.interface';

const CartSchema = new Schema<ICart>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  books: [
    {
      bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  isPurchased: {
    type: Boolean,
    default: false,
  },
  cartTotal: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cart = model<ICart>('Cart', CartSchema);

export { Cart };