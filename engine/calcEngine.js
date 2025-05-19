export const calcEngine = {
  run(meta) {
    let totalParts = 0;
    let totalRepairs = 0;
    let totalWork = 0;
    let totalHours = 0;

    const centers = meta?.report?.damageCenters || [];

    centers.forEach(center => {
      (center.parts || []).forEach(p => {
        if (p.price) totalParts += Number(p.price);
      });
      (center.repairs || []).forEach(r => {
        if (r.cost) totalRepairs += Number(r.cost);
      });
      (center.work || []).forEach(w => {
        if (w.hours) totalHours += Number(w.hours);
      });
    });

    const hourlyRate = 280;
    totalWork = totalHours * hourlyRate;

    const levi = (meta?.report?.leviAdjustments || []).reduce((sum, l) => sum + Number(l.value), 0);
    const depreciation = Number(meta?.report?.globalDepreciation || 0);

    const totalCost = totalParts + totalRepairs + totalWork;
    const compensation = totalCost - levi - depreciation;

    return {
      totalParts: Math.round(totalParts),
      totalRepairs: Math.round(totalRepairs),
      totalWork: Math.round(totalWork),
      totalHours,
      levi: Math.round(levi),
      depreciation: Math.round(depreciation),
      totalCost: Math.round(totalCost),
      compensation: Math.round(compensation)
    };
  }
};
