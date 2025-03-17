import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import AdminService from '../services/admin.service';
import { Admin } from '../models/user.model';

interface AuthenticatedRequest extends Request {
  userId?: string;
  role?: string;
}

class AdminController {
  public AdminService = new AdminService();

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.AdminService.register(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Admin registered successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      const token = await this.AdminService.login(email, password, 'admin');
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        token: token,
        message: 'Admin logged in successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  public adminProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminData = await Admin.findById(req.userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        role: req.role,
        id: req.userId,
        adminData
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AdminController;