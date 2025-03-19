import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import UserService from '../services/user.service';
import { User } from '../models/user.model';

interface AuthenticatedRequest extends Request {
  userId?: string;
  role?: string;
}

class UserController {
  public UserService = new UserService();

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.UserService.register(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User registered successfully'
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

      const token = await this.UserService.login(email, password);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        token: token,
        message: 'User logged in successfully'
      });
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: error.message
      });
    }
  };

  public userProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = await User.findById(req.userId);
      if (!userData) {
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: 'User not found'
        });
      }
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        role: req.role,
        id: req.userId,
        userData
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      });
    }
  };
}

export default UserController;