import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authToken = request.headers.authorization;

  if (!authToken) throw new Error('JWT Token is missing');

  const [, token] = authToken.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new Error('Invalid JWT Token');
  }
}
