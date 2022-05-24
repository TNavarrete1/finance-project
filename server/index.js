import connectDB from "./db.js";
import express from "express";
import dotenv from "dotenv";
// Loads .env varibles into process.env
dotenv.config();

// Stores express's application object into variable app
const app = express();
const PORT = process.env.PORT;
// Listens on client port
const server = app.listen(PORT, () => {
  console.log(`Connected on port ${PORT}`);
});

// Parses json data on every incoming request
app.use(express.json());
// Connects to MongoDB Atlas
connectDB();
// Handling connection errors
process.on("unhandledRejection", (err) => {
  console.log(`An error occured: ${err.message}`);
  server.close(() => process.exit(1));
});
