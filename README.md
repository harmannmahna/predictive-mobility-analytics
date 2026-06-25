# 🚗 Predictive Mobility Analytics Platform

A full-stack data analytics and machine learning platform built to analyze ride-sharing patterns, forecast demand, and visualize mobility trends. Inspired by real-world Uber analytics, built with a Flask REST API backend and an interactive Chart.js frontend.

**Live Demo:** https://harmannmahna.github.io/predictive-mobility-analytics/

**Backend API:** Deployed on Render (Flask + Scikit-learn)

---

## ✨ What It Does

Takes raw ride-sharing data (sourced from Kaggle) and turns it into actionable insights:
- 📈 Forecasts 24-hour ride demand using a Linear Regression ML model
- 🌦️ Analyzes how weather conditions impact ride distance
- 🗺️ Tracks top transit routes and trip purposes
- 📊 Visualizes monthly trends, distance distributions, and category breakdowns

---

## 🖥️ Screenshots

### 1) Advanced Mobility Analytics Dashboard
Main dashboard showing key stats — total rides, distance logged, average duration, and real-time ML model accuracy (R²). Includes 24-hour ML ride forecast, weather correlation impact chart, and rides by category.
<div align="center">
  <img src="./dashboard%20predictive%20mobility%20first%203.png" width="90%">
</div>

### 2) Rides by Purpose, Monthly Trends & Distance Distribution
Deep dive into trip purpose breakdown, monthly ride and mileage trends over time, and distance distribution across 6 range buckets.
<div align="center">
  <img src="./ride%20by%20purpose%20monthly%20trends%20last%203%20.png" width="90%">
</div>

### 3) Top Transit Routes Analysis
Ranked table of the most frequently taken routes, showing origin → destination pairs and trip counts across the dataset.
<div align="center">
  <img src="./analysis%20route%20predictive%20.png" width="90%">
</div>

---

## 🚀 Features

**Machine Learning**
- Linear Regression model trained on ride telemetry data
- 24-hour ride demand forecasting
- Real-time R² accuracy scoring displayed on dashboard
- Weather correlation analysis (Overcast / Rainy / Sunny impact on ride distance)

**Analytics & Visualizations**
- Total rides, distance, average duration stats
- Rides by category (Business vs Personal) — donut chart
- Rides by purpose — horizontal bar chart
- Monthly trends (rides + miles) — dual-axis line chart
- Distance distribution — grouped bar chart
- Top 10 transit routes — ranked table

**Full Stack Architecture**
- Decoupled frontend and backend — Flask REST API serves data, JS frontend consumes it
- Glassmorphic dark UI built with Chart.js
- Deployed frontend on GitHub Pages, backend on Render
- Gunicorn WSGI + Flask-CORS for production-grade data handoffs

**Data**
- Dataset sourced from Kaggle (Uber ride data)
- 1,200+ rides, 12,200+ miles logged
- Preprocessed with Pandas — cleaning, feature engineering, enrichment

---

## 🛠️ Tech Stack

**Frontend**
- HTML5, CSS3, JavaScript
- Chart.js (line, bar, donut charts)
- Glassmorphic UI design

**Backend**
- Python, Flask REST API
- Scikit-learn (Linear Regression)
- Pandas, NumPy
- Gunicorn WSGI
- Flask-CORS

**Deployment**
- Frontend: GitHub Pages
- Backend: Render Cloud
- Dataset: Kaggle (Uber ride data CSV)

---

## ⚙️ Local Setup

**Prerequisites:** Python 3.9+

**1. Clone the repo**
```bash
git clone https://github.com/harmannmahna/predictive-mobility-analytics.git
cd predictive-mobility-analytics
```

**2. Install dependencies**
```bash
pip install -r requirements.txt
```

**3. Run the Flask backend**
```bash
python app.py
```

**4. Open the frontend**

Open `index.html` in your browser or use Live Server in VS Code.

Make sure the API URL in `script.js` points to `http://localhost:5000` for local development.

---

## 📂 Project Structure

```
predictive-mobility-analytics/
│
├── app.py                  # Flask REST API + ML pipeline
├── analysis.py             # Data preprocessing + model training
├── script.js               # Frontend chart rendering + API calls
├── index.html              # Dashboard UI
├── style.css               # Glassmorphic dark styling
├── requirements.txt        # Python dependencies
├── uber_data.csv           # Kaggle dataset
```

---

## 📊 Key Insights from the Data

- **Rainy weather** drives significantly higher ride distances vs overcast or sunny conditions
- **Business rides** dominate the dataset (~90% of all trips)
- **5–10 mile range** is the most common trip distance
- **Morrisville ↔ Cary** corridor is the most frequently traveled route
- Monthly ride volume peaks mid-year and dips in spring

---

## 🔮 Future Improvements

- Add more ML models (Random Forest, XGBoost) and compare accuracy
- Real-time data ingestion via ride-sharing APIs
- User authentication for personalized analytics
- Export reports as PDF
- Time-series forecasting with LSTM

---

## 💡 Inspiration

Inspired by real-world mobility analytics platforms like Uber's internal dashboards. Built to explore how machine learning and data visualization can turn raw ride data into meaningful operational insights.

Dataset sourced from Kaggle. Architecture inspired by GeeksforGeeks Uber analytics tutorials.

---

## 👩‍💻 Author

**Harmann Kaur**
- GitHub: [@harmannmahna](https://github.com/harmannmahna)
- LinkedIn: [harmannkaurmahna](https://linkedin.com/in/harmannkaurmahna)
