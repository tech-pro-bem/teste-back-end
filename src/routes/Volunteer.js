const VolunteerController = require('../controllers/Volunteer');
const express = require('express');
const routesVolunteer = express.Router();

routesVolunteer.post("/", VolunteerController.signUp);
routesVolunteer.get("/", VolunteerController.findVolunteers)

module.exports = routesVolunteer;
