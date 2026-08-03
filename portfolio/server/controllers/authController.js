import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// @route  POST /api/auth/login
// @access Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Identifiants incorrects." });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

// @route  GET /api/auth/me
// @access Private
export const getMe = async (req, res) => {
  res.json(req.user);
};

// @route  GET /api/profile
// @access Public — récupère la bio affichée sur la page "À propos"
export const getProfile = async (req, res) => {
  try {
    const user = await User.findOne().sort({ createdAt: 1 });
    if (!user) return res.status(404).json({ message: "Profil introuvable." });
    res.json({ name: user.name, bio: user.bio });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

// @route  PUT /api/profile
// @access Private (admin)
export const updateProfile = async (req, res) => {
  try {
    const { bio } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "Profil introuvable." });

    if (bio?.fr) user.bio.fr = bio.fr;
    if (bio?.en) user.bio.en = bio.en;

    await user.save();
    res.json({ name: user.name, bio: user.bio });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};
