import { Router } from 'express';
import { bookController } from './../controllers/book.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware(['admin']), bookController.createBook);
router.get('/', authMiddleware(['admin', 'user']), bookController.getBooks);
router.get('/:id', authMiddleware(['admin', 'user']), bookController.getBookById);
router.put('/:id', authMiddleware(['admin']), bookController.updateBook);
router.delete('/:id',authMiddleware(['admin']), bookController.deleteBook);

export default router;