export const RenderReport = {
  buildFullHTML: async ({ meta, legal }) => {
    const { car, owner, report, levi, reportImages, caseId } = meta;

    const plate = car?.plate || '---';
    const year = car?.year || new Date().getFullYear();
    const caseNum = caseId || `YC-${plate}-${year}`;

    const value = parseFloat(levi?.finalMarketValue || 0);
    const globalDepr = parseFloat(report?.globalDepreciation || 0);
    const deprShekel = Math.round((value * globalDepr) / 100);

    const damageCenters = meta.damageCenters || [];
    const allZones = damageCenters.map(dc => dc.centerZone).filter(Boolean);
    const zonesList = [...new Set(allZones)].join(", ");

   const blocksHTML = (report?.damageCenters || []).map((b, i) => `
  <div class="block">
    <h3>מוקד ${i + 1}: ${b.description || '-'}</h3>
    <p><strong>מוקד נזק:</strong> ${b.centerZone || '-'}</p>
    <p><strong>חלק:</strong> ${b.damageArea || '-'}</p>
    <p><strong>תיקונים:</strong> ${Array.isArray(b.repairs) ? b.repairs.join(', ') : b.repairs || '---'}</p>
    <p><strong>עבודות:</strong> ${Array.isArray(b.work) ? b.work.join(', ') : b.work || '---'}</p>
    <p><strong>חלקים:</strong> ${
      Array.isArray(b.parts)
        ? b.parts.map(p => typeof p === 'string' ? p : `${p.name} (${p.condition})`).join(', ')
        : b.parts || '---'
    }</p>
    <p><strong>שיעור ירידת ערך:</strong> ${b.depreciation || 0}%</p>
    <p><strong>תקנה 309:</strong> ${b.regulation309 || '---'}</p>
  </div>
`).join('');
      <div class="block">
        <h3>מוקד ${i + 1}: ${b.description}</h3>
        <p><strong>תיקונים:</strong> ${b.repairs?.join(', ') || '---'}</p>
        <p><strong>עבודות:</strong> ${b.work?.join(', ') || '---'}</p>
        <p><strong>חלקים:</strong> ${b.parts?.map(p => `${p.name} (${p.condition})`).join(', ') || '---'}</p>
        <p><strong>ירידת ערך למוקד:</strong> ${b.depreciation || 0}%</p>
      </div>
    `).join('');

    const adjustments = (levi?.adjustments || []).map(a => `<li>${a}</li>`).join('');

    const html = `
      <style>
        body { font-family: "David", sans-serif; color: #222; padding: 20px; line-height: 1.7; }
        h1, h2, h3 { color: #000; }
        .section { margin-bottom: 40px; }
        .signature { margin-top: 40px; }
        .legal { font-size: 0.95em; color: #555; margin-top: 20px; }
        ul { padding-right: 20px; }
      </style>

      <div class="section">
        <h1>דו"ח שמאות רכב</h1>
        <p><strong>מספר תיק:</strong> ${caseNum}</p>
        <p><strong>בעלים:</strong> ${owner?.name || '---'}</p>
        <p><strong>טלפון:</strong> ${owner?.phone || '---'}</p>
        <p><strong>מספר רישוי:</strong> ${car?.plate || '---'}</p>
        <p><strong>שנה:</strong> ${car?.year || '---'}</p>
        <p><strong>שלדה:</strong> ${meta?.vin || '---'}</p>
        <p><strong>קילומטר:</strong> ${car?.odometer || '---'}</p>
        <p><strong>תאריך בדיקה:</strong> ${meta?.inspectionDate || '---'}</p>
        <p><strong>תאריך מקרה:</strong> ${meta?.eventDate || '---'}</p>
        <p><strong>מוסך:</strong> ${meta?.garage || '---'}</p>
      </div>

      <div class="section">
        <h2>תיאור נזק</h2>
        <p>בבדיקת הרכב הנדון נוכחנו בנזקים תאונתיים לחלקי הרכב הבאים: ${zonesList}.</p>
      </div>

      <div class="section">
        <h2>דו"ח לוי</h2>
        <p><strong>שווי שוק:</strong> ${value.toLocaleString()} ₪</p>
        <p><strong>התאמות:</strong></p>
        <ul>${adjustments || '<li>--- ללא התאמות ---</li>'}</ul>
      </div>

      <div class="section">
        <h2>מוקדי נזק</h2>
        ${blocksHTML || '<p>--- לא הוזנו מוקדים ---</p>'}
      </div>

      <div class="section">
        <h2>ירידת ערך</h2>
        <p><strong>אחוז ירידת ערך כללית:</strong> ${globalDepr}%</p>
        <p><strong>סכום מוערך לירידת ערך:</strong> ${deprShekel.toLocaleString()} ₪</p>
      </div>

      <div class="section">
        <h2>שכר טרחה</h2>
        <p>${report?.feeAmount?.toLocaleString() || '---'} ₪</p>
        <p>${legal.feeDeclaration}</p>
      </div>

      <div class="section">
        <h2>הצהרת שמאי</h2>
        <p>${legal.signatureDeclaration}</p>
        <p>${legal.expertProfile}</p>
      </div>

      <div class="section legal">
        <h3>הערות משפטיות</h3>
        <p>${legal.ownership}</p>
        <p>${legal.disclaimer}</p>
        <p>${legal.notes}</p>
      </div>

      <div class="signature">
        <img src="https://carmelcayouf.com/wp-content/uploads/2025/04/yaron-signature-transparent-.webp" alt="חתימה" style="max-width:180px;">
        <br>
        <strong>ירון כיוף</strong><br>
        שמאי רכב ורכוש, רישיון 1097
      </div>
    `;

    return html;
  }
};
