# School Vaccination Portal

## System Overview

The School Vaccination Portal is designed to manage student vaccination records, schedule vaccination drives, and provide insights through a dashboard. It supports user roles such as school coordinators who can manage students and vaccination drives.

## Full Application Architecture

- **Backend**: Built with Node.js and Express, it handles API requests, manages data with MongoDB, and provides authentication using JWT.
- **Frontend**: Developed using React and vite with ant design system, it interacts with the backend to display data and manage user interactions.
- **Database**: MongoDB stores student and vaccination drive data.

## Frontend-Backend Interaction

- **API Requests**: The frontend communicates with the backend via RESTful API endpoints to perform CRUD operations and retrieve dashboard metrics.
- **Authentication**: JWT tokens are used to authenticate and authorize users.

## API Endpoints

### Auth API
* **POST /api/auth/register** Create a user (admin/admin is fine).
* **POST /api/auth/login** Login and get user token need as bearer token for all other APIs.
  
### Students API

- **POST** `/api/students`: Add a new student.
- **GET** `/api/students`: Retrieve all students with pagination.
- **GET** `/api/students/:id`: Retrieve a student by ID.
- **PUT** `/api/students/:id`: Update a student's details.
- **DELETE** `/api/students/:id`: Delete a student.
- **POST** `/api/students/bulk-import`: Bulk import students via CSV.
- **GET** `/api/students/search`: Search students by criteria.
- **POST** `/api/students/vaccinate/:id`: Mark a student as vaccinated.

### Vaccination Drives API

- **POST** `/api/vaccination-drives`: Add a new vaccination drive.
- **GET** `/api/vaccination-drives`: Retrieve all vaccination drives.
- **GET** `/api/vaccination-drives/:id`: Retrieve a drive by ID.
- **PUT** `/api/vaccination-drives/:id`: Update a drive.
- **DELETE** `/api/vaccination-drives/:id`: Delete a drive.

### Dashboard API

- **GET** `/api/dashboard/metrics`: Retrieve dashboard metrics.

For detailed Frontend and Backend documentation, please refer the readme files in respective folders.

Note 
- Sample csv for bulk upload is present inside backend/data folder as well as frontend public/data folder.
- Postman collection is available inside backend folder.
- Please follow installation steps (prerequisite and commands to run the project)
- Do reach out in case of any doubts.
