import { validate } from '@/middlewares/zodMiddleware';
import { Router } from 'express';
import { RegisterRequestSchema } from './authSchemas';
import { login, register } from './authController';

const authRouter = Router();

authRouter.post('/register', validate(RegisterRequestSchema), register);
authRouter.post('/login', validate(RegisterRequestSchema), login);

export default authRouter;
