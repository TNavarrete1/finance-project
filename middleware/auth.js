import jwt from "jsonwebtoken";
import User from "../model/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const adminAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).json({
      message: "Not authorized, token not available",
    });
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== "Admin") {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized",
      error: error.message,
    });
  }
};

export const userAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.redirect("/login");
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    console.log(error.message);
    res.redirect("/login");
  }
};

export const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  // Check token
  if (!token) {
    res.locals.user = null;
    next();
    return;
  }
  // Get user data from database
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    res.locals.user = {
      _id: user._id,
      firstName: user.firstName,
      role: user.role,
    };
    next();
  } catch (error) {
    console.log(error.message);
    res.locals.user = null;
    next();
  }
};
