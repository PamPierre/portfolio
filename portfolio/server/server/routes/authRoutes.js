import express from "express";
import { login, getMe, getProfile, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, getMe);

export default router;

// Les routes profile sont exportées séparément dans profileRoutes ci-dessous,
// mais pour respecter l'arborescence demandée (GET/PUT /api/profile),
// on les branche directement ici via un second router.
export const profileRouter = express.Router();
profileRouter.get("/", getProfile);
profileRouter.put("/", protect, updateProfile);
