"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true },
    user_id: { type: String, required: true, ref: "users" },
    products: { type: Object, required: true },
    status: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    postalCode: { type: String, required: true },
}, { timestamps: true });
const User = mongoose_1.default.model("order", orderSchema);
exports.default = User;
