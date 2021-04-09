const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    occupation: { type: String, required: true },
    city: { type: String, required: true },
    interest: { type: Array, required: true },
    experience: { type: String },
    reached: { type: String, required: true },
    additionalinfo: { type: String },
}, {
    timestamps: true,
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;