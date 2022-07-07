const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');

db.connect();

const adminRoutes = require('./routes/adminRoutes');

const volunteersRoutes = require('./routes/volunteersRoutes');

app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/volunteer', volunteersRoutes);

module.exports = app;
