# Ticket Management System

A comprehensive Ticket Management System built using the MERN stack (MongoDB, Express.js, React with Vite, and Node.js) along with Tailwind CSS for responsive design. The application provides an efficient way to manage customer support tickets with different user roles: Customer, Customer Service Agent, and Admin.

## Table of Contents

- [Features](#features)
- [User Roles](#user-roles)
- [Tickets Management](#tickets-management)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Backend API](#backend-api)
- [Live Demo](#live-demo)
- [Contributing](#contributing)


## Features

- **User Authentication:**
  - Self-registration for Customers
  - Login and Logout
  - Role-based Access Control (Customer, Agent, Admin)
- **Ticket Management:**
  - Customers can submit and track tickets
  - Agents and Admins can manage and update tickets
- **Notes and Attachments:**
  - Users can add notes with attachments to tickets
- **Dashboard for Admins:**
  - View total number of tickets and customers
- **API Integration:**
  - All features are managed through backend APIs built with Node.js and Express.js

## User Roles

- **Customer:** Self-register, submit tickets, view and update own tickets.
- **Customer Service Agent:** View and update all tickets, change ticket status.
- **Admin:** View and update all tickets, manage users, access dashboard.

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
- **Database:**
  - [MongoDB](https://www.mongodb.com/)

## Getting Started

To get a local copy of the project up and running, follow these steps.

### Prerequisites

- **Node.js** (>= 14.x.x) and **npm** (>= 6.x.x) or **yarn**
- **MongoDB** instance running locally or on the cloud (e.g., MongoDB Atlas)

## Installation

### 1. Clone the repository:
   ```bash
   git clone repoUrl
   cd ticket-management-system
   ```
### 2. Install dependencies:
 **For the backend:**
   ```bash
   cd Backend
   npm install
   ```
 **For the frontend:**
   ```bash
   cd ../Frontend
   npm install
   ```
### 3. Configure Environment Variables:
```bash
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```
### 4. Open the app:
Visit http://localhost:5173 for the frontend, and the backend APIs will be accessible at http://localhost:4001.

## Backend API
The backend provides RESTful APIs to handle all operations:
- **Authentication:**
  - `POST /api/user/login` - Login
  - `POST /api/user/register` - Register
- **Tickets:**
  - `POST /api/tickets` - Create a new ticket
  - `GET /api/tickets` - List all tickets
  - `GET /api/tickets/:id` - Get details of a particular ticket
  - `PATCH /api/tickets/:id` - Update ticket status
- **Notes:**
  - `POST /api/tickets/:id/notes` - Add a note to a ticket
  - `GET /api/tickets/:id/notes` - Get all notes of a ticket

## Live Demo
The live version of the application is available at:
[Demo Link](ticket-app-beige.vercel.app)

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.




