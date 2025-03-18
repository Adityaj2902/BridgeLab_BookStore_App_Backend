import { Request, Response } from 'express';
import { bookService } from '../services/book.service';

class BookController {
  async createBook(req: Request, res: Response) {
    try {
      const book = await bookService.createBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getBooks(req: Request, res: Response) {
    try {
      const { bookName, author, sortBy } = req.query;
      const books = await bookService.getBooks(bookName as string, author as string, sortBy as string);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const book = await bookService.getBookById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateBook(req: Request, res: Response) {
    try {
      const book = await bookService.updateBook(req.params.id, req.body);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteBook(req: Request, res: Response) {
    try {
      const book = await bookService.deleteBook(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const bookController = new BookController();