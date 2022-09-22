import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Branch = mongoose.model("branch", BranchSchema);

export default Branch;
