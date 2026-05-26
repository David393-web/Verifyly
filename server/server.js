import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// CONNECT DATABASE
connectDB();

// MIDDLEWARES
app.use(cors({
  origin: "https://verifly-neon.vercel.app",
  credentials: true,
}));

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/admin", adminRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Verilyfy API Running...",
  });
});

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
