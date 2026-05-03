function formatDueLabel(dateStr) {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T12:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function statusBadge(status) {
  const s = (status || "").toLowerCase();
  if (s === "completed")
    return {
      label: "Done",
      className: "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-100",
    };
  if (s.includes("not complete"))
    return {
      label: "In progress",
      className: "bg-violet-50 text-violet-800 ring-1 ring-inset ring-violet-100",
    };
  return {
    label: "Pending",
    className: "bg-stone-100 text-stone-600 ring-1 ring-inset ring-stone-200/80",
  };
}

function repeatLabel(r) {
  const f = r?.frequency || r?.type;
  if (!f || f === "none") return null;
  const map = { daily: "daily", weekly: "weekly", monthly: "monthly" };
  return map[f] ? `Repeats ${map[f]}` : null;
}

export default function TaskList({ tasks, onEdit, onDelete, onSort, onClearAll }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onSort}
          className="rounded-xl border border-emerald-200/70 bg-emerald-50/70 px-3.5 py-2 text-sm font-medium text-emerald-900/85 shadow-sm transition hover:bg-emerald-50"
        >
          Sort by date
        </button>
        <button
          type="button"
          onClick={onClearAll}
          className="rounded-xl border border-rose-200/70 bg-rose-50/70 px-3.5 py-2 text-sm font-medium text-rose-900/85 transition hover:bg-rose-50/90"
        >
          Clear all
        </button>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-sm shadow-stone-900/5">
        <div className="border-b border-emerald-100/60 bg-gradient-to-r from-emerald-50/95 via-teal-50/60 to-cyan-50/40 px-5 py-3.5">
          <p className="text-sm font-semibold text-slate-700">Your dashboard</p>
          <p className="text-xs text-slate-500">Tasks stay synced when you sign in</p>
        </div>

        <div className="bg-stone-50/40 p-4 sm:p-5">
          {tasks.length === 0 ? (
            <p className="py-10 text-center text-sm leading-relaxed text-stone-500">
              No tasks match your filters—try adjusting search or list/tag filters.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {tasks.map((item) => {
                const badge = statusBadge(item.status);
                const repeat = repeatLabel(item.recurrence);
                const tagList = Array.isArray(item.tags) ? item.tags : [];
                const listName = item.list || "General";

                return (
                  <li
                    key={item._id}
                    className="overflow-hidden rounded-2xl border border-stone-200/50 bg-white shadow-sm transition hover:border-stone-300/80 hover:shadow-md hover:shadow-stone-900/[0.04]"
                  >
                    <div className="flex min-w-0">
                      <div
                        className="w-1 shrink-0 rounded-l-2xl opacity-[0.85]"
                        style={{ backgroundColor: item.color || "#7eb8a8" }}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
                        {/* Title + status — clear top row */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <h3
                            className="min-w-0 flex-1 text-[1.05rem] font-semibold leading-snug tracking-tight text-slate-700"
                            style={{ fontWeight: item.fontWeight === "bold" ? 700 : 500 }}
                          >
                            {item.task}
                          </h3>
                          <span
                            className={`shrink-0 self-start rounded-lg px-2.5 py-1 text-xs font-medium ${badge.className}`}
                          >
                            {badge.label}
                          </span>
                        </div>

                        {/* List & tags — one calm meta line */}
                        <p className="mt-2 text-xs leading-relaxed text-stone-500">
                          <span className="font-medium text-stone-600">{listName}</span>
                          {tagList.length > 0 ? (
                            <>
                              <span className="mx-1.5 text-stone-300" aria-hidden>
                                ·
                              </span>
                              <span>{tagList.join(" · ")}</span>
                            </>
                          ) : null}
                        </p>

                        {/* Notes */}
                        {item.notes?.trim() ? (
                          <p className="mt-3 max-h-40 overflow-y-auto whitespace-pre-wrap break-words border-l-2 border-stone-100 pl-3 text-sm leading-relaxed text-stone-600">
                            {item.notes.trim()}
                          </p>
                        ) : null}

                        {/* Footer: schedule + actions */}
                        <div className="mt-4 flex flex-col gap-3 border-t border-stone-100 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                          <div className="flex min-w-0 flex-col gap-1">
                            <time
                              dateTime={item.date}
                              className="text-sm font-medium tabular-nums text-stone-600"
                            >
                              {formatDueLabel(item.date)}
                            </time>
                            {repeat ? (
                              <span className="text-xs text-emerald-700/70">{repeat}</span>
                            ) : null}
                          </div>
                          <div className="flex shrink-0 gap-2">
                            <button
                              type="button"
                              onClick={() => onEdit(item)}
                              className="rounded-lg border border-stone-200/90 bg-stone-50/80 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:border-emerald-200 hover:bg-emerald-50/70 hover:text-emerald-900"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => onDelete(item._id)}
                              className="rounded-lg border border-stone-200/90 bg-stone-50/80 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:border-rose-200 hover:bg-rose-50/70 hover:text-rose-900"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
