import Mongoose from "mongoose";
import dotenv from "dotenv";
// Loads .env varibles into process.env
dotenv.config();

// Connection string from MongoDB Atlas
const CONNECTION_URL = process.env.CONNECTION_URL;

export default async () => {
  await Mongoose.connect(CONNECTION_URL);
  console.log("Connected to database");
};
