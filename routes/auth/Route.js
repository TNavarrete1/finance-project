import { register, login, update, deleteUser } from "./Auth.js";
import { adminAuth } from "../../middleware/auth.js";
import express from "express";
// Generates an Route application from express
// Basically middleware
const router = express.Router();

// router.route([path]) method allows http methods to be chained to the same path
// Accepts api requests through register route
router.route("/register").post(register);

// Accepts api requests through login route
router.route("/login").post(login);

// Accepts api requests to update user role
router.route("/update").put(adminAuth, update);

// Accepts api requests to delete a user
router.route("/deleteUser").delete(adminAuth, deleteUser);

export default router;
