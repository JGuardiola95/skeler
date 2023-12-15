// validationMiddleware.ts
import type { RegisterRequest } from '@/modules/auth/authTypes';
import { createError } from '@/utils/errors';
import type { Response, NextFunction } from 'express';
import { ZodError, type AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject) => (req: RegisterRequest, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (e) {
    if (e instanceof ZodError) {
      const error = createError('Validation error', 400, { errors: e.errors });
      next(error);
    }
  }
};
