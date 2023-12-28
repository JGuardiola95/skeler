/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const SERVER_ERROR = 'Internal Server Error';

export interface CustomError<T> extends Error {
  status: number;
  data?: T;
}

export function createError<T>(message: string, status: number, data?: T) {
  const error = new Error(message) as CustomError<T>;
  error.status = status;
  error.data = data;
  return error;
}
