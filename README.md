# Student Management System (SMS)

A comprehensive school management platform designed to streamline student administration, academic tracking, and financial operations. Built with a modern tech stack for high performance and scalability.

## 🚀 Features

### Core Management
- **Student Enrollment:** Manage student profiles, admission details, and personal info.
- **Academic Structure:** Organize school into Classes, Sections, and Subjects.
- **Teacher Management:** Track staff profiles and qualifications.

### Academic Operations
- **Daily Attendance:** Quick batch marking for class-wide attendance.
- **Examination:** Schedule exams for different subjects and classes.
- **Grading System:** Enter and manage student marks with ease.

### Reporting & Analytics
- **Individual Dashboards:** Detailed progress reports for every student.
- **Class Performance:** Comparative analytics for sections and classes.

### Financials
- **Fee Management:** Track fee structures, payments, and overdue records.

### Security
- **RBAC (Role-Based Access Control):** Specialized access for Admins, Teachers, Students, and Parents.
- **JWT Authentication:** Secure API communication using JSON Web Tokens.

---

## 🛠 Tech Stack

- **Backend:** Java 17, Spring Boot 3.x, Spring Security, Spring Data JPA
- **Frontend:** Angular 19, Angular Material, RxJS
- **Database:** PostgreSQL
- **Documentation:** Markdown (Architecture & Deployment plans included)

---

## 🏃‍♂️ Getting Started

### Prerequisites
- JDK 17+
- Node.js 18+ & npm
- PostgreSQL 14+

### 1. Database Setup
1. Create a database named `sms_db` in PostgreSQL.
2. Update the credentials in `backend/src/main/resources/application.properties`.

### 2. Run Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
The server will start at `http://localhost:8080`.

### 3. Run Frontend (Angular)
```bash
cd frontend
npm install
npm start
```
The application will be available at `http://localhost:4200`.

---

## 📖 Documentation
For more detailed information, please refer to:
- [Architecture Guide](ARCHITECTURE.md) - Deep dive into system design.
- [Deployment Plan](DEPLOYMENT.md) - Step-by-step production setup.

---

## 📝 License
This project is for educational and school management purposes.
