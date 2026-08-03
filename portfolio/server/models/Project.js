import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    // Slug technique stable, utilisé côté front pour les icônes/couleurs par défaut
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
    },
    client: {
      type: String,
      trim: true,
      default: "",
    },
    context: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
    },
    role: {
      fr: { type: String, default: "" },
      en: { type: String, default: "" },
    },
    solution: {
      fr: { type: String, default: "" },
      en: { type: String, default: "" },
    },
    results: {
      fr: { type: String, default: "" },
      en: { type: String, default: "" },
    },
    technologies: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
