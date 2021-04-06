const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bloodgroup: { type: String, required: true },
    address: { type: String, required: true },
    pos: { type: Object, required: true },
    feedback: { type: String },
    volunteer: { type: Boolean },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;