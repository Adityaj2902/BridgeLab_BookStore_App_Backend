import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import UserService from '../services/user.service';
import { User } from '../models/user.model';
import mongoose from 'mongoose';

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
      next(error);
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
      next(error);
    }
  };

  public userProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = await User.findById(req.userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        role: req.role,
        id: req.userId,
        userData
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;