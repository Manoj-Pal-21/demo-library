# Library Management System

## Description
This project is a Library Management System implemented using the MERN stack (MongoDB, Express.js, React.js,Redux, Node.js). It facilitates user and admin operations for managing books, issuing books, handling book requests, and user management.

## Features

### For Users:
- **Authentication:** Sign Up and Login functionality.
- **Browse Books:** View all available books.
- **Issue Books:** Request to borrow books, view issued books in a pending state.
- **Manage Issued Books:** Track issued books and their status.

### For Admins:
- **Authentication:** Separate login for admin access.
- **Admin Credentials:** Username: `manoj21` | Name: `manoj pal` | Password: `123456`
- **Manage Books:**
  - View all books in the library.
  - Add new books to the library.
  - Delete books from the library.
- **Manage Issued Book Requests:**
  - View requests from users to borrow books.
  - Accept or reject book issuance requests.
- **View User Details:**
  - Access user data and details.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **State Management:** Redux Toolkit
- **Styling:** CSS & Bootstrap
- **Deployment:** Render (Backend,Frontend)


## Installation
To run this project locally, follow these steps:

1. Clone the repository:

2. Navigate into the project directory:

3. Navigate into the Library Management System directory:

4. Install backend dependencies:

5. Start the backend server:
- For development (with nodemon):
  ```
  npm run server
  ```
- For production:
  ```
  npm start
  ```
6. Navigate to the frontend directory:

7. Install frontend dependencies:

8. Start the frontend server:

9. Open your browser and navigate to `http://localhost:5173` to view the application.

## Usage
- **User:** Sign up or login using the provided forms. Browse available books, issue books, and manage issued books.
- **Admin:** Access the admin panel by logging in with the provided admin credentials (Username: `manoj21` | Name: `manoj pal` | Password: `123456`). Manage books (add, delete), review and manage book issuance requests, and view user details.

## Contributing
Contributions are welcome! Fork the repository and submit a pull request with your improvements.

## Deployment
You can view the live application at: [Library Management System](https://demo-library-9x20.onrender.com)
