# 🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System built using **React, TypeScript, Node.js, Express, MongoDB, and JWT authentication**.

The application supports role-based access control with separate functionalities for **Users** and **Admins**.

## 📌 Project Overview
This project allows users to browse and purchase sweets, while administrators can manage inventory by adding or deleting sweets. The system ensures secure authentication, authorization, and real-time stock updates after purchases.

## 🚀 Features
### 🔐 Authentication & Authorization
* JWT-based login and registration
* Role-based access control (User / Admin)
* Protected backend routes

### 👤 User Features
* Login / Logout
* View sweets
* Purchase sweets
* Automatic inventory updates

### 🛠️ Admin Features
* Add new sweets
* Delete sweets
* Manage inventory

## 🧰 Tech Stack
* **Frontend:** React, TypeScript, Axios
* **Backend:** Node.js, Express.js, TypeScript, MongoDB, JWT
* **Testing:** Jest, Supertest

## 📂 Project Structure

```text
TDD_assessment/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── sweet.controller.ts
│   │   ├── middleware/
│   │   │   ├── admin.middleware.ts
│   │   │   └── auth.middleware.ts
│   │   ├── models/
│   │   │   ├── sweet.model.ts
│   │   │   └── user.model.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── sweet.routes.ts
│   │   ├── tests/
│   │   │   ├── auth.test.ts
│   │   │   ├── inventory.test.ts
│   │   │   ├── search.test.ts
│   │   │   └── sweet.test.ts
│   │   ├── utils/
│   │   │   └── generateToken.ts
│   │   └── server.ts
│   ├── .env
│   ├── jest.config.js
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
└── README.md

## ⚙️ How to Run the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone [https://github.com/DEEP1495/sweet-shop-system.git](https://github.com/DEEP1495/sweet-shop-system.git)
cd TDD_assessment
2️⃣ Backend Setup
Bash

cd backend
npm install
npm run dev
Backend runs on: http://localhost:5000

Note: Ensure you have a .env file with MONGO_URI, JWT_SECRET, and PORT.
3️⃣ Frontend Setup
Bash

cd frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173

🧪 Running Tests
Bash

cd backend
npm test

All Routes:
http://localhost:5173/sweets->main dashboard.
http://localhost:5173/login->registered user.|| for admin you need to change it through db.
http://localhost:5173/register ->for new user 
http://localhost:5173/dashboard ->dashboard.

```
My AI Usage
AI Tools Used

ChatGPT (OpenAI)

How I Used AI

I used ChatGPT as a learning and problem-solving companion throughout this project.

Debugging help: Whenever I got stuck with errors (TypeScript issues, MongoDB queries, JWT authentication problems, or API failures), I used ChatGPT to understand why the error was happening and how to fix it.

Backend development: ChatGPT helped me think through the structure of Express controllers, middleware, and role-based access (user vs admin). I still wrote and adjusted the code myself after understanding the suggestions.

Frontend integration: I used ChatGPT to debug React + TypeScript issues such as Axios setup, handling JWT tokens, protected routes, and state updates after API calls.


Testing support: ChatGPT guided me on how to structure Jest and Supertest tests properly, especially around beforeAll / afterAll, database cleanup, and fixing async test failures.

Git & workflow issues: I used ChatGPT to solve Git and GitHub problems like authentication errors, branch setup, and pushing the project correctly to a public repository.

Documentation: ChatGPT helped me organize and polish the README so it clearly explains the project, setup steps, and AI usage in a professional way.

Screenshots:
server.png
<img width="1920" height="1032" alt="server" src="https://github.com/user-attachments/assets/8943059b-d277-43c9-8f07-4bec1303c6bd" />
test.png
<img width="1920" height="1032" alt="test" src="https://github.com/user-attachments/assets/88b18e7f-d7ee-4687-ba8b-cee114739b52" />
structure.png
<img width="1920" height="1032" alt="structure" src="https://github.com/user-attachments/assets/55ad582f-07ed-45a9-8366-50665183b509" />

