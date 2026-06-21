from flask import Flask, jsonify
from flask_cors import CORS
from analysis import (
    get_summary_stats,
    get_rides_by_category,
    get_rides_by_purpose,
    get_monthly_trend,
    get_top_routes,
    get_distance_distribution,
    get_surge_prediction,
    analyze_weather_impact  # 1. Added the import here
)

app = Flask(__name__)
CORS(app)

@app.route("/api/summary")
def summary():
    return jsonify(get_summary_stats())

@app.route("/api/category")
def category():
    return jsonify(get_rides_by_category())

@app.route("/api/purpose")
def purpose():
    return jsonify(get_rides_by_purpose())

@app.route("/api/monthly")
def monthly():
    return jsonify(get_monthly_trend())

@app.route("/api/routes")
def routes():
    return jsonify(get_top_routes())

@app.route("/api/distance")
def distance():
    return jsonify(get_distance_distribution())

@app.route("/api/surge")
def surge():
    # Your model executes perfectly without arguments and outputs accuracy metrics + forecasts
    return jsonify(get_surge_prediction())

@app.route("/api/weather-impact")
def weather_impact():
    # 2. Added the new endpoint for data enrichment metrics
    return jsonify(analyze_weather_impact())

@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)