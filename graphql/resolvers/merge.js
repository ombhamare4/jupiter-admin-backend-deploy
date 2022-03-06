const User = require("../../models/User");
const Product = require("../../models/Product");
const Orders = require("../../models/Orders");


const productByID = (productID) => {
  return Product.findById(productID)
    .then((product) => {
      return { ...product._doc };
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const userById = (userID) => {
  return User.findById(userID)
    .then((user) => {
      return { ...user._doc };
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const productsByIDs = (productIDs) => {
  return Product.find({ _id: { $in: productIDs } })
    .then((products) => {
      return products.map((product) => {
        return {
          ...product._doc,
          _id: product.id,
          product: productByID.bind(this, product._doc),
          user: userById.bind(this, product._doc.user),
        };
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
};


const orderByIDs = (orderIDs) => {
  return Orders.find({ _id: { $in: orderIDs } })
    .then((orders) => {
      return orders.map((orders) => {
        return {
          ...orders._doc,
          _id: orders.id,
          orderProducts: productsByIDs.bind(this, orders._doc.orderProducts),
        };
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

exports.productByID = productByID;
exports.productsByIDs = productsByIDs;
exports.userById = userById;
exports.orderByIDs = orderByIDs;
