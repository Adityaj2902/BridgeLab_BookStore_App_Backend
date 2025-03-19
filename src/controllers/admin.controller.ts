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
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message
      });
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      const token = await this.AdminService.login(email, password);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        token: token,
        message: 'Admin logged in successfully'
      });
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: error.message
      });
    }
  };

  public adminProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminData = await Admin.findById(req.userId);
      if (!adminData) {
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: 'Admin not found'
        });
        return;
      }
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        role: req.role,
        id: req.userId,
        adminData
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      });
    }
  };
}

export default AdminController;