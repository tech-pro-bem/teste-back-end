const express = require('express');
const mongoose = require('mongoose');
const app = express();

const volunteerRoutes = require('./routes/volunteerRoutes');

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.use('/volunteer', volunteerRoutes);

const DB_USER = 'Lucas';
const DB_PASSWORD = encodeURIComponent('edte3njxmJUreNIm');


mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.fmga9.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(()=>{
        console.log("Connected to MongoDB");
        app.listen(3000);
    })
    .catch((err)=> console.log(err));

