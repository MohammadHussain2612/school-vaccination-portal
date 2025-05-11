const mongoose = require('mongoose');

const vaccinationDetailSchema = new mongoose.Schema({
  vaccineName: String,
  date: Date
});

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  vaccinationStatus: { type: Boolean, default: false },
  vaccinationDetails: [{
    vaccineName: String,
    date: Date,
  }],
});

module.exports = mongoose.model('Student', StudentSchema);
