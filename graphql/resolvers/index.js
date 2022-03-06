const authResolver = require("./auth");
const productResolver = require("./product");
const searchProductResolver = require("./searchProduct");
const reviewResolver = require("./review");
const orderResolver = require("./order");

const rootResolver = {
  ...authResolver,
  ...productResolver,
  ...searchProductResolver,
  ...reviewResolver,
  ...orderResolver,
};

exports.rootResolver = rootResolver;

// const bodyParser = require("body-parser");
// const bcrypt = require("bcryptjs");

// const User = require("../../models/User");
// const Product = require("../../models/Product");
// const SearchProduct = require("../../models/SearchProduct");

// const transformProductsListWithUsers = (product) => {
//   return {
//     ...product._doc,
//     _id: product.id,
//     product: productByID.bind(this, product._doc.product),
//     user: userById.bind(this, product._doc.user),
//     createdAt: new Date(product._doc.createdAt),
//     updatedAt: new Date(product._doc.updatedAt),
//   };
// };

// const transformUser = (user) => {
//   return {
//     ...user._doc,
//     _id: user.id,
//     createdAt: new Date(user._doc.createdAt).toISOString(),
//     updatedAt: new Date(user._doc.updatedAt).toISOString(),
//     searchproducts: productsByIDs.bind(this, user._doc.searchproducts),
//   };
// };

// const productByID = (productID) => {
//   return Product.findById(productID)
//     .then((product) => {
//       return { ...product._doc };
//     })
//     .catch((err) => {
//       throw new Error(err);
//     });
// };

// const userById = (userID) => {
//   return User.findById(userID)
//     .then((user) => {
//       return { ...user._doc };
//     })
//     .catch((err) => {
//       throw new Error(err);
//     });
// };

// const productsByIDs = (productIDs) => {
//   return Product.find({ _id: { $in: productIDs } })
//     .then((products) => {
//       return products.map((product) => {
//         return {
//           ...product._doc,
//           _id: product.id,
//           product: productByID.bind(this, product._doc),
//           user: userById.bind(this, product._doc.user),
//         };
//       });
//     })
//     .catch((err) => {
//       throw new Error(err);
//     });
// };

// module.exports = {
//   searchproducts: () => {
//     return SearchProduct.find()
//       .then((searchproducts) => {
//         return searchproducts.map((product) => {
//           return transformProductsListWithUsers(product);
//         });
//       })
//       .catch((err) => {
//         throw new Error(err);
//       });
//   },

//   addSearchProduct: (args) => {
//     return Product.findById(args.searchProductInput.productID)
//       .then((product) => {
//         return User.findById(args.searchProductInput.userID)
//           .then((user) => {
//             user.searchproducts.push(product);
//             return user.save();
//           })
//           .then((user) => {
//             const searchProduct = new SearchProduct({
//               product: product,
//               user: user,
//             });

//             return searchProduct
//               .save()
//               .then((searchproduct) => {
//                 return transformProductsListWithUsers(searchproduct);
//               })
//               .catch((err) => {
//                 throw new Error(err);
//               });
//           })
//           .catch((err) => {
//             throw new Error(err);
//           });
//       })
//       .catch((err) => {
//         throw new Error(err);
//       });
//   },

//   products: () => {
//     return Product.find()
//       .then((products) => {
//         return products.map((product) => {
//           return {
//             ...product._doc,
//             createdAt: new Date(product._doc.createdAt).toISOString(),
//             updatedAt: new Date(product._doc.updatedAt).toISOString(),
//           };
//         });
//       })
//       .catch((err) => {
//         throw new Error(err);
//       });
//   },

//   createProduct: (args) => {
//     const product = new Product({
//       name: args.productInput.name,
//       description: args.productInput.description,
//       image: args.productInput.image,
//       price: {
//         originalPrice: +args.productInput.price.originalPrice,
//         discountPrice: +args.productInput.price.discountPrice,
//       },
//       available: args.productInput.available,
//       weight: +args.productInput.weight,
//       category: args.productInput.category,
//       company: args.productInput.company,
//     });
//     return product
//       .save()
//       .then((product) => {
//         return {
//           ...product._doc,
//           createdAt: new Date(product._doc.createdAt).toISOString(),
//           updatedAt: new Date(product._doc.updatedAt).toISOString(),
//         };
//       })
//       .catch((err) => {
//         throw new Error(err);
//       });
//   },

//   addReview: (args) => {
//     return Product.findById(args.reviewInput.productId)
//       .then((product) => {
//         const review = {
//           rating: args.reviewInput.rating,
//           comment: args.reviewInput.comment,
//           user: args.reviewInput.userId,
//         };
//         product.reviews.push(review);
//         return product
//           .save()
//           .then((review) => {
//             return { ...review._doc };
//           })
//           .catch((err) => {
//             throw new Error(err);
//           });
//       })
//       .catch((err) => {
//         throw new Error(err);
//       });
//   },

//   users: () => {
//     return User.find()
//       .then((users) => {
//         return users.map((user) => {
//           return transformUser(user);
//         });
//       })
//       .catch((err) => {
//         throw new Error(err);
//       });
//   },

//   createUser: (args) => {
//     return User.findOne({ email: args.userInput.email })
//       .then((user) => {
//         if (user) {
//           throw new Error("User Alredy Exists");
//         }
//         return bcrypt.hash(args.userInput.password, 12);
//       })
//       .then((hashpassword) => {
//         const user = new User({
//           name: {
//             firstName: args.userInput.name.firstName,
//             lastName: args.userInput.name.lastName,
//           },
//           email: args.userInput.email,
//           password: hashpassword,
//         });
//         return user.save().then((users) => {
//           return transformUser(users);
//         });
//       })
//       .catch((err) => {
//         throw new Error(err);
//       });
//   },
// };
