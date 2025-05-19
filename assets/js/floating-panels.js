// 🧠 Floating Panels Module

let panelVisible = null;

export function togglePanel(type) {
  const vehicle = document.getElementById("vehiclePanel");
  const levi = document.getElementById("leviPanel");

  if (type === "vehicle") {
    vehicle.style.display = vehicle.style.display === "block" ? "none" : "block";
    levi.style.display = "none";
  }

  if (type === "levi") {
    levi.style.display = levi.style.display === "block" ? "none" : "block";
    vehicle.style.display = "none";
  }
}

export function injectDock(meta) {
  const dock = document.createElement("div");
  dock.id = "floatingDock";
  dock.innerHTML = `
    <button onclick="togglePanel('vehicle')">🚗 פרטי רכב</button>
    <button onclick="togglePanel('levi')">📊 דו"ח לוי</button>
  `;
  document.body.appendChild(dock);

  const vehiclePanel = document.createElement("div");
  vehiclePanel.id = "vehiclePanel";
  vehiclePanel.className = "floating-panel";
  vehiclePanel.innerHTML = `
    <h4>🚗 פרטי רכב</h4>
    <p>מס': ${meta?.car?.plateNumber || "---"}</p>
    <p>שנה: ${meta?.car?.year || "---"}</p>
    <p>יצרן: ${meta?.car?.make || "---"}</p>
    <p>דגם: ${meta?.car?.model || "---"}</p>
    <p>שילדה: ${meta?.vin || "---"}</p>
    <p>בעלים: ${meta?.owner?.name || "---"}</p>
    <p>מוסך: ${meta?.garage?.name || "---"}</p>
  `;
  document.body.appendChild(vehiclePanel);

  const levi = meta?.levi || {};
  const leviPanel = document.createElement("div");
  leviPanel.id = "leviPanel";
  leviPanel.className = "floating-panel";
  leviPanel.innerHTML = `
    <h4>📊 דו"ח לוי</h4>
    <p>קוד דגם: ${levi.modelCode || "---"}</p>
    <p>שווי סופי: ₪${levi.finalMarketValue?.toLocaleString() || "---"}</p>
    <p>מחיר בסיס: ₪${levi.basePrice || "---"}</p>
    <p>ק״מ: ${levi.odometer || "---"}</p>
  `;
  document.body.appendChild(leviPanel);
}