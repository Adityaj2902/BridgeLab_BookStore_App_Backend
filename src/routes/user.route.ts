import express, { IRouter } from 'express';
import AuthController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { setRole } from '../middlewares/role.middleware';

class UserRoutes {
  private AuthController = new AuthController();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post('/register', setRole('user'), this.AuthController.register);
    this.router.post('/login', this.AuthController.login);

    // Protected routes
    this.router.get('/user-only', authMiddleware(['user']), this.AuthController.userProfile);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;