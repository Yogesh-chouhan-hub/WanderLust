const joi = require("joi");

const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title is required",
  }),

  description: Joi.string().trim().required().messages({
    "string.empty": "Description is required",
  }),

  location: Joi.string().trim().required().messages({
    "string.empty": "Location is required",
  }),

  country: Joi.string().trim().required().messages({
    "string.empty": "Country is required",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
  }),
});

module.exports.reviewSchema = joi.object({
  rating: joi.number().required().min(1).max(5),
  comment: joi.string().required(),
});
