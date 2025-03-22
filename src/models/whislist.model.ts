import { Schema, model } from 'mongoose';
import { IWishlist } from '../interfaces/whislist.interface';

const WishlistSchema = new Schema<IWishlist>({
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
});

const Wishlist = model<IWishlist>('Wishlist', WishlistSchema);

export { Wishlist };