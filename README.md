# Recipe Management Application

## Overview

This is a recipe management application built using ReactJS and JSON Server. It allows users to store, manage, and refer to their favorite dishes as recipes. Users can create, read, update, and delete recipes, as well as search through their recipe collection.

## Features

- **User Authentication**: Users can log in and register to manage their recipes.
- **CRUD Operations**: Create, Read, Update, and Delete recipes.
- **Search Functionality**: Search for recipes by keyword.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Technologies Used

- **Frontend**: ReactJS
- **Backend**: JSON Server
- **Authentication**: Custom implementation

## Setup

### Prerequisites

- Node.js and npm installed on your machine.

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/recipe-app.git
   cd recipe-app
Install Dependencies

Navigate to the project directory and install the required dependencies:

bash
Copy code
npm install
Setup JSON Server

### Create a db.json file in the root directory with the following initial content:

```json
Copy code
{
  "recipes": []
}
Start the JSON Server:
```
```bash
Copy code
json-server --watch db.json --port 5000
Start the React Application
```
### In a new terminal window, start the React application:

```bash
Copy code
npm start
The application will be available at http://localhost:3000.
```
### Pages

- Login Page: Allows users to log in with their credentials.
- Registration Page: New users can register to create an account.
- Home Page: Displays the list of recipes with options to search, add, edit, and delete.

### API Endpoints
GET /recipes: Fetch all recipes.
POST /recipes: Add a new recipe.
DELETE /recipes/:id: Delete an existing recipe.
PATCH/PUT /recipes/:id: Update a recipe.

### Validation
Ensure all forms and inputs are validated to prevent errors and ensure data integrity.

### Responsive Design
The application is designed to work on various screen sizes and devices.

### Contributing
Feel free to submit issues or pull requests. Please follow the coding guidelines and ensure your code is well-tested.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Contact
For any questions or suggestions, please contact princemashumu@yahoo.com.
