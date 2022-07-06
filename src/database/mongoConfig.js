const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('banco conectado :)');
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connect };
