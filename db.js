import Mongoose from "mongoose";

export default async () => {
  await Mongoose.connect(process.env.CONNECTION_URL);
  console.log("Connected to database");
};
