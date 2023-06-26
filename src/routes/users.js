// eslint-disable-next-line no-undef
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../model/User");
// const ObjectId = require('mongoose').Types.ObjectId;
// const ObjectID = require('mongodb').ObjectID;

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.body.userId, {
        $set: req.body,
      });
      return res.status(200).json("user updated successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can update only your account");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      return res.status(200).json("user deleted successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can delete only your account");
  }
});

//get a user
router.get("/specificUser", async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findById(req.body.userId);
    console.log(user);
    const { password, createdAt, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});


// follow a user
router.put("/follow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    console.log(req.body.userId,req.params.id)
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      console.log(user.username,currentUser.username)
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you are following already this user");
      }
    //  return res.status(200).json("ok")
    } catch (err) {
     return res.status(500).json(err);
    }
  } else {
    return res.status(200).json("you can't follow yourself");
  }
});


// unfollow a user

router.put("/unfollow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    console.log(req.body.userId,req.params.id)
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      console.log(user.username,currentUser.username)
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you don't follow this user");
      }
    //  return res.status(200).json("ok")
    } catch (err) {
     return res.status(500).json(err);
    }
  } else {
    return res.status(200).json("you can't unfollow yourself");
  }
});

// eslint-disable-next-line no-undef
module.exports = router;
