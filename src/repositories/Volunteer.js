const VolunteerModel = require('../models/Volunteer');

const signUp = async (body) => {
    return await VolunteerModel.create(body)
}

const findVolunteers = async () => {
    return await VolunteerModel.find()
}

module.exports = {
    signUp,
    findVolunteers
}