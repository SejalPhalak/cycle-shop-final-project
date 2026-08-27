import express from "express";

import {
  createOrder,
  getOrders,
  getOrderById,
  
} from "../controllers/order.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createOrder
);

router.get(
  "/",
  authMiddleware,
  getOrders
);

router.get(
  "/:id",
  authMiddleware,
  getOrderById
);

export default router;