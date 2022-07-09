import mongoose from 'mongoose';
import 'dotenv/config';
function createConnection(): void {
  try {
    mongoose.connect(
      'mongodb+srv://admin:Toinho2901@cluster0.aupfh.mongodb.net/?retryWrites=true&w=majority');
    console.log('Conectado')
  } catch (err) {
    console.log(err);
  }
}

export { createConnection };
