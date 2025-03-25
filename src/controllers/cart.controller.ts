import { Request, Response } from 'express';
import CartService from '../services/cart.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

class CartController {
  private cartService = new CartService();

  public addToCart = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    // const { userId, bookId, quantity } = req.body;
    const { bookId, quantity } = req.body;
    const userId = req.userId;

    const result = await this.cartService.addToCart(userId, bookId, quantity);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  };

  public viewCart = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;
    const result = await this.cartService.viewCart(userId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  };

  public purchaseCart = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;
    const result = await this.cartService.purchaseCart(userId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  };

  public removeFromCart = async (req: Request, res: Response): Promise<void> => {
    const { userId, bookId } = req.body;
    const result = await this.cartService.removeFromCart(userId, bookId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  };
}

export default CartController;