const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const schema = require("./schema/schema.js");
const colors = require("colors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
app.use(cors());

// connection to grapgql server
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

// Connect to MongoDB //
connectDB();

// Listening to server //
app.listen(process.env.PORT, () => {
  console.log(
    `listening to http://localhost:${process.env.PORT || 4300}`.blue.underline
      .bold
  );
});

app.get("/", (req, res) => {
  res.send("Hello World !");
});
