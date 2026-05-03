import express from "express";
import Task from "../models/Task.js";
import { authRequired } from "../middleware/auth.js";
import { nextDueDate } from "../utils/recurrence.js";

const router = express.Router();
router.use(authRequired);

function normalizeTags(input) {
  if (input == null) return [];
  if (Array.isArray(input)) {
    return [...new Set(input.map((t) => String(t).trim()).filter(Boolean))].slice(0, 25);
  }
  return [
    ...new Set(
      String(input)
        .split(/[,;]/)
        .map((t) => t.trim())
        .filter(Boolean)
    ),
  ].slice(0, 25);
}

function normalizeRecurrence(body) {
  const r = body.recurrence;
  if (r == null || typeof r !== "object") return { frequency: "none" };
  const f = r.frequency ?? r.type; // accept legacy `type` from client typos
  const frequency = ["none", "daily", "weekly", "monthly"].includes(f) ? f : "none";
  return { frequency };
}

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.sub }).sort({ date: 1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load tasks" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { task, notes, color, date, status, fontWeight, tags, list, recurrence } = req.body;
    if (!task || !date || !status) {
      return res.status(400).json({ message: "task, date, and status are required" });
    }
    const doc = await Task.create({
      user: req.user.sub,
      task: String(task).trim(),
      notes: notes != null ? String(notes).trim() : "",
      color: color || "#7eb8a8",
      date,
      status,
      fontWeight: fontWeight === "bold" ? "bold" : "normal",
      tags: normalizeTags(tags),
      list: list != null && String(list).trim() ? String(list).trim().slice(0, 80) : "General",
      recurrence: normalizeRecurrence(req.body),
    });
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create task" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const existing = await Task.findOne({ _id: req.params.id, user: req.user.sub });
    if (!existing) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { task, notes, color, date, status, fontWeight, tags, list, recurrence } = req.body;

    const payload = {
      ...(task !== undefined && { task: String(task).trim() }),
      ...(notes !== undefined && { notes: String(notes).trim() }),
      ...(color !== undefined && { color }),
      ...(date !== undefined && { date }),
      ...(status !== undefined && { status }),
      ...(fontWeight !== undefined && { fontWeight: fontWeight === "bold" ? "bold" : "normal" }),
      ...(tags !== undefined && { tags: normalizeTags(tags) }),
      ...(list !== undefined && {
        list: String(list).trim().slice(0, 80) || "General",
      }),
      ...(recurrence !== undefined && { recurrence: normalizeRecurrence({ recurrence }) }),
    };

    const updated = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user.sub }, payload, {
      new: true,
      runValidators: true,
    });

    const becameCompleted =
      req.body.status !== undefined &&
      String(req.body.status).trim() === "Completed" &&
      existing.status !== "Completed";

    const freq = updated.recurrence?.frequency || updated.recurrence?.type;
    if (becameCompleted && freq && freq !== "none") {
      const nextDate = nextDueDate(updated.date, freq);
      const freqNext = updated.recurrence?.frequency || updated.recurrence?.type || "none";
      await Task.create({
        user: req.user.sub,
        task: updated.task,
        notes: updated.notes || "",
        color: updated.color || "#7eb8a8",
        date: nextDate,
        status: "Pending",
        fontWeight: updated.fontWeight || "normal",
        tags: Array.isArray(updated.tags) ? [...updated.tags] : [],
        list: updated.list || "General",
        recurrence: { frequency: freqNext },
      });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update task" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Task.deleteOne({ _id: req.params.id, user: req.user.sub });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Task.deleteMany({ user: req.user.sub });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to clear tasks" });
  }
});

export default router;
