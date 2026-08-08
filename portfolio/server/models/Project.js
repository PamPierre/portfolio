import mongoose from "mongoose";

const bilingual = (required = false) => ({
  fr: { type: String, required, default: "" },
  en: { type: String, required, default: "" },
});

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: bilingual(true),
    client: { type: String, trim: true, default: "" },
    category: { type: String, default: "" },
    categoryIcon: { type: String, default: "📦" },
    status: { type: String, default: "Terminé" },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },

    // Méthode STAR (Situation / Task / Action / Results)
    situation: bilingual(true),
    task: bilingual(),
    action: bilingual(),
    results: bilingual(),

    technologies: { type: [String], default: [] },

    // Métriques libres : { participants: 200, satisfaction: 95, ... }
    metrics: { type: mongoose.Schema.Types.Mixed, default: {} },

    imageUrl: { type: String, default: "" },
    link: { type: String, default: "" },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
