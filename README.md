# AI Demand Forecasting Platform

An AI-powered full-stack business intelligence and demand forecasting platform built using FastAPI, React.js, and Prophet forecasting.

The platform allows users to upload historical sales datasets, analyze business performance, generate AI-powered future demand predictions, and download forecasting reports through an interactive analytics dashboard.

---

# Features

## Authentication Module
- User Registration & Login
- JWT Authentication
- Protected Routes
- Secure Session Management

---

## Dataset Upload Module
- Upload CSV/Excel Datasets
- Dataset Validation
- Missing Value Handling
- Duplicate Record Cleaning
- Automated Data Processing

---

## Analytics Dashboard
- Total Revenue Analytics
- Monthly Sales Trends
- Top Performing Products
- Interactive Business Charts
- KPI Analytics Cards

---

## AI Forecasting Module
- Prophet Time-Series Forecasting
- Future Revenue Prediction
- Product-wise Forecasting
- Category-wise Forecasting
- Forecast Error Evaluation (MAPE)

---

## Reports Module
- PDF Report Generation
- Excel Report Export
- Forecast Summary Reports
- Business Analytics Reports

---

# Tech Stack

## Backend
- FastAPI
- MySQL
- SQLAlchemy
- JWT Authentication
- Pandas
- Prophet
- Scikit-learn
- ReportLab

---

## Frontend
- React.js
- Tailwind CSS
- Axios
- Recharts
- Framer Motion
- React Hot Toast
- React Loading Skeleton

---

# Project Structure
```
AI-Demand-Forecasting/

├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── main.py
│   │
<<<<<<< HEAD
=======
│   ├── reports/
│   ├── uploads/
>>>>>>> 3a51d9d (Final project updates)
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
<<<<<<< HEAD
│   │   ├── assets/
│   │   └── main.jsx
=======
│   │   └── assets/
>>>>>>> 3a51d9d (Final project updates)
│   │
│   ├── package.json
│   └── vite.config.js
│
<<<<<<< HEAD
=======
├── screenshots/
│
>>>>>>> 3a51d9d (Final project updates)
├── .gitignore
│
└── README.md
```
---

# Installation Guide

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend will run on:

```bash
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# Environment Variables

Create `.env` file inside backend folder:

```env
DATABASE_URL=mysql+pymysql://root:password@localhost/ai_forecasting

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

# AI Forecasting Workflow

1. Upload historical sales dataset
2. Dataset preprocessing using Pandas
3. Time-series model training using Prophet
4. Future revenue prediction generation
5. Forecast visualization and analytics
6. PDF/Excel report generation

---

# Forecasting Features

- Monthly Revenue Forecasting
- Product-wise Forecasting
- Category-wise Forecasting
- Future Demand Prediction
- Forecast Error Evaluation (MAPE)

---

# Security Features

- JWT Authentication
- Protected Frontend Routes
- Secure API Access
- Environment Variable Configuration

---

# Future Enhancements

- XGBoost Forecasting
- LSTM Forecasting
- Real-Time Analytics
- Role-Based Access Control
- Cloud Deployment
- Advanced BI Reports

---

# Author

## Syed Mahammad Shareef
<<<<<<< HEAD

- Python Developer
=======
- Python Developer

### Skills
- Data Analytics
- FastAPI
- React.js
- Machine Learning
- Forecasting Systems
- Power BI
- Full-Stack Development
>>>>>>> 3a51d9d (Final project updates)
