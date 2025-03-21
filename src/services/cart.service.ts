import { Cart } from '../models/cart.model';
import { Book } from '../models/book.model';
import { ICart } from '../interfaces/cart.interface';

class CartService {
  public addToCart = async (userId: string, bookId: string, quantity: number): Promise<{ success: boolean, message: string, cart?: ICart }> => {
    let cart = await Cart.findOne({ userId, isPurchased: false });
    if (!cart) {
      cart = new Cart({ userId, books: [], cartTotal: 0 });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return { success: false, message: 'Book not found' };
    }

    if (book.quantity <= 0) {
      return { success: false, message: 'Book is not available' };
    }

    if (book.quantity < quantity) {
      return { success: false, message: 'Insufficient quantity available' };
    }

    const bookInCart = cart.books.find((item) => item.bookId.toString() === bookId);
    if (bookInCart) {
      if (book.quantity < bookInCart.quantity + quantity) {
        return { success: false, message: 'Insufficient quantity available' };
      }
      bookInCart.quantity += quantity;
    } else {
      cart.books.push({ bookId, quantity });
    }

    cart.cartTotal += book.price * quantity;
    await cart.save();

    return { success: true, message: 'Book added to cart', cart };
  };

  public viewCart = async (userId: string): Promise<{ success: boolean, message: string, cart?: ICart }> => {
    const cart = await Cart.findOne({ userId, isPurchased: false }).populate('books.bookId');
    if (!cart) {
      return { success: false, message: 'Cart not found' };
    }
    return { success: true, message: 'Cart retrieved successfully', cart };
  };

  public purchaseCart = async (userId: string): Promise<{ success: boolean, message: string, cart?: ICart }> => {
    const cart = await Cart.findOne({ userId, isPurchased: false });
    if (!cart) {
      return { success: false, message: 'Cart not found' };
    }

    cart.isPurchased = true;
    await cart.save();

    return { success: true, message: 'Cart purchased successfully', cart };
  };

  public removeFromCart = async (userId: string, bookId: string): Promise<{ success: boolean, message: string, cart?: ICart }> => {
    const cart = await Cart.findOne({ userId, isPurchased: false });
    if (!cart) {
      return { success: false, message: 'Cart not found' };
    }

    const bookIndex = cart.books.findIndex((item) => item.bookId.toString() === bookId);
    if (bookIndex === -1) {
      return { success: false, message: 'Book not found in cart' };
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return { success: false, message: 'Book not found' };
    }

    cart.cartTotal -= book.price * cart.books[bookIndex].quantity;
    cart.books.splice(bookIndex, 1);
    await cart.save();

    return { success: true, message: 'Book removed from cart', cart };
  };
}

export default CartService;