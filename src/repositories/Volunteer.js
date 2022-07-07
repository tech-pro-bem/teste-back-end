const VolunteerModel = require('../models/Volunteer');

const signUp = async (body) => {
    return await VolunteerModel.create(body)
}

const findVolunteers = async () => {
    return await VolunteerModel.find()
}

const findVolunteerByEmail = async (email) => {
    return await VolunteerModel.findOne({email: email})
}

const deleteVolunteer = async (email) => {
    return await VolunteerModel.findOneAndDelete({email: email})
}

module.exports = {
    signUp,
    findVolunteers,
    findVolunteerByEmail, 
    deleteVolunteer
}