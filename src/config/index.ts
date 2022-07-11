import dotenv from 'dotenv';

dotenv.config();

export = [
    {
        secret: process.env.AUTH_TOKEN,
    }
];
