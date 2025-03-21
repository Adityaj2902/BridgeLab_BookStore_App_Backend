import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

// Extend Request type to include userId and role
interface AuthenticatedRequest extends Request {
  userId?: string;
  role?: string;
}

export const authMiddleware = (requiredRole: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      let bearerToken = req.header('Authorization');
      if (!bearerToken) {
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        };
      }
      bearerToken = bearerToken.split(' ')[1];

      const decoded = jwt.verify(bearerToken, process.env.MYJWTSECRET) as { userId: string; role: string };

      if (!requiredRole.includes(decoded.role)) {
        throw {
          code: HttpStatus.FORBIDDEN,
          message: 'Access denied'
        };
      }

     
      req.userId = decoded.userId;
      req.role = decoded.role;

      next();
    } catch (error) {
      next(error);
    }
  };
};
