const { findById } = require("../../models/Product");
const Product = require("../../models/Product");

module.exports = {
  products: () => {
    return Product.find()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product._doc,
            createdAt: new Date(product._doc.createdAt).toISOString(),
            updatedAt: new Date(product._doc.updatedAt).toISOString(),
          };
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  createProduct: (args) => {
    const product = new Product({
      name: args.productInput.name,
      description: args.productInput.description,
      image: args.productInput.image,
      price: {
        originalPrice: +args.productInput.price.originalPrice,
        discountPrice: +args.productInput.price.discountPrice,
      },
      available: args.productInput.available,
      weight: +args.productInput.weight,
      category: args.productInput.category,
      company: args.productInput.company,
    });
    return product
      .save()
      .then((product) => {
        return {
          ...product._doc,
          createdAt: new Date(product._doc.createdAt).toISOString(),
          updatedAt: new Date(product._doc.updatedAt).toISOString(),
        };
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  productByID: async (args) => {
    try {
      const product = await Product.findById(args.productId);
      return {
        ...product._doc,
        createdAt: new Date(product._doc.createdAt).toISOString(),
        updatedAt: new Date(product._doc.updatedAt).toISOString(),
      };
    } catch (e) {
      throw new Error(e);
    }
  },

  updateProduct: async (args) => {
    try {
      const product = await Product.findById(args.productInput.productId);

      product.name = args.productInput.name;
      product.description = args.productInput.description;
      product.image = args.productInput.image;

      product.price.originalPrice = +args.productInput.price.originalPrice;
      product.price.discountPrice = +args.productInput.price.discountPrice;

      product.available = args.productInput.available;
      product.weight = +args.productInput.weight;
      product.category = -args.productInput.category;
      product.company = args.productInput.company;
      product.save();
      return {
        ...product._doc,
        createdAt: new Date(product._doc.createdAt).toISOString(),
        updatedAt: new Date(product._doc.updatedAt).toISOString(),
      };
    } catch (e) {
      throw new Error(e);
    }
  },

  removeProduct: async (args) => {
    try {
      const product = await Product.findByIdAndRemove(args.productId);
      return {
        ...product._doc,
        createdAt: new Date(product._doc.createdAt).toISOString(),
        updatedAt: new Date(product._doc.updatedAt).toISOString(),
      };
    } catch (e) {
      throw new Error(e);
    }
  },

  productByCollection: async (args) => {
    try {
      const ProductsByCollection = await Product.find({
        category: args.collectionName,
      });
      return ProductsByCollection.map((products)=>{
        return {
          ...products._doc,
          createdAt: new Date(products._doc.createdAt).toISOString(),
          updatedAt: new Date(products._doc.updatedAt).toISOString(),
        };
      })
    } catch (e) {
      throw new Error(e);
    }
  },
};
