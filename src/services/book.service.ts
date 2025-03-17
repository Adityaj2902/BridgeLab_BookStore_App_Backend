import { Book } from './../models/book.model';

class BookService {
  async createBook(data: any) {
    const book = new Book(data);
    return await book.save();
  }

  async getBooks() {
    return await Book.find();
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