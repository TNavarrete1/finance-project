import { register, login, update, deleteUser } from "./Auth.js";
import express from "express";
// Generates an Route application from express
// Basically middleware
const router = express.Router();

// router.route([path]) method allows http methods to be chained to the same path
// Accepts api requests through register route
router
  .route("/register")
  .get((req, res) => res.send("hello world."))
  .post(register);

// Accepts api requests through login route
router
  .route("/login")
  .get((req, res) => {
    res.send("login page.");
  })
  .post(login);

// Accepts api requests to update user role
router.route("/update").put(update);

// Accepts api requests to delete a user
router.route("/deleteUser").delete(deleteUser);

export default router;
