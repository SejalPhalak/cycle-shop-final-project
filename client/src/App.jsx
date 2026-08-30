import express from "express";

import cors from "cors";

import path from "path";

import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";

import cycleRoutes from "./routes/cycle.routes.js";

import favouriteRoutes from "./routes/favourite.routes.js";

import cartRoutes from "./routes/cart.routes.js";

import orderRoutes from "./routes/order.routes.js";

import notFound from "./middleware/notFound.middleware.js";

import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

// ================= PATH SETUP =================

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());

// ================= STATIC UPLOADS =================

// Serve images from server/src/uploads

app.use(

  "/uploads",

  express.static(path.join(__dirname, "uploads"))

);

// ================= HOME =================

app.get("/", (req, res) => {

  res.json({

    success: true,

    message: "Cycle Shop API is running",

  });

});

// ================= ROUTES =================

app.use("/api/auth", authRoutes);

app.use("/api/cycles", cycleRoutes);

app.use("/api/favourites", favouriteRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

// ================= 404 =================

app.use(notFound);

// ================= ERROR =================

app.use(errorMiddleware);

export default app;