WTWR (What to Wear) 🌦️👕🧣
🚀 Live Demo
Check out the project here:
What to Wear - Weather Station

📝 Overview
WTWR (What to Wear) is a full-stack, dynamic web application that provides clothing recommendations based on real-time weather data. Users can personalize their wardrobe, add or delete items, and receive suggestions powered by live weather info—all through a seamless, responsive UI.

🛠️ Features
🌡️ Real-time Weather Data: Fetches live weather information via the OpenWeather API.

👕 Clothing Recommendations: Suggests garments based on weather conditions.

➕ Add/Delete Clothing Items: Authenticated users manage their wardrobe.

👍 Like/Unlike Clothing Items: Logged-in users can like or unlike any item.

🧑‍💻 User Registration & Authorization: Secure sign-up, sign-in, and JWT-protected API calls.

📝 Edit Profile: Users can update their name and avatar.

🔒 Protected Routes: Only authorized users can access the profile page and item management.

📱 Responsive Design: Mobile-friendly and optimized for all devices.

⚡ Fast Performance: Powered by Vite and React Router v6.

🧩 Technologies Used
React (Hooks, Context API, Router v6)

Vite (for rapid development/builds)

CSS (custom styling)

OpenWeather API (weather data)

Express & MongoDB (backend, authentication, data persistence)

JWT (authorization)

Node.js

GitHub Actions (optional, for CI/CD)

🌐 Backend Repository
You must run the backend locally for full functionality.
All API endpoints, authentication, and data are managed by the backend.

👉 Backend Express + MongoDB repo:
https://github.com/alimnagar/se_project_express

Please refer to the backend’s own README for full setup and API usage instructions.

⚙️ Getting Started

1. Clone the Repositories
   bash
   Copy
   Edit
   git clone https://github.com/alimnagar/se_project_react
   git clone https://github.com/alimnagar/se_project_express
2. Install Dependencies and Start Servers
   Backend:

cd se_project_express
npm install
npm start
Frontend:

cd se_project_react
npm install
npm run dev
By default, the backend runs on localhost:3001 and frontend on localhost:3000 (or as set in your .env).

3. Configure API URL
   Make sure your frontend API requests point to your local backend (e.g. http://localhost:3001).

Set the backend URL in your frontend .env or API utility as required.

4. Start MongoDB
   Ensure your MongoDB service is running locally (mongod process).

🔑 Authentication & Authorization
Register and log in with email, name, avatar, and password.

JWT token is stored in localStorage and attached to all authorized requests.

Protected routes (e.g., /profile) are only accessible to logged-in users.

Only the item’s owner can delete their items.

💡 Project Highlights & New Features
Switched to React Router v6 and Vite for improved speed and modern routing.

Full user auth: Registration, login, sign out, JWT-based API protection.

CurrentUserContext: React Context to provide user info app-wide.

Profile Editing: Change your avatar and display name.

Likes: Users can like/unlike clothing items; like state is persistent.

Item Ownership: Only item owners see the delete button for their items.

Legacy data handling: Updated backend logic ensures robust ownership and security for new and old items.

🛠️ Backend Setup (for reviewers)
Please download the backend [https://github.com/alimnagar/se_project_express](https://github.com/alimnagar/se_project_express) here.

Follow instructions in the backend’s README to start the server (Express + MongoDB).

Make sure both frontend and backend are running and accessible for full app functionality.

🧑‍💻 Developer Notes
Both frontend and backend must be running locally for all features to work.

If you have any trouble or need to review specific features, please check the source code or reach out via GitHub issues.

Thank you for reviewing WTWR!
