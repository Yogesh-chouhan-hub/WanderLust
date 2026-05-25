const Review = require("../models/review.js");
const listing = require("../models/listing.js");

module.exports.addReview = async (req, res) => {
  let { id } = req.params;
  let listingReview = await listing.findById(id);
  let newReview = new Review({
    rating: req.body.rating,
    comment: req.body.comment,
  });
  newReview.createdBy = req.user._id;
  listingReview.reviews.push(newReview);

  await newReview.save();
  await listingReview.save();
  req.flash("msgSuccess", "Review Added...");
  res.redirect(`/listing/${id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Review.findByIdAndDelete(reviewId);
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  req.flash("msgSuccess", "Review Deleted...");
  res.redirect(`/listing/${req.params.id}`);
};
