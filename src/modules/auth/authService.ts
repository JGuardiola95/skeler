import prisma from '@/db';
import { comparePasswords, hashPassword } from './authUtils';

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const validateUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isPasswordValid = await comparePasswords(password, user.password);
  return isPasswordValid ? user : null;
};
