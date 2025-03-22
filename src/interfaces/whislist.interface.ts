export interface IWishlist {
    userId: string;
    books: {
      bookId: string;
      quantity: number;
    }[];
  }