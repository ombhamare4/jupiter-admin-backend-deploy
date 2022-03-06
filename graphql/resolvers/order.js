const Order = require("../../models/Orders");
const Product = require("../../models/Product");
const User = require("../../models/User");

const { productByID, productsByIDs, userById } = require("./merge");

const transfromUserProducts = (order) => {
  return {
    ...order._doc,
    _id: order.id,
    orderProducts: productsByIDs.bind(this, order._doc.orderProducts),
    user: userById.bind(this, order._doc.user),
  };
};

module.exports = {
  updateOrder: (args) => {
    return Order.findById(args.updateOrderInput.orderID)
      .then((order) => {
        let orderProductsIds = order.orderProducts;
        return Product.find({ _id: { $in: orderProductsIds } })
          .then((products) => {
            return products.map((product) => {
              product.available = product.available - 1;
              console.log(product);
              product.save();
              return transfromUserProducts(order);
            });
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  orders: async () => {
    const orders = await Order.find();
    const orderlist = orders.map((order) => {
      return transfromUserProducts(order);
    });
    return orderlist;
  },

  createOrder: (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const orderProduct = args.orderInput.orderProducts.map((products) => {
      const result = products.productID;
      return result;
    });

    const order = new Order({
      name: {
        firstName: args.orderInput.name.firstName,
        lastName: args.orderInput.name.lastName,
      },
      user: args.orderInput.userID,
      address: {
        add1: args.orderInput.address.add1,
        landmark: args.orderInput.address.landmark,
        street: args.orderInput.address.street,
        city: args.orderInput.address.city,
        state: args.orderInput.address.state,
        country: args.orderInput.address.country,
        pincode: args.orderInput.address.pincode,
      },
      orderProducts: orderProduct,
    });

    return User.findById(args.orderInput.userID)
      .then((user) => {
        user.ordersHistory.push(order);
        user.save();
        return order
          .save()
          .then((orders) => {
            console.log(user);
            return transfromUserProducts(orders);
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  addToCart: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    const product = await Product.findById(args.productID);
    // console.log(product);
    const user = await User.findById(args.userID);
    user.cart.push(product);
    return user.save().then((user) => {
      return {
        product: productByID.bind(this, user._doc.cart),
      };
    });
    // console.log(user);
  },

  removeFromCart: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const product = await Product.findById(args.productID);
    console.log(product.id);
    const user = await User.findById(args.userID);
    console.log(user.cart);
    user.cart.remove(product);
    return user.save().then((user) => {
      return {
        product: productByID.bind(this, user._doc.cart),
      };
    });
  },
};
