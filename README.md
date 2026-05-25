# AI Demand Forecasting Platform

## Project Overview

AI Demand Forecasting Platform is an end-to-end enterprise forecasting system developed for analyzing datasets, predicting future demand, monitoring sales trends, generating reports, and providing AI-driven business insights.

The project was developed in multiple phases:

- Phase 1 – Core System Development
- Phase 2 – Analytics & Forecast Enhancements
- Phase 3 – Enterprise AI Features & Optimization

The application supports forecasting, analytics, reporting, monitoring, search, filtering, AI optimization, and role management.

---

# Technologies Used

## Frontend

- React.js
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Lucide React

## Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- Pandas
- Prophet
- Scikit-Learn
- NumPy

## Database

- MySQL

## ML Models

- Prophet Forecasting
- Linear Regression
- Ensemble Forecast Model

---

# Project Phases

# Phase 1 – Core Development

## User Authentication System

Implemented:

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Token Validation
- Logout

## Dataset Management

Features:

- Upload CSV datasets
- Dataset storage
- Dataset validation
- Data cleaning
- Dataset history

Supported:

- Sales datasets
- Inventory datasets
- Demand datasets

## Forecast Module

Implemented:

- Demand forecasting
- Prophet model integration
- Forecast visualization
- Future prediction generation
- Forecast history storage

## Dashboard

Dashboard includes:

- Revenue cards
- KPI widgets
- Sales charts
- Forecast visualization
- Dataset metrics

---

# Phase 2 – Analytics & Reporting

## Sales Analytics

Added:

- Monthly sales analysis
- Revenue analytics
- Product performance
- Sales trends
- Growth tracking

## Region Analytics

Implemented:

- Region-wise sales
- Regional forecasting
- Market comparison

## Reports Module

Features:

- PDF report generation
- Excel export
- Forecast reports
- Revenue reports
- Analytics summary

## Notifications

Implemented:

- System notifications
- Forecast notifications
- Dashboard alerts

## Forecast History

Added:

- Previous forecasts
- Model history
- Historical comparisons

---

# Phase 3 – Enterprise Features

## Real-Time Forecasting Module

Implemented:

- Real-time forecasting
- Live dashboard updates
- Automatic refresh
- Real-time monitoring
- Sales tracking

## AI Optimization

### Automated Retraining

Features:

- Retraining execution
- Accuracy tracking
- Performance comparison

### Anomaly Detection

Implemented:

- Unusual sales detection
- Risk alerts
- Inventory anomalies

### Ensemble Prediction

Models:

1. Prophet

2. Linear Regression

3. Ensemble Model

### Seasonal Trend Detection

Added:

- Seasonal analysis
- Trend detection
- Pattern recognition

---

## Role Based Access Control

Roles:

### Super Admin

- Full access
- User management
- System control

### Analyst

- Forecast access
- Report access
- Analytics management

### Viewer

- Read only access

Protected:

- APIs
- Dashboard pages
- Reports

---

## Advanced Analytics

### Revenue Prediction

Features:

- Revenue forecast
- Growth percentage
- Profit estimation

### Inventory Risk Analysis

Categories:

- High Risk
- Medium Risk
- Low Risk

### Region Analytics

Implemented:

- Region sales chart
- Forecast comparison

### Category Analytics

Implemented:

- Category sales
- Product insights
- Demand distribution

---

## System Monitoring

Implemented:

- API monitoring
- User activity logs
- Forecast history
- System metrics
- Monitoring dashboard

---

## Search & Filtering

### Global Search

Search support for:

- Datasets
- Reports
- Users
- Forecasts

### Advanced Filters

Implemented:

- Forecast filters
- Report filters
- Dataset filters
- User filters

---

## Reports & AI Insights

### Reports

Supported:

- PDF Forecast Reports
- Revenue Reports
- Analytics Summary
- Excel Exports

### AI Insights

Generated:

- Business recommendations
- Growth insights
- Inventory suggestions
- Forecast insights

### Comparison Reports

Compared Models:

- Prophet
- Linear
- Ensemble

---

# Dashboard Features

Dashboard includes:

## KPI Cards

- Revenue
- Dataset Rows
- Top Product
- Highest Sale

## Charts

- Monthly Revenue Chart
- Forecast Prediction Chart
- Region Analytics
- Category Analytics

## Additional Features

- Search
- Filters
- Notifications
- Dark Mode
- Reusable Components

---

# API Modules

Implemented Routers:

Authentication

Users

Datasets

Analytics

Forecast

Reports

Notifications

Search

Realtime Monitoring

Inventory

Revenue

Retraining

Ensemble

Comparison

Insights

Cache

Filters

Activity Logs

System Metrics

Admin

---

# Folder Structure

```bash
AI-Demand-Forecasting/

backend/

│

├── app/

│ ├── auth/

│ ├── forecasting/

│ ├── models/

│ ├── routers/

│ ├── schemas/

│ ├── services/

│ ├── database.py

│ └── main.py

│

frontend/

│

├── src/

│ ├── api/

│ ├── components/

│ ├── context/

│ ├── layouts/

│ ├── pages/

│ └── App.jsx
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/mdshareef786/AI-Demand-Forecasting.git
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

fastapi dev app/main.py
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Database Optimization

Completed:

- Query optimization
- Index creation
- Forecast indexing
- Cache support
- Relationship optimization

---

# Developer

#### Syed Mahammad Shareef
