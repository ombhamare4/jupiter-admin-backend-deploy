const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrdersSchema = new Schema(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    address: {
      add1: { type: String, required: true },
      landmark: { type: String },
      street: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: Number, required: true },
      phoneNo: { type: String, required: true },
    },

    orderProducts: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    orderStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrdersSchema);
