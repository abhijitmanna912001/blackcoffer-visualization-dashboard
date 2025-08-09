import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import dataRoutes from "./routes/dataRoutes.js";

dotenv.config();

// MongoDB connection
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/data", dataRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve frontend build in production
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(express.static(path.join(__dirname, "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
} else {
  // Dev mode root endpoint
  app.get("/", (req, res) => {
    res.send("✅ Backend is running in development mode.");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`
  );
});
