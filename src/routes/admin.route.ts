import express, { IRouter } from 'express';
import AuthController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { setRole } from '../middlewares/role.middleware';

class AdminRoutes {
  private AuthController = new AuthController();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post('/register', setRole('admin'), this.AuthController.register);
    this.router.post('/login', setRole('admin'), this.AuthController.login);

    // Protected routes
    this.router.get('/admin-only', authMiddleware(['admin']), this.AuthController.userProfile);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default AdminRoutes;