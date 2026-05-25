const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const listingController = require("../controllers/listingController.js");
const {
  isLoggedIn,
  savePathInfo,
  validateAction,
  validationListing,
} = require("../middleware.js");

router.get("/suggestions", wrapAsync(listingController.searchSuggestions));

router
  .route("/new")
  .post(
    isLoggedIn,
    upload.single("image"),
    validationListing,
    wrapAsync(listingController.createNewListing),
  )
  .get(isLoggedIn, listingController.newListForm);

// router
//   .route("/new")
//   .post(upload.single("filename"), (req, res) => {
//     res.send(req.file);
//   })
//   .get(isLoggedIn, listingController.newListForm);

router
  .route("/edit/:id")
  .get(isLoggedIn, wrapAsync(listingController.editForm))
  .patch(
    isLoggedIn,
    upload.single("image"),
    validateAction,
    validationListing,
    wrapAsync(listingController.editListing),
  );

router.get("/", wrapAsync(listingController.index));

router.get("/:id", wrapAsync(listingController.showListing));

router.delete(
  "/delete/:id",
  isLoggedIn,
  validateAction,
  wrapAsync(listingController.destroyListing),
);

module.exports = router;
