WTWR (What to Wear) 🌦️👕🧣
🚀 Live Demo
Check out the project here:
What to Wear – Weather Station

📝 Overview
WTWR (What to Wear) is a full-stack web application that recommends clothing based on live weather data. Users can register, personalize their wardrobe, manage items, and receive smart outfit suggestions—all in a modern, mobile-responsive UI.

🛠️ Features
🌡️ Real-time Weather Data: Uses OpenWeather API for live weather updates.

👕 Clothing Recommendations: Suggests appropriate garments by current conditions.

➕ Add/Delete Clothing Items: Authenticated users can manage wardrobe items.

👍 Like/Unlike Clothing: Users can like/unlike any item.

🧑‍💻 Registration & Authorization: Secure JWT-based sign-up/sign-in.

📝 Edit Profile: Update your name and avatar.

🔒 Protected Routes: Item management and profile available to authorized users only.

📱 Responsive Design: Mobile-friendly, optimized for all devices.

⚡ Fast Performance: Built with Vite and React Router v6.

🧩 Technologies Used
Frontend:

React (Hooks, Context API, Router v6)

Vite

CSS (custom styling)

OpenWeather API

Backend:

Express.js

MongoDB

JWT for authentication

Node.js

DevOps:

GitHub Actions (optional, for CI/CD)

🌐 Backend Repository
All API endpoints, authentication, and data are handled by the backend.
Backend (Express + MongoDB) repository:
https://github.com/aliminagar/se_project_express.git

See the backend’s README for full setup and API details.

⚙️ Getting Started
Clone the Repositories

git clone https://github.com/aliminagar/se_project_react
git clone https://github.com/aliminagar/se_project_express.git
Install Dependencies and Start Servers

Backend:

cd se_project_express
npm install
npm start
Frontend:

cd se_project_react
npm install
npm run dev
By default, the backend runs on localhost:3001 and the frontend on localhost:3000 (or as set in your .env).

Configure API URL

Ensure your frontend API points to your backend (e.g., http://localhost:3001).
Set the backend URL in your frontend .env or API utility as needed.

Start MongoDB

Make sure your local MongoDB service is running (e.g., via mongod).

🔑 Authentication & Authorization
Register and log in with email, name, avatar, and password.

JWT token stored in localStorage and used for all protected requests.

Protected routes (e.g., /profile) are for authenticated users only.

Only item owners can delete their clothing items.

💡 Project Highlights & New Features
Switched to React Router v6 and Vite for modern speed and routing.

Full user authentication: registration, login, logout, JWT-protected APIs.

CurrentUserContext: app-wide user info via React Context.

Profile editing: avatar and display name changes.

Like/unlike items (state persists).

Only owners can delete their own items.

Legacy and new data handling: robust ownership & security logic.

🛠️ Backend Setup (for reviewers)
Download the backend here:
https://github.com/aliminagar/se_project_express.git

Follow instructions in the backend’s README to start the server (Express + MongoDB).
Both frontend and backend must be running locally for full app functionality.

🧑‍💻 Developer Notes
Both frontend and backend must be running for all features to work.

For issues or to review specific features, check the codebase or submit via GitHub issues.

Thank you for reviewing WTWR!
