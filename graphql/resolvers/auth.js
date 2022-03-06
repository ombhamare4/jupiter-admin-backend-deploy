const { userById, productByID, productsByIDs, orderByIDs } = require("./merge");

const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const transformUser = (user) => {
  return {
    ...user._doc,
    _id: user.id,
    createdAt: new Date(user._doc.createdAt).toISOString(),
    updatedAt: new Date(user._doc.updatedAt).toISOString(),
    searchproducts: productsByIDs.bind(this, user._doc.searchproducts),
    cart: productsByIDs.bind(this, user._doc.cart),
    orderHistory: orderByIDs.bind(this, user._doc.ordersHistory),
  };
};

module.exports = {
  login: async (args) => {
    try {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error("Invalid Credential");
      }
      const isEqual = await bcrypt.compare(args.password, user.password);

      if (!isEqual) {
        throw new Error("Password Incorrect");
      }

      const token = await jwt.sign(
        {
          userID: user.id,
          email: user.email,
        },
        "youwanttoplayletsplay",
        { expiresIn: "1h" }
      );
      return {
        userID: user.id,
        token: token,
        tokenExpiration: 1,
      };
    } catch (e) {
      throw new Error(e);
    }
  },

  users: () => {
    return User.find()
      .then((users) => {
        return users.map((user) => {
          return transformUser(user);
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  createUser: (args) => {
    return User.findOne({ email: args.userInput.email })
      .then((user) => {
        if (user) {
          throw new Error("User Alredy Exists");
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then((hashpassword) => {
        const user = new User({
          name: {
            firstName: args.userInput.name.firstName,
            lastName: args.userInput.name.lastName,
          },
          email: args.userInput.email,
          password: hashpassword,
        });
        return user.save().then((users) => {
          return transformUser(users);
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  userById: async (args) => {
    try {
      const user = await User.findById(args.userId);
      return transformUser(user);
    } catch (e) {
      throw new Error(e);
    }
  },
};
