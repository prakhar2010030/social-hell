// eslint-disable-next-line no-undef
const mongoose = require("mongoose");
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log(err));


// eslint-disable-next-line no-undef
module.exports = mongoose