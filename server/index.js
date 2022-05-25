import dotenv from "dotenv";
// Loads .env varibles into process.env
dotenv.config();
import connectDB from "./db.js";
import router from "./Auth/Route.js";
import express from "express";
import cookieParser from "cookie-parser";

// Stores express's application object into variable app
const app = express();
const PORT = process.env.PORT;
// Listens on client port
const server = app.listen(PORT, () => {
  console.log(`Connected on port ${PORT}`);
});

// Parses json data on every incoming request
app.use(express.json());
// Parses cookies attached to client req object
app.use(cookieParser());
// Uses router's auth routes for incoming requests to auth api
app.use("/api/auth/", router);
// Connects to MongoDB Atlas
connectDB();
// Handling connection errors
process.on("unhandledRejection", (err) => {
  console.log(`An error occured: ${err.message}`);
  server.close(() => process.exit(1));
});
