function pad2(n) {
  return String(n).padStart(2, "0");
}

function isoDay(year, monthIndex, day) {
  return `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
}

const WEEK_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TaskCalendar({ tasks, cursor, onPrevMonth, onNextMonth, onEdit }) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const label = cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const byDay = {};
  for (const t of tasks) {
    const key = t.date;
    if (!key) continue;
    if (!byDay[key]) byDay[key] = [];
    byDay[key].push(t);
  }

  const cells = [];
  for (let i = 0; i < firstDow; i++) {
    cells.push({ key: `pad-${i}`, empty: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = isoDay(year, month, d);
    cells.push({ key: iso, day: d, iso, items: byDay[iso] || [] });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ key: `trail-${cells.length}`, empty: true });
  }

  const todayIso = isoDay(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  return (
    <div className="min-w-0 flex-1">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-slate-700">Calendar</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevMonth}
            className="rounded-xl border border-stone-200/90 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/60"
          >
            ←
          </button>
          <span className="min-w-[10rem] text-center text-sm font-semibold text-slate-600">{label}</span>
          <button
            type="button"
            onClick={onNextMonth}
            className="rounded-xl border border-stone-200/90 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/60"
          >
            →
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-sm shadow-stone-900/5">
        <div className="grid grid-cols-7 border-b border-emerald-100/50 bg-emerald-50/50">
          {WEEK_LABELS.map((w) => (
            <div key={w} className="py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-emerald-900/70">
              {w}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-stone-100/80 p-px">
          {cells.map((cell) =>
            cell.empty ? (
              <div key={cell.key} className="min-h-[5.5rem] bg-stone-50/40" />
            ) : (
              <div
                key={cell.key}
                className={`flex min-h-[5.5rem] flex-col bg-white p-1.5 ${
                  cell.iso === todayIso ? "ring-1 ring-inset ring-emerald-300/55" : ""
                }`}
              >
                <span
                  className={`mb-1 text-xs font-semibold ${
                    cell.iso === todayIso ? "text-emerald-800/90" : "text-stone-400"
                  }`}
                >
                  {cell.day}
                </span>
                <ul className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto">
                  {(cell.items || []).map((item) => (
                    <li key={item._id}>
                      <button
                        type="button"
                        title={item.task}
                        onClick={() => onEdit(item)}
                        className="block w-full truncate rounded-md border border-stone-100 bg-stone-50/70 px-1 py-0.5 text-left text-[10px] font-medium leading-tight text-slate-700 hover:border-emerald-200/80 hover:bg-emerald-50/50"
                        style={{
                          borderLeftWidth: 3,
                          borderLeftColor: item.color || "#7eb8a8",
                          borderLeftStyle: "solid",
                        }}
                      >
                        {item.task}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
      <p className="mt-3 text-xs text-stone-500">
        Click a task to edit. Due dates without a match in this month appear on their scheduled day only.
      </p>
    </div>
  );
}
