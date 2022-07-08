const VolunteerController = require('../controllers/Volunteer');
const express = require('express');
const routesVolunteer = express.Router();

routesVolunteer.post("/", VolunteerController.signUp);
routesVolunteer.get("/", VolunteerController.findVolunteers)
routesVolunteer.get("/:email", VolunteerController.findVolunteerByEmail)
routesVolunteer.delete("/:email", VolunteerController.deleteVolunteer)
routesVolunteer.patch("/:email", VolunteerController.updatePassword)

module.exports = routesVolunteer;
