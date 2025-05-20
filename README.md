# StudyBuddy 📚

StudyBuddy is a social network platform for students. It allows users to register, manage their profiles, publish posts, create study groups, send friend requests, and more.

## 🚀 Features

- User authentication with JWT (sign up / login)
- User profile management (view, update, change password, delete)
- Posts: create, update, delete, like/unlike
- Friends system: send/accept/decline friend requests
- Study groups: create public/private groups, request to join
- Group admin functionality
- API testing with Mocha, Chai, and Supertest

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT, bcrypt
- **Validation**: express-validator
- **Testing**: Mocha, Chai, Supertest
- **Utilities**: dotenv, nodemon

## 📁 Project Structure

StudyBuddy/\
├── config/ # Configuration files (e.g. database)\
├── controllers/ # Route logic and handlers\
├── middlewares/ # Auth and other middlewares\
├── models/ # Mongoose schemas\
├── routes/ # API route definitions\
├── validation/ # Input validations using express-validator\
├── test/ # API tests\
├── app.js # Main app entry point\
├── .env # Environment variables\
└── README.md\

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/studybuddy.git
cd studybuddy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Start the server

```bash
npm run dev
```

Server should now be running at: `http://localhost:5000`

## ✅ Running Tests

```bash
npm test
```

Tests cover:

- Authentication (sign up & login)

- User profile endpoints

- Error handling and edge cases

# 👤 Author

Developed by Aviv Cohen, Maya Shlomo, Israel Peled as part of a university project.

Feel free to open issues or contact me for questions or feedback!
