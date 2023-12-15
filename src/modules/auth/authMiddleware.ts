import { config } from '@/config';
import type { CustomRequest } from '@/types/global';
import type { NextFunction, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export const jwtAuthentication = (req: CustomRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: 'not authorized' });
    return;
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401);
    res.json({ message: 'not valid token' });
    return;
  }

  try {
    const user = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    req.user = user;
    next();
  } catch (e) {
    res.status(401);
    res.json({ message: 'not valid token' });
    return;
  }
};
