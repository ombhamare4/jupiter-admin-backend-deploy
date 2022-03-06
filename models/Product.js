const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: {
      originalPrice: { type: Number },
      discountPrice: { type: Number, required: true },
    },
    available: { type: Number, required: true },
    weight: { type: Number, required: true },
    category: { type: String, required: true },
    company: { type: String, required: true },
    reviews: [
      {
        rating: { type: Number },
        comment: { type: String },
        user: { type: Schema.Types.ObjectId },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
