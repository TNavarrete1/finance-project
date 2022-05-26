// Loads .env varibles into process.env
import "dotenv/config.js";
import connectDB from "./db.js";
import authRouter from "./routes/auth/Route.js";
import pagesRouter from "./routes/pages/Route.js";
import express from "express";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Stores express's application object into variable app
const app = express();
const PORT = process.env.PORT || 5000;
// Listens on client port
const server = app.listen(PORT, () => {
  console.log(`Connected on port ${PORT}`);
});
// Path to freenance folder
const root = path.join(dirname(fileURLToPath(import.meta.url)), "..");

// Middleware
// Parses json data on every incoming request
app.use(express.json());
// Parses cookies attached to client req object
app.use(cookieParser());
// Serves static files from client folder
app.use(express.static(path.join(root, "client")));
// Serves website pages
app.use("/", pagesRouter);
// Uses router's auth routes for incoming requests to auth api
app.use("/api/auth/", authRouter);

// Connects to MongoDB Atlas
connectDB();
// Handling connection errors
process.on("unhandledRejection", (err) => {
  console.log(`An error occured: ${err.message}`);
  server.close(() => process.exit(1));
});
