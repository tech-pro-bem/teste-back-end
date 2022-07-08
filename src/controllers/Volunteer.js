const VolunteerService = require('../services/Volunteer');

const signUp = async (req, res) => {

    const {name, email, password} = req.body;
    const response = await VolunteerService.signUp(name, email, password);
    return res.status(response.statusCode).json(response.data);
}

const authenticate = async (req, res) => {
    const {email, password} = req.body;
    const response = await VolunteerService.authenticate(email, password);
    return res.status(response.statusCode).json(response.data);
}

const findVolunteers = async (req, res) => {
    const response = await VolunteerService.findVolunteers();
    return res.status(response.statusCode).json(response.data);
}

const findVolunteerByEmail = async (req, res) => {
    const {email} = req.body; 
    const response = await VolunteerService.findVolunteerByEmail(email);
    return res.status(response.statusCode).json(response.data);
}

const deleteVolunteer = async (req, res) => {
    const {email} = req.body;
    const response = await VolunteerService.deleteVolunteer(email);
    return res.status(response.statusCode).json(response.data)
}

const updatePassword = async (req, res) => {
    const {email} = req.params;
    const {password} = req.body;
    const response = await VolunteerService.updatePassword(email, password);
    return res.status(response.statusCode).json(response.data)
}

module.exports = {
    signUp, 
    findVolunteers, 
    findVolunteerByEmail,
    deleteVolunteer,
    updatePassword,
    authenticate
}