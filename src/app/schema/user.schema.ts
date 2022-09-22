import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    rank: { type: String, default: "user", required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
