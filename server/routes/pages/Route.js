import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { adminAuth, userAuth } from "../../middleware/auth.js";

const router = express.Router();
const pages = path.join(process.cwd(), "../client/pages");

router
  .route("/register")
  .get((req, res) => res.sendFile(`${pages}/auth/signup.html`));

router
  .route("/login")
  .get((req, res) => res.sendFile(`${pages}/auth/signin.html`));

router
  .route("/forgotpassword")
  .get((req, res) => res.sendFile(`${pages}/auth/forgotpassword.html`));

// Protected routes by user role
router.route("/admin").get(adminAuth, (req, res) => res.send("Admin Route"));
router.route("/basic").get(userAuth, (req, res) => res.send("User Route"));

export default router;
