import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  about: String,
  profileUrl: String,
});

// Create or retrieve the model
const User = mongoose.models.users || mongoose.model("users", userSchema);

// Ensure indexes are created
User.ensureIndexes();

export default User;
