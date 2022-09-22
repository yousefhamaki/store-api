"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BranchSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: false },
    status: { type: Boolean, required: true, unique: false, default: true },
    main_id: {
        type: String,
        required: true,
        ref: "main_branches",
    },
    main_name: {
        type: String,
        required: true,
    },
    main_status: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });
const Branch = mongoose_1.default.model("branch", BranchSchema);
exports.default = Branch;
