import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { dbConnect } from "./configs/database.config";
import userRoutes from "./routers/user.router";
import accountRoutes from "./routers/account.router";
import bankRoutes from "./routers/bank.router";

dbConnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/user", userRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/bank", bankRoutes);

const port = 5000;
app.listen(port, () => {
  console.log("website served on http://localhost:" + port);
});
