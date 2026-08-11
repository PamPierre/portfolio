import Experience from "../models/Experience.js";

export const getExperiences = async (req, res) => {
  try {
    const items = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const item = await Experience.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: "Données invalides.", error: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: "Expérience introuvable." });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: "Données invalides.", error: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const item = await Experience.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Expérience introuvable." });
    res.json({ message: "Expérience supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};
