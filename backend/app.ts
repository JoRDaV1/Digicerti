import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth";
import blockRoutes from "./routes/block";
import certificateRoutes from "./routes/certificate";
import morgan from "morgan";

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("MongoDB Connection Succeeded.");
  })
  .catch((err: any) => {
    console.log("Error in DB connection : " + err);
  });

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/auth", blockRoutes);
app.use("/api/auth", certificateRoutes);

app.listen(port, () => {
  console.log(`Digicerti backend listening at http://localhost:${port}`);
});
