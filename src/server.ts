import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';
import './shared/container';
import { router } from './routes';
import { createConnection } from './database';

const app = express();

app.use(express.json());

createConnection();

app.use(router);

app.listen(process.env.PORT, () => {
  console.log('Server started on port 3333');
})

