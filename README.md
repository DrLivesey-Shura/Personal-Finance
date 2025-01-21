# Personal Finance Tracker

A full-stack web application for managing personal finances, tracking expenses, and monitoring budgets. Built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- 👤 User authentication and authorization
- 💰 Income and expense tracking
- 📊 Financial data visualization
- 📁 Category management
- 💵 Budget planning and monitoring
- 📈 Financial reports and analytics
- 🔔 Budget notifications
- 📱 Responsive design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT) for authentication
- bcrypt.js for password hashing

### Frontend
- React.js
- Tailwind CSS
- Recharts for data visualization
- Shadcn UI components
- Lucide React icons

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/finance-tracker.git
cd finance-tracker
```

2. Install backend dependencies
```bash
cd Server
npm install
```

3. Install frontend dependencies
```bash
cd ../finance-tracker
npm install
```

4. Create a `.env` file in the backend directory
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

5. Create a `.env` file in the frontend directory
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start the backend server
```bash
cd Server
npm start
```

2. Start the frontend application
```bash
cd finance-tracker
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
```
POST /api/auth/register - Register a new user
POST /api/auth/login - Login user
```

### Transactions
```
GET /api/transactions - Get all transactions
POST /api/transactions - Create new transaction
```

### Categories
```
GET /api/categories - Get all categories
POST /api/categories - Create new category
```

### Budgets
```
GET /api/budgets - Get all budgets
POST /api/budgets - Create new budget
```

### Reports
```
GET /api/reports/monthly - Get monthly financial report
```

## API Documentation

### Authentication Header
```
x-auth-token: <jwt_token>
```

### Sample Requests

1. Create Transaction
```json
POST /api/transaction
{
    "type": "expense",
    "amount": 50.00,
    "category": "Groceries",
    "description": "Weekly groceries",
    "date": "2025-01-20T15:30:00.000Z"
}
```

2. Create Budget
```json
POST /api/budgets
{
    "category": "category_id",
    "amount": 500,
    "period": "monthly",
    "startDate": "2025-01-01",
    "notifications": {
        "enabled": true,
        "threshold": 80
    }
}
```

## Database Schema

### User
```javascript
{
  email: String,
  password: String,
  name: String,
  createdAt: Date
}
```

### Transaction
```javascript
{
  user: ObjectId,
  type: String,
  amount: Number,
  category: String,
  description: String,
  date: Date
}
```

### Category
```javascript
{
  user: ObjectId,
  name: String,
  type: String,
  color: String,
  isDefault: Boolean
}
```

### Budget
```javascript
{
  user: ObjectId,
  category: ObjectId,
  amount: Number,
  period: String,
  startDate: Date,
  endDate: Date,
  notifications: {
    enabled: Boolean,
    threshold: Number
  }
}
```

## Contact

Your Name - aladinemire@gmail.com
Project Link: https://github.com/DrLivesey-Shura/Personal-Finance

## Acknowledgments

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
