import mongoose from 'mongoose';
import 'dotenv/config';

const password = encodeURIComponent(process.env.DB_PASSWORD);

function createConnection(): void {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  try {
    mongoose.connect('mongodb+srv://admin:Toinho2901@volunteers.aupfh.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
}

export { createConnection, mongoose };
