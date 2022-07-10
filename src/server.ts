import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'dotenv/config';
import './shared/container';
import { router } from './routes';
import { createConnection } from './database';
import { AppError } from './errors/AppError';

const app = express();

app.use(express.json());

createConnection();

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  })
})


app.listen(process.env.PORT, () => {
  console.log('Server started on port 3333');
})

