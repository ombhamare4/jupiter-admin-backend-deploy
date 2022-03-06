const { userById, productByID, productsByIDs } = require("./merge");

const User = require("../../models/User");
const Product = require("../../models/Product");
const SearchProduct = require("../../models/SearchProduct");

const transformProductsListWithUsers = (product) => {
  // console.log(product);
  return {
    ...product._doc,
    _id: product.id,
    product: productByID.bind(this, product._doc.product),
    user: userById.bind(this, product._doc.user),
    createdAt: new Date(product._doc.createdAt),
    updatedAt: new Date(product._doc.updatedAt),
  };
};

module.exports = {
  searchproducts: (req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    return SearchProduct.find()
      .then((searchproducts) => {
        return searchproducts.map((product) => {
          return transformProductsListWithUsers(product);
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  addSearchProduct: (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    return Product.findById(args.searchProductInput.productID)
      .then((product) => {
        return User.findById(args.searchProductInput.userID)
          .then((user) => {
            user.searchproducts.push(product);
            return user.save();
          })
          .then((user) => {
            const searchProduct = new SearchProduct({
              product: product,
              user: user,
            });

            return searchProduct
              .save()
              .then((searchproduct) => {
                return transformProductsListWithUsers(searchproduct);
              })
              .catch((err) => {
                throw new Error(err);
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
};
