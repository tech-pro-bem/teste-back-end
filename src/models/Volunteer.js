const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Volunteer", VolunteerSchema);