const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  //no need for username and password right now ...passport create it itself....
});
userSchema.plugin(passportLocalMongoose.default);

const User = mongoose.model("User", userSchema);

module.exports = User;
