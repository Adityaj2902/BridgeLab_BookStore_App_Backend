import { Book } from '../models/book.model';

class BookService {
  async createBook(data: any) {
    const book = new Book(data);
    return await book.save();
  }

  async getBooks(title?: string, author?: string) {
    const query: any = {};
    if (title) {
      query.bookName = { $regex: title, $options: 'i' }; // Case-insensitive search
    }
    if (author) {
      query.author = { $regex: author, $options: 'i' }; 
    }
    return await Book.find(query);
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