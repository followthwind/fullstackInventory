import express from "express";
import { getInventory, addInventory, updateInventory, deleteInventory } from "../controllers/InventoryController.js";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getInventory);
router.post("/", authenticateToken, isAdmin, addInventory);
router.put("/:id", authenticateToken, isAdmin, updateInventory);
router.delete("/:id", authenticateToken, isAdmin, deleteInventory);

export default router;
