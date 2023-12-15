import type { Request } from 'express';
import type { LoginRequestSchema, RegisterRequestSchema } from './authSchemas';
import type { z } from 'zod';

export type RegisterSchema = z.infer<typeof RegisterRequestSchema>;
export type LoginSchema = z.infer<typeof LoginRequestSchema>;

export interface RegisterRequest extends Request {
  body: RegisterSchema['body'];
}

export interface LoginRequest extends Request {
  body: LoginSchema['body'];
}
