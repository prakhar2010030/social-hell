// eslint-disable-next-line no-undef
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
      // default:''
    },
    city: {
      type: String,
      max: 50,
      default:""
    },
    info: {
      type: String,
      max: 50,
      default:""
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
      // default:""
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

// eslint-disable-next-line no-undef
module.exports = User;
