const VolunteerModel = require('../models/Volunteer');

const signUp = async (body) => {
    return await VolunteerModel.create(body)
}

module.exports = {
    signUp
}