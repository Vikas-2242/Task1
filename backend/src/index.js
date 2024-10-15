// import { app } from "./app";
import express from "express";
import dotenv from "dotenv";
import { urlencoded } from "express";
import cors from "cors";
dotenv.config();
import mongoose from "mongoose";
import { mainrouter } from "./app/routes/routes.js";
const PORT = process.env.PORT;
export const app = express();

app.use(
  cors({
    origin: "https://luxury-estate.vercel.app/",
    optionsSuccessStatus: 200,
    preflightContinue: false,
    methods: "GET,POST,OPTIONS",
    credentials: true,
  })
);
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api/v1", mainrouter);
console.log(process.env.DATABASE_URL);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
