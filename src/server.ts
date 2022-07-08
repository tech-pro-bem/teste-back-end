import express from 'express';
import { createConnection } from './database';

const app = express();


app.use(express.json());

createConnection();



app.listen(3333, () => {
  console.log('Server started on port 3333');
})

