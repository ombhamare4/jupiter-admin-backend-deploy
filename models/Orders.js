const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//delivery Address :
// Phone Number
/*
first name
last name
email
phone number

address{
  add1: String!
  landmark: String
  street: String
  City: String!
  state:String!
  country: String!
  pincode: Number!
}
*/

<<<<<<< HEAD
const OrdersSchema = new Schema({
  name: {
    firstName: {
      type: String,
      required: true
=======
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
      landmarrk: { type: String },
      street: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      // country: { type: String, required: true },
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
>>>>>>> e2fe32b832aecb68cde47d9915a92ab218306813
    },
    lastName: {
      type: String,
      required: true
    },
  },

  phoneNo: {
    type: Number,
    required: true
  },


  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  address: {
    add1: {
      type: String,
      required: true
    },
    landmarrk: {
      type: String
    },
    street: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    pincode: {
      type: Number,
      required: true
    },
  },

  orderProducts: [{
    type: Schema.Types.ObjectId,
  }, ],
  orderStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Order", OrdersSchema);