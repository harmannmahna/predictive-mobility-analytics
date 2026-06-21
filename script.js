// Change http to https here:
const API = "https://predictive-mobility-analytics.onrender.com/api";

const COLORS = {
  blue:   "#00b4d8",
  purple: "#7c3aed",
  green:  "#22c55e",
  amber:  "#f59e0b",
  coral:  "#f43f5e",
  teal:   "#14b8a6",
  indigo: "#6366f1",
  orange: "#fb923c",
  pink:   "#ec4899",
  lime:   "#84cc16",
};
const PALETTE = Object.values(COLORS);

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: "#8b90a8", font: { size: 12 } } },
    tooltip: { backgroundColor: "#22263a", titleColor: "#e8eaf0", bodyColor: "#8b90a8", borderColor: "#2e3250", borderWidth: 1 }
  },
  scales: {
    x: { ticks: { color: "#8b90a8" }, grid: { color: "#2e3250" } },
    y: { ticks: { color: "#8b90a8" }, grid: { color: "#2e3250" } }
  }
};

function fmt(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

async function fetchJSON(endpoint) {
  const res = await fetch(API + endpoint);
  if (!res.ok) throw new Error("API error: " + res.status);
  return res.json();
}

function setBadge(ok) {
  const el = document.getElementById("status-badge");
  el.textContent = ok ? "API Connected" : "API Offline";
  el.className   = "badge " + (ok ? "badge-ok" : "badge-error");
}

async function loadSummary() {
  const d = await fetchJSON("/summary");
  document.getElementById("total-rides").textContent    = fmt(d.total_rides);
  document.getElementById("total-miles").textContent    = fmt(d.total_miles);
  document.getElementById("avg-miles").textContent      = d.avg_miles + " mi";
  document.getElementById("avg-duration").textContent   = d.avg_duration_min + " min";
}

async function loadCategory() {
  const data = await fetchJSON("/category");
  new Chart(document.getElementById("categoryChart"), {
    type: "doughnut",
    data: {
      labels:   data.map(d => d.category),
      datasets: [{ data: data.map(d => d.count), backgroundColor: PALETTE, borderWidth: 0 }]
    },
    options: { ...chartDefaults, scales: {} }
  });
}

async function loadPurpose() {
  const data = await fetchJSON("/purpose");
  new Chart(document.getElementById("purposeChart"), {
    type: "bar",
    data: {
      labels:   data.map(d => d.purpose),
      datasets: [{ label: "Rides", data: data.map(d => d.count), backgroundColor: COLORS.blue, borderRadius: 4 }]
    },
    options: { ...chartDefaults, indexAxis: "y" }
  });
}

async function loadMonthly() {
  const data = await fetchJSON("/monthly");
  new Chart(document.getElementById("monthlyChart"), {
    type: "line",
    data: {
      labels: data.map(d => d.MONTH),
      datasets: [
        {
          label: "Rides",
          data: data.map(d => d.rides),
          borderColor: COLORS.blue,
          backgroundColor: "rgba(0,180,216,0.08)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: COLORS.blue,
          yAxisID: "y"
        },
        {
          label: "Miles",
          data: data.map(d => d.total_miles),
          borderColor: COLORS.purple,
          backgroundColor: "rgba(124,58,237,0.08)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: COLORS.purple,
          yAxisID: "y1"
        }
      ]
    },
    options: {
      ...chartDefaults,
      scales: {
        x:  { ticks: { color: "#8b90a8" }, grid: { color: "#2e3250" } },
        y:  { ticks: { color: "#8b90a8" }, grid: { color: "#2e3250" }, position: "left"  },
        y1: { ticks: { color: "#8b90a8" }, grid: { drawOnChartArea: false }, position: "right" }
      }
    }
  });
}

async function loadDistance() {
  const data = await fetchJSON("/distance");
  new Chart(document.getElementById("distanceChart"), {
    type: "bar",
    data: {
      labels:   data.map(d => d.bucket),
      datasets: [{ label: "Rides", data: data.map(d => d.count), backgroundColor: PALETTE, borderRadius: 4 }]
    },
    options: { ...chartDefaults, plugins: { ...chartDefaults.plugins, legend: { display: false } } }
  });
}

async function loadSurge() {
  const d = await fetchJSON("/surge");

  document.getElementById("r2-score").textContent = (d.r2_score * 100).toFixed(1) + "%";
  document.getElementById("ml-message").textContent = d.message;

  new Chart(document.getElementById("surgeChart"), {
    type: "line",
    data: {
      labels: d.forecast.map(f => f.hour + ":00"),
      datasets: [{
        label: "Predicted Miles",
        data: d.forecast.map(f => f.predicted_miles),
        borderColor: COLORS.green,
        backgroundColor: "rgba(34,197,94,0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: COLORS.green
      }]
    },
    options: chartDefaults
  });
}

async function loadRoutes() {
  const data = await fetchJSON("/routes");
  const tbody = document.getElementById("routes-body");
  tbody.innerHTML = data.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${r.route}</td>
      <td>${r.count}</td>
    </tr>
  `).join("");
}

async function init() {
  try {
    await fetchJSON("/health");
    setBadge(true);
  } catch {
    setBadge(false);
    document.getElementById("ml-message").textContent = "⚠️ Backend not running. Start Flask with: python backend/app.py";
    return;
  }

  await Promise.all([
    loadSummary(),
    loadCategory(),
    loadPurpose(),
    loadMonthly(),
    loadDistance(),
    loadSurge(),
    loadRoutes(),
    loadWeather()
  ]);
}
async function loadWeather() {
  const response = await fetchJSON("/weather-impact");
  
  // Create a stunning multi-colored bar chart matching your theme
  new Chart(document.getElementById("weatherChart"), {
    type: "bar",
    data: {
      labels: response.data.map(d => d.weather),
      datasets: [{
        label: "Avg Daily Rides",
        data: response.data.map(d => d.avg_rides),
        // Use your predefined theme colors: Clear/Sunny gets Amber, Overcast gets Blue, Rainy gets Purple
        backgroundColor: [COLORS.amber, COLORS.blue, COLORS.purple],
        borderRadius: 4
      }]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false } // Hiding legend since the colors speak for themselves
      }
    }
  });
} 
init();