const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "company"] },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = {
  UserModel,
};
