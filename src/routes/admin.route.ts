import express, { IRouter } from 'express';
import AdminController from '../controllers/admin.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { setRole } from '../middlewares/role.middleware';

class AdminRoutes {
  private AdminController = new AdminController();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post('/register', setRole('admin'), this.AdminController.register);
    this.router.post('/login', this.AdminController.login);

    // Protected routes
    this.router.get('/admin-only', authMiddleware(['admin']), this.AdminController.adminProfile);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default AdminRoutes;