// AuthController.ts
import type { NextFunction, Response } from 'express';
import { createUser, findUserByEmail, validateUser } from './authService';
import { createJWT } from './authUtils';
import type { LoginRequest, RegisterRequest } from './authTypes';

export const register = async (req: RegisterRequest, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await createUser(email, password);
    const token = createJWT(user);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: LoginRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await validateUser(email, password);

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
