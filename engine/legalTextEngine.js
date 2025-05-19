import { Meta } from "./MetaEngine.js";

export const legalTextEngine = {
  load() {
    const override = Meta.get("legalOverride");
    if (override) return Promise.resolve(override);

    const legalHTML = `
      <ol>
        <li>יש להודיע לשמאי על כל נזק נוסף שיתגלה במהלך התיקון ולקבל אישור בכתב להוספתו.</li>
        <li>הצעת תיקון זו כפופה לעיון בטופס התביעה.</li>
        <li>החלקים שיפורקו מהרכב יעמדו לרשות חברת הביטוח.</li>
        <li>הצעה זו אינה מחייבת את חברת הביטוח לתשלום כלשהו.</li>
      </ol>
      <p><strong>ירון כיוף</strong>, שמאי רכב מס' 1097</p>
    `;
    return Promise.resolve(legalHTML);
  },

  // Optional extension for modular usage
  getSections() {
    return {
      feeDeclaration: "שכר שמאי לפי זמן המושקע בתיק (שעת עבודה 280 ש\"ח)",
      ownership: `חוות דעת זו הינה רכוש בלעדי של ירון כיוף שמאות. כל שימוש בה כפוף לתשלום התמורה במלואה.`,
      disclaimer: `אין להעתיק, לצלם, למסור או לעשות שימוש בדו\"ח זה ללא רשות.`,
      signatureDeclaration: `אני ירון כיוף, שמאי מוסמך (רישיון 1097), נותן בזאת חוות דעתי במקום עדות בבית משפט.`,
      expertProfile: `בוגר קורסי שמאות, בטיחות ותאונות דרכים, בוחן רכב ומרצה מוסמך בתחום שמאות רכב.`
    };
  }
};
