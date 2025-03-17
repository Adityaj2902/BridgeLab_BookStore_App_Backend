import { Request, Response, NextFunction } from 'express';

export const setRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body.role = role;
    next();
  };
};