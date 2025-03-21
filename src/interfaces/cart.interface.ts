import { Document } from 'mongoose';

export interface ICart extends Document {
  userId: string;
  books: Array<{
    bookId: string;
    quantity: number;
  }>;
  isPurchased: boolean;
  cartTotal: number;
}