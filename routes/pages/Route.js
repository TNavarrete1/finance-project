import express from "express";
import { adminAuth, userAuth } from "../../middleware/auth.js";

const router = express.Router();

// Home page
router.route("/").get((req, res) => res.render("index"));

// Auth routes
router.route("/register").get((req, res) => res.render("auth/signup"));
router.route("/login").get((req, res) => res.render("auth/signin"));
router
  .route("/forgotpassword")
  .get((req, res) => res.render("auth/forgotpassword"));
router.route("/logout").get((req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

// Protected routes by user role
router.route("/admin").get(adminAuth, (req, res) => res.send("Admin Route"));
router.route("/dashboard").get(userAuth, (req, res) => res.render("dashboard"));

export default router;
