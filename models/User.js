const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },

    email: { type: String, required: true },
    password: { type: String, required: true },

    searchproducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "SearchProduct",
      },
    ],

    ordersHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    FavProduct: [
      {
        type: Schema.Types.ObjectId,
        ref: "FavProduct",
      },
    ],

    cart: [
      {
        type: Schema.Types.ObjectId,
        ref:"Product"
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
