# JWT_Inventory_System
A web-based Inventory Management System for small businesses, built with React and Spring Boot, using JWT for secure user authorization and inventory management.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Setup Profile Images](#setup-profile-images)

## Features
- User registration and login
- JWT-based authorization
- Add, edit, and delete inventory items
- View inventory items
- Update profile picture and user information

## Technologies Used
- Frontend: [React]
- Backend: [Spring Boot]
- Authentication: [JWT (JSON Web Tokens)]
- Database: MySQL

## Installation

### Prerequisites
- Node.js
- npm or yarn
- Java
- Maven
- [XAMPP]

### Backend Setup
1. Clone the repository:https://github.com/PiyumiNadeera/JWT_Inventory_System.git
2. Navigate to the backend directory
3. Start XAMPP and ensure MySQL is running
4. Build the project:mvn clean install
5. Run the Spring Boot application:mvn spring-boot:run

The application will automatically create the necessary database.

### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies:npm install or yarn install
3. Start the React application:npm start or yarn start

## Usage
1. Open your browser and go to `http://localhost:3000`.
2. Register a new user or log in with an existing account.
3. Use the inventory management features available in the application.

## Setup Profile Images

After cloning the project locally, follow these steps to set up the profile image storage:

1. Create a folder named `profileImages` in the main folder of the project.
2. Update the `upload.directory` variable in `application.properties` file located in the `resources` folder of the main directory to point to the `profileImages` folder.
