const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
    user: { type: Object, required: true },
    bloodgroup: { type: String, required: true },
    units: { type: Number, required: true },
    requireddate: { type: String, required: true },
    patientname: { type: String, required: true },
    patientphone: { type: String, required: true },
    doctorname: { type: String },
    reason: { type: String },
    hospital: { type: String, required: true },
    pos: { type: Object, required: true },
    /*contactname: { type: String, required: true },
    contactphone: { type: String, required: true },
    contactemail: { type: String },*/
    type: { type: String, required: true },
    message: { type: String },
    show: { type: Boolean, required: true }
}, {
    timestamps: true,
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;