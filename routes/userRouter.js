const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { isLoggedIn, savePathInfo } = require("../middleware.js");
const userController = require("../controllers/userController.js");

//Signup
router
  .route("/signup")
  .get(userController.getSignup)
  .post(userController.postSignup);

//Login
router
  .route("/signin")
  .get(userController.getSignin)
  .post(
    savePathInfo,
    passport.authenticate("local", {
      failureRedirect: "/signin",
      failureFlash: "Invalid username or password",
    }),
    userController.postSignin,
  );

router.get("/logout", userController.logout);

module.exports = router;
