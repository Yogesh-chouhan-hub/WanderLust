const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../utils/validate.js");
const Review = require("../models/review.js");
const listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../controllers/reviewController.js");
const {
  isLoggedIn,
  savePathInfo,
  validationReview,
  validateReviewAction,
} = require("../middleware.js");

router.post(
  "/",
  isLoggedIn,
  validationReview,
  wrapAsync(reviewController.addReview),
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  validateReviewAction,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;

//Star ability
