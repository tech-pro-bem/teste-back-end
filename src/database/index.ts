import mongoose from 'mongoose';
import 'dotenv/config';

const password = encodeURI(process.env.DB_PASSWORD);

function createConnection(): void {
  try {
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${password}@${process.env.DB_NAME}.aupfh.mongodb.net/?retryWrites=true&w=majority`);
    console.log('Conectado')
  } catch (err) {
    console.log(err);
  }
}

export { createConnection };
