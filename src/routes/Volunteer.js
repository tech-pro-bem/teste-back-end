const VolunteerController = require('../controllers/Volunteer');
const express = require('express');
const routesVolunteer = express.Router();
const verifyJWT = require('../middleware/verifyToken');

routesVolunteer.post("/", VolunteerController.signUp);
routesVolunteer.post("/authenticate", VolunteerController.authenticate)
routesVolunteer.get("/", verifyJWT, VolunteerController.findVolunteers)
routesVolunteer.get("/email", verifyJWT,VolunteerController.findVolunteerByEmail)
routesVolunteer.delete("/delete", verifyJWT,VolunteerController.deleteVolunteer)
routesVolunteer.patch("/:email", verifyJWT, VolunteerController.updatePassword)

module.exports = routesVolunteer;
