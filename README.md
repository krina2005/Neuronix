# 🧠 NeuroNix - Brain Performance Dashboard

<div align="center">

![NeuroNix Banner](https://img.shields.io/badge/NeuroNix-Brain_Monitoring-00d4ff?style=for-the-badge&logo=brain&logoColor=white)

**Monitor Your Brain Like a System | Optimize Your Cognitive Performance**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---
## 🎯 About

**NeuroNix** is a cutting-edge brain performance monitoring dashboard that helps developers, students, and professionals track their cognitive performance in real-time. By analyzing key factors like sleep, study hours, stress levels, and caffeine intake, NeuroNix provides actionable insights to optimize mental performance.

Think of it as a **system monitor for your brain** - just like how you monitor your computer's CPU, RAM, and processes, NeuroNix monitors your focus level, logic power, error rate, and mental capacity.

---

## ✨ Features

### 🎯 Core Metrics

- **Focus Meter**: Real-time concentration level tracking (0-100%)
- **Logic Power**: Problem-solving capability assessment
- **Bug Count**: Mental error rate monitoring
- **Coffee Dependency**: Caffeine impact analysis
- **Brain RAM Usage**: Mental capacity utilization (0-4 GB)

### 📊 Smart Analytics

- **Cognitive Engine**: Advanced algorithm that calculates metrics based on:
  - Sleep hours (optimal: 7-8 hours)
  - Study/work hours
  - Stress levels (optimal: 2-4/10)
  - Coffee/tea intake
  
- **Dynamic Recommendations**: Context-aware tips for performance improvement
- **Error Logging**: Detailed insights into cognitive performance issues
- **Visual Gauges**: Beautiful circular progress indicators
- **Status Labels**: Instant feedback on your current state

### 🔐 User Features

- **Secure Authentication**: JWT-based login system
- **Persistent Storage**: MongoDB for user data and statistics
- **Session Management**: Automatic token handling
- **Protected Routes**: Secure dashboard access

### 🎨 UI/UX

- **Glassmorphism Design**: Modern frosted glass effects
- **Smooth Animations**: Framer Motion for fluid interactions
- **Responsive Layout**: Works on all screen sizes
- **Dark Mode**: Eye-friendly cyberpunk theme
- **Interactive Components**: Real-time visual feedback

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework with latest features |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **React Router** | Client-side routing |
| **Recharts** | Data visualization |
| **Axios** | HTTP client |
| **Lucide React** | Beautiful icons |

### Backend

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js 5** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **CORS** | Cross-origin requests |

### Development Tools

- **ESLint**: Code linting
- **TypeScript ESLint**: TS-specific linting
- **Vitest**: Unit testing
- **Nodemon**: Auto-restart server

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 20.0.0
- **npm** >= 8.0.0
- **MongoDB** >= 6.0 (local or Atlas)
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/krina2005/Neuronix.git
cd Neuronix
```

2. **Install Backend Dependencies**

```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**

```bash
cd ../frontend
npm install
```

### Environment Variables

#### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/cs-brain-dashboard

# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/neuronix?retryWrites=true&w=majority

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

PORT=5000
```

#### Frontend (.env)

Create a `.env` file in the `frontend` directory (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. **Start MongoDB**

```bash
# If using local MongoDB
mongod
```

2. **Start Backend Server**

```bash
cd backend
npm run dev
```

Server will run on `http://localhost:5000`

3. **Start Frontend Development Server**

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

4. **Open your browser**

Navigate to `http://localhost:3000`

---

## 📖 Usage

### 1. Sign Up

- Navigate to the signup page
- Create an account with your name, email, and password
- You'll be automatically logged in and redirected to the dashboard

### 2. Configure Your Metrics

Input your current status:
- **Sleep Hours**: How many hours you slept last night
- **Study Hours**: How long you've been studying/working
- **Coffee Intake**: Number of cups consumed
- **Stress Level**: Rate your current stress (0-10)

### 3. Calculate Brain Stats

Click "Calculate Brain Stats" to analyze your cognitive performance

### 4. View Results

Monitor your:
- **Focus Level**: Your current concentration capability
- **Logic Power**: Problem-solving strength
- **Bug Count**: Mental error frequency
- **Coffee Dependency**: Caffeine reliance percentage
- **Brain RAM Usage**: Mental capacity utilization

### 5. Follow Recommendations

Review the personalized tips and error logs to optimize your performance

---

## 📁 Project Structure

```
Neuronix/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT authentication
│   ├── models/
│   │   ├── User.js                # User schema
│   │   └── BrainStats.js          # Stats schema
│   ├── routes/
│   │   ├── auth.js                # Auth endpoints
│   │   └── stats.js               # Stats endpoints
│   ├── .gitignore
│   ├── package.json
│   └── server.js                  # Express server setup
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ErrorLog.tsx       # Error display
│   │   │   ├── Gauge.tsx          # Circular gauge
│   │   │   ├── InputPanel.tsx     # Input controls
│   │   │   ├── Navbar.tsx         # Navigation bar
│   │   │   ├── ProtectedRoute.tsx # Auth guard
│   │   │   └── StatCard.tsx       # Stat display card
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx      # Main dashboard
│   │   │   ├── Landing.tsx        # Home page
│   │   │   ├── Login.tsx          # Login page
│   │   │   └── Signup.tsx         # Signup page
│   │   ├── utils/
│   │   │   └── cognitiveEngine.ts # Stats calculation
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript types
│   │   ├── api.ts                 # Axios instance
│   │   ├── App.tsx                # Main app component
│   │   ├── index.css              # Global styles
│   │   └── main.tsx               # Entry point
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication

#### POST `/api/auth/signup`
Register a new user
<!-- 
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "userId": "user_id",
  "name": "John Doe"
}
``` -->

#### POST `/api/auth/login`
Login existing user

<!-- **Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "userId": "user_id",
  "name": "John Doe"
}
``` -->

### Brain Statistics

#### GET `/api/stats`
Get user's brain statistics (Protected)

<!-- **Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "_id": "stat_id",
  "userId": "user_id",
  "focusLevel": 85,
  "logicPower": 78,
  "bugCount": 12,
  "coffeeDependency": 37,
  "brainRamUsage": 2.3,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
``` -->

#### POST `/api/stats`
Save/update brain statistics (Protected)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "focusLevel": 85,
  "logicPower": 78,
  "bugCount": 12,
  "coffeeDependency": 37,
  "brainRamUsage": 2.3
}
```

**Response:**
```json
{
  "message": "Stats saved successfully",
  "stats": { /* stats object */ }
}
```

---

### 🏠 Landing Page
*Beautiful cyberpunk-themed landing page with feature showcase*

### 🎯 Dashboard
*Real-time brain performance monitoring with interactive gauges*

### 📊 Analytics
*Detailed metrics and personalized recommendations*

### 🔐 Authentication
*Secure login and signup with modern UI*

<!-- --- -->

<!-- ## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Update documentation as needed
- Add tests for new features
- Ensure all tests pass before submitting PR -->

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact

**Krina Parmar**

- 💼 LinkedIn: [@krina-parmar](https://www.linkedin.com/in/krina-parmar-a1b3622b9/)
- 💻 GitHub: [@krina2005](https://github.com/krina2005)
- 📸 Instagram: [@krina__2005](https://www.instagram.com/krina__2005/)

**Project Link**: [https://github.com/krina2005/Neuronix](https://github.com/krina2005/Neuronix)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide Icons](https://lucide.dev/) - Icon library
- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Backend framework

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Made with ❤️ by [Krina Parmar](https://github.com/krina2005)**

*Monitor your brain, optimize your life* 🧠✨

</div>