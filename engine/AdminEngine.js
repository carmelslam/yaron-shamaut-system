// engine/AdminEngine.js 🧠
// Central controller for admin-hub.html

import { Meta } from "./MetaEngine.js";

export const Admin = {
  toggleSystemMode() {
    const mode = sessionStorage.getItem("systemMode") === "manual" ? "main" : "manual";
    sessionStorage.setItem("systemMode", mode);
    Meta.set("systemMode", mode); // Also save to Meta
    alert(`✅ מצב מערכת שונה ל: ${mode === "manual" ? "גיבוי ידני" : "מערכת רגילה"}`);
  },

  setPermission() {
    const level = prompt("הזן רמת גישה (admin / user):");
    if (!level || !["admin", "user"].includes(level)) {
      return alert("⚠️ אנא הזן ערך חוקי: admin או user");
    }
    sessionStorage.setItem("userRole", level);
    Meta.set("userRole", level); // Store in Meta too
    alert(`🎚️ רמת ההרשאה עודכנה ל: ${level}`);
  },

  pullCase() {
    const plate = document.getElementById("plateSearch").value;
    if (!plate) return alert("אנא הזן מספר רכב לשליפה");

    fetch(`/data/cases/${plate}.json`)
      .then(res => res.json())
      .then(meta => {
        Meta.setAll(meta); // ✅ FIXED from broken Meta.key
        alert("📥 נתוני התיק נשלפו בהצלחה. מעבר למסך דוח...");
        window.location.href = "final-report.html";
      })
      .catch(() => alert("❌ תיק לא נמצא או נכשלה השליפה."));
  },

  pushMetadata() {
    const data = Meta.getAll();
    fetch("https://hook.eu2.make.com/ms1enok8y3y88md8qfttd6m6yljc9ijx", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.ok ? alert("✅ מטא עודכן בהצלחה!") : alert("❌ כשלון בעדכון המטא"))
      .catch(() => alert("❌ כשלון בשליחת המטא"));
  },

  sendToMake() {
    const { car, inspectionDate, garageEmail, owner } = Meta.getAll();
    const url = `https://sendformtomake.netlify.app/?plate=${car?.plate}&date=${inspectionDate}&email=${garageEmail}&garage=${car?.garage}&owner=${owner?.name}`;
    window.open(url, "_blank");
  },

  showPending() {
    fetch("/data/case-log.json")
      .then(res => res.json())
      .then(list => {
        const unfinished = list.filter(c => !c.finalized);
        alert(`🔎 נמצאו ${unfinished.length} תיקים פתוחים:\n` + unfinished.map(c => `• ${c.plate} - ${c.date}`).join("\n"));
      })
      .catch(() => alert("⚠️ אין נתוני לוג זמינים."));
  }
};
