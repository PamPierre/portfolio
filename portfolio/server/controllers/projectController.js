import Project from "../models/Project.js";

// @route  GET /api/projects
// @access Public
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

// @route  GET /api/projects/:id
// @access Public
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Projet introuvable." });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

// @route  POST /api/projects
// @access Private (admin)
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: "Données invalides.", error: error.message });
  }
};

// @route  PUT /api/projects/:id
// @access Private (admin)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: "Projet introuvable." });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: "Données invalides.", error: error.message });
  }
};

// @route  DELETE /api/projects/:id
// @access Private (admin)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Projet introuvable." });
    res.json({ message: "Projet supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};
