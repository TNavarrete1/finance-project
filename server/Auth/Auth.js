import User from "../model/User.js";

export default async (req, res, next) => {
  const { email, password } = req.body;
  if (password.length < 6) {
  }
};
