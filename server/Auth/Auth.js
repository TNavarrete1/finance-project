import User from "../model/User.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  // Gets email and password from request object
  const { email, password } = req.body;
  // Checks if password meets length requirements
  if (password.length < 6) {
    res
      .status(400)
      .json({ message: "Password is less than 6 characters long" });
    return;
  }
  // Try to create a new user with requested email and password
  try {
    // Generate a hashed password
    const hash = await bycrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hash,
    });
    // Generate token with jwt
    const token = jwt.sign(
      { id: user._id, email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    // Store token in a cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 3600 * 1000, // 24 hours in milliseconds
    });

    res.status(201).json({
      message: "User successfully created",
      user: user._id,
    });
  } catch (error) {
    res.status(401).json({
      message: "User not successfully created",
      error: error.message,
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  // If email or password is missing send a json response and return
  if (!email || !password) {
    res.status(400).json({
      message: "email or password is missing",
    });
    return;
  }
  // Try to find user in database
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Email or password is incorrect",
        error: "User not found",
      });
    } else {
      const passwordMatch = await bycrypt.compare(password, user.password);
      if (passwordMatch) {
        // Generate token with jwt
        const token = jwt.sign(
          { id: user._id, email, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        // Store token in a cookie
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 24 * 3600 * 1000, // 24 hours in milliseconds
        });

        res.status(201).json({
          message: "User successfully logged in",
          user: user._id,
        });
      } else {
        res.status(401).json({
          message: "Email or password is incorrect",
          error: "User not found",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occured",
      error: error.message,
    });
  }
};

export const update = async (req, res, next) => {
  const { role, id } = req.body;
  if (!role || !id) {
    res.status(400).json({
      message: "Missing role or id",
    });
    return;
  }
  try {
    const user = await User.findById(id);
    if (role === "admin") {
      if (user.role !== role) {
        user.role = role;
        user
          .save()
          .then((user) => {
            res.status(200).json({
              message: "User role updated successfully",
              user,
            });
          })
          .catch((error) => {
            res.status(400).json({
              message: "An error occured",
              error: error.message,
            });
            process.exit(1);
          });
      } else {
        res.status(400).json({
          message: "User is already admin",
        });
      }
    } else {
      res.status(400).json({
        message: "Role is not admin",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "User not found",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({
      message: "Missing user id",
    });
    return;
  }
  try {
    const user = await User.findById(id);
    user
      .remove()
      .then((user) => {
        res.status(200).json({
          message: "Successfully deleted user",
          user: user._id,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "Failed to delete user",
          error: error.message,
        });
      });
  } catch (error) {
    res.status(400).json({
      message: "User not found",
      error: error.message,
    });
  }
};
