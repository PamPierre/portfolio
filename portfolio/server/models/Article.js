import mongoose from "mongoose";

const bilingual = (required = false) => ({
  fr: { type: String, required, default: "" },
  en: { type: String, required, default: "" },
});

const articleSchema = new mongoose.Schema(
  {
    title: bilingual(true),
    source: bilingual(true),
    sourceUrl: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "" },
    excerpt: bilingual(),
    date: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
