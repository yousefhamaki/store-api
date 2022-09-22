import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: false },
    describtion: { type: String, required: true, unique: false },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    isonsale: { type: Boolean, default: false, required: true },
    features: { type: Object, required: true },
    branch_info: {
      id: {
        type: String,
        required: true,
        ref: "branches",
      },
      name: { type: String, required: true, unique: false },
      status: { type: Boolean, required: true },
    },
    countinstroke: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
