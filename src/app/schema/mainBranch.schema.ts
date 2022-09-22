import mongoose from "mongoose";

const MainBranchSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: false },
    status: { type: Boolean, required: true, unique: false, default: true },
  },
  { timestamps: true }
);

const MainBranch = mongoose.model("main_branch", MainBranchSchema);

export default MainBranch;
