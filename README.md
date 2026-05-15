# AI Demand Forecasting Platform 

Advanced AI-powered demand forecasting and business analytics platform built using FastAPI, React.js, Machine Learning, and MySQL.

---

# Project Overview

The AI Demand Forecasting Platform is an enterprise-level analytics system that helps businesses analyze sales trends, predict future demand, compare forecasting models, and generate business intelligence reports.

The platform provides:

* AI-based future sales prediction
* Business analytics dashboards
* Forecast model comparison
* PDF & Excel report generation
* Admin management system
* Notification system
* Dataset upload & analytics
* Enterprise-level frontend UI

---

# Features

## Authentication & Security

* JWT Authentication
* Protected Routes
* Role-Based Access Control
* Admin Authorization
* Secure API Access

---

## Analytics Dashboard

* Revenue KPIs
* Monthly Revenue Trend
* Region Analytics
* Product Analytics
* Forecast Insights
* Business Recommendations

---

## AI Forecasting

* Prophet Forecasting
* Linear Regression Forecasting
* Forecast Comparison
* MAPE / MAE / RMSE Metrics
* Future Sales Prediction
* Forecast History Tracking

---

## Dataset Management

* CSV Upload
* Excel Upload
* Dataset Validation
* Dataset Search
* Pagination APIs
* Upload Failure Notifications

---

## Reports System

* PDF Report Export
* Excel Report Export
* Detailed Report View
* Analytics Summary Reports
* Forecast Reporting Dashboard

---

## Notifications Module

* Forecast Completion Notifications
* Dataset Upload Notifications
* Upload Failure Notifications
* Report Generation Notifications
* Notification Dropdown

---

## Admin Panel

* User Management
* Dataset Management
* Forecast Monitoring
* Report Monitoring
* System Analytics
* Disable / Enable Users
* Delete Dataset APIs

---

# Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* Recharts
* Framer Motion
* React Router DOM
* Lucide React

---

## Backend

* FastAPI
* SQLAlchemy
* JWT Authentication
* Pydantic
* Uvicorn

---

## Database

* MySQL

---

## Machine Learning

* Prophet
* Scikit-learn
* Pandas
* NumPy

---

# Project Structure

## Backend Structure

```bash
backend/
│
├── app/
│   ├── auth/
│   ├── models/
│   ├── routers/
│   ├── schemas/
│   ├── services/
│   │   └── forecasting/
│   └── main.py
│
├── uploads/
├── reports/
└── requirements.txt
```

---

## Frontend Structure

```bash
frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── assets/
│
└── package.json
```

---

# ⚙️ Installation

## 1️ Clone Repository

```bash
git clone https://github.com/mdshareef786/AI-Demand-Forecasting.git
```

---

## 2️ Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

---

## 3️ Configure Environment Variables

Create `.env`

```env
DATABASE_URL=mysql+pymysql://root:password@localhost/ai_forecasting

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## 4️ Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL:

```txt
http://127.0.0.1:8000
```

Swagger Docs:

```txt
http://127.0.0.1:8000/docs
```

---

## 5️ Frontend Setup

```bash
cd frontend

npm install
```

---

## 6️ Run Frontend

```bash
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```
---

# Forecast Metrics

The platform evaluates forecasting models using:

* MAPE
* MAE
* RMSE

---

# API Modules

* Authentication APIs
* Dataset APIs
* Analytics APIs
* Forecast APIs
* Reports APIs
* Notifications APIs
* Admin APIs
---
---

# Author

### Syed Mahammad Shareef
##### Python Developer
