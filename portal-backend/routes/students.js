const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const Student = require('../models/Student');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Add a new student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all students with pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  try {
    const students = await Student.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Student.countDocuments();
    res.json({
      students,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search students
router.get('/search', async (req, res) => {
  const { name, class: studentClass, studentId, vaccinationStatus } = req.query;
  const query = {};
  if (name) query.name = new RegExp(name, 'i');
  if (studentClass) query.class = new RegExp(studentClass, 'i');;
  if (studentId) query.studentId = new RegExp(studentId, 'i');;
  if (vaccinationStatus !== undefined) query.vaccinationStatus = vaccinationStatus === 'true';

  try {
    const students = await Student.find(query);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit student details
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bulk import students via CSV
router.post('/bulk-import', upload.single('file'), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => {
      // Parse vaccinationDetails as JSON
      try {
        data.vaccinationDetails = JSON.parse(data.vaccinationDetails);
        results.push(data);
      } catch (error) {
        console.error('Error parsing vaccinationDetails:', error);
      }
    })
    .on('end', async () => {
      try {
        // Validate and insert data
        await Student.insertMany(results);
        res.status(201).json({ message: 'Students imported successfully' });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
});

// Mark student as vaccinated
router.post('/vaccinate/:id', async (req, res) => {
  const { vaccineName, date } = req.body;
  try {
    const student = await Student.findById(req.params.id);
    if (student.vaccinationDetails.some(v => v.vaccineName === vaccineName)) {
      return res.status(400).json({ error: 'Student already vaccinated with this vaccine' });
    }
    student.vaccinationDetails.push({ vaccineName, date });
    student.vaccinationStatus = true;
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
