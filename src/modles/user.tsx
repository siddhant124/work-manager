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
  //   address: {
  //     street: String,
  //     city: String,
  //     pinCode: Number,
  //     country: String,
  //   },
});


export const User = mongoose.models.Users || mongoose.model("Users", userSchema)