import express, { IRouter } from 'express';
const router = express.Router();

import UserRoutes from './user.route';
import AdminRoutes from './admin.route';
import bookRoutes from './book.route';
import CartRoutes from './cart.route';
import WishlistRoutes from './wishlist.route';
import CustomerRoutes from './../routes/customer.detail.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', new UserRoutes().getRoutes());
  router.use('/admin', new AdminRoutes().getRoutes());
  router.use('/books', bookRoutes);
  router.use('/cart', new CartRoutes().getRoutes());
  router.use('/wishlist', new WishlistRoutes().getRoutes());
  router.use('/customer', new CustomerRoutes().getRoutes());

  return router;
};

export default routes;