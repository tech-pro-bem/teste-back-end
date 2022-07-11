const mongoose = require('mongoose');

const Volunteer = mongoose.model('Volunteer', {
    name: String,
    age: Number,
})

module.exports = Volunteer;