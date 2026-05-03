/**
 * @param {string} isoDateStr - YYYY-MM-DD
 * @param {'daily'|'weekly'|'monthly'} freq
 * @returns {string} next YYYY-MM-DD
 */
export function nextDueDate(isoDateStr, freq) {
  const parts = isoDateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return isoDateStr;
  const dt = new Date(parts[0], parts[1] - 1, parts[2]);
  if (Number.isNaN(dt.getTime())) return isoDateStr;
  if (freq === "daily") dt.setDate(dt.getDate() + 1);
  else if (freq === "weekly") dt.setDate(dt.getDate() + 7);
  else if (freq === "monthly") dt.setMonth(dt.getMonth() + 1);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
