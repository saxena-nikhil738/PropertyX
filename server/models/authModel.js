import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const newSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  enum: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: String,
  },
  OTP: {
    type: String,
  },
});

const userauth = mongoose.model("userauth", newSchema);

export { userauth };
