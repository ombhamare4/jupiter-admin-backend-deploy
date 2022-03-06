const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FavProductsSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("FavProduct", FavProductsSchema);
