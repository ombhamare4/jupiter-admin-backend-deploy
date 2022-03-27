const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const { graphqlHTTP } = require("express-graphql");
const isAuth = require("./middleware/is-Auth");
const graphqlSchema = require("./graphql/schema/index");
const { rootResolver } = require("./graphql/resolvers/index");
const { request } = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const https = require("https");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// const privateKey = fs.readFileSync("server.key");
// const certificate = fs.readFileSync("server.cert");

// app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.kqn7m.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: rootResolver,
    graphiql: true,
  })
);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    // https
    //   .createServer({ key: privateKey, cert: certificate }, app)
    //   .listen(process.env.PORT || 5000);
      app.listen(process.env.PORT || 3000);
    console.log("Connection Success");
  })
  .catch((err) => {
    console.log(err);
    console.log("DB Not Connected Properly");
  });
