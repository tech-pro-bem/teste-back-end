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

const updatePassword = async (email, password) => {
    const update = {"password": password};
    const filter = {"email": email}
    return await VolunteerModel.findOneAndUpdate(filter, update, {new: true})
}

module.exports = {
    signUp,
    findVolunteers,
    findVolunteerByEmail, 
    deleteVolunteer,
    updatePassword
}