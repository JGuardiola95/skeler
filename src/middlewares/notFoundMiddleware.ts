import { createError } from '@/utils/errors';
import type { Request, Response, NextFunction } from 'express';

interface NotFoundData {
  url: string;
}

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const error = createError<NotFoundData>('Not Found', 404, { url: req.originalUrl });
  res.status(404);
  next(error);
};

export default notFoundMiddleware;
