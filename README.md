# CodeChallenge
# Solx Coding Challenge

This is a Pricing Scheme Application that allows users to add, delete, reorder, and submit pricing schemes. 
The app uses a modern stack (React, NodeJs, Supabase, Render) for both frontend and backend, ensuring scalability and efficiency.

Try the app here: https://codechallenge-frontend.onrender.com/

# Features
  Choose and add a new pricing schemes dynamically.
  Drag-and-drop functionality for reordering pricing schemes.
  Input validation for data integrity.
  Submit pricing schemes to the backend API and view the submitted data from the database.
  Clear the database everytime the submit is pressed and on session start to ensure accurate data.

# How to Use
  Open the application in your browser.
  Click "Add Pricing Scheme" to add a new scheme.
  Reorder schemes by grabbing the hanlde on the right side and dragging and dropping.
  Submit your schemes, which will be validated, saved  and displayed from the database.

# Technologies Used
Frontend
  React.js: For building the user interface.
  TypeScript: For type-safe development.

# Backend
  Node.js: Server-side runtime.
  Express.js: For building the REST API.
  Supabase: For a free and hosted Postgres-like database for storing pricing schemes.

# Deployment
   Frontend & Backend: Deployed on Render.
   Frontend & Backend: https://codechallenge-frontend.onrender.com/

# Setup and Installation
# Prerequisites
  - NodeJS latest
  - Supabase account and create table
  Clone the Repository
  ```bash
#Frontend Setup
  // Navigate to the frontend directory:
  cd frontend
  // Install dependencies:
  npm install
  // Run the app
  npm start

#Backend Setup
cd backend
npm install
// Create a .env file with the following variables:
PORT
SUPABASE_URL
SUPABASE_ANON_KEY
// run the application
npm run dev
