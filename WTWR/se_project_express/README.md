WTWR (What to Wear?) – Back End
This is the back-end server for the WTWR (What to Wear?) application. It manages user authentication, clothing item collections, and user interactions such as liking or disliking items. Built with Node.js, Express, and MongoDB, the project follows best practices in security, error handling, and continuous integration.

Features
✅ User registration and login with JWT-based authentication

🔐 Secure password hashing using bcrypt

👕 Full CRUD operations for clothing items

👍 Like/Dislike functionality

🛡️ Centralized error handling with custom messages

✅ Input validation using Celebrate and Joi

🌐 Configurable environment variables

🤖 GitHub Actions for automated linting and test validation

Project Structure
├── controllers/ # Business logic
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── utils/ # Constants and helpers
├── middlewares/ # Auth and error middleware
├── app.js # Main entry point
├── .eslintrc # Linting config
└── package.json
Getting Started (Local Setup)

1. Clone the Repository
   bash
   Copy
   Edit
   git clone https://github.com/aliminagar/se_project_express.git
   cd se_project_express
2. Install Dependencies
   bash
   Copy
   Edit
   npm install
3. Create .env File
   Create a .env file in the root directory and add your JWT secret:

ini
Copy
Edit
JWT_SECRET=yourSuperSecretKey 4. Run the Server
bash
Copy
Edit
npm run start 5. Development Mode (Hot Reload)
bash
Copy
Edit
npm run dev

Testing
✅ Postman Test Coverage
All API endpoints are tested using Postman. Test cases include:

Creating users with valid and invalid data

Duplicate user creation (409 conflict)

Invalid tokens and authentication flows

Clothing item creation, deletion, and edge cases

URL, email, and ObjectId validation

Proper status codes and structured JSON error responses
GitHub Actions: CI/CD
GitHub Actions run on every commit using:

.github/workflows/tests-12.yml

.github/workflows/tests-13.yml

Each action validates:

Linting compliance

Correct file structure and naming

Proper route and controller behavior

Error messages and response formats
⚒️ Technologies Used
Node.js + Express.js

MongoDB + Mongoose

JWT for stateless authentication

bcrypt for password hashing

Celebrate + Joi for request validation

dotenv for environment config

GitHub Actions for CI/CD automation

📌 Notes
Make sure MongoDB is running locally (mongodb://127.0.0.1:27017/wtwr_db)

Do not commit .env or sensitive data

Always update sprint.txt before committing new sprint deliverables

Follow ESLint rules for code consistency

Author
Alireza Minagar
GitHub: @aliminagar
