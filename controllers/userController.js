const User = require("../models/user");
const passport = require("passport");

module.exports.getSignup = (req, res) => {
  res.render("signup.ejs");
};

module.exports.postSignup = async (req, res, next) => {
  try {
    let newUser = new User({
      email: req.body.email,
      username: req.body.username, //user will be unique everytime
    });

    let registeredUser = await User.register(newUser, req.body.password); //User.register(fakeUser, "Password");
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("msgSuccess", "User Registered Successfully...");
      res.redirect("/listing");
    });
  } catch (error) {
    req.flash("msgError", error.message);
    res.redirect("/signup");
  }
};

module.exports.getSignin = (req, res) => {
  res.render("signin.ejs");
};

module.exports.postSignin = async (req, res) => {
  req.flash("msgSuccess", "Welcome Back!");

  let redirectUrl = res.locals.pathInfo || "/listing";

  delete req.session.path;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash("msgSuccess", "User Logged Out Successfully...");
    res.redirect("/listing");
  });
};
