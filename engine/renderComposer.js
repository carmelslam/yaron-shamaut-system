import { calcEngine } from './calcEngine.js';
import { legalTextEngine } from './legalTextEngine.js';

export const RenderComposer = {
  async buildHTML(meta) {
    const calc = calcEngine.run(meta);
    const legalText = await legalTextEngine.load();

    const damages = (meta?.report?.damageCenters || []).map((c, i) => `
      <h3>מוקד נזק ${i + 1}: ${c.centerZone || "—"}</h3>
      <ul>
        <li><strong>תיאור:</strong> ${c.description || "—"}</li>
        <li><strong>חלקים:</strong> ${(c.parts || []).map(p => p.name).join(", ") || "—"}</li>
        <li><strong>תיקונים:</strong> ${(c.repairs || []).map(r => r.name).join(", ") || "—"}</li>
        <li><strong>עבודות:</strong> ${(c.work || []).map(w => w.name).join(", ") || "—"}</li>
      </ul>
    `).join("<hr>");

    return `
      <style>
        body { font-family: "David", sans-serif; color: #222; line-height: 1.6; padding: 20px; }
        h1, h2, h3 { margin-top: 30px; color: #000; }
        ul { padding-right: 20px; }
        hr { margin: 30px 0; }
      </style>

      <h1>דו״ח שמאות רכב</h1>
      <p><strong>מס׳ תיק:</strong> ${meta?.caseId || "—"}</p>
      <p><strong>מס׳ רכב:</strong> ${meta?.car?.plateNumber || "—"}</p>
      <p><strong>תאריך בדיקה:</strong> ${meta?.car?.inspectionDate || "—"}</p>
      <p><strong>סטטוס תיקון:</strong> ${meta?.report?.repairStatus || "—"}</p>

      <hr>
      ${damages}

      <hr>
      <h2>התאמות לוי</h2>
      <ul>
        ${(meta?.report?.leviAdjustments || []).map(l => `<li>${l.label}: ₪${l.value}</li>`).join("") || "<li>—</li>"}
      </ul>

      <hr>
      <h2>סיכום כספי</h2>
      <ul>
        <li>חלקים: ₪${calc.totalParts}</li>
        <li>תיקונים: ₪${calc.totalRepairs}</li>
        <li>עבודה: ₪${calc.totalWork} (${calc.totalHours} שעות)</li>
        <li>הפחת לוי: -₪${calc.levi}</li>
        <li>פחת כולל: -₪${calc.depreciation}</li>
      </ul>
      <p><strong>סה״כ לפיצוי: ₪${calc.compensation}</strong></p>

      <hr>
      <h2>הצהרות משפטיות</h2>
      ${legalText}
    `;
  }
};
