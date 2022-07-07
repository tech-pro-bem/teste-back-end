const routesVolunteer = require('./Volunteer');
const express = require('express');
const routes = express.Router();

routes.use("/volunteer" , routesVolunteer);

module.exports = routes;