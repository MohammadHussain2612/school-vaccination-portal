const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/schoolVaccination', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Load Swagger YAML
const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, './swagger.yaml'), 'utf8'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import routes
const studentRoutes = require('./routes/students');
const vaccinationDriveRoutes = require('./routes/vaccinationDrives');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/students', authMiddleware, studentRoutes);
app.use('/api/vaccination-drives', authMiddleware, vaccinationDriveRoutes);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
