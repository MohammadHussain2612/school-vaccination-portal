# School Vaccination Portal Frontend

## Overview

The School Vaccination Portal is a comprehensive application designed to manage student vaccination records, vaccination drives, and generate reports. This frontend application is built using React and Ant Design, providing a user-friendly interface for school coordinators to manage vaccination-related activities efficiently.

## Key Features

- **Dashboard**: Provides an overview of the vaccination status and upcoming drives.
- **Manage Students**: Allows the addition, editing, and deletion of student records, including vaccination status.
- **Manage Drives**: Facilitates the scheduling and management of vaccination drives, ensuring no overlaps and adherence to scheduling rules.
- **Reports**: Generates detailed reports of student vaccinations, with options to filter by various criteria and download the report in Excel format.

## Components

- [Dashboard.jsx](portal-frontend/src/components/Dashboard.jsx): Displays an overview of key metrics and upcoming events.
- [ManageStudents.jsx](portal-frontend/src/components/ManageStudents.jsx): Handles CRUD operations for student records.
- [ManageDrives.jsx](portal-frontend/src/components/ManageDrives.jsx): Manages the scheduling and details of vaccination drives.
- [Reports.jsx](portal-frontend/src/components/Reports.jsx): Generates and downloads vaccination reports with filtering options.

## Setup Instructions

1. **Prerequisites**:
   - Node.js (v14 or above)
   - npm or yarn package manager
   - Make sure you run the portal-backend first, and using the auth register api create an user (email/pwd - admin) for login.
   - Keep the backend running 

2. **Installation**:
   ```bash
   # Clone the repository
   git clone https://github.com/your-repo/school-vaccination-portal.git

   # Navigate to the frontend directory
   cd school-vaccination-portal/portal-frontend

   # Install dependencies
   npm install
   # or
   yarn install
   ```

3. **Installation**:
    ```
    # Start the development server
        npm run dev
    ```

## Project Structure

portal-frontend/
├── public/
│   └── images
│   └── data/sample-students.csv
├── src/
│   ├── components/
│   │   ├── [Dashboard.jsx](src/components/Dashboard.jsx)
│   │   ├── [Login.jsx](src/components/Login.jsx)
│   │   ├── [ManageStudents.jsx](src/components/ManageStudents.jsx)
│   │   ├── [ManageDrives.jsx](src/components/ManageDrives.jsx)
│   │   ├── [Reports.jsx](src/components/Reports.jsx)
│   │   └── [Navbar.jsx](src/components/Navbar.jsx)
│   ├── context/
│   │   └── [AuthContext.jsx](src/context/AuthContext.jsx)
│   ├── hooks/
│   │   └── [useAuth.js](src/hooks/useAuth.js)
│   ├── [App.jsx](src/App.jsx)
│   ├── [main.jsx](src/main.jsx)
│   └── styles/
│       └── [App.css](src/styles/App.css)
└── package.json
└── index.html

## Key points

- use 'admin' as both email and password for demo.
- app doesn't retain state on reload (future enhancement)
- sample csv data is present inside public/data folder for demo use.