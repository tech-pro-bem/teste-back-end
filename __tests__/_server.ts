import cors from 'cors';
import express from 'express';
import { routes } from '../src/routes/routes';

import db from '../src/database'

db.connect();

const _server = express();
const port = 3333;

_server.use(cors());
_server.use(express.json());
_server.use(express.urlencoded({ extended: true }));
_server.use(routes);


export { _server }
