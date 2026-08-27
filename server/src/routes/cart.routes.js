import express from "express";

import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../controllers/cart.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getCart
);

router.post(
  "/:cycleId",
  authMiddleware,
  addToCart
);

router.patch(
  "/:cycleId",
  authMiddleware,
  updateCartQuantity
);

router.delete(
  "/:cycleId",
  authMiddleware,
  removeFromCart
);

export default router;