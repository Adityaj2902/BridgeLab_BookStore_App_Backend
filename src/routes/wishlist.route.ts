import express, { IRouter } from 'express';
import WishlistController from './../controllers/whislist.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

class WishlistRoutes {
  private WishlistController = new WishlistController();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post('/add', authMiddleware(['user']), this.WishlistController.addToWishlist);
    this.router.get('/', authMiddleware(['user']), this.WishlistController.viewWishlist);
    this.router.post('/remove', authMiddleware(['user']), this.WishlistController.removeFromWishlist);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default WishlistRoutes;