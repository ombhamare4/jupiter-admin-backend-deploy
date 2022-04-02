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
    createdAt: new Date(order._doc.createdAt).toISOString(),
    updatedAt: new Date(order._doc.updatedAt).toISOString(),
  };
};

module.exports = {
  orders: async () => {
    const orders = await Order.find({ orderStatus: false });
    // console.log(orders);
    const orderlist = orders.map((order) => {
      return transfromUserProducts(order);
    });
    return orderlist;
  },

  ship: async () => {
    const orders = await Order.find({ orderStatus: true });
    // console.log(orders);
    const orderlist = orders.map((order) => {
      return transfromUserProducts(order);
    });
    return orderlist;
  },

  orderById: async (args) => {
    try {
      const order = await Order.findById(args.orderId);
      return transfromUserProducts(order);
    } catch (e) {
      throw new Error(e);
    }
  },

  // createOrder: (args, req) => {
  //   // if (!req.isAuth) {
  //   //   throw new Error("Unauthenticated");
  //   // }
  //   const orderProduct = args.orderInput.orderProducts.map((products) => {
  //     const result = products.productID;
  //     return result;
  //   });

  //   const order = new Order({
  //     name: {
  //       firstName: args.orderInput.name.firstName,
  //       lastName: args.orderInput.name.lastName,
  //     },
  //     user: args.orderInput.userID,
  //     address: {
  //       add1: args.orderInput.address.add1,
  //       landmark: args.orderInput.address.landmark,
  //       street: args.orderInput.address.street,
  //       city: args.orderInput.address.city,
  //       state: args.orderInput.address.state,
  //       country: args.orderInput.address.country,
  //       pincode: args.orderInput.address.pincode,
  //     },
  //     orderProducts: orderProduct,
  //   });

  //   return User.findById(args.orderInput.userID)
  //     .then((user) => {
  //       user.ordersHistory.push(order);
  //       user.save();
  //       return order
  //         .save()
  //         .then((orders) => {
  //           return transfromUserProducts(orders);
  //         })
  //         .catch((err) => {
  //           throw new Error(err);
  //         });
  //     })
  //     .catch((err) => {
  //       throw new Error(err);
  //     });
  // },

  createOrder: async (args) => {
    try {
      const user = await User.findById(args.orderInput.userId);
      const orderProduct = user.cart.map((products) => {
        const result = products;
        return result;
      });

      const order = new Order({
        name: {
          firstName: args.orderInput.name.firstName,
          lastName: args.orderInput.name.lastName,
        },
        user: args.orderInput.userId,
        address: {
          add1: args.orderInput.address.add1,
          landmark: args.orderInput.address.landmark,
          street: args.orderInput.address.street,
          city: args.orderInput.address.city,
          state: args.orderInput.address.state,
          // country: args.orderInput.address.country,
          pincode: args.orderInput.address.pincode,
          phoneNo:args.orderInput.address.phoneNo
        },
        orderProducts: orderProduct,
      });
      await user.ordersHistory.push(order);
      user.cart = [];
      await user.save();
      await order.save();
      return transfromUserProducts(order);
    } catch (e) {
      throw new Error(e);
    }
  },

  updateOrder: (args) => {
    return Order.findById(args.updateOrderInput.orderID)
      .then((order) => {
        let orderProductsIds = order.orderProducts;
        return Product.find({ _id: { $in: orderProductsIds } })
          .then((products) => {
            return products.map((product) => {
              product.available = product.available - 1;
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

  shipOrder: async (args) => {
    try {
      const order = await Order.findById(args.orderId);
      const user = await User.findById(order.user);

      //Order Status Update:
      order.orderStatus = true;
      await order.save();

      //Product count Update
      let productIds = user.cart;
      const productList = await Product.find({ _id: { $in: productIds } });
      productList.map((product) => {
        product.available = product.available - 1;
        product.save();
      });
      return transfromUserProducts(order);
    } catch (e) {
      throw new Error(e);
    }
  },

  addToCart: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    const product = await Product.findById(args.productID);
    const user = await User.findById(args.userID);
    user.cart.push(product);
    return user.save().then((user) => {
      return {
        product: productsByIDs.bind(this, user._doc.cart),
      };
    });
  },

  removeFromCart: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    const product = await Product.findById(args.productID);
    const user = await User.findById(args.userID);
    user.cart.remove(product);
    return user.save().then((user) => {
      return {
        product: productByID.bind(this, user._doc.cart),
      };
    });
  },
};
