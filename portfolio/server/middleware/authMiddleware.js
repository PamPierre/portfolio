import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Protège les routes admin : vérifie la présence et la validité
 * d'un token JWT envoyé dans le header Authorization: Bearer <token>
 */
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "Utilisateur introuvable." });
      }
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Token invalide ou expiré." });
    }
  }

  return res.status(401).json({ message: "Accès refusé, aucun token fourni." });
};
