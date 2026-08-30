import express from "express";

import {
  getCycles,
  getCycleById,
  createCycle,
  updateCycle,
  deleteCycle,
} from "../controllers/cycle.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();


// Public routes

router.get("/", getCycles);

router.get("/:id", getCycleById);


// Admin routes

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createCycle
);


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