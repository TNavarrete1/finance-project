import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).json({
      message: "Not authorized, token not available",
    });
    return;
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "admin") {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};
