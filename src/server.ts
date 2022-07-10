import cors from 'cors';
import express from 'express';
import { routes } from './routes/routes';

import db from './database'

db.connect();

const server = express();
const port = 3333;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(routes);


export { server }
// server.listen(port, () => {
//     console.log(`listening on port ${port}`)
// })