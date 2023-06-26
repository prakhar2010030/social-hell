// eslint-disable-next-line no-undef
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Post", PostSchema);

// eslint-disable-next-line no-undef
module.exports = User;
