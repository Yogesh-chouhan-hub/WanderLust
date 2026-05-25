const listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require("./utils/validate");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.path = req.originalUrl;
    req.flash("msgError", "You must be logged in first!");
    return res.status(401).redirect("/signin");
  }
  next();
};

module.exports.savePathInfo = (req, res, next) => {
  if (req.session.path) {
    res.locals.pathInfo = req.session.path;
  }
  next();
};

module.exports.validateAction = async (req, res, next) => {
  let { id } = req.params;
  let info = await listing.findById(id);
  if (!info.owner._id.equals(res.locals.isCurrent._id)) {
    req.flash("msgError", "Not Authorised To perform Such Action...");
    return res.redirect(`/listing/${id}`);
  }
  next();
};

module.exports.validateReviewAction = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let info = await Review.findById(reviewId);
  if (!info.createdBy._id.equals(res.locals.isCurrent._id)) {
    req.flash("msgError", "Not Authorised To perform Such Action...");
    return res.redirect(`/listing/${id}`);
  }
  next();
};

module.exports.validationListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");

    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validationReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details[0]);
  } else {
    next();
  }
};
