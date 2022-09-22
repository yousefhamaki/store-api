"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
