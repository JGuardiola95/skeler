// validationMiddleware.ts
import type { RegisterRequest } from '@/modules/auth/authTypes';
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
      // e is of type ZodError
      res.status(400).json({ message: 'Validation error', errors: e.errors });
    } else {
      // Handle other types of unexpected errors
      res.status(500).json({ message: 'Server error' });
    }
  }
};
