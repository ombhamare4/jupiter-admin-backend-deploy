const Product = require("../../models/Product");
const User = require("../../models/User");

module.exports = {
  review: async () => {
    const product = await Product.findById(args.reviewInput.productID);
    return product.reviews.map((review) => {
      return {
        ...review._doc,
      };
    });
  },
  addReview: async (args,req) => {
    if(!req.isAuth){
      throw new Error("Unauthenticated")
    }
    try {
      const product = await Product.findById(args.reviewInput.productID);
      const user = await User.findById(args.reviewInput.userID);

      const review = {
        product: product,
        user: user,
        comment: args.reviewInput.comment,
        rating: args.reviewInput.rating,
      };

      product.reviews.push(review);
      return product
        .save()
        .then((review) => {
          return {
            ...review._doc,
          };
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (err) {
      throw new Error(err);
    }
  },
};
