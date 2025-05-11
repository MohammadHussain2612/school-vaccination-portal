const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const VaccinationDrive = require('../models/VaccinationDrive');

// Get dashboard metrics
router.get('/metrics', async (req, res) => {
  try {
    // Total number of students
    const totalStudents = await Student.countDocuments();

    // Number of vaccinated students
    const vaccinatedStudents = await Student.countDocuments({ vaccinationStatus: true });

    // Percentage of vaccinated students
    const vaccinationPercentage = totalStudents ? (vaccinatedStudents / totalStudents) * 100 : 0;

    // Upcoming vaccination drives within the next 30 days
    const today = new Date();
    const upcomingDrives = await VaccinationDrive.find({
      date: { $gte: today, $lte: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      totalStudents,
      vaccinatedStudents,
      vaccinationPercentage,
      upcomingDrives,
      message: upcomingDrives.length ? null : "No upcoming drives"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
