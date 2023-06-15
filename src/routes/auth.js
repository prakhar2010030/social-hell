// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const bcrypt = require("bcrypt");
// eslint-disable-next-line no-undef
const User = require("../model/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    //generating salt using bcrypt
    const { email, username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user
    const newUser = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });
    // const newUser = new User({
    //   email: req.body.email,
    //   username: req.body.username,
    //   password: hashedPassword,
    // });

    //saving a new user and responding
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err); //catching error
    return res.status(400).json("something went wrong");
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    // const email = req.body.email;
    // const password = req.body.password;
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);

    if (!user) {
      return res.status(404).json("user does not exist");
    }
    if (!validPassword) {
      return res.status(400).json("invalid credentials");
    }

    return res.status(200).json({ message: "logged in successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// eslint-disable-next-line no-undef
module.exports = router;
