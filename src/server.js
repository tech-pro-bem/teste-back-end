const express = require('express');
const mongoose = require('mongoose');
const indexRoutes = require('./routes/index')

require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/', indexRoutes);

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL)
.then(()=> {
    console.log("conectado ao banco de dados");
    app.listen(3001);
})
.catch((err) => console.log(err))


