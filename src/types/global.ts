import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

export interface UserJwtPayload {
  id: string;
  email: string;
}

export interface CustomRequest extends Request {
  user?: JwtPayload;
}
