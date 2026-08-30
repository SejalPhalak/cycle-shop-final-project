import express from "express";

import { getCycles , getCycleById , createCycle , updateCycle , deleteCycle } from "../controllers/cycle.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();


// public url
// get all cycles
// get cycles by category
router.get("/", getCycles);


// Admin url
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createCycle
);

router.get("/:id", getCycleById);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateCycle
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteCycle
);
export default router;