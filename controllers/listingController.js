const listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  let { search } = req.query;

  let filter = {};

  if (search) {
    filter = {
      $or: [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },

        {
          location: {
            $regex: search,
            $options: "i",
          },
        },

        {
          country: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };
  }

  let info = await listing.find(filter);

  res.render("index.ejs", {
    info,
    search,
  });
};

module.exports.newListForm = (req, res, next) => {
  res.render("newListing.ejs");
};

module.exports.createNewListing = async (req, res, next) => {
  // console.log(req.body);
  const newlisting = new listing({
    title: req.body.title,
    description: req.body.description,
    image: {
      filename: req.file.originalname,
      url: req.file.path,
    },
    price: req.body.price,
    location: req.body.location,
    country: req.body.country,
  });
  console.log(req.user._id);
  newlisting.owner = req.user._id;
  await newlisting.save();
  req.flash("msgSuccess", "New Listing Is Created...");
  res.redirect("/listing");
};

module.exports.showListing = async (req, res, next) => {
  let { id } = req.params;

  let info = await listing
    .findById({ _id: id })
    .populate({
      path: "reviews",
      populate: { path: "createdBy" },
    })
    .populate("owner");

  if (!info) {
    req.flash("msgError", "Listing Does Not Exist...");

    return res.redirect("/listing");
  }

  res.render("detail.ejs", { info });
};
module.exports.editForm = async (req, res, next) => {
  let { id } = req.params;
  let info = await listing.findById({ _id: id });
  console.log(info);
  res.render("edit.ejs", { info });
};

module.exports.editListing = async (req, res, next) => {
  let { id } = req.params;

  let updatedData = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    country: req.body.country,
  };

  // if new image uploaded
  if (req.file) {
    updatedData.image = {
      filename: req.file.originalname,
      url: req.file.path,
    };
  }

  await listing.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  req.flash("msgSuccess", "Listing got Updated...");

  res.redirect(`/listing/${id}`);
};

module.exports.destroyListing = async (req, res, next) => {
  let { id } = req.params;
  await listing.findByIdAndDelete({ _id: id });
  req.flash("msgSuccess", "Listing got Deleted...");
  res.redirect("/listing");
};

module.exports.searchSuggestions = async (req, res) => {
  let search = req.query.search;

  if (!search) {
    return res.json([]);
  }

  let listings = await listing
    .find({
      $or: [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },

        {
          location: {
            $regex: search,
            $options: "i",
          },
        },

        {
          country: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    })
    .limit(5);

  res.json(listings);
};
