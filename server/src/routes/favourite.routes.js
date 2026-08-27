import express from "express";

import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "../controllers/favourite.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getFavourites
);

router.post(
  "/:cycleId",
  authMiddleware,
  addFavourite
);

router.delete(
  "/:cycleId",
  authMiddleware,
  removeFavourite
);

export default router;