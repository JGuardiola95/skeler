import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { type User } from '@prisma/client';
import { config } from '@/config';

const SALT_ROUNDS = 5;

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.JWT_SECRET
  );
  return token;
};
