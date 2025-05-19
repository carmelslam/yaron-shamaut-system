// engine/sync-payload.js 🧠
// Builds full metadata payload for export or backup

import { Meta } from "./MetaEngine.js";

export const buildSyncPayload = () => {
  const meta = Meta.getAll();

  return {
    id: meta.caseId || `YC-${meta.car?.plateNumber}-${new Date().getFullYear()}`,
    timestamp: meta.createdAt || new Date().toISOString(),
    origin: meta.systemOrigin || "main-system-v1",
    finalized: meta.report?.finalized || false,

    vehicle: meta.car || {},
    client: meta.client || {},
    report: meta.report || {},
    invoiceParsed: meta.parsedInvoice || [],
    config: meta.config || {},

    summary: {
      damageZones: (meta.report?.damageCenters || []).map(dc => dc.centerZone),
      totalDepreciation: meta.report?.globalDepreciation || 0,
      status: meta.report?.repairStatus || "לא צוין"
    }
  };
};
