import Mongoose from "mongoose";
import bycrypt from "bcryptjs";

// Structure of the user model
const UserSchema = new Mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
});
UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    // Generate a hashed password
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
  } catch (error) {
    return next(error);
  }
});

export default Mongoose.model("user", UserSchema);
