import { useEffect, useState } from "react";

const defaultColor = "#7eb8a8";

const LIST_OPTIONS = ["General", "Work", "Personal", "Study", "Shopping", "Other"];

const inputClass =
  "mb-4 w-full rounded-xl border border-stone-200/90 bg-white px-3 py-2.5 text-slate-700 shadow-sm placeholder:text-stone-400 focus:border-emerald-300/90 focus:outline-none focus:ring-2 focus:ring-emerald-200/50";

export default function TaskForm({ onSubmit, editing, onCancelEdit }) {
  const [task, setTask] = useState("");
  const [notes, setNotes] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [list, setList] = useState("General");
  const [recurrenceFrequency, setRecurrenceFrequency] = useState("none");
  const [color, setColor] = useState(defaultColor);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [fontWeight, setFontWeight] = useState("normal");

  useEffect(() => {
    if (editing) {
      setTask(editing.task || "");
      setNotes(editing.notes || "");
      setTagsInput(
        Array.isArray(editing.tags) ? editing.tags.join(", ") : editing.tags ? String(editing.tags) : ""
      );
      setList(editing.list || "General");
      const freq = editing.recurrence?.frequency || editing.recurrence?.type;
      setRecurrenceFrequency(["none", "daily", "weekly", "monthly"].includes(freq) ? freq : "none");
      setColor(editing.color || defaultColor);
      setDate(editing.date || "");
      setStatus(editing.status || "Pending");
      setFontWeight(editing.fontWeight === "bold" ? "bold" : "normal");
    } else {
      setTask("");
      setNotes("");
      setTagsInput("");
      setList("General");
      setRecurrenceFrequency("none");
      setColor(defaultColor);
      setDate("");
      setStatus("Pending");
      setFontWeight("normal");
    }
  }, [editing]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!task.trim() || !date) return;
    onSubmit({
      task: task.trim(),
      notes: notes.trim(),
      tags: tagsInput,
      list,
      recurrence: { frequency: recurrenceFrequency },
      color,
      date,
      status,
      fontWeight,
    });
    if (!editing) {
      setTask("");
      setNotes("");
      setTagsInput("");
      setList("General");
      setRecurrenceFrequency("none");
      setColor(defaultColor);
      setDate("");
      setStatus("Pending");
      setFontWeight("normal");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md rounded-2xl border border-emerald-100/70 bg-gradient-to-b from-white via-emerald-50/25 to-teal-50/20 p-6 shadow-sm shadow-emerald-900/[0.04] ring-1 ring-white/70 sm:p-7 lg:mx-0 lg:max-w-none"
    >
      <h2 className="mb-5 text-lg font-semibold tracking-tight text-slate-700">Task form</h2>

      <label className="mb-1.5 block text-sm font-medium text-slate-600" htmlFor="task">
        Task
      </label>
      <input
        id="task"
        className={inputClass}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
        required
      />

      <label className="mb-1.5 block text-sm font-medium text-slate-600" htmlFor="notes">
        Notes <span className="font-normal text-stone-500">(optional)</span>
      </label>
      <textarea
        id="notes"
        rows={3}
        className={`${inputClass} resize-none text-sm`}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Extra detail, links, or reminders…"
      />

      <label className="mb-1.5 block text-sm font-medium text-slate-600" htmlFor="list">
        List
      </label>
      <select id="list" className={inputClass} value={list} onChange={(e) => setList(e.target.value)}>
        {LIST_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <label className="mb-1.5 block text-sm font-medium text-slate-600" htmlFor="tags">
        Tags <span className="font-normal text-stone-500">(optional, comma-separated)</span>
      </label>
      <input
        id="tags"
        type="text"
        className={`${inputClass} text-sm`}
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        placeholder="e.g. urgent, home, bills"
      />

      <label className="mb-1.5 block text-sm font-medium text-slate-600" htmlFor="recurrence">
        Repeat when completed
      </label>
      <select
        id="recurrence"
        className={inputClass}
        value={recurrenceFrequency}
        onChange={(e) => setRecurrenceFrequency(e.target.value)}
      >
        <option value="none">Does not repeat</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <p className="-mt-2 mb-4 text-xs leading-relaxed text-stone-500">
        When you mark the task <strong className="font-medium text-slate-600">Completed</strong>, a copy is
        created with the next due date.
      </p>

      <label className="mb-1.5 block text-sm font-medium text-slate-600" htmlFor="color">
        Background color
      </label>
      <input
        id="color"
        type="color"
        className="mb-4 h-11 w-full cursor-pointer rounded-xl border border-stone-200 bg-white p-1 shadow-sm"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <span className="mb-2 block text-sm font-medium text-slate-600">Font style</span>
      <div className="mb-4 flex flex-wrap gap-5">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="radio"
            name="fontWeight"
            checked={fontWeight === "bold"}
            onChange={() => setFontWeight("bold")}
            className="text-emerald-600 focus:ring-emerald-300"
          />
          Bold
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="radio"
            name="fontWeight"
            checked={fontWeight === "normal"}
            onChange={() => setFontWeight("normal")}
            className="text-emerald-600 focus:ring-emerald-300"
          />
          Normal
        </label>
      </div>

      <label className="mb-1.5 block text-sm font-medium text-slate-600" htmlFor="date">
        Date
      </label>
      <input id="date" type="date" className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} required />

      <label className="mb-1.5 block text-sm font-medium text-slate-600" htmlFor="status">
        Status
      </label>
      <select id="status" className={`${inputClass} mb-6`} value={status} onChange={(e) => setStatus(e.target.value)} required>
        <option value="Pending">Pending</option>
        <option value="not complete yet">not complete yet</option>
        <option value="Completed">Completed</option>
      </select>

      <div className="flex flex-wrap gap-2.5">
        <button
          type="submit"
          className="rounded-xl bg-emerald-600/90 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-emerald-900/10 transition hover:bg-emerald-600 active:scale-[0.99]"
        >
          {editing ? "Update task" : "Add task"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-stone-50"
          >
            Cancel edit
          </button>
        )}
      </div>
    </form>
  );
}
