/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { config } from '@/config';
import { SERVER_ERROR, type CustomError } from '@/utils/errors';
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { Request, Response, NextFunction } from 'express';

/* 
This is the correct format for an error-handling middleware in Express. 
Express identifies an error-handling middleware by checking if it has 
four parameters. The parameters are, in order: the error object, 
the request object, the response object, and the next function. 
Even if you don't use the next function in your code, its presence 
in the parameter list signals to Express that this middleware is meant 
for handling errors.
*/
const errorHandlerMiddleware = <T>(err: CustomError<T>, req: Request, res: Response, next: NextFunction) => {
  // Log the error for debugging purposes (consider using a more sophisticated logging mechanism)

  // Determine the status code: Use the status from the error if available, or default to 500
  const statusCode = err.status || 500;
  let message = err.message || SERVER_ERROR;

  if (err instanceof PrismaClientInitializationError) {
    // eslint-disable-next-line no-console
    console.error('[Database]: PrismaClientInitializationError');
    if (config.NODE_ENV !== 'development') {
      message = SERVER_ERROR;
    }
  }

  // Send a JSON response
  res.status(statusCode).json({
    message,
    // Optionally include additional data or stack trace in development environment
    // ...(config.NODE_ENV === 'development' && { stack: err.stack }),
    ...(err.data && { data: err.data }),
  });
};

export default errorHandlerMiddleware;
