import express, { IRouter } from 'express';
import UserController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { setRole } from '../middlewares/role.middleware';

class UserRoutes {
  private UserController = new UserController();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post('/register', setRole('user'), this.UserController.register);
    this.router.post('/login', this.UserController.login);

    // Protected routes
    this.router.get('/user-only', authMiddleware(['user']), this.UserController.userProfile);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;