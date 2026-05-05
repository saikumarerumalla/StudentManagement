# Student Management System (SMS) - Architecture

## High-Level Overview
This project is a monolithic application designed to manage school operations, including students, staff, academics, and finances.

### Technical Stack
- **Backend:** Java 17, Spring Boot 3.x
- **Database:** PostgreSQL
- **Frontend:** Angular 17, Angular Material
- **Security:** Spring Security with JWT (JSON Web Tokens)
- **Communication:** RESTful APIs

## Backend Architecture (Spring Boot)
The backend follows a standard layered architecture:
- **Controller Layer:** Handles REST API requests and responses.
- **Service Layer:** Contains business logic and orchestrates data flow.
- **Repository Layer:** Interfaces with PostgreSQL using Spring Data JPA.
- **Security Layer:** Manages authentication and Role-Based Access Control (RBAC).

## Frontend Architecture (Angular)
The frontend is a Single Page Application (SPA) structured modularly:
- **Core Module:** Singleton services (Auth, Error handling).
- **Shared Module:** Reusable components, directives, and pipes.
- **Feature Modules:** Scoped modules for Students, Teachers, Exams, and Fees.
- **State Management:** RxJS for reactive data handling.

## Key Entities
- `User`: Base entity for authentication.
- `Student`/`Teacher`: Specialized user roles.
- `Class`/`Section`: Academic organization.
- `Subject`: Course offerings.
- `Attendance`: Record of daily/subject-wise presence.
- `FeeRecord`: Financial tracking.
- `Exam`/`Grade`: Academic performance tracking.
