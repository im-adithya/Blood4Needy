const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bloodPackSchema = new Schema({
  user: { type: Object, required: true },
  name: { type: String, required: true },
  bloodgroup: { type: String, required: true },
  location: { type: Object, required: true }
}, {
  timestamps: true
});

const BloodPack = mongoose.model('BloodPack', bloodPackSchema);

module.exports = BloodPack;