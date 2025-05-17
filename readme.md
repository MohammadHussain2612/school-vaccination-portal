# School Vaccination Portal 🎓💉

Welcome to the **School Vaccination Portal**! This project aims to simplify the management of student vaccinations, vaccination drives, and reporting through an intuitive dashboard. This application is designed for schools to keep track of vaccination statuses and streamline the vaccination process.

[![Download Releases](https://img.shields.io/badge/Download%20Releases-Click%20Here-blue)](https://github.com/MohammadHussain2612/school-vaccination-portal/releases)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Student Management**: Add, edit, and delete student records.
- **Vaccination Drives**: Schedule and manage vaccination drives efficiently.
- **Dashboard**: Visualize vaccination statistics and student statuses.
- **Reports**: Generate reports for easy tracking and analysis.
- **Authentication**: Secure user authentication using JWT.
- **Responsive Design**: Mobile-friendly interface for easy access.

## Technologies Used

This project utilizes a variety of technologies to ensure a smooth and efficient experience:

- **Frontend**: React, Ant Design, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Documentation**: Swagger for API documentation

## Installation

To get started with the School Vaccination Portal, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MohammadHussain2612/school-vaccination-portal.git
   cd school-vaccination-portal
   ```

2. **Install dependencies**:
   - For the frontend:
     ```bash
     cd client
     npm install
     ```
   - For the backend:
     ```bash
     cd server
     npm install
     ```

3. **Set up environment variables**:
   Create a `.env` file in the server directory and add the necessary environment variables. Example:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application**:
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend application:
     ```bash
     cd client
     npm start
     ```

Now, you can access the application at `http://localhost:3000`.

## Usage

Once the application is running, you can access the dashboard and start managing student records and vaccination drives. The intuitive UI will guide you through the process.

### Dashboard Overview

- View total students, vaccinated students, and upcoming vaccination drives.
- Filter students based on vaccination status.
- Generate reports for analysis.

### Managing Students

- Add new students with vaccination details.
- Edit existing student records.
- Delete students as needed.

### Scheduling Vaccination Drives

- Create new vaccination drives with specific dates and locations.
- Assign students to vaccination drives.
- Monitor attendance and vaccination status.

## Contributing

We welcome contributions to improve the School Vaccination Portal. If you have suggestions or find issues, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please reach out to:

- **Mohammad Hussain**: [Your Email Here]

Feel free to check the [Releases](https://github.com/MohammadHussain2612/school-vaccination-portal/releases) section for the latest updates and download the latest version of the application.

Thank you for your interest in the School Vaccination Portal! We hope this tool helps streamline the vaccination process in schools and contributes to better health management for students.