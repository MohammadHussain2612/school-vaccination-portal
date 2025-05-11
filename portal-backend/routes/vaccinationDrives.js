const express = require('express');
const router = express.Router();
const VaccinationDrive = require('../models/VaccinationDrive');

// Helper function to check if a date is at least 15 days in the future
const isDateValid = (date) => {
  const today = new Date();
  const targetDate = new Date(date);
  const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
  return diffDays >= 15;
};

// Add a new vaccination drive
router.post('/', async (req, res) => {
  const { vaccineName, date, availableDoses, applicableClasses } = req.body;
  if (!isDateValid(date)) {
    return res.status(400).json({ error: 'Drive must be scheduled at least 15 days in advance' });
  }
  try {
    const overlappingDrive = await VaccinationDrive.findOne({ date });
    if (overlappingDrive) {
      return res.status(400).json({ error: 'A drive is already scheduled on this date' });
    }
    const drive = new VaccinationDrive({ vaccineName, date, availableDoses, applicableClasses });
    await drive.save();
    res.status(201).json(drive);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all vaccination drives
router.get('/', async (req, res) => {
  try {
    const drives = await VaccinationDrive.find();
    res.json(drives);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single vaccination drive by ID
router.get('/:id', async (req, res) => {
  try {
    const drive = await VaccinationDrive.findById(req.params.id);
    if (!drive) return res.status(404).json({ error: 'Drive not found' });
    res.json(drive);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a vaccination drive
router.put('/:id', async (req, res) => {
  const { date } = req.body;
  try {
    const drive = await VaccinationDrive.findById(req.params.id);
    if (!drive) return res.status(404).json({ error: 'Drive not found' });

    if (new Date(drive.date) < new Date()) {
      return res.status(400).json({ error: 'Cannot edit past drives' });
    }

    if (date && !isDateValid(date)) {
      return res.status(400).json({ error: 'Drive must be scheduled at least 15 days in advance' });
    }

    const overlappingDrive = await VaccinationDrive.findOne({ date, _id: { $ne: req.params.id } });
    if (overlappingDrive) {
      return res.status(400).json({ error: 'A drive is already scheduled on this date' });
    }

    Object.assign(drive, req.body);
    await drive.save();
    res.json(drive);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a vaccination drive
router.delete('/:id', async (req, res) => {
  try {
    const drive = await VaccinationDrive.findByIdAndDelete(req.params.id);
    if (!drive) return res.status(404).json({ error: 'Drive not found' });
    res.json({ message: 'Drive deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
