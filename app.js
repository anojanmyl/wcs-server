require("dotenv").config();
require("./config/dbConnection");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // white list of clients, allowing specific domains to communicate with the api.
    credentials: true, // Allow client to send cookies.
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/list", require("./routes/index"));

app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }), // Persist the session in the Database
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_SECRET,
  })
);

module.exports = app;
