# Groupomania Internal Social Network

## Overview

Groupomania Internal Social Network is a web application designed to improve communication and interaction among Groupomania employees. The application allows users to share multimedia content, post articles, and engage with each other in a more informal setting. This project uses React for the frontend and Express with Sequelize for the backend, ensuring high standards of security and accessibility.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Simple account creation and deletion
- Minimal user profiles
- Open forum for multimedia content
- Open forum for written content
- Easy identification of unread posts

## Technologies

### Frontend

- React
- Axios

### Backend

- Express
- Sequelize
- PostgreSQL
- Cors
- Body-parser

## Installation

### Prerequisites

- Node.js
- npm
- PostgreSQL

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/groupomania-backend.git
    cd groupomania-backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Configure the database:

    Edit the `models/User.js` file to include your PostgreSQL database credentials.

4. Run the server:

    ```sh
    node index.js
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```sh
    cd ../groupomania-frontend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the React development server:

    ```sh
    npm start
    ```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Use the application to create an account, post multimedia content, and interact with other employees.

## API Endpoints

### User Routes

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `DELETE /api/users/:id` - Delete a user by ID

## Project Structure

### Backend

