import mongoose, { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Must Provide First Name"],
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "Must Provide Last Name"],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, "Must provide Email"],
      trim: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
