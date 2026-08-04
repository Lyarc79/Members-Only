const db = require("../db/queries");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

async function getSignupForm(req, res) {
  return res.render("signup", {
    user: {},
  });
}

async function postSignupForm(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("signup", {
      errors: errors.array(),
      user: req.body,
    });
  }
  const { firstName, lastName, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await db.createUser(firstName, lastName, username, hashedPassword);
  res.redirect("/login");
}

module.exports = {
  getSignupForm,
  postSignupForm,
};
