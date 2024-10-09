
## Employee-Registrstion with Node and firebase
- This application was made to keep track of employees in a company
- It utilises Firebase to keep track of the employees 


## LogIn Credentials

    username: 'admin',
    password: 'admin123',


## Installation
rounded-systems/employee-register
- npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom axios
rounded-systems/server
- npm install express nodemon
- npm install nodemon -D
## Run react & node
- npm run dev
## Requirements
## Search Function:
- Users can search for employees by ID.
## Add Function:
- Users can add a new employee with the following details:
- Name
- Email Address
- Phone Number
- Image
- Position
- ID
## Delete Function: 
- Admin can delete existing employees.
## Update Function: 
- Admin can edit existing employee details.
- View existing employees.
- View employees who left the organisations.
## General Requirements for Both Applications:
- Implemented CRUD (Create, Read, Update, Delete) operations for bookmarks/employees.
- The app is responsive.
Provide a sketch or mockup using any platform you are comfortable with, such as Figma, free-hand on paper, etc.
![alt text](image.png)

Combine the employee app they did in React.js, with Node.js to build a more well rounded system..
This rounded system will build and interface with the ReactJS Employee App:
## Objective:
- The objective of this project is to introduce Node.js to an earlier project, mainly the employee app done for React.js. Node.js - - Will be used for the backend and to save data.

## Features:
- Server side running on Node.js
- Client side running on React.js
- Firebase admin for data and file storage
- A page to add new employees
- A page to view all existing employees
## The details for the employee consist of the following
- Name and surname
- Age
- ID number
- Photo
- Role in company
- A feature to update existing employees
- A feature to delete existing employees
- A feature to search for employee by their ID
## Persistence:
- The firebase admin SDK should be used to persist data in between sessions and from different devices.
- Firestore for data
- Storage for files
- Auth for manage user sessions
## Testing:
- Test the application thoroughly to ensure that all features work as expected
