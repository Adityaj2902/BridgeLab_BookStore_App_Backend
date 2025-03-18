import { Book } from '../models/book.model';

class BookService {
  async createBook(data: any) {
    const book = new Book(data);
    return await book.save();
  }
  async getBooks(bookName?: string, author?: string, sortBy?: string) {
    const query: any = {};
    if (bookName) {
      query.bookName = { $regex: bookName, $options: 'i' }; // Case-insensitive search
    }
    if (author) {
      query.author = { $regex: author, $options: 'i' }; // Case-insensitive search
    }

    let sortOption = {};
    if (sortBy === 'price_asc') {
      sortOption = { price: 1 }; // Sort by price in ascending order
    } else if (sortBy === 'price_desc') {
      sortOption = { price: -1 }; // Sort by price in descending order
    }

    return await Book.find(query).sort(sortOption);
  }

  async getBookById(id: string) {
    return await Book.findById(id);
  }

  async updateBook(id: string, data: any) {
    return await Book.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteBook(id: string) {
    return await Book.findByIdAndDelete(id);
  }
}

export const bookService = new BookService();