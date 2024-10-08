import express from "express";
import mongoose from "mongoose";
import presentationRoutes from "./routes/presentationRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
  })
);
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", presentationRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
