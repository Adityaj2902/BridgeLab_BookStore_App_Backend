import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
    description: {
      type: String,
      required: true
    },
    discountPrice: {
      type: Number,
      required: true
    },
    bookImage: {
      type: String,
      required: true
    },
    admin_user_id: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
    },
    bookName: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    price: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Book = model('Book', bookSchema);

export { Book };