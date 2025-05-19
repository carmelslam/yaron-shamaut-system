// PartsEngine.js 🧠
// Provides part group filtering and dynamic autocomplete

export const PartsEngine = {
  data: {},

  init() {
    this.data = {
      "פחחות": ["כנף קדמי", "כנף אחורי", "דלת שמאל", "דלת ימין", "מכסה מנוע", "גג"],
      "מנוע": ["מנוע שלם", "סטרטר", "אלטרנטור", "רצועה", "רדיאטור", "טורבו"],
      "חשמל": ["מצבר", "מחשב רכב", "פיוזים", "חיישן ABS", "קופסת פיוזים"],
      "תאורת רכב": ["פנס קדמי", "פנס אחורי", "פנס ערפל"],
      "מתלים והיגוי": ["תפוח הגה", "בולם", "ציריה"],
      "מיזוג אוויר": ["מדחס", "מאייד", "צנרת מזגן"],
      "שמשות ומראות": ["שמשה קדמית", "שמשה אחורית", "מראה שמאלית", "מראה ימנית"],
      "חישוקים וצמיגים": ["חישוק מגנזיום", "צמיג קדמי", "צמיג אחורי"],
      "ריפוד": ["ריפוד דלת", "ריפוד גג", "מושבים"],
      "מערכות בטיחות": ["כרית אוויר", "חגורת בטיחות"],
      "מערכות בקרה": ["יחידת בקרה", "ECU", "BCM"],
      "חלקי פנים": ["דשבורד", "קונסולה", "ידית הילוכים"],
      "מערכת פליטה": ["מפלט", "חיישן חמצן"],
      "מערכת דלק": ["מיכל דלק", "משאבת דלק"]
    };
  },

  getGroups() {
    return Object.keys(this.data);
  },

  getParts(group, filter = '') {
    if (!this.data[group]) return [];
    const cleanFilter = filter.trim();
    return this.data[group].filter(p => p.includes(cleanFilter));
  }
};
