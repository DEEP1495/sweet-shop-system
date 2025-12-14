import { Router } from "express";
import {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from "../controllers/sweet.controller";

import { protect } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";

const router = Router();

/**
 * 🔐 Protected Routes
 */
router.get("/search", protect, searchSweets); // ✅ MUST be above "/"
router.get("/", protect, getSweets);
router.post("/:id/purchase", protect, purchaseSweet);

/**
 * 🔒 Admin Routes
 */
router.post("/", protect, adminOnly, addSweet);
router.put("/:id", protect, adminOnly, updateSweet);
router.delete("/:id", protect, adminOnly, deleteSweet);
router.post("/:id/restock", protect, adminOnly, restockSweet);

export default router;
