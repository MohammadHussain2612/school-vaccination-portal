const mongoose = require('mongoose');

const VaccinationDriveSchema = new mongoose.Schema({
  vaccineName: { type: String, required: true },
  date: { type: Date, required: true },
  availableDoses: { type: Number, required: true },
  applicableClasses: [String],
});

module.exports = mongoose.model('VaccinationDrive', VaccinationDriveSchema);
