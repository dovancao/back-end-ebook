const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const config = require("./config-local.json");
const cors = require('cors');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());

const bookRouter = require("./modules/api/book/router");
const imageRouter = require("./modules/api/image/router");

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS"
  );

  if (req.headers.origin) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.secureCookie,
      maxAge: 12 * 60 * 60 * 1000
    }
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
// app.use(expressJWT({ secret: 'Aichotoiluongthientoioanhchet!!!'}).unless({ path: ['/api/book/:id']}));

app.use('/api/books', bookRouter);
app.use('/api/images', imageRouter);

mongoose.connect(config.mongoPath, err => {
  if (err) console.error(err);
  else console.log("Database connect successful");
});

const port = process.env.port || 4000;

app.listen(port, err => {
  if (err) console.log(err);
  console.log("Server started at port " + port);
});


