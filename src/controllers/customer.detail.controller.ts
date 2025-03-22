import { Request, Response } from 'express';
import CustomerService from '../services/customer.detail.service';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

class CustomerController {
  private customerService = new CustomerService();

  public addCustomerDetails = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { userId } = req;
    const { fullName, mobileNumber, addresses } = req.body;
    const result = await this.customerService.addCustomerDetails(userId, fullName, mobileNumber, addresses);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  };

  public getCustomerDetails = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { userId } = req;
    const result = await this.customerService.getCustomerDetails(userId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  };

  public updateCustomerDetails = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { userId } = req;
    const { fullName, mobileNumber, addresses } = req.body;
    const result = await this.customerService.updateCustomerDetails(userId, fullName, mobileNumber, addresses);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  };
}

export default CustomerController;