const { userById, productByID, productsByIDs, orderByIDs } = require("./merge");

const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const transport = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      // api_user:,
      api_key:
        "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",
    },
  })
);

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
          transport.sendMail({
            to:"om.rubiksDev@gmail.com",
            from:"om.rubiksDev@gmail.com",
            subject:"Register Successfull",
            html:"<h1>Thank you for be with us</h1>"
          })
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
