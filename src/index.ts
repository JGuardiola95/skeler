import { config } from '@/config';
import type { Request, Response } from 'express';
import express from 'express';
import authRouter from './modules/auth/authRoutes';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import notFoundMiddleware from './middlewares/notFoundMiddleware';

const app = express();
const PORT = Number(config.PORT) || 3000;

// Middleware
// app.use(helmet()); // Adds security headers to responses
// app.use(cors()); // Enables CORS
app.use(express.json()); // Parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));

// Application routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API' });
});

app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(notFoundMiddleware);

// Error handling middleware
app.use(errorHandlerMiddleware);

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`Server is running at http://localhost:${PORT}`);
});

export default app;
