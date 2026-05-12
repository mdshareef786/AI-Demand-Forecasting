# AI Demand Forecasting Platform

An AI-powered full-stack business intelligence and demand forecasting platform built using FastAPI, React.js, and Prophet forecasting.

The application allows users to upload sales datasets, analyze business performance, generate AI-powered future demand predictions, and visualize insights through an interactive dashboard.

---

# Features

## Authentication System
- User Registration & Login
- JWT Authentication
- Protected Routes
- Secure Session Handling

---

## Dataset Upload Module
- Upload CSV/Excel datasets
- Automatic dataset validation
- Data cleaning support
- Missing value handling
- Duplicate removal

---

## Analytics Dashboard
- Total Revenue Analysis
- Monthly Sales Trends
- Top Performing Products
- Interactive Charts
- KPI Analytics Cards

---

## AI Forecasting System
- Prophet Time-Series Forecasting
- Product-wise Forecasting
- Category-wise Forecasting
- Future Revenue Prediction
- Forecast Error Evaluation (MAPE)

---

## Reports Module
- PDF Forecast Reports
- Business Analytics Export
- Forecast Summary Generation

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

---

## Frontend
- React.js
- Tailwind CSS
- Recharts
- Axios
- Framer Motion
- React Hot Toast

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
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
│
└── README.md
```
---

# Installation

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
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

# Forecasting Workflow

1. Upload historical sales dataset
2. Data preprocessing using Pandas
3. Prophet model training
4. Future demand prediction generation
5. Forecast visualization and analytics
6. Report generation

---

# AI Forecasting Features

- Time-series forecasting
- Monthly revenue prediction
- Product-level forecasting
- Category-level forecasting
- Forecast error evaluation using MAPE

---

# Future Enhancements

- XGBoost Forecasting
- LSTM Forecasting
- Real-time Analytics
- Multi-user Roles
- Advanced BI Reporting
- Cloud Deployment

---

# Author

## Syed Mahammad Shareef

- Python Developer
