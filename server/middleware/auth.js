import jwt from "jsonwebtoken";

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
    res.status(401).json({
      message: "Not authorized, no token present",
    });
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== "Basic") {
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
