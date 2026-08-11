import Article from "../models/Article.js";

export const getArticles = async (req, res) => {
  try {
    const items = await Article.find().sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

export const createArticle = async (req, res) => {
  try {
    const item = await Article.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: "Données invalides.", error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const item = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: "Article introuvable." });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: "Données invalides.", error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const item = await Article.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Article introuvable." });
    res.json({ message: "Article supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};
