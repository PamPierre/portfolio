import mongoose from "mongoose";

const bilingual = (required = false) => ({
  fr: { type: String, required, default: "" },
  en: { type: String, required, default: "" },
});

const experienceSchema = new mongoose.Schema(
  {
    role: bilingual(true),
    company: { type: String, required: true, trim: true },
    date: bilingual(true),
    location: bilingual(),
    // Puces descriptives, une liste par langue
    points: {
      fr: { type: [String], default: [] },
      en: { type: [String], default: [] },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
