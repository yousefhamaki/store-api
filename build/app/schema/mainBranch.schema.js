"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MainBranchSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: false },
    status: { type: Boolean, required: true, unique: false, default: true },
}, { timestamps: true });
const MainBranch = mongoose_1.default.model("main_branch", MainBranchSchema);
exports.default = MainBranch;
