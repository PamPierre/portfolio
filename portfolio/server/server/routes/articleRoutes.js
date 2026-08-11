import express from "express";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getArticles);
router.post("/", protect, createArticle);
router.put("/:id", protect, updateArticle);
router.delete("/:id", protect, deleteArticle);

export default router;
