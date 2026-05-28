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


// CORS CONFIG
const allowedOrigins = [
  "https://verilyfy-neon.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: "*",
  })
);


// BODY PARSER
app.use(express.json());


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/admin", adminRoutes);


// TEST ROUTE
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Verilyfy API Running...",
  });
});


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});