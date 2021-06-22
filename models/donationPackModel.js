const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationPackSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  date: {type: Number, required: true },
}, {
  timestamps: true
});

const DonationPack = mongoose.model('DonationPack', donationPackSchema);

module.exports = DonationPack;