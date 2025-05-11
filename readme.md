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

### Snapshots

<img width="1713" alt="Screenshot 2025-05-11 at 10 57 19 PM" src="https://github.com/user-attachments/assets/d0aa4ca1-c5be-4942-9780-6ac21c8f9295" />

<img width="1723" alt="Screenshot 2025-05-11 at 10 57 11 PM" src="https://github.com/user-attachments/assets/7e99bcd8-3a3b-4987-ab08-89ccd0d4ef7e" />
<img width="1721" alt="Screenshot 2025-05-11 at 10 57 50 PM" src="https://github.com/user-attachments/assets/dbb30a34-c51b-4f25-880d-7337ba595840" />

<img width="1690" alt="Screenshot 2025-05-11 at 10 58 22 PM" src="https://github.com/user-attachments/assets/f3ce4528-8f40-4cc4-afbb-18ada3ff5c29" />
<img width="806" alt="Screenshot 2025-05-11 at 10 58 27 PM" src="https://github.com/user-attachments/assets/23af1305-1df8-493d-b1d9-b6c03b677b27" />
<img width="1617" alt="Screenshot 2025-05-11 at 10 58 08 PM" src="https://github.com/user-attachments/assets/a9f8a173-3a26-43c9-9bdf-a7704b1a6f47" />
<img width="1725" alt="Screenshot 2025-05-11 at 10 58 01 PM" src="https://github.com/user-attachments/assets/0bd50a19-5293-4381-a348-05f44f7004e6" />
<img width="1663" alt="Screenshot 2025-05-11 at 10 58 46 PM" src="https://github.com/user-attachments/assets/26f657e4-c83c-442e-986d-4a2055562b3a" />

