// session-timeout.js 🕒

let timeoutWarning;
let logoutTimer;

function resetSessionTimer() {
  clearTimeout(timeoutWarning);
  clearTimeout(logoutTimer);

  // Show warning at 8 mins
  timeoutWarning = setTimeout(() => {
    showLogoutWarning();
  }, 8 * 60 * 1000);

  // Logout at 10 mins
  logoutTimer = setTimeout(() => {
    triggerLogout("timeout");
  }, 10 * 60 * 1000);
}

function showLogoutWarning() {
  const div = document.createElement('div');
  div.id = "session-warning";
  div.style = `
    position:fixed;
    top:0; left:0; width:100%; height:100%;
    background: rgba(0,0,0,0.6);
    display:flex; align-items:center; justify-content:center;
    z-index:9999;
  `;

  div.innerHTML = `
    <div style="background:white; padding:30px; border-radius:10px; text-align:center; font-size:18px;">
      <p>אין פעילות - המערכת תתנתק בעוד <strong>2 דקות</strong>.</p>
      <button onclick="dismissWarning()" style="margin-top:15px;">הבנתי - המשך עבודה</button>
    </div>
  `;

  document.body.appendChild(div);
}

function dismissWarning() {
  const div = document.getElementById("session-warning");
  if (div) div.remove();
  resetSessionTimer();
}

function triggerLogout(reason = "timeout") {
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = `index.html?logout=${reason}`;
}

// Reset session on interaction
["click", "keydown", "mousemove", "touchstart"].forEach(evt => {
  document.addEventListener(evt, resetSessionTimer, { passive: true });
});

// Start timer
window.addEventListener("DOMContentLoaded", resetSessionTimer);