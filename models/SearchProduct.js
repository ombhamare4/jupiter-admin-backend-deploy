const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SearchProductsSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
    },
    user: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SearchProduct", SearchProductsSchema);
