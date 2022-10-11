import express from "express";
import { createTransaction } from "./Controller.js";

// Route application
const router = express.Router();

router
  .route("/create")
  .post(createTransaction)
  .get((req, res) => {
    res.json({
      message: "it worked",
    });
  });

export default router;
