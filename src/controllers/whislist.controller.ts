import { Request, Response } from 'express';
import WishlistService from '../services/wishlist.service';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

class WishlistController {
  private wishlistService = new WishlistService();

  public addToWishlist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { userId } = req;
    const { bookId, quantity } = req.body;
    const result = await this.wishlistService.addToWishlist(userId, bookId, quantity);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  };

  public viewWishlist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { userId } = req;
    const result = await this.wishlistService.viewWishlist(userId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  };

  public removeFromWishlist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { userId } = req;
    const { bookId } = req.body;
    const result = await this.wishlistService.removeFromWishlist(userId, bookId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  };
}

export default WishlistController;