import { Wishlist } from './../models/whislist.model';
import { Book } from '../models/book.model';
import { IWishlist } from './../interfaces/whislist.interface';

class WishlistService {
  public addToWishlist = async (userId: string, bookId: string, quantity: number): Promise<{ success: boolean, message: string, wishlist?: IWishlist }> => {
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, books: [] });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return { success: false, message: 'Book not found' };
    }

    if (book.quantity <= 0) {
      return { success: false, message: 'Book is not available' };
    }

    const bookInWishlist = wishlist.books.find((item) => item.bookId.toString() === bookId);
    if (bookInWishlist) {
      bookInWishlist.quantity += quantity;
    } else {
      wishlist.books.push({ bookId, quantity });
    }

    await wishlist.save();

    return { success: true, message: 'Book added to wishlist', wishlist };
  };

  public viewWishlist = async (userId: string): Promise<{ success: boolean, message: string, wishlist?: IWishlist }> => {
    const wishlist = await Wishlist.findOne({ userId }).populate('books.bookId');
    if (!wishlist) {
      return { success: false, message: 'Wishlist not found' };
    }
    return { success: true, message: 'Wishlist retrieved successfully', wishlist };
  };

  public removeFromWishlist = async (userId: string, bookId: string): Promise<{ success: boolean, message: string, wishlist?: IWishlist }> => {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return { success: false, message: 'Wishlist not found' };
    }

    const bookIndex = wishlist.books.findIndex((item) => item.bookId.toString() === bookId);
    if (bookIndex === -1) {
      return { success: false, message: 'Book not found in wishlist' };
    }

    wishlist.books.splice(bookIndex, 1);
    await wishlist.save();

    return { success: true, message: 'Book removed from wishlist', wishlist };
  };
}

export default WishlistService;