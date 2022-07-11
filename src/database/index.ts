import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {

    if (!MONGODB_URI) {
        return;
    }

    try {
        mongoose.connect(MONGODB_URI);
        console.log('mongoose connected');
    } catch (err) {
        console.error(err);
    }
};

export default { connect };
