const db = require("../db/queries");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const passport = require("passport");

async function getSignupForm(req, res) {
  return res.render("signup", {
    formData: {},
  });
}

async function postSignupForm(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("signup", {
      errors: errors.array(),
      formData: req.body,
    });
  }
  const { firstName, lastName, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await db.createUser(firstName, lastName, username, hashedPassword);
  res.redirect("/login");
}

async function getLoginForm(req, res) {
  return res.render("login", {
    formData: {},
  });
}

async function postLoginForm(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login", {
        errors: [{ msg: info ? info.message : "Invalid credentials" }],
        formData: req.body,
      });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
}

async function logoutUser(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  getSignupForm,
  postSignupForm,
  getLoginForm,
  postLoginForm,
  logoutUser,
};
