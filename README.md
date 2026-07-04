# 💸 Spendly — Smart Expense Tracker

A full-stack expense tracking web application built with the MERN stack, featuring a premium glassmorphism UI and JWT authentication.

![Tech Stack](https://img.shields.io/badge/MERN-Stack-blueviolet)
![JWT](https://img.shields.io/badge/Auth-JWT-purple)
![Tailwind](https://img.shields.io/badge/UI-Tailwind_CSS-06B6D4)

---

## 🚀 Features

- 🔐 **JWT Authentication** — Secure login and register
- 👤 **User Specific Data** — Each user sees only their own expenses
- ➕ **Add Expenses** — With description, amount, category and date
- 🗑️ **Delete Expenses** — Remove expenses instantly
- 📊 **Spending Chart** — Visual breakdown by category
- 📅 **History Page** — Expenses grouped by date
- 💎 **Glassmorphism UI** — Premium dark theme design
- 📱 **Responsive Design** — Works on all screen sizes

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Context API

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs

---

## 📁 Project Structure

spendly/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── ExpenseChart.jsx
│   │   │   └── History.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   └── App.jsx
│   └── package.json
└── backend/
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   └── Expense.js
├── routes/
│   ├── auth.js
│   └── expenses.js
├── middleware/
│   └── auth.js
└── server.js

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/swaroop-biradar12/spendly.git
cd spendly
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

Start backend:
```bash
node server.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

