# School Vaccination Portal Backend

This repository contains the backend for the School Vaccination Portal, a system designed to manage student vaccination records, schedule vaccination drives, and provide insights through a dashboard.

## Table of Contents

- [School Vaccination Portal Backend](#school-vaccination-portal-backend)
  - [Table of Contents](#table-of-contents)
  - [System Overview](#system-overview)
  - [Architecture](#architecture)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Running Locally](#running-locally)
  - [API Documentation](#api-documentation)
    - [Auth API](#auth-api)
    - [Students API](#students-api)
    - [Vaccination Drives API](#vaccination-drives-api)
    - [Dashboard API](#dashboard-api)
  - [Database Schema](#database-schema)
    - [Student Model](#student-model)
    - [Vaccination Drive Model](#vaccination-drive-model)
  - [Assumptions](#assumptions)


## System Overview

The backend is built using Node.js and Express, with MongoDB as the database. It provides RESTful APIs for managing students and vaccination drives, as well as a dashboard for analytics.

## Architecture

* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Authentication:** JWT for secure access

## Setup Instructions

### Prerequisites

* Node.js and npm installed
* MongoDB installed and running (very important!)

### Running Locally

1.  **Clone the Repository:**
    * Place the `git clone <repository-url>` command here.
    * Place the `cd school-vaccination-portal` command here.
    *(Replace `<repository-url>` with the actual repository URL)*

2.  **Navigate to the Backend Directory:**
    * Place the `cd portal-backend` command here.

3.  **Install Dependencies:**
    * Place the `npm install` command here.

4.  **Start the Server:**
    * Place the `npm start` command here.

    The server will run on `http://localhost:5000`.

    **Note: Make sure mongodb is installed and running on your local. You can follow instructions from internet to install and run it on mac/win/linux respectively**

## API Documentation

You can import the postman collection shared along for all the APIs.
- portal-backend/School Vaccination Portal API.postman_collection.json

Please create a user to run all other APIs. 

### Auth API
* **POST /api/auth/register** Create a user (admin/admin is fine).
* **POST /api/auth/login** Login and get user token need as bearer token for all other APIs.

### Students API

* **POST /api/students:** Add a new student.
* **GET /api/students:** Retrieve all students with pagination.
* **GET /api/students/:id** Retrieve a student by ID.
* **PUT /api/students/:id** Update a student's details.
* **DELETE /api/students/:id** Delete a student.
* **POST /api/students/bulk-import:** Bulk import students via CSV.
* **GET /api/students/search:** Search students by criteria.
* **POST /api/students/vaccinate/:id** Mark a student as vaccinated.

### Vaccination Drives API

* **POST /api/vaccination-drives:** Add a new vaccination drive.
* **GET /api/vaccination-drives:** Retrieve all vaccination drives.
* **GET /api/vaccination-drives/:id** Retrieve a drive by ID.
* **PUT /api/vaccination-drives/:id** Update a drive.
* **DELETE /api/vaccination-drives/:id** Delete a drive.

### Dashboard API

* **GET /api/dashboard/metrics:** Retrieve dashboard metrics.

## Database Schema

### Student Model

```javascript
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  studentid { type: String, required: true, unique: true },
  vaccinationStatus: { type: Boolean, default: false },
  vaccinationDetails: [{
    vaccineName: String,
    date: Date,
  }],
});

module.exports = mongoose.model('Student', StudentSchema);
```

### Vaccination Drive Model

```javascript
const mongoose = require('mongoose');

const VaccinationDriveSchema = new mongoose.Schema({
  vaccineName: { type: String, required: true },
  date: { type: Date, required: true },
  availableDoses: { type: Number, required: true },
  applicableClasses: [String],
});

module.exports = mongoose.model('VaccinationDrive', VaccinationDriveSchema);
```

## Assumptions

- Drives must be scheduled at least 15 days in advance.
- Students cannot be vaccinated twice for the same vaccine.

For more detailed API documentation, refer to the Swagger UI available at `/api-docs` when the server is running.