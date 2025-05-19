export const Meta = {
  set(key, value) {
    const data = Meta.getAll();
    data[key] = value;
    sessionStorage.setItem("main_meta", JSON.stringify(data));
  },

  get(key, fallback = undefined) {
    return Meta.getAll()[key] ?? fallback;
  },

  getAll() {
    try {
      return JSON.parse(sessionStorage.getItem("main_meta")) || {};
    } catch {
      return {};
    }
  },

  setAll(obj) {
    sessionStorage.setItem("main_meta", JSON.stringify(obj));
  },

  verify() {
    const meta = Meta.getAll();
    if (!meta.systemOrigin) meta.systemOrigin = "main-system-v1";

    if (!meta.caseId && meta.car?.plateNumber) {
      meta.caseId = `YC-${meta.car.plateNumber}-${new Date().getFullYear()}`;
    }

    Meta.setAll(meta);
  },

  init(defaults = {}) {
    const current = Meta.getAll();
    Meta.setAll({ ...defaults, ...current });
  },

  clear() {
    sessionStorage.removeItem("main_meta");
  }
};
