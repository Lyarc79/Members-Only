require("dotenv").config();
const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const pool = require("./db/pool");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("./config/passport");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      pool: pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
