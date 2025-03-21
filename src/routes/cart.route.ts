import express, { IRouter } from 'express';
import CartController from '../controllers/cart.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

class CartRoutes {
  private CartController = new CartController();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post('/add', authMiddleware(['user']), this.CartController.addToCart);
    this.router.get('/', authMiddleware(['user']), this.CartController.viewCart);
    this.router.post('/purchase', authMiddleware(['user']), this.CartController.purchaseCart);
    this.router.post('/remove', authMiddleware(['user']), this.CartController.removeFromCart);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CartRoutes;
