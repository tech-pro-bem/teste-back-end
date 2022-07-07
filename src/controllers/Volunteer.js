const VolunteerService = require('../services/Volunteer');

const signUp = async (req, res) => {

    const volunteer = req.body;
    const response = await VolunteerService.signUp(volunteer);
    return res.status(response.statusCode).json(response.data);
}

const findVolunteers = async (req, res) => {
    const response = await VolunteerService.findVolunteers();
    return res.status(response.statusCode).json(response.data);
}

const findVolunteerByEmail = async (req, res) => {
    const {email} = req.params; 
    const response = await VolunteerService.findVolunteerByEmail(email);
    return res.status(response.statusCode).json(response.data);
}

const deleteVolunteer = async (req, res) => {
    const {email} = req.params;
    const response = await VolunteerService.deleteVolunteer(email);
    return res.status(response.statusCode).json(response.data)
}

module.exports = {
    signUp, 
    findVolunteers, 
    findVolunteerByEmail,
    deleteVolunteer
}