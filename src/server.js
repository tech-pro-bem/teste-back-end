const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const mongoURL = process.env.MONGO_URL;
console.log(mongoURL);


mongoose.connect(mongoURL)
.then(()=> {
    console.log("conectado ao banco de dados");
    app.listen(3000);
})
.catch((err) => console.log(err))


