const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const usersRoute =require('./Routes/user');
const eventRoute =require('./Routes/event');

dotenv.config({
  override: true,
});

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  require ('express-session')({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  })
);
  
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',usersRoute);
app.use('/event',eventRoute);

const {
  authenticate,
}=require('./auth/authStrategy');

passport.use(authenticate());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user));
  
});

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/AllEvents");
    console.log("database connected...");
  } catch (error) {
    console.log(error);
  }
};
connectDB();


app.listen(5174, "localhost", () => {
  console.log("server started on port 5174 ");
});

