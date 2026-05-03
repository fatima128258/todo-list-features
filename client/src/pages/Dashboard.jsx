import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import TaskCalendar from "@/components/TaskCalendar";
import { useToast } from "@/components/ui/ToastProvider";

export default function Dashboard() {
  const { showToast, confirmAction } = useToast();
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [busy, setBusy] = useState(true);

  const [search, setSearch] = useState("");
  const [listFilter, setListFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [view, setView] = useState("list");
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());

  const loadTasks = useCallback(async () => {
    setLoadError("");
    try {
      const data = await api("/api/tasks");
      setTasks(Array.isArray(data) ? data : []);
    } catch (e) {
      setLoadError(e.message || "Could not load tasks");
      setTasks([]);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const uniqueLists = useMemo(() => {
    const s = new Set(tasks.map((t) => t.list || "General"));
    return ["all", ...Array.from(s).sort()];
  }, [tasks]);

  const uniqueTags = useMemo(() => {
    const s = new Set();
    for (const t of tasks) {
      if (Array.isArray(t.tags)) {
        t.tags.forEach((x) => x && s.add(String(x)));
      }
    }
    return ["all", ...Array.from(s).sort()];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let t = tasks;
    const q = search.trim().toLowerCase();
    if (q) {
      t = t.filter((x) => {
        const title = (x.task || "").toLowerCase();
        const notes = (x.notes || "").toLowerCase();
        const tags = (Array.isArray(x.tags) ? x.tags : []).join(" ").toLowerCase();
        return title.includes(q) || notes.includes(q) || tags.includes(q);
      });
    }
    if (listFilter !== "all") {
      t = t.filter((x) => (x.list || "General") === listFilter);
    }
    if (tagFilter !== "all") {
      t = t.filter((x) => Array.isArray(x.tags) && x.tags.includes(tagFilter));
    }
    return t;
  }, [tasks, search, listFilter, tagFilter]);

  const hasActiveFilters =
    search.trim() !== "" || listFilter !== "all" || tagFilter !== "all";

  function clearFilters() {
    setSearch("");
    setListFilter("all");
    setTagFilter("all");
  }

  async function handleAddOrUpdate(payload) {
    if (editing) {
      await api(`/api/tasks/${editing._id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setEditing(null);
    } else {
      await api("/api/tasks", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }
    await loadTasks();
  }

  async function handleDelete(id) {
    const ok = await confirmAction({
      title: "Delete this task?",
      message: "This action cannot be undone.",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      variant: "danger",
    });
    if (!ok) return;
    try {
      await api(`/api/tasks/${id}`, { method: "DELETE" });
      if (editing && editing._id === id) setEditing(null);
      await loadTasks();
      showToast("Task deleted.", "success");
    } catch (e) {
      showToast(e.message || "Could not delete task.", "error");
    }
  }

  async function handleClearAll() {
    const ok = await confirmAction({
      title: "Remove all tasks?",
      message: "Every task will be permanently deleted. This cannot be undone.",
      confirmLabel: "Remove all",
      cancelLabel: "Cancel",
      variant: "danger",
    });
    if (!ok) return;
    try {
      await api("/api/tasks", { method: "DELETE" });
      setEditing(null);
      await loadTasks();
      showToast("All tasks removed.", "success");
    } catch (e) {
      showToast(e.message || "Could not clear tasks.", "error");
    }
  }

  function handleSort() {
    setTasks((prev) => [...prev].sort((a, b) => new Date(a.date) - new Date(b.date)));
  }

  function shiftMonth(delta) {
    setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  }

  return (
    <div className="mx-auto w-full max-w-[min(72rem,calc(100%-2rem))] px-4 py-5 sm:px-6 sm:py-8 lg:px-10 lg:py-8 xl:px-12">
      {loadError && (
        <p className="mb-4 rounded-xl border border-rose-200/80 bg-rose-50/90 px-3 py-2.5 text-sm text-rose-900/90">
          {loadError}
        </p>
      )}
      {busy ? (
        <p className="text-stone-500">Loading tasks…</p>
      ) : (
        <>
          <div className="mb-6 rounded-2xl border border-emerald-100/60 bg-gradient-to-br from-white/95 via-emerald-50/30 to-teal-50/25 p-4 shadow-sm shadow-emerald-900/[0.04] ring-1 ring-white/60 sm:mb-8 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
              <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Search
                  </span>
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Title, notes, or tags…"
                    className="w-full rounded-xl border border-stone-200/90 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-stone-400 shadow-sm focus:border-emerald-300/90 focus:outline-none focus:ring-2 focus:ring-emerald-200/45"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
                    List
                  </span>
                  <select
                    value={listFilter}
                    onChange={(e) => setListFilter(e.target.value)}
                    className="w-full rounded-xl border border-stone-200/90 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm focus:border-emerald-300/90 focus:outline-none focus:ring-2 focus:ring-emerald-200/45"
                  >
                    {uniqueLists.map((x) => (
                      <option key={x} value={x}>
                        {x === "all" ? "All lists" : x}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Tag
                  </span>
                  <select
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                    className="w-full rounded-xl border border-stone-200/90 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm focus:border-emerald-300/90 focus:outline-none focus:ring-2 focus:ring-emerald-200/45"
                  >
                    {uniqueTags.map((x) => (
                      <option key={x} value={x}>
                        {x === "all" ? "All tags" : x}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
                    View
                  </span>
                  <div className="flex rounded-xl border border-stone-200/80 bg-stone-100/50 p-0.5">
                    <button
                      type="button"
                      onClick={() => setView("list")}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        view === "list"
                          ? "bg-white text-emerald-900/90 shadow-sm"
                          : "text-stone-600 hover:text-slate-700"
                      }`}
                    >
                      List
                    </button>
                    <button
                      type="button"
                      onClick={() => setView("calendar")}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        view === "calendar"
                          ? "bg-white text-emerald-900/90 shadow-sm"
                          : "text-stone-600 hover:text-slate-700"
                      }`}
                    >
                      Calendar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
              <p>
                Showing <strong className="font-semibold text-slate-600">{filteredTasks.length}</strong> of{" "}
                <strong className="font-semibold text-slate-600">{tasks.length}</strong> tasks
              </p>
              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-200/50 ${
                  hasActiveFilters
                    ? "border-emerald-200/90 bg-emerald-50/80 text-emerald-900/90 hover:bg-emerald-50"
                    : "cursor-not-allowed border-stone-200 bg-stone-50 text-stone-400"
                }`}
              >
                Clear filters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] xl:gap-10">
            {/* Sticky form on desktop; stacked on small screens */}
            <aside className="relative z-20 mx-auto w-full max-w-md lg:sticky lg:top-24 lg:mx-0 lg:w-full lg:max-w-none lg:self-start">
              <TaskForm
                onSubmit={handleAddOrUpdate}
                editing={editing}
                onCancelEdit={() => setEditing(null)}
              />
            </aside>

            {/* Tasks / calendar: full height with page scroll (no inner scrollbar) */}
            <section
              className="min-w-0 lg:rounded-2xl lg:border lg:border-stone-200/40 lg:bg-white/40 lg:p-2 lg:shadow-inner lg:shadow-stone-900/[0.02] xl:p-3"
              aria-label={view === "list" ? "Task list" : "Calendar"}
            >
              {view === "list" ? (
                <TaskList
                  tasks={filteredTasks}
                  onEdit={setEditing}
                  onDelete={handleDelete}
                  onSort={handleSort}
                  onClearAll={handleClearAll}
                />
              ) : (
                <TaskCalendar
                  tasks={filteredTasks}
                  cursor={calendarMonth}
                  onPrevMonth={() => shiftMonth(-1)}
                  onNextMonth={() => shiftMonth(1)}
                  onEdit={setEditing}
                />
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}
