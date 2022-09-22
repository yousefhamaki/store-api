import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    user_id: { type: String, required: true, ref: "users" },
    products: { type: Object, required: true },
    status: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("order", orderSchema);

export default User;
