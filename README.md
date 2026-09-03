# 🏥 MediFind — Medicine & Pharmacy Management System

MediFind is a full-stack web application designed to help users search for medicines, find pharmacies, manage medicine inventory, place orders, and check potential medicine interactions.

The system connects users and pharmacies through a modern web platform with separate frontend and backend services.

---

##  Features

### 👤 User Features

*  Search for medicines
*  Find available pharmacies
*  Check medicine information
*  Check potential medicine interactions
*  Place medicine orders
*  User authentication and registration

### 🏥 Pharmacy Features

*  Pharmacy registration
*  Manage medicine inventory
*  Add and update medicine information
*  Manage customer orders
*  Pharmacy management

### 🛠️ Admin Features

*  Admin dashboard
*  Add medicines
*  Manage products
*  View and manage orders

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* CSS
* HTML

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

##  Project Structure

```text
medifind-main/
│
├── medifind backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── medifind frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

---

##  Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB

---

##  Backend Setup

Navigate to the backend folder:

```bash
cd "medifind backend"
```

Install dependencies:

```bash
npm install
```

Configure your environment variables if required.

Start the backend server:

```bash
npm start
```

If the project uses a development script:

```bash
npm run dev
```

---

##  Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd "medifind frontend"
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The application will typically run on:

```text
http://localhost:3000
```

---

##  API Features

The backend provides functionality for:

* Medicine search
* Pharmacy management
* Inventory management
* Order management
* Medicine interaction checking
* User authentication

---

##  Database

MediFind uses **MongoDB** for storing application data, including:

* Medicines
* Pharmacies
* Inventory
* Orders
* User-related information

Make sure your MongoDB connection is correctly configured before starting the backend server.

---

## 📸 Screenshots

Add screenshots of your application here.

### Home Page

![Home Page](docs/screenshots/home.png)

### Medicine Search

![Medicine Search](docs/screenshots/medicine-search.png)

### Pharmacy Dashboard

![Pharmacy Dashboard](docs/screenshots/pharmacy-dashboard.png)

> Create a `docs/screenshots` folder and place your screenshots inside it.

---

##  Environment Variables

Create a `.env` file inside the backend directory if required.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

**Never commit your `.env` file or sensitive credentials to GitHub.**

---

##  Running the Application

Run both services simultaneously.

### Terminal 1 — Backend

```bash
cd "medifind backend"
npm start
```

### Terminal 2 — Frontend

```bash
cd "medifind frontend"
npm start
```

Then open the frontend in your browser.


---

---

## 👨‍💻 Authors

Udeesha Jayendra

Ravindu Randeepa

---
