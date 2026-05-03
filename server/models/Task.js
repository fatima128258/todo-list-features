import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    task: { type: String, required: true, trim: true },
    notes: { type: String, default: "", trim: true },
    color: { type: String, default: "#7eb8a8" },
    date: { type: String, required: true },
    status: { type: String, required: true },
    fontWeight: { type: String, enum: ["bold", "normal"], default: "normal" },
    tags: {
      type: [{ type: String, trim: true }],
      default: [],
      validate: [(arr) => arr.length <= 25, "Too many tags"],
    },
    list: { type: String, default: "General", trim: true },
    recurrence: {
      frequency: { type: String, enum: ["none", "daily", "weekly", "monthly"], default: "none" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
