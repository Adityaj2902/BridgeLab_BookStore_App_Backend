import express, { IRouter } from 'express';
import CustomerController from '../controllers/customer.detail.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

class CustomerRoutes {
  private CustomerController = new CustomerController();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post('/add', authMiddleware(['user']), this.CustomerController.addCustomerDetails);
    this.router.get('/', authMiddleware(['user']), this.CustomerController.getCustomerDetails);
    this.router.put('/update', authMiddleware(['user']), this.CustomerController.updateCustomerDetails);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CustomerRoutes;